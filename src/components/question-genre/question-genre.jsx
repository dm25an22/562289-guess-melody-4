import React from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const.js";
import QuestionGenreItem from "../question-genre-item/question-genre-item.jsx";

const QuestionGenre = (props) => {
  const {question, onAnswer, onChange, renderPlayer, userAnswers} = props;
  const {genre, answers} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          onAnswer();
        }}
        className="game__tracks">

        {answers.map((answer, i) => (
          <QuestionGenreItem
            key={`${i}-${answer.src}`}
            answer={answer}
            index={i}
            userAnswer={userAnswers[i]}
            onChange={onChange}
            renderPlayer={renderPlayer}
          />
        ))}

        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  );
};

QuestionGenre.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired
};

export default QuestionGenre;
