import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setToDoItems } from '../../store/actions';
import { addDataToLocalStorage } from '../../utils/helpers';

const Button = styled.button`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translate(0, -50%);
  width: 30px;
  height: 30px;
  margin: 0;
  text-transform: uppercase;
  font-size: 20px;
  line-height: 0;
  font-weight: bold;
  opacity: 0;
  border-radius: 3px;
`;

function DeleteButton(props) {
  const deleteToDoItem = (evtTargetId) => {
    const newToDoItems = props.toDoItems.filter(item => evtTargetId !== item.id);

    addDataToLocalStorage(newToDoItems);
    props.setToDoItems(newToDoItems);
  }

  return (
    <Button
      className="del-btn transition"
      type="button"
      aria-label="Удалить дело."
      onClick={() => deleteToDoItem(props.toDoItemId)}
    >
      x
    </Button>
  );
}

const putStateToProps = (state) => {
  return {
    toDoItems: state.toDoItems,
  }
}

const putActionCreatorsToProps = (dispatch) => {
  return {
    setToDoItems: bindActionCreators(setToDoItems, dispatch),
  }
}

export default connect(putStateToProps, putActionCreatorsToProps)(DeleteButton);
