import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 65px;
  box-sizing: border-box;
  font-size: 24px;
  padding: 0 15px;
  padding-left: 57px;
  border: none;
  margin-bottom: 1px;
  outline-color: ${props => props.isMaxLength ? '#af1045' : 'black'};
  color: ${props => props.isMaxLength ? '#af1045' : 'black'};

  @media all and (max-width: 424px) {
    font-size: 20px;
  }
`;

const ValidationMessage = styled.p`
  margin: 10px 0;
  padding-left: 15px;
`;

function Input(props) {
  return (
    <Section>
      {props.children}
      <StyledInput
        type="text"
        autoFocus={props.isAutofocus}
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
    </Section>
  );
}

export default Input;
