import React from "react";
import {shallow} from "enzyme";
import AudioPlayer from "./audio-player.jsx";

it(`Click by Play button calls callback`, () => {
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
