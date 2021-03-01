import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setIsAllCompleted,
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
  const handleCheckbox = (evt, evtTargetId) => {
    const newToDoItems = props.toDoItems.map(item => {
      if (evtTargetId === item.id) {
        item.isCompleted = evt.target.checked;
      }

      return item;
    });
    const isAllCompleted = newToDoItems.every(item => item.isCompleted);

    props.setIsAllCompleted(isAllCompleted);
    props.setToDoItems(newToDoItems);
    addDataToLocalStorage(newToDoItems);
  }

  return (
    <StyledToDoItem onDoubleClick={() => props.onEdetingDblClick(props.id)}>
      <ToDoText isCompleted={props.isCompleted}>{props.text}</ToDoText>
      <Checkbox
        toDoItemId={props.id}
        isChecked={props.isCompleted}
        onCheckboxChange={handleCheckbox}
      />
      <DeleteButton
        toDoItemId={props.id}
      />
    </StyledToDoItem>
  );
}

const mapStateToProps = (state) => ({
  toDoItems: state.toDoItems,
});

const mapActionCreatorsToProps = (dispatch) => ({
  setIsAllCompleted: bindActionCreators(setIsAllCompleted, dispatch),
  setToDoItems: bindActionCreators(setToDoItems, dispatch),
});

export default connect(mapStateToProps, mapActionCreatorsToProps)(ToDoItem);
