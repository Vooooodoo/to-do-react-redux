import * as actionTypes from '../constants/actionTypes'

const setCreateInputValue = (inputValue) => ({
  type: actionTypes.SET_CREATE_INPUT_VALUE,
  payload: inputValue,
});

const setIsCreateInputMaxLength = (isMaxLength) => ({
  type: actionTypes.SET_IS_CREATE_INPUT_VALUE_MAX_LENGTH,
  payload: isMaxLength,
});

const setEditInputValue = (inputValue) => ({
  type: actionTypes.SET_EDIT_INPUT_VALUE,
  payload: inputValue,
});

const setIsEditInputMaxLength = (isMaxLength) => ({
  type: actionTypes.SET_IS_EDIT_INPUT_VALUE_MAX_LENGTH,
  payload: isMaxLength,
});

const setToDoItems = (toDoItems) => ({
  type: actionTypes.SET_TO_DO_ITEMS,
  payload: toDoItems,
});


const setRadioValue = (radioValue) => ({
  type: actionTypes.SET_RADIO_VALUE,
  payload: radioValue,
});

const setIsAllCompleted = (isAllCompleted) => ({
  type: actionTypes.SET_IS_ALL_COMPLETED,
  payload: isAllCompleted,
});

export {
  setCreateInputValue,
  setIsCreateInputMaxLength,
  setEditInputValue,
  setIsEditInputMaxLength,
  setToDoItems,
  setRadioValue,
  setIsAllCompleted,
};
