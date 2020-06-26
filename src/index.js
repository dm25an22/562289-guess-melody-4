import React from "react";
import {createStore} from "redux";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";
import questions from "./mocks/questions.js";
import {Provider} from "react-redux";
import {reducer} from "./reducer";

const Settings = {
  ERRORS_COUNT: 3
};

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDom.render(
    <Provider store={store}>
      <App
        errorsCount={Settings.ERRORS_COUNT}
        questions={questions}
      />
    </Provider>,
    document.querySelector(`#root`)
);
