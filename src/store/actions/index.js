import {
  SET_CREATE_INPUT_VALUE,
  SET_IS_CREATE_INPUT_VALUE_MAX_LENGTH,
  SET_EDIT_INPUT_VALUE,
  SET_IS_EDIT_INPUT_VALUE_MAX_LENGTH,
  SET_TO_DO_ITEMS,
  SET_RADIO_VALUE,
  SET_IS_ALL_COMPLETED,
} from '../constants/actionTypes'

const changeName = (newName) => {
  return {
    type: CHANGE_NAME,
    payload: newName,
  }
}

const changeSecondName = (newSecondName) => {
  return {
    type: CHANGE_SECOND_NAME,
    payload: newSecondName,
  }
}

const setCreateInputValue = (newValue) => {
  return {
    type: CHANGE_NAME,
    payload: newValue,
  }
}

export { changeName, changeSecondName };
