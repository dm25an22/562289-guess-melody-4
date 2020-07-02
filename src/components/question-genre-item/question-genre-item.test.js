import React from "react";
import renderer from "react-test-renderer";
import QuestionGenreItem from "./question-genre-item.jsx";

const answer = {
  src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  genre: `rock`,
};

it(`Render QuestionGenreItem`, () => {
  const tree = renderer.create(
      <QuestionGenreItem
        key={`${0}-${answer.src}`}
        answer={answer}
        index={0}
        userAnswer={false}
        onChange={() => {}}
        renderPlayer={() => {}}
      />, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
