import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  height: 65px;
  box-sizing: border-box;
  font-size: 24px;
  padding: 0 15px;
  border: none;
  margin-bottom: 1px;
  outline-color: ${props => props.isMaxLength ? '#af1045' : 'black'};
  color: ${props => props.isMaxLength ? '#af1045' : 'black'};
`;

const ValidationMessage = styled.p`
  margin: 10px 0;
  padding-left: 15px;
`;

function Input(props) {
  return (
    <section>
      <StyledInput
        type="text"
        autoFocus={props.autofocus}
        placeholder={props.placeholder}
        value={props.inputValue}
        isMaxLength={props.isMaxLength}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        onBlur={evt => props.onBlur(evt, props.id)}
      />
      {props.isMaxLength && (
        <ValidationMessage>{`${props.inputValue.length} characters limit`}</ValidationMessage>
      )}
    </section>
  );
}

export default Input;
