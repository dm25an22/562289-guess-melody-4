import React from "react";
import {shallow} from "enzyme";
import withUserAnswer from "../with-user-answer/with-user-answer";

const MockComponent = () => <div />;
const MockComponentWrapper = withUserAnswer(MockComponent);

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `blues`,
      },
    ],
  },
};

it(`Should change answers`, () => {
  const tree = shallow(
      <MockComponentWrapper
        question={mock.question}
        onAnswer={() => {}}
      />
  );

  expect(tree.props().userAnswers).toEqual([false, false, false, false]);

  tree.props().onChange(true, 1);
  expect(tree.props().userAnswers).toEqual([false, true, false, false]);

  tree.props().onChange(true, 3);
  expect(tree.props().userAnswers).toEqual([false, true, false, true]);

  tree.props().onChange(false, 1);
  expect(tree.props().userAnswers).toEqual([false, false, false, true]);

});
