import React, { useState } from 'react';
import axios from 'axios';
import '../css/AuthForm.css';
import { Header } from './Header';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const setCookie = (name, value, hours) => {
    const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const removeCookie = (name) => {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
};

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [status, setStatus] = useState('typing');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setError('');

        try {
            var token = getCookie('auth_token');
            if (token) {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const currentTime = Math.floor(Date.now() / 1000);
                if (payload.exp > currentTime) {
                    removeCookie('auth_token');
                }
            }

            const response = await axios.post('http://localhost:5000/auth/login', {
                username,
                password,
            });

            token = response.data.token;

            setCookie('auth_token', token, 1);

            setStatus('success');
            onLogin(response.data.token);
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                console.log(err);
                setError('An error occurred. Please try again.');
            }
            setStatus('typing');
        }
    };

    return (
        <>
            <Header />
            <div className="auth-form">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={status === 'submitting'}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={status === 'submitting'}
                            required
                        />
                    </div>
                    <button type="submit" disabled={status === 'submitting'}>Login</button>
                </form>
            </div>
        </>
    );
};

export { LoginForm };