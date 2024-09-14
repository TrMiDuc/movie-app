import React, { useState } from 'react';
import axios from 'axios';
import '../css/AuthForm.css';
import { Header } from './Header';
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({ onSignUp }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('typing');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setStatus('typing');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/auth/signup', {
                username,
                password
            });
            setStatus('success');
            onSignUp(response.data.user.username);
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
                console.error(err);
            }
            setStatus('typing');
        }
    };

    return (
        <>
            <Header/>
            <div className="auth-form">
                <h2>Sign Up</h2>
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
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={status === 'submitting'}
                            required
                        />
                    </div>
                    <button type="submit" disabled={status === 'submitting'}>Sign Up</button>
                </form>
            </div>
        </>
    );
};

export { SignUpForm };
