import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Input from '../Input';
import ToDoItem from '../ToDoItem';

const StyledToDoList = styled.ul`
  padding: 0;
  list-style: none;
  margin: 0;
`;

function ToDoList(props) {
  const toDoItems = props.toDoItems;
  const radioValue = props.radioValue;

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
                 onChange={evt => props.onEditInputChange(evt, item.id)}
                 onBlur={props.onBlur}
                 isMaxLength={props.isEditInputMaxLength}
                 isAutofocus
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

const putStateToProps = (state) => {
  return {
    toDoItems: state.toDoItems,
    radioValue: state.radioValue,
  }
}

export default connect(putStateToProps)(ToDoList);
