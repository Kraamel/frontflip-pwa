import React from 'react';
import './SearchField.css';
import { Chip } from '@material-ui/core';
import ProfileService from '../../services/profile.service';
import defaultPicture from '../../resources/images/placeholder_person.png';

export const MultiValueContainer = (props) => {
  return (
    <Chip label={props.children} color="primary" onClick={props.onClick} className={'editableChip'} />
  );
};

export const Option = props => {
  const { innerProps } = props;
  return (
    <div {...innerProps} className="custom-option">
      <div className="custom-option-main">
        {props.data.picturePath && (
          <img alt="img-logo" src={props.data.picturePath ||
            (ProfileService.getProfileType(props.data.value) === 'person' ? 
              (process.env.NODE_ENV === 'production' ? 'https://' : 'http://') +window.location.host + defaultPicture : 
              null) } 
              className="custom-option-img" />
        )}
        <span dangerouslySetInnerHTML={{__html: props.data.label}} className="custom-option-label"></span>
      </div>
      { (props.data.value && ProfileService.getProfileType(props.data.value)) && (
        <div className="custom-option-secondary">
          {props.data.value}
        </div>
      )}
    </div>
  );
};

export const customStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: '30px',
    boxSizing: 'border-box',
    border: state.isFocused ? "2px solid #FF0018" : "1px solid #FF0018",
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      borderColor: state.isFocused ? "#FF0018" : "#FF0018",
      boxSizing: 'border-box'
    },
    padding: '2px 16px',
    minHeight: 48,
    maxHeight: 48,
    fontSize: 16
  }),
  menu: base => ({
    ...base,
    borderRadius: '30px',
    overflow: 'hidden',
    hyphens: "auto",
    textAlign: "center",
    // prevent menu to scroll y
    wordWrap: "break-word",

  }),
  menuList: base => ({
    ...base,
    padding: 0,
  }),
  input: base => ({
    ...base,
    padding: 0,
    marginLeft: 8,
  }),
  multiValue: base => ({
    ...base,
    display: 'inline-block',
  }),
  placeholder: base => ({
    ...base,
    marginLeft: 8,
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: '0 !important',
    margin: 0,
    marginLeft: 0,
    overflowY: 'hidden',
    overflow: 'auto',
    wordWrap: 'white-space',
    WebkitFlexWrap: 'unset !important',
    flexWrap: 'unset !important',
    MsFlexWrap: 'unset !important',
    maxHeight: 42,
    scrollbarWidth: 'thin',
    '&:last-child': {
      marginBottom: 8,
    },
  }),
};
