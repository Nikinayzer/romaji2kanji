import { tokenize } from "wanakana";

/**
 * Tokenizer class for tokenizing Japanese words.
 */
class Tokenizer {
  /**
   * Tokenizes the given word, using regex to split the word into characters. Some of the characters are combined into digraphs, long vowels, etc; so they make up a single sound, different to original characters)
   * @param word - The word to tokenize.
   * @returns The tokenized word.
   */
  public static tokenize(word: string): string[] {
    const wdChars:string[] = Array.from(word);
    const hiraganaDigraphs: RegExp = /[きしちにひみりぎじぢびぴ]/;
    const katakanaDigraphs: RegExp = /[キシチニヒミリギジヂビピ]/;
    const digraphsSuffix: RegExp = /[ゃゅょャュョ]/;
    const smallTsu: RegExp = /[っッ]/;
    const vowels: RegExp = /[あいうえおアイウエオ]/;

    interface DoubleVowelMatch {
      [key: string]: RegExp;
    }
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
    return wdChars;
  }
}

export default Tokenizer;
