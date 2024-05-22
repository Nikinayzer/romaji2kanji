import words from "../data/words.json";
import * as japanese from "japanese";
import { Word } from "../type_declarations/types";

interface JapaneseConfig {
  [key: string]: string;
}
interface Romanizations {
  default: string;
  wiki: string;
  hepburn: string;
  modhepburn: string;
  nihon: string;
}
interface GuessWord extends Word {}

const japaneseConfig: JapaneseConfig = {
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

const makeDefaultConfig = (): Record<string, string> => {
  const defaultConfig: Record<string, string> = {};

  for (const [key, value] of Object.entries(japaneseConfig)) {
    const values = value.split(" ");
    defaultConfig[key] = values[0];
  }

  return defaultConfig;
};

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunkedArray: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunkedArray.push(chunk);
  }

  return chunkedArray;
}

const getRandomWord = (
  includeHiragana: boolean,
  includeKatakana: boolean
): Word => {
  let filteredWords = words;

  if (!includeHiragana) {
    filteredWords = filteredWords.filter((word) => word.jp.isKatakana === true);
  }

  if (!includeKatakana) {
    filteredWords = filteredWords.filter(
      (word) => word.jp.isKatakana === false
    );
  }

  const randomWord =
    filteredWords[Math.floor(Math.random() * filteredWords.length)];

  return randomWord;
};

function findWrongPart(
  inputWord: string,
  guessWord: GuessWord,
  appMode: string
): void {
  const defaultConfig = makeDefaultConfig();
  const tokenizedGuessWord = tokenize(guessWord.jp);

  const tokenizedInputWord: Record<string, string[]> = {
    default: [],
    wiki: [],
    hepburn: [],
    modhepburn: [],
    nihon: [],
  };

  for (let i = 0; i < tokenizedGuessWord.wd.length; i++) {
    const defaultRoman: string = japanese.romanize(
      tokenizedGuessWord.wd[i],
      defaultConfig
    ) as string;
    const wikiRoman: string = japanese.romanize(
      tokenizedGuessWord.wd[i],
      "wikipedia"
    ) as string;
    const hepburnRoman: string = japanese.romanize(
      tokenizedGuessWord.wd[i],
      "traditional hepburn"
    ) as string;
    const modhepburnRoman: string = japanese.romanize(
      tokenizedGuessWord.wd[i],
      "modified hepburn"
    ) as string;
    const nihonRoman: string = japanese.romanize(
      tokenizedGuessWord.wd[i],
      "nihon"
    );

    tokenizedInputWord.default.push(defaultRoman);
    tokenizedInputWord.wiki.push(wikiRoman);
    tokenizedInputWord.hepburn.push(hepburnRoman);
    tokenizedInputWord.modhepburn.push(modhepburnRoman);
    tokenizedInputWord.nihon.push(nihonRoman);
  }
}
function checkAnswer(
  inputWord: string,
  guessWord: GuessWord,
  appMode: string
): boolean {
  const defaultConfig = makeDefaultConfig();

  let isCorrect = false;
  if (appMode === "r2k" && inputWord === guessWord.jp.wd) {
    isCorrect = true;
  } else if (appMode === "k2r") {
    const romanizations: Romanizations = {
      default: japanese.romanize(guessWord.jp.wd, defaultConfig) as string,
      wiki: japanese.romanize(guessWord.jp.wd, "wikipedia") as string,
      hepburn: japanese.romanize(
        guessWord.jp.wd,
        "traditional hepburn"
      ) as string,
      modhepburn: japanese.romanize(
        guessWord.jp.wd,
        "modified hepburn"
      ) as string,
      nihon: japanese.romanize(guessWord.jp.wd, "nihon") as string,
    };
    for (const romanization of Object.values(romanizations)) {
      if (inputWord === romanization) {
        isCorrect = true;
        break;
      }
    }
  }

  return isCorrect;
}

function tokenize(obj: { wd: string }): { wd: string[] } {
  const wdChars = Array.from(obj.wd);
  const hiraganaDigraphs: RegExp = /[きしちにひみりぎじぢびぴ]/;
  const katakanaDigraphs: RegExp = /[キシチニヒミリギジヂビピ]/;
  const digraphsSuffix: RegExp = /[ゃゅょャュョ]/;
  const smallTsu: RegExp = /[っッ]/;
  const vowels: RegExp = /[あいうえおアイウエオ]/;

  type DoubleVowelMatch = {
    [key: string]: RegExp;
  };
  const doubleVowelMatch: DoubleVowelMatch = {
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

const Util = {
  makeDefaultConfig,
  chunkArray,
  checkAnswer,
  getRandomWord,
  tokenize,
};
export default Util;
