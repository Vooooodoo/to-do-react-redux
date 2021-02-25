import {
  SET_CREATE_INPUT_VALUE,
  SET_IS_CREATE_INPUT_VALUE_MAX_LENGTH,
  SET_EDIT_INPUT_VALUE,
  SET_IS_EDIT_INPUT_VALUE_MAX_LENGTH,
  SET_TO_DO_ITEMS,
  SET_RADIO_VALUE,
  SET_IS_ALL_COMPLETED,
} from '../constants/actionTypes'
import initialState from '../initialState';

function reducer(state = initialState, action) {
  if (action.type === SET_CREATE_INPUT_VALUE) {
    return {
      ...state,
      createInputValue: action.payload,
    }
  }

  if (action.type === SET_IS_CREATE_INPUT_VALUE_MAX_LENGTH) {
    return {
      ...state,
      isCreateInputMaxLength: action.payload
    }
  }

  if (action.type === SET_EDIT_INPUT_VALUE) {
    return {
      ...state,
      editInputValue: action.payload
    }
  }

  if (action.type === SET_IS_EDIT_INPUT_VALUE_MAX_LENGTH) {
    return {
      ...state,
      isEditInputMaxLength: action.payload
    }
  }

  if (action.type === SET_TO_DO_ITEMS) {
    return {
      ...state,
      toDoItems: action.payload
    }
  }

  if (action.type === SET_RADIO_VALUE) {
    return {
      ...state,
      radioValue: action.payload
    }
  }

  if (action.type === SET_IS_ALL_COMPLETED) {
    return {
      ...state,
      isAllCompleted: action.payload
    }
  }

  return state;
}

export default reducer;
