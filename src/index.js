import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import { MovieDetail } from './components/js/MovieDetail';
import { SearchTemplate } from './components/js/SearchTemplate';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/search/:query" element={<SearchTemplate />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);