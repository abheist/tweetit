import React from "react";
import "./App.css";
import profilePic from "../../assets/profile_pic.jpg";
import { Image, Smile } from 'react-feather';

function App() {
  const profile_pic = {
    height: '46px',
    width: '46px',
    backgroundImage: `url(${profilePic})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: "100%",
  }
  return (
  <div className="app">
    <h1 className="heading">
    JustTweetIt
    </h1>
    <div className="tweet-box flex-row">
      <div>
        <div style={profile_pic} className="flex-1"></div>
      </div>
      <div className="flex-9 flex-column">
        <div className="tweetInput" contentEditable="true">
          <span className="tweet-placeholder">What's happening?</span>
          <span className="tweet-input-box"></span>
        </div>
        <div className="tweetButtons">
          <button className="tweet-icon-button">
            <Image color="#1DA1F2" size={24} className="tweet-icons"/>
          </button>
          <button className="tweet-icon-button">
            <Smile color="#1DA1F2" size={24} className="tweet-icons" />
          </button>
          <div className="flex-1"></div>
          <button className="tweetItButton">Tweet it!</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default App;
