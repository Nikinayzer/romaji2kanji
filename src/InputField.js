import './App.css';
import React, { useState } from 'react';
import hiragana from "./hiragana.json"; //hiragana.json is a file that contains the hiragana characters and their corresponding romaji
import katagana from "./katagana.json"; //katagana.json is a file that contains the katagana characters and their corresponding romaji


function InputField() {
    const [inputValue, setInputValue] = useState('');
    const [potentialSymbol, setPotentialSymbol] = useState('');

    const handleKeyPress = (event) => {
        const pressedKey = event.key;
    
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDownCapture={(e) => handleKeyPress(e)}
                placeholder="Type here..."
            />
        </div>
    );
}

export default InputField;
