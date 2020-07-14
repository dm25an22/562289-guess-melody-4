import React from "react";
import PropTypes from "prop-types";

class AudioPlayer extends React.PureComponent {
  render() {
    const {onButtonClick, isPlaying, children} = this.props;
    return (
      <>
        <button
          onClick={onButtonClick}
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button">
        </button>
        <div className="track__status">
          {children}
        </div>
      </>
    );
  }

}


AudioPlayer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default AudioPlayer;
