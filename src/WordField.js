import './App.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue, setGuessWord, setAppMode } from './actions';
import * as wanakana from "wanakana";
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
        const charsArray = appMode === 'r2k' ? splitWord.rmj : splitWord.wd;

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
                    {char}
                    <span className={`tooltip ${isActive ? 'active' : ''}`}>
                        {isActive ? ((appMode === 'r2k') ? wanakana.toKana(char) : wanakana.toRomaji(char)) : ""}
                    </span>
                </span>
            );
        });
    };

    return (
        <div className='word-field'>
            <div className='word-container'>
                {renderWord()}
            </div>
            <button id="new-word-button"
            onClick={() => {
                dispatch(setGuessWord(Util.randomNewWord()));
                dispatch(setInputValue(''));
            }}>
                
            </button>
        </div>
    );
}

export default WordField;
