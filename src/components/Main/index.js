import React from 'react';
import Input from '../Input';
import ToDoList from '../ToDoList';
import Checkbox from '../Checkbox';

function Main(props) {
  return (
    <main>
      <Input
        inputValue={props.createInputValue}
        isMaxLength={props.isCreateInputMaxLength}
        placeholder="What needs to be done?"
        onChange={props.onCreateInputChange}
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
        inputValue={props.editInputValue}
        isEditInputMaxLength={props.isEditInputMaxLength}
        onEditInputChange={props.onEditInputChange}
        onCheckboxChange={props.onCheckboxChange}
        onDelBtnClick={props.onDelBtnClick}
        onToDoItemDblClick={props.onToDoItemDblClick}
        onBlur={props.onBlur}
      />
    </main>
  );
}

export default Main;
