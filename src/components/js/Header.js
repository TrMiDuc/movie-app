import React, { useEffect, useState } from 'react';
import '../css/Header.css';

const Header = () => {
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

    return (
        <div
            className="head"
            style={{
                position: isAtTop ? 'relative' : 'fixed',
                top: visible ? '0' : isAtTop ? 'auto' : '-100px',
            }}
        >
            <div className="header-left">
                <h1>
                    <a href="./index.js">Movies</a>
                </h1>
            </div>
            <div className="header-right">
                <div className="search">
                    <i className="fa fa-search"></i>
                    <input type="text" className="search-box" placeholder="search for a movies"></input>
                    <button className="btn btn-primary" onClick={writeConsole}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

function writeConsole() {
    console.log("Writing");
}

export { Header };
