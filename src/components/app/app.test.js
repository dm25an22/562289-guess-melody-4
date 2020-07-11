import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";


const mockStore = configureStore([]);

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        genre: `rock`,
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `blues`,
      }, {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `jazz`,
      }, {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `rock`,
      }
    ]
  },
  {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`
    },
    answers: [
      {
        picture: `https://api.adorable.io/avatars/128/1`,
        artist: `John Snow`,
      }, {
        picture: `https://api.adorable.io/avatars/128/2`,
        artist: `Jack Daniels`,
      }, {
        picture: `https://api.adorable.io/avatars/128/3`,
        artist: `Jim Beam`,
      }
    ]
  }
];

const maxMistakes = 3;

describe(`Render App`, () => {


  it(`renders WelcomeScreen component`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              mistakes={0}
              questions={questions}
              maxMistakes={maxMistakes}
              onUserAnswer={() => {}}
              onWelcomeButtonClick={() => {}}
              step={-1}
              resetGame={() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });


  it(`render QuestionGenre component`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              mistakes={0}
              questions={questions}
              maxMistakes={maxMistakes}
              onUserAnswer={() => {}}
              onWelcomeButtonClick={() => {}}
              step={0}
              resetGame={() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`render QuestionArtist component`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      }
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              mistakes={0}
              questions={questions}
              maxMistakes={maxMistakes}
              onUserAnswer={() => {}}
              onWelcomeButtonClick={() => {}}
              step={1}
              resetGame={() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders WinScreen component`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              mistakes={0}
              questions={questions}
              maxMistakes={maxMistakes}
              onUserAnswer={() => {}}
              onWelcomeButtonClick={() => {}}
              step={3}
              resetGame={() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`render GameOverScreen component`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 3,
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              mistakes={3}
              questions={questions}
              maxMistakes={maxMistakes}
              onUserAnswer={() => {}}
              onWelcomeButtonClick={() => {}}
              step={2}
              resetGame={() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
