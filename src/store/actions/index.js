import {
  SET_CREATE_INPUT_VALUE,
  SET_IS_CREATE_INPUT_VALUE_MAX_LENGTH,
  SET_EDIT_INPUT_VALUE,
  SET_IS_EDIT_INPUT_VALUE_MAX_LENGTH,
  SET_TO_DO_ITEMS,
  SET_RADIO_VALUE,
  SET_IS_ALL_COMPLETED,
} from '../constants/actionTypes'

const setCreateInputValue = (newValue) => {
  return {
    type: SET_CREATE_INPUT_VALUE,
    payload: newValue,
  }
}

const setIsCreateInputMaxLength = (newValue) => {
  return {
    type: SET_IS_CREATE_INPUT_VALUE_MAX_LENGTH,
    payload: newValue,
  }
}

const setEditInputValue = (newValue) => {
  return {
    type: SET_EDIT_INPUT_VALUE,
    payload: newValue,
  }
}

const setIsEditInputMaxLength = (newValue) => {
  return {
    type: SET_IS_EDIT_INPUT_VALUE_MAX_LENGTH,
    payload: newValue,
  }
}

const setToDoItems = (newValue) => {
  return {
    type: SET_TO_DO_ITEMS,
    payload: newValue,
  }
}

const setRadioValue = (newValue) => {
  return {
    type: SET_RADIO_VALUE,
    payload: newValue,
  }
}

const setIsAllCompleted = (newValue) => {
  return {
    type: SET_IS_ALL_COMPLETED,
    payload: newValue,
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
