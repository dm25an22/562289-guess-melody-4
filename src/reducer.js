import {extend} from "./utils";
import {GameType} from "./const";
import questions from "./mocks/questions";

const initialState = {
  mistakes: 0,
  maxMistakes: 3,
  step: -1,
  questions
};

const isArtistAnswerCorrect = ((question, userAnswer) => {
  return question.song.artist === userAnswer.artist;
});

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((it, i) => {
    return it === (question.answers[i].genre === question.genre);
  });
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET_GAME: `RESET_GAME`
};

const ActionCreator = {
  incrementStep() {
    return {
      type: ActionType.INCREMENT_STEP,
      payload: 1
    };
  },

  incrementMistake(question, userAnswer) {
    let answerIsCorrect = false;

    switch (question.type) {
      case GameType.GENRE:
        answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
        break;

      case GameType.ARTIST:
        answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1
    };
  },

  resetGame() {
    return {
      type: ActionType.RESET_GAME,
      payload: null
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });

    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });

    case ActionType.RESET_GAME:
      return extend(initialState, {
        step: 0
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
