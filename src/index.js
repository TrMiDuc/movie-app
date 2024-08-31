import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import { MovieDetail } from './components/js/MovieDetail';
import { SearchTemplate } from './components/js/SearchTemplate';
import { LoginForm } from './components/js/LoginForm';
import { SignUpForm } from './components/js/SignUpForm';

const handleLogin = (username) => {
  console.log(username);
};

const handleSignUp = (username) => {
  console.log(username);
}

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:type/:id" element={<MovieDetail />} />
      <Route path="/search/:query" element={<SearchTemplate />} />
      <Route path="/signup" element={<SignUpForm onSignUp={handleSignUp} />} />
      <Route path="/login" element={<LoginForm onLogin={handleLogin}/>} />
    </Routes>
  </Router>,
  document.getElementById('root')
);