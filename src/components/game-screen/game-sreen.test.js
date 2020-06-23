import React from "react";
import rerender from "react-test-renderer";
import GameScreen from "./game-screen.jsx";
import {GameType} from "../../const";

const children = <div className="children-component" />;

describe(`Render GameScreen`, () => {

  it(`Render with Artist type`, () => {
    const tree = rerender.create(
        <GameScreen
          type={GameType.ARTIST}
        >
          {children}
        </GameScreen>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render with Artist type`, () => {
    const tree = rerender.create(
        <GameScreen
          type={GameType.GENRE}
        >
          {children}
        </GameScreen>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
