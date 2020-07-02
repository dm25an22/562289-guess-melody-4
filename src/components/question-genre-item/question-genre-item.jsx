import React from "react";
import PropTypes from "prop-types";

const QuestionGenreItem = ({answer, index, userAnswer, onChange, renderPlayer}) => {
  const {src} = answer;

  return (
    <div className="track">
      {renderPlayer(src, index)}
      <div className="game__answer">
        <input
          onChange={(evt) => {
            const value = evt.target.checked;
            onChange(value, index);
          }}
          className="game__input visually-hidden"
          type="checkbox"
          name="answer"
          value={`answer-${index}`}
          id={`answer-${index}`}
          checked={userAnswer}

        />
        <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
      </div>
    </div>
  );
};

QuestionGenreItem.propTypes = {
  onChange: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswer: PropTypes.bool.isRequired,
  answer: PropTypes.shape({
    genre: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired
};

export default QuestionGenreItem;
