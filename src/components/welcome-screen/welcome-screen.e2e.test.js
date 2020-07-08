import React from "react";
import {shallow} from "enzyme";
import WelcomeScreen from "./welcome-screen";

describe(`WelcomeScreenComponent`, () => {
  it(`Should welcome button be pressed`, () => {
    const onWelcomeButtonClick = jest.fn();

    const welcomeScreen = shallow(
        <WelcomeScreen
          errorsCount={3}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
    );

    const welcomeButton = welcomeScreen.find(`button.welcome__button`);

    welcomeButton.simulate(`click`);

    expect(onWelcomeButtonClick).toHaveBeenCalled();
  });
});

