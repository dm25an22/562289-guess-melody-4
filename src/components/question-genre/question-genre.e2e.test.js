import React from "react";
import {mount} from "enzyme";
import QuestionGenre from "./question-genre.jsx";

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

const mockEvent = {
  preventDefault() {}
};

it(`When user answers genre question form is not sent`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const genreQuestion = mount(
      <QuestionGenre
        onAnswer={onAnswer}
        question={question}
        renderPlayer={() => {}}
        onChange={() => {}}
        userAnswers={[false, false, false, false]}
      />);

  const form = genreQuestion.find(`form`);
  const formSendPrevention = jest.fn();

  form.simulate(`submit`, {
    preventDefault: formSendPrevention
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});

it(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const userAnswer = [false, true, false, false];


  const genreQuestion = mount((
    <QuestionGenre
      question={question}
      onAnswer={onAnswer}
      renderPlayer={() => {}}
      onChange={() => {}}
      userAnswers={userAnswer}
    />
  ));

  const form = genreQuestion.find(`form`);
  const inputTwo = genreQuestion.find(`input`).at(1);

  inputTwo.simulate(`change`, {target: {checked: true}});
  form.simulate(`submit`, mockEvent);

  expect(inputTwo).toBeTruthy();
  expect(onAnswer).toHaveBeenCalledTimes(1);

  expect(onAnswer.mock.calls[0][0]).toEqual(void 0);

  expect(genreQuestion.find(`input`).map((it) => it.prop(`checked`))).toEqual(userAnswer);
});
