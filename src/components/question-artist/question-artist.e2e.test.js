import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import QuestionArtist from "./question-artist";

const mockEvent = {
  preventDefault() {}
};

const mock = {
  question: {
    type: `artist`,
    song: {
      artist: ``,
      src: ``
    },
    answers: [
      {
        artist: `one`,
        picture: `pic-one`,
      },
      {
        artist: `two`,
        picture: `pic-two`,
      },
      {
        artist: `three`,
        picture: `pic-three`,
      },
    ],
  }
};

const userAnswer = {
  artist: `one`,
  picture: `pic-one`,
};

Enzyme.configure({
  adapter: new Adapter()
});

it(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
  const onAnswer = jest.fn();
  const {question} = mock;

  const screen = shallow(
      <QuestionArtist
        question={question}
        onAnswer={onAnswer}
      />
  );

  const answerOne = screen.find(`input`).at(0);
  answerOne.simulate(`change`, mockEvent);

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(onAnswer.mock.calls[0][0]).toMatchObject(question);
  expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);
});
