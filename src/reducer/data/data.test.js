import {reducer, ActionType, Operation} from "./data";
import {createApi} from "../../api";
import MockAdapter from "axios-mock-adapter";

const api = createApi(() => {});

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        genre: `rock`,
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/f/fc/2009-05-30FastBoogie.ogg?uselang=ru`,
        genre: `blues`,
      }, {
        src: `https://upload.wikimedia.org/wikipedia/commons/e/e4/%22State_of_Maine%22_-_Regional_anthem_of_Maine.ogg?uselang=ru`,
        genre: `jazz`,
      }, {
        src: `https://upload.wikimedia.org/wikipedia/commons/8/86/Ae_Fond_Kiss.ogg?uselang=ru`,
        genre: `rock`,
      }
    ]
  },
  {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4c/08_-_Planete_bleue.ogg?uselang=ru`
    },
    answers: [
      {
        picture: `https://api.adorable.io/avatars/128/A`,
        artist: `John Snow`,
      }, {
        picture: `https://api.adorable.io/avatars/128/AB`,
        artist: `Jack Daniels`,
      }, {
        picture: `https://api.adorable.io/avatars/128/AC`,
        artist: `Jim Beam`,
      }
    ]
  }
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({questions: []});
});

it(`Reducer should update questions by load questions`, () => {
  expect(reducer({
    questions: [],
  }, {
    type: ActionType.LOAD_QUESTIONS,
    payload: questions,
  })).toEqual({
    questions,
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /questions`, function () {
    const mockAPI = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = Operation.loadQuestions();

    mockAPI
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    return questionLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_QUESTIONS,
          payload: [{fake: true}]
        });
      });

  });
});
