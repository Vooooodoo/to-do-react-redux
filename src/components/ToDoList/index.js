import React from 'react';
import styled from 'styled-components';
import { ToDoItemsContext } from '../../contexts/ToDoItemsContext';
import Input from '../Input';
import ToDoItem from '../ToDoItem';

const StyledToDoList = styled.ul`
  padding: 0;
  list-style: none;
  margin: 0;
`;

function ToDoList(props) {
  const toDoItems = React.useContext(ToDoItemsContext).toDoItems;
  const radioValue = React.useContext(ToDoItemsContext).radioValue;

  const createRenderArr = () => {
    if (radioValue === 'All') {
      return toDoItems;
    }

    if (radioValue === 'Active') {
      return toDoItems.filter(item => !item.isCompleted);
    }

    if (radioValue === 'Completed') {
      return toDoItems.filter(item => item.isCompleted);
    }

    return toDoItems;
  }

  const renderArr = createRenderArr();

  return (
    <section>
      <StyledToDoList>
        {renderArr.map((item) => (
          item.isEditable
            ? (<Input
                 key={item.id}
                 id={item.id}
                 inputValue={props.inputValue}
                 autofocus={true}
                 onChange={evt => props.onEditInputChange(evt, item.id)}
                 onBlur={props.onBlur}
                 isMaxLength={props.isEditInputMaxLength}
               />)
            : (<ToDoItem
                 key={item.id}
                 id={item.id}
                 text={item.text}
                 isCompleted={item.isCompleted}
                 onCheckboxChange={props.onCheckboxChange}
                 onDelBtnClick={props.onDelBtnClick}
                 onToDoItemDblClick={props.onToDoItemDblClick}
               />)
        ))}
      </StyledToDoList>
    </section>
  );
}

export default ToDoList;
