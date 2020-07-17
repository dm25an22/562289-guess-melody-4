import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {AppRoute} from "../../const.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {connect} from "react-redux";

const PrivateRoute = ({path, exact, render, authorizationStatus}) => {
  return (
    <Route
      path={path}
      exac={exact}
      render={() => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render()
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizationStatus(state)
  };
};

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
