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
        
        return charsArray.map((char, index) => (
            <span 
                className='word-part'
                key={index}
                onMouseEnter={() => handleHover(appMode === 'r2k' ? char : wanakana.toRomaji(char))}
                onMouseLeave={handleMouseLeave}
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
                New
            </button>
        </div>
    );
}

export default WordField;
