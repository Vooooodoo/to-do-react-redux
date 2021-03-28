import React from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.input`
  position: absolute;
  top: 18px;
  left: 15px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin: 0;
`;

function Checkbox(props) {
  return (
    <StyledCheckbox
      className="transition"
      type="checkbox"
      onChange={evt => props.onCheckboxChange(evt, props.toDoItemId)}
      checked={props.isChecked}
    />
  );
}

export default Checkbox;
