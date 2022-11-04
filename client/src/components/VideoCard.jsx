import React from 'react';
import PropTypes from 'prop-types';
import altThubnail from '../assets/thubnail.png';
import '../styles/components/videoCard.scss';
import { appUrl } from '../helpers/urls';

function VideoCard({ video, setActiveVideo }) {
  const { name, category_name: categoryName, thubnail } = video;

  return (
    <button title={name} type="button" onClick={() => setActiveVideo(video)} className="video-card">
      <div>
        <img alt={name} src={(thubnail && `${appUrl}${thubnail}`) || altThubnail} />
      </div>
      <div className="info">
        <p>{name}</p>
        <p>{categoryName}</p>
      </div>
    </button>
  );
}

VideoCard.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    thubnail: PropTypes.string,
    category_name: PropTypes.string,
  }),
  setActiveVideo: PropTypes.func,
};

VideoCard.defaultProps = {
  video: {
    id: null,
    name: '',
    thubnail: '',
    category_name: '',
  },
  setActiveVideo: () => {},
};

export default VideoCard;
