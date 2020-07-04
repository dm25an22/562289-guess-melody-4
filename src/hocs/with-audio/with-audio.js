import React from "react";
import PropTypes from "prop-types";

const withAudio = (Component) => {
  class WithAudio extends React.PureComponent {
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
        this.setState({
          progress: Math.floor(audio.currentTime)
        });
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
      const {onButtonClick} = this.props;

      return (
        <Component
          {...this.props}
          isLoading={this.state.isLoading}
          isPlaying={this.state.isPlaying}
          onButtonClick={() => {
            this.setState((prevState) => ({
              isPlaying: !prevState.isPlaying
            }));

            onButtonClick();
          }}

        >
          <audio
            ref={this._audioRef}
          />
        </Component>
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

  WithAudio.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
    onButtonClick: PropTypes.func.isRequired
  };

  return WithAudio;
};

export default withAudio;
