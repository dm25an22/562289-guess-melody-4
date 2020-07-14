import React, {PureComponent} from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import QuestionGenre from "../question-genre/question-genre.jsx";
import QuestionArtist from "../question-artist/question-artist.jsx";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {GameType} from "../../const.js";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer";
import WinScreen from "../../components/win-screen/win-screen.jsx";
import GameOverScreen from "../../components/game-over-screen/game-over-screen.jsx";
import {ActionCreator} from "../../reducer/game/game.js";
import {getQuestions} from "../../reducer/data/selectors";
import {getMistakes, getMaxMistakes, getStep} from "../../reducer/game/selectors";
import {connect} from "react-redux";
import AuthScreen from "../auth-sreen/auth-sreen.jsx";

const QuestionGenreWrapped = withAudioPlayer(withUserAnswer(QuestionGenre));
const QuestionArtistWrapped = withAudioPlayer(QuestionArtist);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {questions, onUserAnswer} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/dev-genre">
            <QuestionGenreWrapped
              question={questions[0]}
              onAnswer={onUserAnswer}
            />
          </Route>
          <Route exact path="/dev-artist">
            <QuestionArtistWrapped
              question={questions[1]}
              onAnswer={onUserAnswer}
            />
          </Route>
          <Route exact path="/dev-auth">
            <AuthScreen
              onReplayButtonClick={() => {}}
              onSubmit={() => {}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderGameScreen() {
    const {
      maxMistakes,
      questions,
      step,
      onWelcomeButtonClick,
      onUserAnswer,
      mistakes,
      resetGame,
    } = this.props;

    const question = questions[step];

    if (step === -1) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return <GameOverScreen
        onReplayButtonClick={resetGame}
      />;
    }

    if (step >= questions.length) {
      return (
        <WinScreen
          countQuestions={questions.length}
          mistakes={mistakes}
          onReplayButtonClick={resetGame}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen
              type={question.type}
            >
              <QuestionArtistWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );

        case GameType.GENRE:
          return (
            <GameScreen
              type={question.type}
            >
              <QuestionGenreWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
      }
    }
    return null;
  }

}

App.propTypes = {
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  step: getStep(state),
  questions: getQuestions(state),
  mistakes: getMistakes(state),
  maxMistakes: getMaxMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },

  onUserAnswer(question, userAnswer) {
    dispatch(ActionCreator.incrementMistake(question, userAnswer));
    dispatch(ActionCreator.incrementStep());
  },

  resetGame() {
    dispatch(ActionCreator.resetGame());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
