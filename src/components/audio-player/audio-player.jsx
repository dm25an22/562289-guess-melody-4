import React from "react";
import PropTypes from "prop-types";

export default class AudioPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = React.createRef();

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying
    };
  }

  componentDidMount() {
    const {src} = this.props;
    const audio = this._audioRef.current;

    audio.src = src;

    audio.oncanplaythrough = () => {
      this.setState({isLoading: false});
    };

    audio.onplay = () => {
      this.setState({isPlaying: true});
    };

    audio.onpause = () => {
      this.setState({isPlaying: false});
    };

    audio.ontimeupdate = () => {
      this.setState({progress: audio.currentTime});
    };
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.src = ``;
  }

  render() {
    return (
      <>
        <button
          onClick={() => {
            this.setState((prevState) => ({
              isPlaying: !prevState.isPlaying
            }));
            this.props.onButtonClick();
          }}
          className={`track__button track__button--${this.state.isPlaying ? `pause` : `play`}`}
          type="button">
        </button>
        <div className="track__status">
          <audio
            ref={this._audioRef}
          />
        </div>
      </>
    );
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    if (this.state.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired
};
