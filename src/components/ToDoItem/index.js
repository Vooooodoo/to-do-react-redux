import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setEditInputValue,
  setToDoItems,
} from '../../store/actions';
import { addDataToLocalStorage } from '../../utils/helpers';

import Checkbox from '../Checkbox';
import DeleteButton from '../DeleteButton';

const StyledToDoItem = styled.li`
  position: relative;

  :hover .del-btn {
    opacity: 1;
  }
`

const ToDoText = styled.p`
  background-color: white;
  margin: 0 0 1px;
  min-height: 65px;
  color: black;
  font-size: 24px;
  padding: 15px;
  padding-left: 57px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: ${props => props.isCompleted ? 'line-through' : 'none'};
`;

function ToDoItem(props) {
  const handleEdetingDblClick = (evtTargetId) => {
    const newToDoItems = props.toDoItems.map(item => {
      if (evtTargetId === item.id) {
        item.isEditable = true;
      }

      return item;
    });
    const editableText = newToDoItems.find(item => item.isEditable).text;

    props.setEditInputValue(editableText);
    props.setToDoItems(newToDoItems);
    addDataToLocalStorage(newToDoItems);
  }

  return (
    <StyledToDoItem onDoubleClick={() => handleEdetingDblClick(props.id)}>
      <ToDoText isCompleted={props.isCompleted}>{props.text}</ToDoText>
      <Checkbox
        toDoItemId={props.id}
        isChecked={props.isCompleted}
        onCheckboxChange={props.onCheckboxChange}
      />
      <DeleteButton
        toDoItemId={props.id}
      />
    </StyledToDoItem>
  );
}

const putStateToProps = (state) => {
  return {
    toDoItems: state.toDoItems,
  }
}

const putActionCreatorsToProps = (dispatch) => {
  return {
    setEditInputValue: bindActionCreators(setEditInputValue, dispatch),
    setToDoItems: bindActionCreators(setToDoItems, dispatch),
  }
}

export default connect(putStateToProps, putActionCreatorsToProps)(ToDoItem);
