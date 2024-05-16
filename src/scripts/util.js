import words from "../data/words.json"; //words library
import * as wanakana from "wanakana"; //wanakana library
import * as japanese from "japanese"; //japanese library

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
 *  Function to check if the input word is correct
 * @param {string} inputWord  The word input by the user
 * @param {Object} guessWord  The word object that the user should guess
 * @param {string} appMode   The current app mode
 * @returns {boolean}  True if the input word is correct, false otherwise
 */
function checkAnswer(inputWord, guessWord, appMode) {
  return (
    (inputWord === guessWord.jp.wd && appMode === "r2k") ||
    (inputWord === wanakana.toRomaji(guessWord.jp.wd) && appMode === "k2r")
  );
}

/**
 * Randomly selects a new word from the words library
 * @returns {Object} The new word object, need to be dispatched to the store
 */
function randomNewWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  const choosenWord = words[randomIndex];

  console.log(choosenWord);
  console.log(choosenWord.jp.wd);
  console.log("Random index: " + randomIndex);
  console.log("New word: " + choosenWord.jp.wd);
  console.log(
    "New word in hiragana: " + wanakana.toHiragana(choosenWord.jp.wd)
  );
  console.log("New word in kanji: " + wanakana.toHiragana(choosenWord.jp.kj));
  console.log(
    "New word in romaji: " +
      wanakana.toRomaji(wanakana.toHiragana(choosenWord.jp.wd))
  );

  return choosenWord;
}

function splitWordToCharsObject(obj) {
  const wdChars = [...obj.wd];
  for (let i = 0; i < wdChars.length; i++) {
    if (wdChars[i] === "ー") {
      wdChars[i - 1] = wdChars[i - 1] + wdChars[i];
      wdChars.splice(i, 1);
    }
    if (wdChars[i] === "ゃ" || wdChars[i] === "ゅ" || wdChars[i] === "ょ") {
      wdChars[i - 1] = wdChars[i - 1] + wdChars[i];
      wdChars.splice(i, 1);
    }
  }

  return {
    wd: wdChars,
  };
}

export default { chunkArray, checkAnswer, randomNewWord, splitWordToCharsObject };
