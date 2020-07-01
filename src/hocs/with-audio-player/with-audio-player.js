import React from "react";
import Player from "../../components/audio-player/audio-player.jsx";
import withAudio from "../with-audio/with-audio";

const AudioPlayer = withAudio(Player);

const withAudioPlayer = (Component) => {
  class WithAudioPlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0
      };
    }

    render() {
      const {activePlayerId} = this.state;

      return <Component
        {...this.props}
        renderPlayer={(src, index) => {
          return (
            <AudioPlayer
              isPlaying={index === activePlayerId}
              src={src}
              onButtonClick={() => {
                this.setState({activePlayerId: activePlayerId === index ? -1 : index});
              }}
            />
          );
        }}
      />;
    }
  }

  WithAudioPlayer.propTypes = {};

  return WithAudioPlayer;
};

export default withAudioPlayer;
