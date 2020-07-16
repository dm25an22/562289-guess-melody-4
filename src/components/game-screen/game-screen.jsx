import React from "react";
import PropTypes from "prop-types";
import Mistakes from "../mistakes/mistakes.jsx";
import {connect} from "react-redux";
import {getMistakes} from "../../reducer/game/selectors";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import {ActionCreator} from "../../reducer/game/game.js";

const GameScreen = ({type, children, mistakes, goToWelcome}) => {
  return (
    <section className={`game game--${type}`}>
      <header className="game__header">
        <Link
          className="game__back"
          to={AppRoute.ROOT}
          onClick={goToWelcome}
        >
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </Link>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
        </svg>

        <Mistakes
          count={mistakes}
        />
      </header>

      {children}
    </section>
  );
};

GameScreen.propTypes = {
  goToWelcome: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node.isRequired
  ]).isRequired,
  mistakes: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  mistakes: getMistakes(state)
});

const mapDispatchToProps = (dispatch) => {
  return {
    goToWelcome() {
      dispatch(ActionCreator.goToWelcome());
    }
  };
};

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
