import React from 'react'
import {inject, observer} from "mobx-react";
import {withStyles, Grid, TextField, InputAdornment, IconButton} from '@material-ui/core';
import {Clear} from '@material-ui/icons';
import AddContactField from '../../utils/fields/AddContactField';


class OnboardContacts extends React.Component {
  constructor(props) {
    super(props);
    this.setDefaultLinks();
  }
  
  handleChange = (e, field) => {
    let record = this.props.recordStore.values.record;
    record[field] = e.target.value;
    this.props.recordStore.setRecord(record);
    this.forceUpdate(); // why component do not update auto like Login fields ?
  }
  
  deleteLink = (infoToBeDeleted) => {
    this.props.recordStore.values.record.links = this.props.recordStore.values.record.links.filter(item => {
      return item._id !== infoToBeDeleted
    })
    this.forceUpdate();
  }
  
  getLinkByType = (typeWanted) => {
    return (this.props.recordStore.values.record.links.find(link => link.type === typeWanted));
  }
  
  setDefaultLinks = () => {
    let types = ['linkedin', 'email', 'phone']
    for (let type of types) {
      if (!this.getLinkByType(type)) {
        this.props.recordStore.values.record.links.push({"type": type, "value": ""});
        this.props.handleSave(['links']);
      }
    }
  };
  
  render() {
    const data = this.props.recordStore.values.record.links;
    
    return (
      <Grid container item xs={12} sm={6} lg={4} direction="column" spacing={16}>
        {data.map((info, i) => {
          return (
            <Grid container item key={i}>
              <TextField
                label={info.type}
                fullWidth
                type="text"
                variant={"outlined"}
                value={info.value}
                onChange={(e) => this.handleChange(e, 'intro')}
                onBlur={(e) => this.props.handleSave(['links'])}
                placeholder={info.type}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {info.type === 'email' ? <i className="fa fa-envelope"/> : <i className={`fa fa-${info.type}`}/>}
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <IconButton position="end" onClick={() => {
                      this.deleteLink(info._id)
                    }}>
                      <Clear fontSize="default"/>
                    </IconButton>
                  )
                }}
              />
            </Grid>
          )
        })}
        <Grid item>
          <AddContactField style={{position: 'relative'}} parent={this}/>
        </Grid>
      </Grid>
    );
  }
}

export default inject('commonStore', 'recordStore')(
  observer(
    withStyles(null)(OnboardContacts)
  )
);
