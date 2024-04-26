// store.js
import { createStore } from 'redux';
import words from './words.json'; //words library

// Initial state
const initialState = {
    inputValue: '',
    //guessWord: [words[Math.floor(Math.random() * words.length)]],
    guessWord: words[Math.floor(Math.random() * words.length)],
    typingMode: 'hiragana',
    showLayout: true,
    appMode: 'r2k', //r2k: romaji to kana, k2r: kana to romaji, t: typing
};

// Reducer
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_INPUT_VALUE':
            return {
                ...state,
                inputValue: action.payload
            };
        case 'SET_GUESS_WORD':
            return {
                ...state,
                guessWord: action.payload
            };
        case 'SET_TYPING_MODE':
            return {
                ...state,
                typingMode: action.payload
            };
        case 'SET_APP_MODE':
            return {
                ...state,
                appMode: action.payload
            };
            case 'SET_SHOW_LAYOUT': 
            return {
                ...state,
                showLayout: action.payload
            };
        default:
            return state;
    }
};

// Create store
const store = createStore(rootReducer);

export default store;