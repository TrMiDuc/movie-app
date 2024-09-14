import React, { useState } from 'react';
import axios from 'axios';
import '../css/AuthForm.css';
import { Header } from './Header';

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
            const response = await axios.post('http://localhost:5000/auth/login', {
                username,
                password,
            }, { withCredentials: true });
            console.log(response);
            setStatus('success');
            onLogin();
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
