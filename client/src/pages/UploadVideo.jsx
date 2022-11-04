import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/uploadVideo.scss';
import axios from 'axios';
import { appUrl } from '../helpers/urls';

function UploadVideo() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [clip, setClip] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`${appUrl}/categories`).then(({ data }) => {
      setCategories(data);
      setCategory(data[0].id);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category_id', category);
    formData.append('clip', clip);

    const headers = { 'Content-Type': 'multipart/form-data' };

    axios
      .post(`${appUrl}/videos`, formData, { headers })
      .then((data) => {
        setError(false);
        setResponseMessage(data.message);
      })
      .catch((err) => {
        const { message, errors } = err.response.data;

        setError(true);
        setResponseMessage(`${message} - ${errors}`);
      });
  }

  return (
    <div className="upload-video">
      <header>
        <h1>Upload Video Form</h1>
        <button className="action-button" type="button" onClick={() => navigate('/')}>
          Back to the List
        </button>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Name
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
        </div>
        <div>
          <label htmlFor="category">
            Categories
            <select
              id="Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              required
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <input
            type="file"
            accept="video/mp4,.mov"
            id="file"
            name="filename"
            onChange={(e) => setClip(e.target.files[0])}
            required
          />
        </div>
        <button className="action-button" type="submit">
          Submit
        </button>
        {responseMessage && (
          <div className={`message ${error ? 'error' : ''}`}>{responseMessage}</div>
        )}
        <div />
      </form>
    </div>
  );
}

export default UploadVideo;
