import { CHANGE_NAME, CHANGE_SECOND_NAME } from '../constants/actionTypes'

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

export { changeName, changeSecondName };
