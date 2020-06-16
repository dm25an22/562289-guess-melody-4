import React from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import QuestionGenre from "../question-genre/question-genre.jsx";
import QuestionArtist from "../question-artist/question-artist.jsx";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";


const welcomeButtonHandler = () => {};

const App = ({errorsCount, questions}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <WelcomeScreen
            errorsCount={errorsCount}
            onWelcomeButtonClick={welcomeButtonHandler}
          />;
        </Route>
        <Route exact path="/dev-genre">
          <QuestionGenre
            question={questions[0]}
          />
        </Route>
        <Route exact path="/dev-artist">
          <QuestionArtist
            question={questions[1]}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired
};

export default App;
