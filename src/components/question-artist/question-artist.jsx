import React from "react";
import PropTypes from "prop-types";
import AudioPlayer from "../audio-player/audio-player.jsx";

const QuestionArtist = ({question, onAnswer}) => {

  const {song, answers} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          <AudioPlayer
            isPlaying={true}
            src={song.src}
          />
        </div>
      </div>

      <form className="game__artist">
        {answers.map((answer, i) => {
          const {picture, artist} = answer;
          return (
            <div key={String(new Date() + Math.random())} className="artist">
              <input
                onChange={(evt) => {
                  evt.preventDefault();
                  onAnswer(question, answer);
                }}
                className="artist__input visually-hidden"
                type="radio"
                name="answer"
                value={`answer-${i}`}
                id={`answer-${i}`}/>
              <label className="artist__name" htmlFor={`answer-${i}`}>
                <img className="artist__picture" src={picture} alt={artist}/>
                {artist}
              </label>
            </div>
          );
        })}
      </form>
    </section>
  );
};

QuestionArtist.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    }).isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      picture: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired
    })).isRequired
  })
};

export default QuestionArtist;
