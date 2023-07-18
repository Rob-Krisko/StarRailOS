import React from 'react';
import song1 from './spacewalk.mp3';
import song2 from './freestyle.mp3';
import song3 from './star-rail.mp3';
import song4 from './the-game-is-on.mp3';

class musicc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [
        { id: 1, title: 'Space Walk', source: song1 },
        { id: 2, title: 'fReeStyLE', source: song2 },
        { id: 1, title: 'Star Rail', source: song3 },
        { id: 2, title: 'The Game is On', source: song4 }
      ],
      currentSong: null,
      isPlaying: false,
      currentAudio: null,
    };
  }

  playSong = (song) => {
    const audio = new Audio(song.source);
    audio.play();

    if (this.state.currentAudio) {
      this.state.currentAudio.pause();
    }

    this.setState({ currentSong: song, isPlaying: true, currentAudio: audio });
  };

  pauseSong = () => {
    if (this.state.currentAudio) {
      this.state.currentAudio.pause();
    }
    this.setState({ isPlaying: false });
  };

  skipToNextSong = () => {
    const { songs, currentSong, currentAudio } = this.state;
    if (currentAudio) {
      currentAudio.pause();
    }

    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];

    const audio = new Audio(nextSong.source);
    audio.play();

    this.setState({ currentSong: nextSong, isPlaying: true, currentAudio: audio });
  };

  render() {
    const { currentSong, isPlaying, songs } = this.state;

    return (
      <div className="music">
        <div className="drag-handle">
          <h3>Music</h3>
        </div>
        <div className="content">
          {currentSong ? (
            <div>
              <h4>Now Playing: {currentSong.title}</h4>
              {isPlaying ? (
                <button onClick={this.pauseSong}>Pause</button>
              ) : (
                <button onClick={() => this.playSong(currentSong)}>Play</button>
              )}
              <button onClick={this.skipToNextSong}>Skip</button>
            </div>
          ) : (
            <p>No song is currently playing.</p>
          )}

          <div className="song-list">
            <h4>Honkai: Star Rail</h4>
            <ul>
              {songs.map((song) => (
                <li key={song.id}>
                  {song.title}{' '}
                  <button onClick={() => this.playSong(song)}>Play</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default musicc;
