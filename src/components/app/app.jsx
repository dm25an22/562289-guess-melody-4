import React, {PureComponent} from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import QuestionGenre from "../question-genre/question-genre.jsx";
import QuestionArtist from "../question-artist/question-artist.jsx";
import PropTypes from "prop-types";
import {Router, Route, Switch} from "react-router-dom";
import {GameType} from "../../const.js";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer";
import WinScreen from "../../components/win-screen/win-screen.jsx";
import GameOverScreen from "../../components/game-over-screen/game-over-screen.jsx";
import {ActionCreator as GameActionCreator} from "../../reducer/game/game.js";
import {getQuestions} from "../../reducer/data/selectors";
import {getMistakes, getMaxMistakes, getStep} from "../../reducer/game/selectors";
import {AuthorizationStatus, Operation as UserOperation} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {connect} from "react-redux";
import AuthScreen from "../auth-sreen/auth-sreen.jsx";
import history from "../../history.js";
import {AppRoute} from "../../const.js";

const QuestionGenreWrapped = withAudioPlayer(withUserAnswer(QuestionGenre));
const QuestionArtistWrapped = withAudioPlayer(QuestionArtist);

class App extends PureComponent {
  _renderGameScreen() {
    const {
      maxMistakes,
      questions,
      step,
      onWelcomeButtonClick,
      onUserAnswer,
      mistakes,
      authorizationStatus,
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
      return history.push(AppRoute.LOSE);
    }

    if (step >= questions.length) {
      if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return history.push(AppRoute.LOGIN);
      } else if (authorizationStatus === AuthorizationStatus.AUTH) {
        return history.push(AppRoute.RESULT);
      }

      return null;
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

  render() {
    const {questions, login, resetGame, mistakes} = this.props;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderGameScreen()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <AuthScreen
              onReplayButtonClick={resetGame}
              onSubmit={login}
            />
          </Route>
          <Route exact path={AppRoute.LOSE} >
            <GameOverScreen
              onReplayButtonClick={resetGame}
            />
          </Route>
          <Route exact path={AppRoute.RESULT} >
            <WinScreen
              mistakes={mistakes}
              countQuestions={questions.length}
              onReplayButtonClick={resetGame}
            />
          </Route>
        </Switch>
      </Router>
    );
  }

}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  step: getStep(state),
  questions: getQuestions(state),
  mistakes: getMistakes(state),
  maxMistakes: getMaxMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },

  onWelcomeButtonClick() {
    dispatch(GameActionCreator.incrementStep());
  },

  onUserAnswer(question, userAnswer) {
    dispatch(GameActionCreator.incrementMistake(question, userAnswer));
    dispatch(GameActionCreator.incrementStep());
  },

  resetGame() {
    dispatch(GameActionCreator.resetGame());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
