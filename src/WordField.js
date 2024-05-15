import './App.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue, setGuessWord, setAppMode } from './actions';
import * as wanakana from "wanakana";
import * as japanese from "japanese";
import Util from "./util";

function WordField() {
    const guessWord = useSelector((state) => state.guessWord);
    const appMode = useSelector((state) => state.appMode);
    const dispatch = useDispatch();

    const splitWord = Util.splitWordToCharsObject(guessWord.jp);

    const [hoveredChar, setHoveredChar] = useState(null);

    const handleHover = (char) => {
        setHoveredChar(char);
    };

    const handleMouseLeave = () => {
        setHoveredChar(null);
    };

    const renderWord = () => {
        //const charsArray = appMode === 'r2k' ? splitWord.rmj : splitWord.wd;
        const charsArray = splitWord.wd
        return charsArray.map((char, index) => {
            const uniqueKey = `${char}-${index}`;
            const isActive = hoveredChar === uniqueKey;

            return (
                <span
                    className={`word-part ${isActive ? 'active' : ''}`}
                    key={index}
                    onMouseEnter={() => handleHover(uniqueKey)}
                    onMouseLeave={handleMouseLeave}
                    ref={el => {
                        if (el && isActive) {
                            const rect = el.getBoundingClientRect();
                            const middleX = rect.left + rect.width / 2;
                            const tooltip = el.querySelector('.tooltip');
                            tooltip.style.left = `${middleX}px`;
                        }
                    }}
                >
                    { appMode === 'r2k' ? japanese.romanize(char, 'modified hepburn') : char}
                    <span className={`tooltip ${isActive ? 'active' : ''}`}>
                        {//isActive ? ((appMode === 'r2k') ? wanakana.toKana(char) : wanakana.toRomaji(char)) : ""
                        isActive ? ((appMode === 'r2k') ? char : japanese.romanize(char)) : ""}
                    </span>
                </span>
            );
        });
    };

    return (
        <div className='word-field'>
            <div className='word-container'>
                {renderWord()}
                <button id="new-word-button"
                    onClick={() => {
                        dispatch(setGuessWord(Util.randomNewWord()));
                        dispatch(setInputValue(''));
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" /></svg>
                </button>
            </div>
            <div className='word-info'>
                <div className='word-info-item'>
                    <div className='word-info-title'><img width="25" height="25" src="https://img.icons8.com/color/48/great-britain-circular.png" alt="great-britain-circular"/></div>
                    <span className='word-info-value'>{guessWord.mean}</span>
                </div>
            </div>
        </div>
    );
}

export default WordField;
