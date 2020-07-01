import React from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const.js";

const withUserAnswer = (Component) => {
  class WithUserAnswer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        answers: new Array(props.question.answers.length).fill(false)
      };

      this.handleAnswer = this.handleAnswer.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleAnswer() {
      const {onAnswer, question} = this.props;
      const {answers} = this.state;

      onAnswer(question, answers);
    }

    handleChange(value, i) {

      const userAnswers = [...this.state.answers];
      userAnswers[i] = value;

      this.setState({answers: userAnswers});
    }

    render() {
      return (
        <Component
          {...this.props}
          userAnswers={this.state.answers}
          onAnswer={this.handleAnswer}
          onChange={this.handleChange}
        />
      );
    }

  }

  WithUserAnswer.propTypes = {
    question: PropTypes.shape({
      answers: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
      })).isRequired,
      genre: PropTypes.string.isRequired,
      type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
    }).isRequired,
    onAnswer: PropTypes.func.isRequired,
  };

  return WithUserAnswer;
};

export default withUserAnswer;
