import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setCreateInputValue,
  setIsCreateInputMaxLength,
  setToDoItems,
  setIsAllCompleted,
} from '../../store/actions';
import { addDataToLocalStorage } from '../../utils/helpers';
import MAX_LENGTH from '../../utils/constants';
import Input from '../Input';
import ToDoList from '../ToDoList';
import Checkbox from '../Checkbox';

function Main(props) {
  const handleCreateInputChange = (evt) => {
    if (evt.target.value.length > MAX_LENGTH) {
      props.setIsCreateInputMaxLength(true);
    } else {
      props.setCreateInputValue(evt.target.value);
      props.setIsCreateInputMaxLength(false);
    }
  }

  const handleEnter = (evt) => {
    const trimmedInputValue = props.createInputValue.trim();

    if (evt.key === 'Enter' && trimmedInputValue) {
      const id = Date.now();
      const newToDoItem = {
        id,
        text: trimmedInputValue,
        isCompleted: false,
        isEditable: false,
      }
      const newToDoItems = [newToDoItem, ...props.toDoItems];
      const isAllCompleted = newToDoItems.every(item => item.isCompleted);

      props.setIsAllCompleted(isAllCompleted);
      props.setCreateInputValue('');
      props.setIsCreateInputMaxLength(false);
      props.setToDoItems(newToDoItems);
      addDataToLocalStorage(newToDoItems);
    }
  }

  return (
    <main>
      <Input
        inputValue={props.createInputValue}
        isMaxLength={props.isCreateInputMaxLength}
        placeholder="What needs to be done?"
        onChange={handleCreateInputChange}
        onKeyDown={handleEnter}
      >
        {Boolean(props.toDoItems.length) && (
          <Checkbox
            onCheckboxChange={props.onCheckAllChange}
            isChecked={props.isAllCompleted}
          />
        )}
      </Input>
      <ToDoList
        onCheckboxChange={props.onCheckboxChange}
        onToDoItemDblClick={props.onToDoItemDblClick}
      />
    </main>
  );
}

const putStateToProps = (state) => {
  return {
    createInputValue: state.createInputValue,
    isCreateInputMaxLength: state.isCreateInputMaxLength,
    toDoItems: state.toDoItems,
    isAllCompleted: state.isAllCompleted,
  }
}

const putActionCreatorsToProps = (dispatch) => {
  return {
    setCreateInputValue: bindActionCreators(setCreateInputValue, dispatch),
    setIsCreateInputMaxLength: bindActionCreators(setIsCreateInputMaxLength, dispatch),
    setToDoItems: bindActionCreators(setToDoItems, dispatch),
    setIsAllCompleted: bindActionCreators(setIsAllCompleted, dispatch),
  }
}

export default connect(putStateToProps, putActionCreatorsToProps)(Main);
