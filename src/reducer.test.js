import {reducer, ActionType, ActionCreator} from "./reducer";

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
  expect(reducer(void 0, {})).toEqual({
    step: -1,
    mistakes: 0,
    questions,
    maxMistakes: 3
  });
});

it(`Reducer should increment current step by a given value`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
    questions
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 1
  })).toEqual({
    step: 0,
    mistakes: 0,
    questions
  });

  expect(reducer({
    step: -1,
    mistakes: 0,
    questions
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 0
  })).toEqual({
    step: -1,
    mistakes: 0,
    questions
  });

});

it(`Reducer should increment number of mistakes by a given value`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0
  }, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: 1
  })).toEqual({
    step: -1,
    mistakes: 1
  });

  expect(reducer({
    step: -1,
    mistakes: 0
  }, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: 0
  })).toEqual({
    step: -1,
    mistakes: 0
  });
});

it(`Action creators for incrementing step return appropriate type and payload`, () => {
  expect(ActionCreator.incrementStep()).toEqual({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  });
});

it(`Action creator for incrementing mistake returns action with 0 payload if answer for artist is correct`, () => {
  expect(ActionCreator.incrementMistake({
    type: `artist`,
    song: {
      artist: `correct`,
      src: ``,
    },
    answers: [
      {
        artist: `correct`,
        picture: ``,
      }, {
        artist: `incorrect`,
        picture: ``,
      }, {
        artist: `incorrect-2`,
        picture: ``,
      },
    ]
  }, {
    artist: `correct`,
    picture: ``,
  })).toEqual({
    type: ActionType.INCREMENT_MISTAKES,
    payload: 0,
  });
});


it(`Action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect`, () => {
  expect(ActionCreator.incrementMistake({
    type: `artist`,
    song: {
      artist: `correct`,
      src: ``,
    },
    answers: [
      {
        artist: `correct`,
        picture: ``,
      }, {
        artist: `incorrect`,
        picture: ``,
      }, {
        artist: `incorrect-2`,
        picture: ``,
      },
    ]
  }, {
    artist: `incorrect`,
    picture: ``,
  })).toEqual({
    type: ActionType.INCREMENT_MISTAKES,
    payload: 1,
  });
});

it(`Action creator for incrementing mistake returns action with 0 payload if answer for genre is correct`, () => {
  expect(ActionCreator.incrementMistake({
    type: `genre`,
    genre: `jazz`,
    answers: [
      {
        genre: `rock`,
        src: ``,
      }, {
        genre: `jazz`,
        src: ``,
      }, {
        genre: `blues`,
        src: ``,
      }, {
        genre: `blues`,
        src: ``,
      },
    ]
  }, [false, true, false, false])).toEqual({
    type: ActionType.INCREMENT_MISTAKES,
    payload: 0,
  });
});

it(`Action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect`, () => {
  expect(ActionCreator.incrementMistake({
    type: `genre`,
    genre: `jazz`,
    answers: [
      {
        genre: `blues`,
        src: ``,
      }, {
        genre: `blues`,
        src: ``,
      }, {
        genre: `blues`,
        src: ``,
      }, {
        genre: `blues`,
        src: ``,
      },
    ]
  }, [true, true, true, true])).toEqual({
    type: ActionType.INCREMENT_MISTAKES,
    payload: 1,
  });
});
