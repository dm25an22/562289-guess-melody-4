import NameSpace from "../name-space";

const NAME_SPACE = NameSpace.GAME;

export const getMistakes = (state) => {
  return state[NAME_SPACE].mistakes;
};

export const getMaxMistakes = (state) => {
  return state[NAME_SPACE].maxMistakes;
};

export const getStep = (state) => {
  return state[NAME_SPACE].step;
};
