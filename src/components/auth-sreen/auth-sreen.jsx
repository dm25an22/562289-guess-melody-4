import React, {createRef} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

class AuthScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this._loginRef = createRef();
    this._passwordRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const {onSubmit} = this.props;

    onSubmit({
      email: this._loginRef.current.value,
      password: this._passwordRef.current.value
    });
  }

  render() {
    const {onReplayButtonClick} = this.props;
    return (
      <section className="login">
        <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
        <h2 className="login__title">Вы настоящий меломан!</h2>
        <p className="login__text">Хотите узнать свой результат? Представтесь!</p>
        <form onSubmit={this.handleSubmit} className="login__form" action="">
          <p className="login__field">
            <label className="login__label" htmlFor="name">Логин</label>
            <input ref={this._loginRef} className="login__input" type="text" name="name" id="name" />
          </p>
          <p className="login__field">
            <label className="login__label" htmlFor="password">Пароль</label>
            <input ref={this._passwordRef} className="login__input" type="text" name="password" id="password" />
            <span className="login__error">Неверный пароль</span>
          </p>
          <button className="login__button button" type="submit">Войти</button>
        </form>
        <Link to={AppRoute.ROOT} onClick={onReplayButtonClick} className="replay">Сыграть ещё раз</Link>
      </section>
    );
  }
}

AuthScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired,
};

export default AuthScreen;
