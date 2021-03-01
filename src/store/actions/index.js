import * as actionTypes from '../constants/actionTypes'

const setCreateInputValue = (inputValue) => {
  return {
    type: actionTypes.SET_CREATE_INPUT_VALUE,
    payload: inputValue,
  }
}

const setIsCreateInputMaxLength = (isMaxLength) => {
  return {
    type: actionTypes.SET_IS_CREATE_INPUT_VALUE_MAX_LENGTH,
    payload: isMaxLength,
  }
}

const setEditInputValue = (inputValue) => {
  return {
    type: actionTypes.SET_EDIT_INPUT_VALUE,
    payload: inputValue,
  }
}

const setIsEditInputMaxLength = (isMaxLength) => {
  return {
    type: actionTypes.SET_IS_EDIT_INPUT_VALUE_MAX_LENGTH,
    payload: isMaxLength,
  }
}

const setToDoItems = (toDoItems) => ({
  type: actionTypes.SET_TO_DO_ITEMS,
  payload: toDoItems,
});


const setRadioValue = (radioValue) => {
  return {
    type: actionTypes.SET_RADIO_VALUE,
    payload: radioValue,
  }
}

const setIsAllCompleted = (isAllCompleted) => {
  return {
    type: actionTypes.SET_IS_ALL_COMPLETED,
    payload: isAllCompleted,
  }
}

export {
  setCreateInputValue,
  setIsCreateInputMaxLength,
  setEditInputValue,
  setIsEditInputMaxLength,
  setToDoItems,
  setRadioValue,
  setIsAllCompleted,
};
