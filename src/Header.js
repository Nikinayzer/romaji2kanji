import './App.css';
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue, setGuessWord, setAppMode } from './actions';
import * as wanakana from "wanakana";
import Util from "./util";

function Header() {
    const appMode = useSelector((state) => state.appMode);
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const handleModeChange = (mode) => {
        dispatch(setAppMode(mode));
    }

    return (
        <header className="App-header">
            <h1>Hello Akari</h1>
            <div className="mode-switch">
                <button
                    className={`mode-button ${appMode === 'r2k' ? 'active' : ''}`}
                    onClick={() => handleModeChange('r2k')}
                >
                    R2K
                </button>
                <button
                    className={`mode-button ${appMode === 'k2r' ? 'active' : ''}`}
                    onClick={() => handleModeChange('k2r')}
                >
                    K2R
                </button>
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
