import './App.css';
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue, setGuessWord } from './actions';
import words from './words.json'; //words library
import * as wanakana from "wanakana";
import Util from "./util";

function InputField() {
    const inputValue = useSelector((state) => state.inputValue);
    const guessWord = useSelector((state) => state.guessWord);
    const appMode = useSelector((state) => state.appMode);
    const typingMode = useSelector((state) => state.typingMode);
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    useEffect(() => {
        //randomNewWord();
    }, []);

    useEffect(() => {
        //const newInputValue = wanakana.toKana(inputValue);
        //inputRef.current.value = newInputValue;
    }, [inputValue]);

    const handleChange = (e) => {
        //dispatch(setInputValue(e.target.value));
        const typedValue = e.target.value;
        dispatch(setInputValue(typedValue));
    };

    /*
    const randomNewWord = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        const choosenWord = words[randomIndex];
        
        console.log(choosenWord);
        console.log(choosenWord.jp.wd);
        console.log("Random index: " + randomIndex);
        console.log("New word: " + choosenWord.jp.wd);
        console.log("New word in hiragana: " + wanakana.toHiragana(choosenWord.jp.wd));
        console.log("New word in kanji: " + wanakana.toHiragana(choosenWord.jp.kj));
        console.log("New word in romaji: " + wanakana.toRomaji(wanakana.toHiragana(choosenWord.jp.wd)));

        dispatch(setGuessWord(choosenWord));
    };
    */

    // Function to handle the submit button
    const handleSubmit = () => {
        const inputWord = inputRef.current.value;
        const inputWordRomaji = wanakana.toRomaji(inputWord);
        //const guessWordRomaji = wanakana.toRomaji(guessWord[0].jp.wd);
        console.log(wanakana.toKana(inputWord));
        console.log(guessWord);
        if (inputWord === guessWord.jp.wd) { // romaji to kanji logic
            console.log("Correct guess!");
            dispatch(setGuessWord(Util.randomNewWord()));
            dispatch(setInputValue(''));
        }
    };



    return (
        <div className='input-field'>
            <div className="input-container">
                <input
                    type="text"
                    disabled={appMode === 'r2k'}
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={appMode === 'r2k'? "Use keyboard below" : 'Type here...'}
                />
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default InputField;
