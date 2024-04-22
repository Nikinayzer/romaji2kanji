import './App.css';
import React, { useRef, useState, useEffect } from 'react';
import hiragana from "./hiragana.json"; //hiragana.json is a file that contains the hiragana characters and their corresponding romaji
import katagana from "./katagana.json"; //katagana.json is a file that contains the katagana characters and their corresponding romaji
import * as wanakana from "wanakana"; //improve import later


function InputField() {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null)

    useEffect(() => {
        console.log(inputRef)
        wanakana.bind(inputRef.current)
      },[])
    

    return (
        <div>
            <input
                type="text"
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                //onKeyDownCapture={(e) => handleKeyPress(e)}
                placeholder="Type here..."
            />
        </div>
    );
}

export default InputField;
