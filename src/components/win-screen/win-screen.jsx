import React from "react";
import PropTypes from "prop-types";

const WinScreen = ({mistakes, countQuestions, onReplayButtonClick}) => {
  return (
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {countQuestions - mistakes} вопросов и совершили {mistakes} ошибки</p>
      <button onClick={onReplayButtonClick} className="replay" type="button">Сыграть ещё раз</button>
    </section>
  );
};

WinScreen.propTypes = {
  mistakes: PropTypes.number.isRequired,
  countQuestions: PropTypes.number.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired
};

export default WinScreen;
