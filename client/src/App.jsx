import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VideoList from './pages/VideoList';
import UploadVideo from './pages/UploadVideo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<VideoList />} />
        <Route path="upload" element={<UploadVideo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
