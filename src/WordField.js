import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue, setGuessWord, setAppMode } from './actions';
//import words from './words.json'; //words library
import * as wanakana from "wanakana";
import Util from "./util";


function WordField() {
    const guessWord = useSelector((state) => state.guessWord);
    const appMode = useSelector((state) => state.appMode);
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    useEffect(() => {
        //wanakana.bind(inputRef.current);

    }, []);

    const handleChange = (e) => {
        //dispatch(setInputValue(e.target.value));
        //const typedValue = e.target.value;
        //dispatch(setInputValue(typedValue));
        dispatch(setGuessWord(Util.randomNewWord()));
        dispatch(setInputValue(''));
    };
    const test = Util.splitWordToCharsObject(guessWord.jp);
    console.log(test);

    
    const renderWord = () => {
        if (appMode === 'r2k') {
            return (
                <h1>{wanakana.toRomaji(guessWord.jp.wd)}</h1>
            );
        } 
        if (appMode === 'k2r'){
            return (
                <h1>{wanakana.toKana(guessWord.jp.wd)}</h1>
            );
        }
    }
    
    return (
        <div className='word-field'>
            {
                //wanakana.tokenize(wanakana.toRomaji(guessWord.jp.wd))
                renderWord()
                /*
                chunkedWord.map((token, index) => (
                    <span key={index}>{token}</span>
                  ))
                  */
            }
            <button onClick={handleChange}>
                New
            </button>
        </div>
    );
}

export default WordField;
