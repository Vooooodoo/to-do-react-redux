import React from 'react';
import styled from 'styled-components';

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
  return (
    <Button
      className="del-btn transition"
      type="button"
      aria-label="Удалить дело."
      onClick={() => props.onDelBtnClick(props.toDoItemId)}
    >
      x
    </Button>
  );
}

export default DeleteButton;
