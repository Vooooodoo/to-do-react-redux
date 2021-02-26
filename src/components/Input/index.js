import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setEditInputValue,
  setIsEditInputMaxLength,
  setToDoItems,
} from '../../store/actions';
import { addDataToLocalStorage } from '../../utils/helpers';

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
  const handleInputBlur = (evt, evtTargetId) => {
    if (evt.target.value.trim()) {
      const newToDoItems = props.toDoItems.map(item => {
        if (evtTargetId === item.id) {
          item.text = evt.target.value;
          item.isEditable = false;
        }

        return item;
      });

      addDataToLocalStorage(newToDoItems);
      props.setToDoItems(newToDoItems);
    } else {
      const newToDoItems = props.toDoItems.filter(item => evtTargetId !== item.id);

      addDataToLocalStorage(newToDoItems);
      props.setToDoItems(newToDoItems);
    }
  }

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
        onBlur={evt => handleInputBlur(evt, props.id)}
      />
      {props.isMaxLength && (
        <ValidationMessage>{`${props.inputValue.length} characters limit`}</ValidationMessage>
      )}
    </Section>
  );
}

const putStateToProps = (state) => {
  return {
    toDoItems: state.toDoItems,
  }
}

const putActionCreatorsToProps = (dispatch) => {
  return {
    setToDoItems: bindActionCreators(setToDoItems, dispatch),
  }
}

export default connect(putStateToProps, putActionCreatorsToProps)(Input);
