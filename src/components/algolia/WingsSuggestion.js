import React from 'react'
import { withStyles, Button, Hidden, Typography } from '@material-ui/core';
import { inject, observer } from "mobx-react";
import classNames from 'classnames';
import { observe } from 'mobx';
import Wings from '../utils/wing/Wing';
import ProfileService from '../../services/profile.service';
import { styles } from './WingsSuggestion.css.js';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import './WingsSuggestion.css';
import {FormattedMessage} from "react-intl";
import TransparentGradientBox from '../utils/fields/TransparentGradientBox'

let interval;
let interval2;

class WingsSuggestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: this.props.SuggestionsController.getCurrentSuggestions(),
      bank: [],
      renderComponent: false,
      shouldUpdate: false,
      observer: ()=> {},
      scrollableClass: Math.floor(Math.random() * 99999),
      onlyViewport: true,
      offsetSuggestionsIndex: 0,
      locale: this.props.commonStore.getCookie('locale') || this.props.commonStore.locale,
    };
  }

  componentDidMount() {
    observe(this.props.suggestionsController, '_observeUpdate', (change) => {
      this.setState({suggestions: this.props.suggestionsController._currentSuggestions, shouldUpdate: true});
    });
  }

  componentWillUnmount() {
    this.state.observer();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ( (nextState.shouldUpdate || (!this.state.renderComponent && nextState.renderComponent)) && !nextState.animationInProgress ) {
      this.setState({shouldUpdate: false});
      return true;
    }
    return false;
  }

  handleSelectSuggestion = (e, element, index) => {
    this.props.handleAddWing(e, element);
    let elt = e.currentTarget.parentNode;
    let eltChild = e.currentTarget;
    eltChild.classList.add(this.props.classes.suggestionSelected);

    this.setState({animationInProgress: true}, () => {
      setTimeout(() => {
        elt.classList.add(this.props.classes.animateOut);
      }, 50)

      setTimeout(() => {
        eltChild.classList.remove(this.props.classes.suggestionSelected)
        eltChild.blur();
        this.props.suggestionsController.makeNewSuggestions(element, index)
        .then(() => {
          this.setState({suggestions: this.props.suggestionsController.getCurrentSuggestions(), shouldUpdate: true, animationInProgress: false}, () => {
            elt.classList.remove(this.props.classes.animateOut);
          });
        })
      }, 375);
    });
  }

  handleMouseDown = (e) => {
    var elt = e.currentTarget;
    elt.style.transition = 'none';
    elt.style.setProperty('background', this.props.theme.palette.secondary.main, 'important');
    elt.style.setProperty('color', 'white');
  }

  handleMouseUp = (e) => {
    var elt = e.currentTarget;
    elt.style.transition = 'none';
    elt.style.setProperty('background', '');
    elt.style.setProperty('color', this.props.theme.palette.primary.dark);
  }

  reduceElt = async (elt) => {
    var initWidth = elt.offsetWidth;
    return new Promise((resolve, reject) => {
      var currentInterval = setInterval(() => {
        initWidth = Math.max(0, initWidth-4);
        elt.style.width = initWidth +'px' ;
        if(elt.style.width === 0+'px' || !elt.style.width){
          clearInterval(currentInterval);
          resolve();
        }
      }, 5);
    });
  }

  shouldDisplaySuggestion = (tag) => (!this.props.recordStore.values.record.hashtags.some(hashtag => hashtag.tag === tag));

  getDisplayedName = (hit) => (hit.name_translated ? (hit.name_translated[this.state.locale] || hit.name_translated['en-UK']) || hit.name || hit.tag : hit.name || hit.tag);

  isNewSuggestions = (tag) => {
    let indexOf = this.props.suggestionsController._newSuggestions.all.findIndex(suggestion => suggestion.tag === tag);
    // console.log('index of ' + tag + ' is ' + indexOf);
    return (indexOf > -1);
  }

  renderWing = (classes, hit, i) => {
    return (
      <li key={i} className={classNames(classes.suggestion, (this.isNewSuggestions(hit.tag) ? classes.animateIn : null))} style={{animationDelay: ((i-this.state.offsetSuggestionsIndex)*0.05) +'s'}} id={hit.tag}>
        <Wings  src={ProfileService.getPicturePath(hit.picture)}
          label={ProfileService.htmlDecode(this.getDisplayedName(hit))}
          onClick={(e) => this.handleSelectSuggestion(e, { name: hit.name || hit.tag, tag: hit.tag }, i)}
          onMouseDown={(e) => this.handleMouseDown(e)}
          onMouseUp={(e) => this.handleMouseUp(e)}
          onBlur={(e) => this.handleMouseUp(e)}
          className={'suggestionWing'} />
      </li>
    );
  }

  renderWingsList = (suggestions, classes, isEven) => {
    let suggestionsDisplayed = (isEven ? suggestions.even : suggestions.odd);
    return (
      <ul className={classNames(classes.suggestionList, "scrollX")}>
      {suggestionsDisplayed && suggestionsDisplayed.map((hit, i) => {
        return hit ? this.renderWing(classes, hit, i) : null;
      })}
    </ul>
    );
  }

  scrollToSuggestion = (scrollLeft) => {
    var elt = window.document.getElementsByClassName(this.state.scrollableClass)[0];
    var initialScrollLeft = elt.scrollLeft
    var suggestionInterval = window.setInterval(function() {
      var scroll1, scroll2;
      if(initialScrollLeft > scrollLeft) {
        scroll1 = elt.scrollLeft;
        elt.scrollLeft -= 4;
        scroll2 = elt.scrollLeft;
        if((elt.scrollLeft <= scrollLeft) || (elt.scrollLeft === elt.scrollWidth) || scroll1 === scroll2) clearInterval(suggestionInterval);
      } else {
        scroll1 = elt.scrollLeft;
        elt.scrollLeft += 4;
        scroll2 = elt.scrollLeft;
        if((elt.scrollLeft >= scrollLeft) || (elt.scrollLeft === elt.scrollWidth) || scroll2 === scroll1) clearInterval(suggestionInterval);
      }
    }, 5);
  }

  scrollRight = () => {
    interval = window.setInterval(function() {
      window.document.getElementsByClassName(this.state.scrollableClass)[0].scrollLeft += 2;
    }.bind(this), 5);
  }

  scrollLeft = () => {
    interval2 = window.setInterval(function() {
      window.document.getElementsByClassName(this.state.scrollableClass)[0].scrollLeft -= 2;
    }.bind(this), 5);
  }

  scrollStop =() => {
    clearInterval(interval);
    clearInterval(interval2);
  }

  /**
   * Check if an element is in viewport
   *
   * @param {number} [offset]
   * @returns {boolean}
   */
  isInViewport = (offset = 0) => {
    if (!this.elementNode) return false;
    const left = this.elementNode.getBoundingClientRect().left;
    return (left + offset) >= 0 && (left - offset) <= window.innerWidth;
  }


  render() {
    const { classes } = this.props;
    const { suggestions, scrollableClass } = this.state;

    return (
      <div ref={(el) => {this.elementNode = el}}>
        <Hidden xsDown>
          <Typography variant="subtitle2" style={{padding: 16, paddingBottom:0}} ><FormattedMessage id={'wingsSuggestions'}/></Typography>
        </Hidden>
        <div style={{position:'relative', height: 126}}>
        <Hidden smDown>
          <Button className={classNames(classes.scrollLeft, classes.scrollButton)} onMouseDown={this.scrollLeft} onMouseUp={this.scrollStop} variant="outlined">
            <ArrowLeft fontSize="inherit" />
          </Button>
          <Button className={classNames(classes.scrollRight, classes.scrollButton)} onMouseDown={this.scrollRight} onMouseUp={this.scrollStop} variant="outlined">
            <ArrowRight fontSize="inherit" />
          </Button>
        </Hidden>
        <Hidden xsDown>
          <TransparentGradientBox position='left'/>
          <TransparentGradientBox position='right'/>
        </Hidden>
        <div className={classNames(classes.suggestionsContainer, ''+scrollableClass)} >
          {this.renderWingsList(suggestions, classes, true)}
          {this.renderWingsList(suggestions, classes, false)}
        </div>
      </div>
      </div>
    );
  }
}

export default inject('commonStore', 'recordStore', 'organisationStore', 'suggestionsController')(
  observer(
    withStyles(styles, {withTheme: true})(WingsSuggestions)
  )
);
