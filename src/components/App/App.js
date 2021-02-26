import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setToDoItems,
} from '../../store/actions';
import { getDataFromLocalStorage } from '../../utils/helpers';
import Footer from '../Footer';
import GlobalStyle from '../GlobalStyle';
import Header from '../Header';
import Main from '../Main';

class App extends React.Component {
  componentDidMount() {
    const initData = getDataFromLocalStorage();

    this.props.setToDoItems(initData ? JSON.parse(initData) : []);
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <Header />
        <Main />
        {Boolean(this.props.toDoItems.length) && (
          <Footer />
        )}
      </>
    );
  }
}

const putStateToProps = (state) => {
  return {
    toDoItems: state.toDoItems,
  }
}

const putActionCreatorsToProps = (dispatch) => {
  return {
    setToDoItems: bindActionCreators(setToDoItems, dispatch),
  }
}

export default connect(putStateToProps, putActionCreatorsToProps)(App);
