import React from "react";
import {createStore, applyMiddleware} from "redux";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";
import {Provider} from "react-redux";
import reducer from "./reducer/reducer.js";
import {Operation as DataOperation} from "./reducer/data/data";
import {createApi} from "./api";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const api = createApi(() => {});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadQuestions());

ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
