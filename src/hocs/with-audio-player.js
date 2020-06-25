import React from "react";
import AudioPlayer from "../components/audio-player/audio-player.jsx";

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
