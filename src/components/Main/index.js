import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setCreateInputValue,
  setIsCreateInputMaxLength,
} from '../../store/actions';
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

  return (
    <main>
      <Input
        inputValue={props.createInputValue}
        isMaxLength={props.isCreateInputMaxLength}
        placeholder="What needs to be done?"
        onChange={handleCreateInputChange}
        onKeyDown={props.onKeyDown}
        onBlur={props.onBlur}
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
        onBlur={props.onBlur}
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
  }
}

export default connect(putStateToProps, putActionCreatorsToProps)(Main);
