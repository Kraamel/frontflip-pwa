import React from 'react'
import { withStyles, Grid } from '@material-ui/core';
import { inject, observer } from "mobx-react";
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Redirect } from 'react-router-dom';

import OnboardIntro from './steps/OnboardIntro';
import OnboardContacts from './steps/OnboardContacts';
import OnboardWings from './steps/OnboardWings';
import SlackService from '../../services/slack.service';

import { withSnackbar } from 'notistack';
import LoaderFeedback from '../utils/buttons/LoaderFeedback';

import SwipeableViews from 'react-swipeable-views';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';
import {FormattedMessage} from "react-intl";
import classNames from 'classnames';

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

let timeoutArray = [];

const styles = theme => ({
  root: {
    background: theme.palette.primary.dark
  },
  stepperButton: {
    background: 'none',
    boxShadow: 'none',
    padding: '8px 16px',
    color:'white',
    '&:hover' : {
      background: 'rgba(255, 255, 255, 0.12)',
    },
    '&:first-child()': {
      width: 40,
    },
    '&:disabled':{
      color:theme.palette.primary.hover + '!important'
    }
  },
  stepperButtonHighlighted: {
    background: theme.palette.secondary.main,
    '&:hover' : {
      background: theme.palette.secondary.dark,
    },
  }
});

class OnboardStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: this.props.initStep || 0,
      steps: this.makeSteps(),
      canNext: true
    };
  }

  componentDidMount() {
    this.initializeSuggestions(this.state.steps[this.state.activeStep]);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.initStep !== this.props.initStep) {
      this.setState({activeStep: nextProps.initStep}, () => {this.forceUpdate()});
    }
  }

  /**
   * @description Make steps array thanks to organisation data
   */
  makeSteps = () => {
    var steps = ['intro', 'contacts', 'firstWings', 'wings'];
    if (this.props.organisationStore.values.organisation && this.props.organisationStore.values.organisation.featuredWingsFamily) {
      var familySteps = this.props.organisationStore.values.organisation.featuredWingsFamily.map(
        fam => fam.tag
      );
      steps = steps.concat(familySteps);
    }
    return steps;
  }

  initializeSuggestions = (currentStep) => {
    if(currentStep && (currentStep === 'wings' || currentStep.charAt(0) === '#')) {
      this.props.SuggestionsController.initSuggestions(currentStep, this.props.algoliaKey);
    }
  }

  handleNext = () => {
    if(this.props.edit){ 
      this.props.recordStore.setOrgId(this.props.organisationStore.values.organisation._id);
      this.props.recordStore.getRecordByUser().then().catch();
      return this.setState({redirectTo: 
                        '/' + this.props.commonStore.locale + 
                        '/' + this.props.organisationStore.values.orgTag + 
                        '/' + this.props.recordStore.values.record.tag }, () => {this.forceUpdate()});
    }

    this.initializeSuggestions(this.state.steps[this.state.activeStep+1]);
    
    if ((this.state.activeStep === (this.state.steps.length - 1))) {
      // click on finish
      let user = this.props.userStore.values.currentUser;
      try {
        SlackService.notify('#alerts', 'We have a new User! ' +
                            (user.email ? user.email.value : (user.google? user.google.email : user._id)) +
                            ' in ' + this.props.organisationStore.values.organisation.tag);
      }catch(e) {
        // log
      }

      this.welcomeUser();
      this.setState({ redirectTo: '/' + this.props.commonStore.locale + '/' + this.props.organisationStore.values.orgTag + '/congrats' }, ()=> {this.forceUpdate()});
    } else {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }), () => {this.forceUpdate()});
    }
  };

  welcomeUser = () => {
    this.props.userStore.welcomeCurrentUser(this.props.organisationStore.values.organisation._id);
  }

  shouldComponentUpdate(nextState) {
    if(this.state.showFeedback !== nextState.showFeedback) return true;
    return false;
  }

  handleBack = () => {
    if(this.props.edit) return this.setState({redirectTo: 
      '/' + this.props.commonStore.locale + 
      '/' + this.props.organisationStore.values.orgTag + 
      '/' + this.props.recordStore.values.record.tag }, () => {this.forceUpdate()});

    this.initializeSuggestions(this.state.steps[this.state.activeStep-1])

    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }), () => {this.forceUpdate()});
  };

  getStepComponent(steps, activeStep) {
    switch (steps[activeStep]) {
      case 'intro':
        return OnboardIntro;
      case 'contacts':
        return OnboardContacts;
      // case 'firstWings':
      //   return OnboardFirstWings;
      default:
        return OnboardWings;
    }
  }

  handleSave = async (arrayOfLabels) => {
    this.props.recordStore.setRecordId(this.props.recordStore.values.record._id);
    return await this.props.recordStore.updateRecord(arrayOfLabels).then((record) => {
      //this.props.enqueueSnackbar('Your data has been saved successfully', {variant: 'success'});
      timeoutArray.forEach(tm => { clearTimeout(tm) });
      timeoutArray = [];
      this.setState({ showFeedback: true }, () => {
        timeoutArray.push(setTimeout(() => { this.setState({ showFeedback: false }) }, 2000));
      })
    }).catch((e) => {
      console.error(e);
      this.props.enqueueSnackbar('Your data can\'t be saved, please check the errors', { variant: 'warning' });
    });
  }

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  getNextButtonText = () => {
    if(this.props.edit) return <FormattedMessage id={'onboard.edit.save'}/>
    else if (this.state.activeStep === (this.state.steps.length -1)) return <FormattedMessage id={'onboard.stepperFinish'}/>
    else return <FormattedMessage id={'onboard.stepperNext'}/>
  }

  shouldNextBeHighlighted = (activeStepLabel) => {
    let record = this.props.recordStore.values.record;
    switch (activeStepLabel) {
      case 'intro':
        if(record.intro && record.intro.length > 1 && record.name && record.name.length > 1) return true;
        else return false;
      case 'contacts':
        if(record.links && record.links.length > 0) return true;
        return false;
      case 'firstWings':
        if(record.hashtags && record.hashtags.length > 0) return true;
        return false;
      case 'wings':
        if(record.hashtags && record.hashtags.length > 9) return true;
        return false;
      default:
        return false;
    }
  }

  render() {
    const { theme, classes, edit } = this.props;
    const { organisation, orgTag } = this.props.organisationStore.values;
    const {locale} = this.props.commonStore;
    const { activeStep, steps, canNext, showFeedback, redirectTo } = this.state;
    // let StepComponent = this.getStepComponent(steps, activeStep);
    let wantedUrl = '/' + locale + '/' + (organisation.tag || orgTag) + '/onboard/' + steps[activeStep].replace('#', '%23');
    if (redirectTo && window.location.pathname !== redirectTo) return (<Redirect push to={redirectTo} />);
    return (
      <Grid style={{ height: '100vh' }} item>
        { ( (window.location.pathname !== wantedUrl) && (window.location.pathname !== wantedUrl + '/edit') && !edit ) && (
          <Redirect push to={wantedUrl} />
        )}
        <div style={{ width: '100%', background: '#2B2D3C', borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}>
          <Grid item xs={12} sm={8} md={6} lg={4} style={{ position: 'relative', left: 0, right: 0, margin: 'auto'}} >
            <MobileStepper
              variant="dots"
              steps={3}
              position="static"
              activeStep={(edit ? -1 : Math.min(activeStep, 2))}
              style={{ maxWidth: '100%' }}
              className={classes.root}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={!canNext} 
                        className={classNames(classes.stepperButton, (this.shouldNextBeHighlighted(steps[activeStep]) ? classes.stepperButtonHighlighted : null ))   } >
                  {this.getNextButtonText()}
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={activeStep === 0} className={classes.stepperButton} >
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  <FormattedMessage id={'onboard.stepperBack'}/>
                </Button>
              }
            />
          </Grid>
        </div>

        <VirtualizeSwipeableViews
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          style={{height: 'calc(100vh - 73px)'}}
          disabled={true}
          slideRenderer={(params) => {
            const { index } = params;
            let StepComponent = this.getStepComponent(steps, index);
            return(
              <Grid item style={{ height: '100%' }} key={index} >
                <StepComponent handleSave={this.handleSave} activeStep={activeStep} activeStepLabel={steps[index]} 
                              SuggestionsController={this.props.SuggestionsController} />
              </Grid>
            )
          }}
        >
        </VirtualizeSwipeableViews>



        {showFeedback && (
          <LoaderFeedback
            value={Date.now()}
            style={{
              position: 'fixed',
              bottom: 16,
              zIndex: 999,
              left: 0,
              right: 0,
              margin: 'auto',
              width: 60,
              textAlign: 'center',
            }} />
        )}

      </Grid>
    );
  }
}

export default inject('commonStore', 'recordStore', 'organisationStore', 'userStore')(
  observer(
    withSnackbar(
      withStyles(styles, { withTheme: true })(OnboardStepper)
    )
  )
);
