import React from "react";
import renderer from "react-test-renderer";
import AuthScreen from "./auth-sreen.jsx";

it(`render AuthScreen component`, () => {
  const tree = renderer
    .create(<AuthScreen
      onSubmit={() => {}}
      onReplayButtonClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
