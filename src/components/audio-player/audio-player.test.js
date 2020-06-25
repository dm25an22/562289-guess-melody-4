import React from "react";
import rerender from "react-test-renderer";
import AudioPlayer from "./audio-player.jsx";

it(`Render AudioPlayer`, () => {
  const tree = rerender.create(
      <AudioPlayer
        renderPlayer={() => {}}
        isPlaying={true}
        src={`something`}
        onButtonClick={() => {}}
      />,
      {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
