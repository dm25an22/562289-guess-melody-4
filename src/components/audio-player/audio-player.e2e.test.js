import React from "react";
import {shallow} from "enzyme";
import AudioPlayer from "./audio-player.jsx";

it(`calls a callback by click on Play button`, () => {
  const onButtonClick = jest.fn();
  const tree = shallow(
      <AudioPlayer
        isLoadin={false}
        isPlaying={false}
        onButtonClick={onButtonClick}
      >
        <audio />
      </AudioPlayer>
  );

  const button = tree.find(`button`);
  button.props().onClick();

  expect(onButtonClick).toHaveBeenCalledTimes(1);
});
