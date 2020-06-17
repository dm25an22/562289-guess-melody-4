import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const.js";

class QuestionGenre extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkboxAnswers: [false, false, false, false]
    };
  }

  render() {
    const {question, onAnswer} = this.props;
    const {genre, answers} = question;

    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"
              style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
          </svg>

          <div className="game__mistakes">
            <div className="wrong"></div>
            <div className="wrong"></div>
            <div className="wrong"></div>
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form
            onSubmit={(evt) => {
              evt.preventDefault();
              onAnswer();
            }}
            className="game__tracks">

            {answers.map((answer, i) => (
              <div key={String(new Date() + Math.random())} className="track">
                <button className="track__button track__button--play" type="button"></button>
                <div className="track__status">
                  <audio src={answer.src}></audio>
                </div>
                <div className="game__answer">
                  <input
                    onChange={(evt) => {
                      const value = evt.target.checked;
                      this.setState({
                        checkboxAnswers: this.state.checkboxAnswers.map((it, index) => {
                          if (index === i) {
                            it = value;
                          }
                          return it;
                        })
                      });
                    }}
                    className="game__input visually-hidden"
                    type="checkbox"
                    name="answer"
                    value={`answer-${i}`}
                    id={`answer-${i}`}
                    checked={this.state.checkboxAnswers[i]}
                  />
                  <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
                </div>
              </div>
            ))}


            <button className="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </section>
    );
  }
}

QuestionGenre.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired
};

export default QuestionGenre;
