import React from "react";
import rerender from "react-test-renderer";
import AudioPlayer from "./audio-player.jsx";

it(`Render AudioPlayer`, () => {
  const tree = rerender.create(
      <AudioPlayer
        isPlaying={true}
        src={`something`}
      />,
      {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
