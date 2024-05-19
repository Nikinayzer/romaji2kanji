import words from "../data/words.json"; //words library
import * as japanese from "japanese"; //japanese library
import * as wanakana from "wanakana"; //wanakana library

const japaneseConfig = {
  し: "shi si",
  ち: "chi ti",
  つ: "tsu tu",
  ふ: "hu fu",
  じ: "ji zi",
  ぢ: "di zi ji dzi dji",
  づ: "du zu dsu dzu",
  ああ: "aa ah â ā a",
  いい: "ii ih î ī i",
  うう: "uu uh û ū u",
  ええ: "ee eh ê ē e",
  おお: "oo oh ô ō o",
  あー: "aa a- ah â ā a",
  えい: "ei ee eh ê ē e",
  おう: "ou oo oh ô ō o",
  んあ: "na n'a n-a",
  んば: "nba mba",
  っち: "tti tchi cchi",
  ゐ: "i wi",
  を: "o wo",
};
const makeDefaultConfig = () => {
  const defaultConfig = {};

  const keys = Object.keys(japaneseConfig);
  for (let i = 0; i < keys.length; i++) {
    const values = japaneseConfig[keys[i]].split(" ");
    defaultConfig[keys[i]] = values[0];
  }
  return defaultConfig;
};
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
function findWrongPart(inputWord, guessWord, appMode) {
  const defaultConfig = makeDefaultConfig();
  const tokenizedGuessWord = tokenize(guessWord.jp);
  console.log("input: " + japanese.romanize(guessWord.jp.wd, defaultConfig));
  console.log("tokenizedGuessWord: " + tokenizedGuessWord.wd);

  const tokenizedInputWord = {
    default: [],
    wiki: [],
    hepburn: [],
    modhepburn: [],
    nihon: [],
  };

  for (let i = 0; i < tokenizedGuessWord.wd.length; i++) {
    tokenizedInputWord.default.push(
      japanese.romanize(tokenizedGuessWord.wd[i], defaultConfig)
    );
    tokenizedInputWord.wiki.push(
      japanese.romanize(tokenizedGuessWord.wd[i], "wikipedia")
    );
    tokenizedInputWord.hepburn.push(
      japanese.romanize(tokenizedGuessWord.wd[i], "traditional hepburn")
    );
    tokenizedInputWord.modhepburn.push(
      japanese.romanize(tokenizedGuessWord.wd[i], "modified hepburn")
    );
    tokenizedInputWord.nihon.push(
      japanese.romanize(tokenizedGuessWord.wd[i], "nihon")
    );
  }
}
const getRandomWord = (includeHiragana, includeKatakana) => {
  let filteredWords = words;

  if (!includeHiragana) {
    filteredWords = filteredWords.filter(word => word.jp.isKatakana === true);
  }

  if (!includeKatakana) {
    filteredWords = filteredWords.filter(word => word.jp.isKatakana === false);
  }

  const randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];

  return randomWord;
};
/**
 *  Function to check if the input word is correct. Compares the input word with the guess word: in r2k compares if input (in kana) is equal to guess (in kana),
 *  in k2r compares if input (in romaji) is equal to guess (multiple romanization options are considered correct)
 *
 * @param {string} inputWord  The word input by the user
 * @param {Object} guessWord  The word object that the user should guess
 * @param {string} appMode   The current app mode
 * @returns {boolean}  True if the input word is correct, false otherwise
 */
function checkAnswer(inputWord, guessWord, appMode) {
  const defaultConfig = makeDefaultConfig();

  let isCorrect = false;

  if (appMode === "r2k" && inputWord === guessWord.jp.wd) {
    isCorrect = true;
  } else if (appMode === "k2r") {
    const inputWordOptions = {
      default: japanese.romanize(guessWord.jp.wd, defaultConfig),
      wiki: japanese.romanize(guessWord.jp.wd, "wikipedia"),
      hepburn: japanese.romanize(guessWord.jp.wd, "traditional hepburn"),
      modhepburn: japanese.romanize(guessWord.jp.wd, "modified hepburn"),
      nihon: japanese.romanize(guessWord.jp.wd, "nihon"),
    };
    //console.log(inputWordOptions);

    // Check if inputWord matches any of the values in inputWordOptions
    for (let key in inputWordOptions) {
      if (inputWord === inputWordOptions[key]) {
        isCorrect = true;
        break;
      }
    }
  }

  return isCorrect;
}


/**
 * Tokenizes a word into smaller parts.
 *
 * @param {Object} obj The word object to tokenize
 * @returns {Object} The tokenized word object with the wd property containing the array with tokens
 */
function tokenize(obj) {
  const wdChars = [...obj.wd];
  const hiraganaDigraphs = /[きしちにひみりぎじぢびぴ]/;
  const katakanaDigraphs = /[キシチニヒミリギジヂビピ]/;
  const digraphsSuffix = /[ゃゅょャュョ]/;
  const smallTsu = /[っッ]/;
  const vowels = /[あいうえおアイウエオ]/;
  const doubleVowelMatch = {
    あ: /[かさたなはまやらわがざだばぱカサタナハマヤラワ]/,
    い: /[きしちにひみりぎじぢびぴキシチニヒミリギジヂビピ]/,
    う: /[くすつぬふむゆるぐずづぶぷクスツヌフムユルグズヅブプ]/,
    え: /[けせてねへめれげぜでべぺケセテネヘメレゲゼデベペ]/,
    お: /[こそとのほもよろをごぞどぽコソトノホモヨロヲゴゾドポ]/,
  };
  const uCombinations = /[よゅくこふとょぞどそろほぼ]/;

  for (let i = 0; i < wdChars.length; i++) {
    // Long vowels
    if (wdChars[i] === "ー" && i > 0) {
      wdChars[i - 1] += wdChars[i];
      wdChars.splice(i, 1);
      i--;
      continue;
    }
    // Digraphs
    if (
      (hiraganaDigraphs.test(wdChars[i]) ||
        katakanaDigraphs.test(wdChars[i])) &&
      digraphsSuffix.test(wdChars[i + 1])
    ) {
      wdChars[i] += wdChars[i + 1];
      wdChars.splice(i + 1, 1);
      continue;
    }
    // うウ combinations
    if (
      i > 0 &&
      wdChars[i].match(/[うウ]/) &&
      uCombinations.test(wdChars[i - 1])
    ) {
      wdChars[i - 1] += wdChars[i];
      wdChars.splice(i, 1);
      i--;
      continue;
    }
    // Small tsu (っッ)
    if (smallTsu.test(wdChars[i]) && wdChars[i + 1]) {
      wdChars[i + 1] = wdChars[i] + wdChars[i + 1];
      wdChars.splice(i, 1);
      continue;
    }
    // Double vowels
    if (vowels.test(wdChars[i]) && wdChars[i] === wdChars[i + 1]) {
      wdChars[i] += wdChars[i + 1];
      wdChars.splice(i + 1, 1);
      continue;
    }
    // Same vowel as previous last sound (character)
    const prevChar = wdChars[i - 1];
    if (
      prevChar &&
      wdChars[i] in doubleVowelMatch &&
      doubleVowelMatch[wdChars[i]].test(prevChar)
    ) {
      wdChars[i - 1] += wdChars[i];
      wdChars.splice(i, 1);
      i--;
      continue;
    }
  }

  return {
    wd: wdChars,
  };
}

export default {
  makeDefaultConfig,
  chunkArray,
  checkAnswer,
  getRandomWord,
  tokenize,
};
