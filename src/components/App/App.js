import React from 'react';
import ToDoItemsContext from '../../contexts/ToDoItemsContext';
import MAX_LENGTH from '../../utils/constants';
import { addDataToLocalStorage, getDataFromLocalStorage } from '../../utils/helpers';
import { store } from '../../store/store'
import Footer from '../Footer';
import GlobalStyle from '../GlobalStyle';
import Header from '../Header';
import Main from '../Main';



// Создадим экшены для изменения данных из текущего состояния,
// это обычный JS объект обладающий специальными свойствами,
// type - строка с уникальным названием экшена
// payload - новое значение "переменной состояния"
const changeName = {
  type: 'CHANGE_NAME',
  payload: 'Romeo',
}

const changeSecondName = {
  type: 'CHANGE_SECOND_NAME',
  payload: 'Andrietti',
}

// Запустим экшн с помощью специального метода dispatch() объекта store,
// в качестве аргумента передадим ему сам экшн, который хотим запустить,
// затем store вызовет функцию reducer
store.dispatch(changeName);
store.dispatch(changeSecondName);

// С помощью метода getState() мы можем получить текущее состояние данных
console.log(store.getState());



class App extends React.Component {
  constructor() {
    super();

    this.state = {
      createInputValue: '',
      isCreateInputMaxLength: false,
      editInputValue: '',
      isEditInputMaxLength: false,
      toDoItems: [],
      radioValue: 'All',
      isAllCompleted: false,
    };
  }

  componentDidMount() {
    const initData = getDataFromLocalStorage();

    this.setState({
      toDoItems: initData ? JSON.parse(initData) : [],
    });
  }

  createNewToDoItemsArr = (key, value, elementId) => {
    const newToDoItems = this.state.toDoItems.map(item => {
      if (elementId === item.id) {
        item[key] = value;
      }

      return item;
    });

    return newToDoItems;
  }

  saveData = (data) => {
    addDataToLocalStorage(data);
    this.setState({
      toDoItems: data,
    });
  }

  setIsAllCompleted = (arr) => {
    const isAllCompleted = arr.every(item => item.isCompleted);

    this.setState({
      isAllCompleted: isAllCompleted,
    });
  }

  handleCreateInputChange = (evt) => {
    if (evt.target.value.length > MAX_LENGTH) {
      this.setState({
        isCreateInputMaxLength: true,
      });
    } else {
      this.setState({
        createInputValue: evt.target.value,
        isCreateInputMaxLength: false,
      });
    }
  }

  handleEditInputChange = (evt) => {
    if (evt.target.value.length > MAX_LENGTH) {
      this.setState({
        isEditInputMaxLength: true,
      });
    } else {
      this.setState({
        editInputValue: evt.target.value,
        isEditInputMaxLength: false,
      });
    }
  }

  handleEnter = (evt) => {
    const trimmedInputValue = this.state.createInputValue.trim();

    if (evt.key === 'Enter' && trimmedInputValue) {
      const id = Date.now();
      const newToDoItem = {
        id,
        text: trimmedInputValue,
        isCompleted: false,
        isEditable: false,
      }
      const newToDoItems = [newToDoItem, ...this.state.toDoItems];

      this.setIsAllCompleted(newToDoItems);
      this.setState({
        createInputValue: '',
        toDoItems: newToDoItems,
        isCreateInputMaxLength: false,
      });
      addDataToLocalStorage(newToDoItems);
    }
  }

  handleCheckbox = (evt, evtTargetId) => {
    const newToDoItems = this.createNewToDoItemsArr('isCompleted', evt.target.checked, evtTargetId);

    this.setIsAllCompleted(newToDoItems);
    this.saveData(newToDoItems);
  }

  handleCheckAll = () => {
    const isAllCompleted = this.state.toDoItems.every(item => item.isCompleted);
    const newToDoItems = this.state.toDoItems.map(item => {
      item.isCompleted = !isAllCompleted;

      return item;
    });

    this.setIsAllCompleted(newToDoItems);
    this.saveData(newToDoItems);
  }

  deleteToDoItem = (evtTargetId) => {
    const newToDoItems = this.state.toDoItems.filter(item => evtTargetId !== item.id);

    this.saveData(newToDoItems);
  }

  handleRadio = (evt) => {
    this.setState({
      radioValue: evt.target.value,
    });
  }

  handleClearCompletedBtn = () => {
    const newToDoItems = this.state.toDoItems.filter(item => !item.isCompleted);

    this.saveData(newToDoItems);
  }

  handleEdetingDblClick = (evtTargetId) => {
    const newToDoItems = this.createNewToDoItemsArr('isEditable', true, evtTargetId);
    const editableText = newToDoItems.find(item => item.isEditable).text;

    this.setState({
      editInputValue: editableText,
    });
    this.saveData(newToDoItems);
  }

  handleInputBlur = (evt, evtTargetId) => {
    if (evt.target.value.trim()) {
      const newToDoItems = this.state.toDoItems.map(item => {
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
      <ToDoItemsContext.Provider value={this.state}>
        <GlobalStyle />
        <Header />
        <Main
          createInputValue={this.state.createInputValue}
          isCreateInputMaxLength={this.state.isCreateInputMaxLength}
          editInputValue={this.state.editInputValue}
          isEditInputMaxLength={this.state.isEditInputMaxLength}
          isAllCompleted={this.state.isAllCompleted}
          toDoItems={this.state.toDoItems}
          onCreateInputChange={this.handleCreateInputChange}
          onEditInputChange={this.handleEditInputChange}
          onKeyDown={this.handleEnter}
          onCheckboxChange={this.handleCheckbox}
          onCheckAllChange={this.handleCheckAll}
          onDelBtnClick={this.deleteToDoItem}
          onToDoItemDblClick={this.handleEdetingDblClick}
          onBlur={this.handleInputBlur}
        />
        {Boolean(this.state.toDoItems.length) && (
          <Footer
            onRadioChange={this.handleRadio}
            onClearCompletedBtnClick={this.handleClearCompletedBtn}
          />
        )}
      </ToDoItemsContext.Provider>
    );
  }
}

export default App;
