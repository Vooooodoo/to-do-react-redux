import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setCreateInputValue,
  setIsCreateInputMaxLength,
  setEditInputValue,
  setIsEditInputMaxLength,
  setToDoItems,
  setRadioValue,
  setIsAllCompleted,
} from '../../store/actions'
import ToDoItemsContext from '../../contexts/ToDoItemsContext';
import MAX_LENGTH from '../../utils/constants';
import { addDataToLocalStorage, getDataFromLocalStorage } from '../../utils/helpers';
import Footer from '../Footer';
import GlobalStyle from '../GlobalStyle';
import Header from '../Header';
import Main from '../Main';

class App extends React.Component {
  componentDidMount() {
    const initData = getDataFromLocalStorage();

    this.props.setToDoItems(initData ? JSON.parse(initData) : []);
  }

  createNewToDoItemsArr = (key, value, elementId) => {
    const newToDoItems = this.props.store.toDoItems.map(item => {
      if (elementId === item.id) {
        item[key] = value;
      }

      return item;
    });

    return newToDoItems;
  }

  saveData = (data) => {
    addDataToLocalStorage(data);
    this.props.setToDoItems(data);
  }

  setIsAllCompleted = (arr) => {
    const isAllCompleted = arr.every(item => item.isCompleted);

    this.props.setIsAllCompleted(isAllCompleted);
  }

  handleCreateInputChange = (evt) => {
    if (evt.target.value.length > MAX_LENGTH) {
      this.props.setIsCreateInputMaxLength(true);
    } else {
      this.props.setCreateInputValue(evt.target.value);
      this.props.setIsCreateInputMaxLength(false);
    }
  }

  handleEditInputChange = (evt) => {
    if (evt.target.value.length > MAX_LENGTH) {
      this.props.setIsEditInputMaxLength(true);
    } else {
      this.props.setEditInputValue(evt.target.value);
      this.props.setIsEditInputMaxLength(false);
    }
  }

  handleEnter = (evt) => {
    const trimmedInputValue = this.props.store.createInputValue.trim();

    if (evt.key === 'Enter' && trimmedInputValue) {
      const id = Date.now();
      const newToDoItem = {
        id,
        text: trimmedInputValue,
        isCompleted: false,
        isEditable: false,
      }
      const newToDoItems = [newToDoItem, ...this.props.store.toDoItems];

      this.setIsAllCompleted(newToDoItems);
      this.props.setCreateInputValue('');
      this.props.setToDoItems(newToDoItems);
      this.props.setIsCreateInputMaxLength(false);
      addDataToLocalStorage(newToDoItems);
    }
  }

  handleCheckbox = (evt, evtTargetId) => {
    const newToDoItems = this.createNewToDoItemsArr('isCompleted', evt.target.checked, evtTargetId);

    this.setIsAllCompleted(newToDoItems);
    this.saveData(newToDoItems);
  }

  handleCheckAll = () => {
    const isAllCompleted = this.props.store.toDoItems.every(item => item.isCompleted);
    const newToDoItems = this.props.store.toDoItems.map(item => {
      item.isCompleted = !isAllCompleted;

      return item;
    });

    this.setIsAllCompleted(newToDoItems);
    this.saveData(newToDoItems);
  }

  deleteToDoItem = (evtTargetId) => {
    const newToDoItems = this.props.store.toDoItems.filter(item => evtTargetId !== item.id);

    this.saveData(newToDoItems);
  }

  handleRadio = (evt) => {
    this.props.setRadioValue(evt.target.value);
  }

  handleClearCompletedBtn = () => {
    const newToDoItems = this.props.store.toDoItems.filter(item => !item.isCompleted);

    this.saveData(newToDoItems);
  }

  handleEdetingDblClick = (evtTargetId) => {
    const newToDoItems = this.createNewToDoItemsArr('isEditable', true, evtTargetId);
    const editableText = newToDoItems.find(item => item.isEditable).text;

    this.props.setEditInputValue(editableText);
    this.saveData(newToDoItems);
  }

  handleInputBlur = (evt, evtTargetId) => {
    if (evt.target.value.trim()) {
      const newToDoItems = this.props.store.toDoItems.map(item => {
        if (evtTargetId === item.id) {
          item.text = evt.target.value;
          item.isEditable = false;
        }

        return item;
      });

      this.saveData(newToDoItems);
    } else {
      this.deleteToDoItem(evtTargetId);
    }
  }

  render() {
    return (
      <ToDoItemsContext.Provider value={this.props.store}>
        <GlobalStyle />
        <Header />
        <Main
          createInputValue={this.props.store.createInputValue}
          isCreateInputMaxLength={this.props.store.isCreateInputMaxLength}
          editInputValue={this.props.store.editInputValue}
          isEditInputMaxLength={this.props.store.isEditInputMaxLength}
          isAllCompleted={this.props.store.isAllCompleted}
          toDoItems={this.props.store.toDoItems}
          onCreateInputChange={this.handleCreateInputChange}
          onEditInputChange={this.handleEditInputChange}
          onKeyDown={this.handleEnter}
          onCheckboxChange={this.handleCheckbox}
          onCheckAllChange={this.handleCheckAll}
          onDelBtnClick={this.deleteToDoItem}
          onToDoItemDblClick={this.handleEdetingDblClick}
          onBlur={this.handleInputBlur}
        />
        {Boolean(this.props.store.toDoItems.length) && (
          <Footer
            onRadioChange={this.handleRadio}
            onClearCompletedBtnClick={this.handleClearCompletedBtn}
          />
        )}
      </ToDoItemsContext.Provider>
    );
  }
}

const putStateToProps = (state) => {
  return {
    store: state,
  }
}

const putActionCreatorsToProps = (dispatch) => {
  return {
    setCreateInputValue: bindActionCreators(setCreateInputValue, dispatch),
    setIsCreateInputMaxLength: bindActionCreators(setIsCreateInputMaxLength, dispatch),
    setEditInputValue: bindActionCreators(setEditInputValue, dispatch),
    setIsEditInputMaxLength: bindActionCreators(setIsEditInputMaxLength, dispatch),
    setToDoItems: bindActionCreators(setToDoItems, dispatch),
    setRadioValue: bindActionCreators(setRadioValue, dispatch),
    setIsAllCompleted: bindActionCreators(setIsAllCompleted, dispatch),

  }
}

export default connect(putStateToProps, putActionCreatorsToProps)(App);
