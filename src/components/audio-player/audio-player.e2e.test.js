import React from "react";
import {shallow} from "enzyme";
import AudioPlayer from "./audio-player.jsx";

it(`das`, () => {
  const tree = shallow(
      <AudioPlayer
        isPlaying={true}
        src={`something`}
        onButtonClick={() => {}}
      />
  );

});
