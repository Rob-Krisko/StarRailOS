import React from 'react';
import song1 from '../assets/spacewalk.mp3';
import song2 from '../assets/call-of-the-stars.mp3';
import song3 from '../assets/star-rail.mp3';
import song4 from '../assets/the-game-is-on.mp3';
import styled, { css } from 'styled-components';
import { FaPlay, FaPause, FaForward } from 'react-icons/fa';

const MusicContainer = styled.div`
  background-color: #000;
  color: #fff;
  padding: 20px;
  border-radius: 15px;
  max-width: 300px;
  box-shadow: 0px 0px 15px 5px rgba(0,255,255,.75);
  margin: auto;
  padding-bottom: 50px;
`;

const NowPlaying = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ScrollingText = styled.div`
  width: 180px; 
  white-space: nowrap;
  overflow: hidden;
`;

const Scroll = styled.span`
  display: inline-block;
  padding-left: 100%;
  animation: scrolling 10s linear infinite;

  @keyframes scrolling {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
  }
`;

const Button = styled.button`
  border: none;
  background: none;
  color: #fff;
  cursor: pointer;
  margin: 0 10px;
`;

const SongList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SongListItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [
        { id: 1, title: 'Space Walk', source: song1 },
        { id: 2, title: 'Call of the Stars', source: song2 },
        { id: 3, title: 'Star Rail', source: song3 },
        { id: 4, title: 'The Game is On', source: song4 }
      ],
      currentSong: null,
      isPlaying: false,
      currentAudio: null,
      songCurrentTime: 0,
      songDuration: 0,
      intervalId: null,
    };
  }

  playSong = (song) => {
    const audio = new Audio(song.source);
  
    audio.onloadedmetadata = () => {
      this.setState({ songDuration: audio.duration });
    };
  
    audio.play();
  
    const intervalId = setInterval(() => {
      this.setState({ songCurrentTime: audio.currentTime });
    }, 1000);
  
    if (this.state.currentAudio) {
      this.state.currentAudio.pause();
    }
  
    this.setState({ currentSong: song, isPlaying: true, currentAudio: audio, intervalId });
  };

  skipToNextSong = () => {
    const { songs, currentSong, currentAudio, intervalId } = this.state;
    if (currentAudio) {
      currentAudio.pause();
    }
  
    clearInterval(intervalId);
  
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];
  
    const nextAudio = new Audio(nextSong.source);
  
    nextAudio.onloadedmetadata = () => {
      this.setState({ songDuration: nextAudio.duration });
    };
  
    nextAudio.play();
  
    const newIntervalId = setInterval(() => {
      this.setState({ songCurrentTime: nextAudio.currentTime });
    }, 1000);
  
    this.setState({ currentSong: nextSong, isPlaying: true, currentAudio: nextAudio, intervalId: newIntervalId });
  };
  
  pauseSong = () => {
    const { currentAudio, intervalId } = this.state;
  
    if (currentAudio) {
      currentAudio.pause();
    }
    
    clearInterval(intervalId);
  
    this.setState({ isPlaying: false });
  };

  handleProgressBarChange = (e) => {
    const newTime = e.target.value;
    this.state.currentAudio.currentTime = newTime;
    this.setState({ songCurrentTime: newTime });
  }

  render() {
    const { currentSong, isPlaying, songs, songCurrentTime, songDuration } = this.state;

    return (
      <MusicContainer>
        <h3>Music Player</h3>
        {currentSong ? (
          <NowPlaying>
            <ScrollingText>
              <Scroll>
                Now Playing: {currentSong.title}
              </Scroll>
            </ScrollingText>
            <div>
              {isPlaying ? (
                <Button onClick={this.pauseSong}><FaPause /></Button>
              ) : (
                <Button onClick={() => this.playSong(currentSong)}><FaPlay /></Button>
              )}
              <Button onClick={this.skipToNextSong}><FaForward /></Button>
            </div>
            <div>
              <input
                type="range"
                min="0"
                max={songDuration || 0}
                value={songCurrentTime || 0}
                onChange={this.handleProgressBarChange}
              />
              <span>{Math.round(songCurrentTime || 0)} / {Math.round(songDuration || 0)} seconds</span>
            </div>
          </NowPlaying>
        ) : (
          <p>No song is currently playing.</p>
        )}
        <SongList>
          <h4>Honkai: Star Rail</h4>
          {songs.map((song) => (
            <SongListItem key={song.id}>
              {song.title}{' '}
              <Button onClick={() => this.playSong(song)}><FaPlay /></Button>
            </SongListItem>
          ))}
        </SongList>
      </MusicContainer>
    );
  }
}

export default MusicPlayer;