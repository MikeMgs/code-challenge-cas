import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VideoCard from '../components/VideoCard';
import VideoPlayer from '../components/VideoPlayer';
import '../styles/pages/videoList.scss';
import { appUrl } from '../helpers/urls';

function VideoList() {
  const [videoPlaylerOpen, setVideoPlayerOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setVideoPlayerOpen(!!activeVideo);
  }, [activeVideo]);

  useEffect(() => {
    axios.get(`${appUrl}/videos`).then(({ data }) => {
      setVideoList(data);
    });
  }, []);

  const removeActiveVideo = () => setActiveVideo(null);

  return (
    <div className="video-list">
      <header>
        <h1>Video List</h1>
        <button className="action-button" type="button" onClick={() => navigate('/upload')}>
          Upload Video Form
        </button>
      </header>
      <ul>
        {videoList.map((video) => (
          <li key={`video-${video.id}`}>
            <VideoCard setActiveVideo={setActiveVideo} video={video} />
          </li>
        ))}
      </ul>
      {activeVideo && videoPlaylerOpen && (
        <VideoPlayer link={activeVideo.link} removeActiveVideo={removeActiveVideo} />
      )}
    </div>
  );
}

export default VideoList;
