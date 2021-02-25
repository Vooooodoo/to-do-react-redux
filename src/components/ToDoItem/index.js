import React from 'react';
import styled from 'styled-components';
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
  return (
    <StyledToDoItem onDoubleClick={() => props.onToDoItemDblClick(props.id)}>
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

export default ToDoItem;
