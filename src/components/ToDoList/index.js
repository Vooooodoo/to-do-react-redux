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
import MAX_LENGTH from '../../utils/constants';
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

  const handleEditInputChange = (evt) => {
    if (evt.target.value.length > MAX_LENGTH) {
      props.setIsEditInputMaxLength(true);
    } else {
      props.setEditInputValue(evt.target.value);
      props.setIsEditInputMaxLength(false);
    }
  }

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
    <section>
      <StyledToDoList>
        {renderArr.map((item) => (
          item.isEditable
            ? (<Input
                 key={item.id}
                 id={item.id}
                 inputValue={props.editInputValue}
                 isMaxLength={props.isEditInputMaxLength}
                 onChange={handleEditInputChange}
                 isAutofocus
               />)
            : (<ToDoItem
                 key={item.id}
                 id={item.id}
                 text={item.text}
                 isCompleted={item.isCompleted}
                 onEdetingDblClick={handleEdetingDblClick}
               />)
        ))}
      </StyledToDoList>
    </section>
  );
}

const putStateToProps = (state) => {
  return {
    editInputValue: state.editInputValue,
    isEditInputMaxLength: state.isEditInputMaxLength,
    toDoItems: state.toDoItems,
    radioValue: state.radioValue,
  }
}

const putActionCreatorsToProps = (dispatch) => {
  return {
    setEditInputValue: bindActionCreators(setEditInputValue, dispatch),
    setIsEditInputMaxLength: bindActionCreators(setIsEditInputMaxLength, dispatch),
    setToDoItems: bindActionCreators(setToDoItems, dispatch),
  }
}

export default connect(putStateToProps, putActionCreatorsToProps)(ToDoList);
