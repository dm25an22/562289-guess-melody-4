const AVATAR_URL = `https://api.adorable.io/avatars/128`;

export default [
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        genre: `rock`,
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/f/fc/2009-05-30FastBoogie.ogg?uselang=ru`,
        genre: `blues`,
      }, {
        src: `https://upload.wikimedia.org/wikipedia/commons/e/e4/%22State_of_Maine%22_-_Regional_anthem_of_Maine.ogg?uselang=ru`,
        genre: `jazz`,
      }, {
        src: `https://upload.wikimedia.org/wikipedia/commons/8/86/Ae_Fond_Kiss.ogg?uselang=ru`,
        genre: `rock`,
      }
    ]
  },
  {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4c/08_-_Planete_bleue.ogg?uselang=ru`
    },
    answers: [
      {
        picture: `${AVATAR_URL}/A`,
        artist: `John Snow`,
      }, {
        picture: `${AVATAR_URL}/AB`,
        artist: `Jack Daniels`,
      }, {
        picture: `${AVATAR_URL}/AC`,
        artist: `Jim Beam`,
      }
    ]
  }
];
