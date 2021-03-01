import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setToDoItems,
  setIsAllCompleted,
} from '../../store/actions';
import { getDataFromLocalStorage } from '../../utils/helpers';
import Footer from '../Footer';
import GlobalStyle from '../GlobalStyle';
import Header from '../Header';
import Main from '../Main';

class App extends React.Component {
  componentDidMount() {
    const initData = getDataFromLocalStorage();
    const parsedInitData = JSON.parse(initData);
    const isAllCompleted = parsedInitData.every(item => item.isCompleted);

    this.props.setToDoItems(initData ? parsedInitData : []);
    this.props.setIsAllCompleted(isAllCompleted);
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

const putStateToProps = (state) => ({
  toDoItems: state.toDoItems,
});

const putActionCreatorsToProps = (dispatch) => ({
  setToDoItems: bindActionCreators(setToDoItems, dispatch),
  setIsAllCompleted: bindActionCreators(setIsAllCompleted, dispatch),
});

export default connect(putStateToProps, putActionCreatorsToProps)(App);
