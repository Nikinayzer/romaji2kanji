import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue, setGuessWord } from './actions';
//import words from './words.json'; //words library
import * as wanakana from "wanakana";
import Util from "./util";


function WordField() {
    const guessWord = useSelector((state) => state.guessWord);
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    useEffect(() => {
        //wanakana.bind(inputRef.current);

    }, []);

    useEffect(() => {
        //const newInputValue = wanakana.toKana(inputValue);
        //inputRef.current.value = newInputValue;
        //debug
        //console.log(guessWord);
        //console.log(guessWord[0].img)
    }, [guessWord]);

    const handleChange = (e) => {
        //dispatch(setInputValue(e.target.value));
        //const typedValue = e.target.value;
        //dispatch(setInputValue(typedValue));
        dispatch(setGuessWord(Util.randomNewWord()));
        dispatch(setInputValue(''));
    };
    const chunkedWord = wanakana.tokenize(guessWord.jp.wd)

    return (
        <div className='word-field'>
            <h1>{
                wanakana.tokenize(wanakana.toRomaji(guessWord.jp.wd))
                /*
                chunkedWord.map((token, index) => (
                    <span key={index}>{token}</span>
                  ))
                  */
            }</h1>
            <button onClick={handleChange}>
                New
            </button>
        </div>
    );
}

export default WordField;
