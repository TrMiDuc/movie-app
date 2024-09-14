import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../css/Header.css';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('Guest');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = getCookie('auth_token');

        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            if (payload.exp > currentTime) {
                setIsLoggedIn(true);
                setUsername(payload.username);
            }
        }
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search/${searchQuery}`);
        }
    };

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isAtTop, setIsAtTop] = useState(true);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;

        if (currentScrollPos < 100) {
            setIsAtTop(true);
            setVisible(true);
        } else if (currentScrollPos > prevScrollPos) {
            setIsAtTop(false);
            setVisible(false);
        } else {
            setIsAtTop(false);
            setVisible(true);
        }

        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        document.cookie = 'auth_token=; Max-Age=0; path=/;';
        setIsLoggedIn(false);
        setUsername('Guest');
        navigate('/login');
    };

    const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <div
            className="head"
            style={{
                position: isAtTop ? 'relative' : 'fixed',
                top: visible ? '0' : isAtTop ? 'auto' : '-100px',
            }}
        >
            {!isLoginPage && (
                <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <button className="close-btn" onClick={toggleSidebar}>×</button>

                    {isLoggedIn ? (
                        <>
                            <Link to="#" onClick={handleLogout}>Log Out</Link>
                            <div className="sidebar-user">
                                <img src="/path/to/user/logo.png" alt="User Logo" className="user-logo" />
                                <p>{username}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={toggleSidebar}>Log In</Link>
                            <div className="sidebar-user">
                                <img src="/path/to/guest/logo.png" alt="Guest Logo" className="guest-logo" />
                                <p>Guest</p>
                            </div>
                        </>
                    )}
                </div>
            )}

            <div className="header-left">
                {!isLoginPage && (
                    <button onClick={toggleSidebar} className="menu-toggle">
                        ☰
                    </button>
                )}
                <Link to='../../'>
                    <h1>Movies</h1>
                </Link>
            </div>

            <div className="header-right">
                <div className="search">
                    <i className="fa fa-search"></i>
                    <input
                        type="text"
                        className="search-box"
                        placeholder="search for movies"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={handleSearch}
                        disabled={!searchQuery.trim()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export { Header };