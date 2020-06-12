import React from "react";
import renderer from "react-test-renderer";
import WelcomeSreen from "./welcome-screen.jsx";

it(`Render WelcomeScreen`, () => {
  const tree = renderer.create(
      <WelcomeSreen
        errorsCount={3}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
