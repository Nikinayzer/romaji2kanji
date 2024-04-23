import words from './words.json'; //words library
import * as wanakana from "wanakana"; //wanakana library


/**
 * Function to chunk an array into smaller arrays
 * @param {*} array 
 * @param {*} size 
 * @returns 
 */
function chunkArray(array, size) {
    const chunkedArray = [];
    
    for (let i = 0; i < array.length; i += size) {
      const chunk = array.slice(i, i + size);
      chunkedArray.push(chunk);
    }
    
    return chunkedArray;
}
/**
 * Randomly selects a new word from the words library
 * @returns {Object} The new word object, need to be dispatched to the store
 */
function randomNewWord(){

    const randomIndex = Math.floor(Math.random() * words.length);
    const choosenWord = words[randomIndex];
    
    console.log(choosenWord);
    console.log(choosenWord.jp.wd);
    console.log("Random index: " + randomIndex);
    console.log("New word: " + choosenWord.jp.wd);
    console.log("New word in hiragana: " + wanakana.toHiragana(choosenWord.jp.wd));
    console.log("New word in kanji: " + wanakana.toHiragana(choosenWord.jp.kj));
    console.log("New word in romaji: " + wanakana.toRomaji(wanakana.toHiragana(choosenWord.jp.wd)));

    //dispatch(setGuessWord(choosenWord)); //dispatch to the store
    return choosenWord;
};
export default { chunkArray, randomNewWord };
