import React from "react";
import PropTypes from "prop-types";

export default class AudioPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying
    };
  }

  componentDidMount() {
    const {src} = this.props.src;

    this._audio = new Audio(src);

    this._audio.oncanplaythrough = () => {
      this.setState({isLoading: false});
    };

    this._audio.onplay = () => {
      this.setState({isPlaying: true});
    };

    this._audio.onpause = () => {
      this.setState({isPlaying: false});
    };

    this._audio.ontimeupdate = () => {
      this.setState({progress: this._audio.currentTime});
    };
  }

  componentWillUnmount() {
    this._audio.oncanplaythrough = null;
    this._audio.onplay = null;
    this._audio.onpause = null;
    this._audio.ontimeupdate = null;
    this._audio.src = ``;
    this._audio = null;
  }

  render() {
    return (
      <>
        <button
          onClick={() => this.setState((prevState) => ({
            isPlaying: !prevState.isPlaying
          }))}
          disabled={this.state.isLoading}
          className={`track__button track__button--${this.state.isPlaying ? `pause` : `play`}`}
          type="button">
        </button>
        <div className="track__status">
          <audio />
        </div>
      </>
    );
  }

  componentDidUpdate() {
    if (this.state.isPlaying) {
      this._audio.play();
    } else {
      this._audio.pause();
    }
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired
};
