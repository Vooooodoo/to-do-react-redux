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
} from '../../store/actions';
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

  deleteToDoItem = (evtTargetId) => {
    const newToDoItems = this.props.store.toDoItems.filter(item => evtTargetId !== item.id);

    this.saveData(newToDoItems);
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <Header />
        <Main
          onKeyDown={this.handleEnter}
          onCheckboxChange={this.handleCheckbox}
          onCheckAllChange={this.handleCheckAll}
          onToDoItemDblClick={this.handleEdetingDblClick}
          onBlur={this.handleInputBlur}
        />
        {Boolean(this.props.store.toDoItems.length) && (
          <Footer
            onRadioChange={this.handleRadio}
            onClearCompletedBtnClick={this.handleClearCompletedBtn}
          />
        )}
      </>
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
