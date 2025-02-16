import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setCreateInputValue,
  setIsCreateInputMaxLength,
  setToDoItems,
  setIsAllCompleted,
  setHandleEnterStates,
} from '../../store/actions';
import { addDataToLocalStorage } from '../../utils/helpers';
import MAX_LENGTH from '../../utils/constants';
import Input from '../Input';
import ToDoList from '../ToDoList';
import Checkbox from '../Checkbox';

function Main(props) {
  const saveData = (dataArr) => {
    props.setToDoItems(dataArr);
    addDataToLocalStorage(dataArr);
  }

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

      props.setHandleEnterStates({
        isAllCompleted,
        createInputValue: '',
        isCreateInputMaxLength: false,
      });
      saveData(newToDoItems);
    }
  }

  const handleCheckAll = () => {
    const isAllCompleted = props.toDoItems.every(item => item.isCompleted);
    const newToDoItems = props.toDoItems.map(item => {
      item.isCompleted = !isAllCompleted;

      return item;
    });
    const isNewItemsCompleted = newToDoItems.every(item => item.isCompleted);

    props.setIsAllCompleted(isNewItemsCompleted);
    saveData(newToDoItems);
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
            onCheckboxChange={handleCheckAll}
            isChecked={props.isAllCompleted}
          />
        )}
      </Input>
      <ToDoList />
    </main>
  );
}

const mapStateToProps = (state) => ({
  createInputValue: state.createInputValue,
  isCreateInputMaxLength: state.isCreateInputMaxLength,
  toDoItems: state.toDoItems,
  isAllCompleted: state.isAllCompleted,
});

const mapActionCreatorsToProps = (dispatch) => ({
  setCreateInputValue: bindActionCreators(setCreateInputValue, dispatch),
  setIsCreateInputMaxLength: bindActionCreators(setIsCreateInputMaxLength, dispatch),
  setToDoItems: bindActionCreators(setToDoItems, dispatch),
  setIsAllCompleted: bindActionCreators(setIsAllCompleted, dispatch),
  setHandleEnterStates: bindActionCreators(setHandleEnterStates, dispatch),
});

export default connect(mapStateToProps, mapActionCreatorsToProps)(Main);
