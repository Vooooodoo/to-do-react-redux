import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRadioValue } from '../../store/actions';

const StyledRadio = styled.input`
  margin: 0;
  cursor: pointer;
  width: 15px;
  height: 15px;
`;

const StyledLabel = styled.label`
  cursor: pointer;
  padding-left: 5px;
  margin-right: 15px;
  font-size: 16px;
  color: black;

  :last-of-type {
    margin-right: 0;
  }
`;

function Radio(props) {
  const handleRadio = (evt) => {
    props.setRadioValue(evt.target.value);
  }

  return (
    <>
      <StyledRadio
        id={props.id}
        defaultChecked={props.isChecked}
        type="radio"
        name="to-do-items"
        value={props.text}
        onChange={handleRadio}
      />
      <StyledLabel htmlFor={props.id}>{props.text}</StyledLabel>
    </>
  );
}

const mapActionCreatorsToProps = (dispatch) => ({
  setRadioValue: bindActionCreators(setRadioValue, dispatch),
});

export default connect(null, mapActionCreatorsToProps)(Radio);
