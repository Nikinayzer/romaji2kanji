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
        //console.log(charsArray);
        
        return charsArray.map((char, index) => (
            <span 
                className={"word-part" + (hoveredChar===char?" active":"")}
                key={index}
                onMouseEnter={() => handleHover(char)}
                onMouseLeave={handleMouseLeave}
                ref={el => { 
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        // Calculate middle position dynamically
                        const middleX = rect.left + rect.width / 2;
                        const tooltip = el.querySelector('.tooltip');
                        tooltip.style.left = `${middleX}px`;
                    }
                }}
            >
                {char}
                {(
                    <span className={"tooltip" + (hoveredChar===char?" active":"")}>
                        {appMode === 'r2k' ? wanakana.toKana(char) : wanakana.toRomaji(char)}
                    </span>
                )}
            </span>
        ));
    };

    return (
        <div className='word-field'>
            <div className='word-container'>
            {renderWord()}
            </div>
            <button onClick={() => {
                dispatch(setGuessWord(Util.randomNewWord()));
                dispatch(setInputValue(''));
            }}>
                new
            </button>
        </div>
    );
}

export default WordField;
