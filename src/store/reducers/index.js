import * as actionTypes from '../constants/actionTypes';
import initialState from '../initialState';

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CREATE_INPUT_VALUE:
      return {
        ...state,
        createInputValue: action.payload,
      }

    case actionTypes.SET_IS_CREATE_INPUT_VALUE_MAX_LENGTH:
      return {
        ...state,
        isCreateInputMaxLength: action.payload,
      }

    case actionTypes.SET_EDIT_INPUT_VALUE:
      return {
        ...state,
        editInputValue: action.payload,
      }

    case actionTypes.SET_IS_EDIT_INPUT_VALUE_MAX_LENGTH:
      return {
        ...state,
        isEditInputMaxLength: action.payload,
      }

    case actionTypes.SET_TO_DO_ITEMS:
      return {
        ...state,
        toDoItems: action.payload,
      }

    case actionTypes.SET_RADIO_VALUE:
      return {
        ...state,
        radioValue: action.payload,
      }

    case actionTypes.SET_IS_ALL_COMPLETED:
      return {
        ...state,
        isAllCompleted: action.payload,
      }
  }



  // if (action.type === SET_TO_DO_ITEMS) {
  //   return {
  //     ...state,
  //     ...action.payload
  //   }
  // } //!

  return state;
}

export default reducer;
