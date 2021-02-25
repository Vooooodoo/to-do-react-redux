import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Radio from '../Radio';

const StyledFooter = styled.footer`
  position: relative;
  display: flex;
  align-items: center;
  background-color: white;
  min-height: 65px;
  padding: 15px;
  box-sizing: border-box;

  ::before {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    height: 50px;
    overflow: hidden;
    box-shadow:
      0 1px 1px rgb(0 0 0 / 20%),
      0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgb(0 0 0 / 20%),
      0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgb(0 0 0 / 20%);
    z-index: -1;
  }

  @media all and (max-width: 767px) {
    flex-direction: column;
  }
`

const Text = styled.p`
  font-size: 16px;
  color: black;
  margin: 0;
  margin-right: 27px;

  @media all and (max-width: 767px) {
    margin: 0 0 10px;
  }
`

const Container = styled.div`
  display: flex;
  flex-basis: 230px;
  align-items: center;
  margin-right: 27px;

  @media all and (max-width: 767px) {
    flex-basis: auto;
    width: 230px;
    margin: 0 0 12px;
  }
`

const Button = styled.button`
  font-size: 16px;
  padding: 8px;
  border-radius: 3px;
`

function Footer(props) {
  const toDoItems = props.toDoItems;
  const notCompletedItems = toDoItems.filter(item => !item.isCompleted);
  const completedItems = toDoItems.filter(item => item.isCompleted);

  return (
    <StyledFooter>
      <Text>{`${notCompletedItems.length} items left`}</Text>

      <Container>
        <Radio
          id="radio-all"
          text="All"
          onRadioChange={props.onRadioChange}
          isChecked
        />
        <Radio
          id="radio-active"
          text="Active"
          onRadioChange={props.onRadioChange}
        />
        <Radio
          id="radio-completed"
          text="Completed"
          onRadioChange={props.onRadioChange}
        />
      </Container>

      {Boolean(completedItems.length) && (
        <Button
          className="transition"
          type="button"
          onClick={props.onClearCompletedBtnClick}
        >
          {`Clear completed [${completedItems.length}]`}
        </Button>
      )}
    </StyledFooter>
  );
}

const putStateToProps = (state) => {
  return {
    toDoItems: state.toDoItems,
  }
}

export default connect(putStateToProps)(Footer);
