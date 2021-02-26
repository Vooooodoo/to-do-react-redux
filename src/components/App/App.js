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

  saveData = (data) => {
    addDataToLocalStorage(data);
    this.props.setToDoItems(data);
  }

  changeIsAllCompleted = (arr) => {
    const isAllCompleted = arr.every(item => item.isCompleted);

    this.props.setIsAllCompleted(isAllCompleted);
  }

  handleCheckAll = () => {
    const isAllCompleted = this.props.store.toDoItems.every(item => item.isCompleted);
    const newToDoItems = this.props.store.toDoItems.map(item => {
      item.isCompleted = !isAllCompleted;

      return item;
    });

    this.changeIsAllCompleted(newToDoItems);
    this.saveData(newToDoItems);
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <Header />
        <Main
          onCheckAllChange={this.handleCheckAll}
        />
        {Boolean(this.props.store.toDoItems.length) && (
          <Footer />
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
