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
    const {question, onAnswer, renderPlayer} = this.props;
    const {genre, answers} = question;
    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            onAnswer(question, this.state.checkboxAnswers);
          }}
          className="game__tracks">

          {answers.map((answer, i) => (
            <div key={answer.genre + i} className="track">
              {renderPlayer(answer.src, i)}
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
    );
  }
}

QuestionGenre.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
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
