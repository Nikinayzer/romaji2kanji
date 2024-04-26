import './App.css';
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue, setGuessWord, setAppMode } from './actions';

function Header() {
    const appMode = useSelector((state) => state.appMode);
    const dispatch = useDispatch();

    const handleModeChange = (mode) => {
        dispatch(setAppMode(mode));
    }

    return (
        <header className="App-header">
            <h1 className="App-logo" data-text="Romaji2kaji">Romaji2kaji</h1>
            <div className="mode-switch">
                <a
                    className={`nav-button ${appMode === 'r2k' ? 'active' : ''}`}
                    onClick={() => handleModeChange('r2k')}
                >
                    R2K
                </a>
                <a
                    className={`nav-button ${appMode === 'k2r' ? 'active' : ''}`}
                    onClick={() => handleModeChange('k2r')}
                >
                    K2R
                </a>
                <a
                    className={`nav-button`}
                >
                    FAQ
                </a>
                <a
                    className={`nav-button`}
                >
                    Romaji rules
                </a>
                {/*
                <button
                    className={`mode-button ${appMode === 't' ? 'active' : ''}`}
                    onClick={() => handleModeChange('t')}   
                >
                    Typing
                </button>
                */}
            </div>
        </header>
    );
}

export default Header;
