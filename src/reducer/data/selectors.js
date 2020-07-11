import NameSpace from "../name-space";
import {createSelector} from "reselect";

const NAME_SPACE = NameSpace.DATA;

export const getQuestions = (state) => {
  return state[NAME_SPACE].questions;
};

const randomFilter = () => {
  return Math.random > 0.5;
};

export const getArtistQuestions = createSelector(
    getQuestions,
    randomFilter,
    (questions, random) => {
      return questions.filter((it) => random && it.type === `artist`);
    }
);

export const getGenreQuestions = createSelector(
    getQuestions,
    (questions) => {
      return questions.filter((it) => it.type === `genre`);
    }
);
