import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

const WinScreen = ({mistakes, countQuestions, onReplayButtonClick}) => {
  return (
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {countQuestions - mistakes} вопросов и совершили {mistakes} ошибки</p>
      <Link to={AppRoute.ROOT} onClick={onReplayButtonClick} className="replay">Сыграть ещё раз</Link>
    </section>
  );
};

WinScreen.propTypes = {
  mistakes: PropTypes.number.isRequired,
  countQuestions: PropTypes.number.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired
};

export default WinScreen;
