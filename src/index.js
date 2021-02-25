import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux'; // функции для подключения react компонента к redux стор
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';

const mapStateToProps = (state) => {
  return {
    store: state,
  }
}

// подключим App к redux store, и дадим компоненту доступ к актуальным данным,
// которые мы вернём в теле функции mapStateToProps(state), они окажутся в props
// также у компонента появится доступ к методу dispatch()
const WrappedApp = connect(mapStateToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <WrappedApp />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
