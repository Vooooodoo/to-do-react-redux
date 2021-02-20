import React from 'react';
import styled from 'styled-components';

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
  return (
    <>
      <StyledRadio
        id={props.id}
        defaultChecked={props.isChecked}
        type="radio"
        name="to-do-items"
        value={props.text}
        onChange={props.onRadioChange}
      />
      <StyledLabel htmlFor={props.id}>{props.text}</StyledLabel>
    </>
  );
}

export default Radio;
