/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/videoPlayer.scss';
import { appUrl } from '../helpers/urls';

function VideoPlayer({ link, removeActiveVideo }) {
  return (
    <div className="video-player">
      <div className="background" />
      <button type="button" onClick={() => removeActiveVideo()} className="close">
        X (Close)
      </button>
      <video width={window.innerWidth < 600 ? '360' : '500'} controls autoPlay>
        <source src={`${appUrl}${link}`} type="video/mp4" />
        <source src={`${appUrl}${link}`} type="video/mov" />
        Your browser does not support HTML video.
      </video>
    </div>
  );
}

VideoPlayer.propTypes = {
  removeActiveVideo: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
};

export default VideoPlayer;
