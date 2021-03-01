import * as actionTypes from '../constants/actionTypes'; //!
import initialState from '../initialState';

function reducer(state = initialState, action) {
  if (action.type === actionTypes.SET_CREATE_INPUT_VALUE) {
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
      ...action.payload
    }
  } //!

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
