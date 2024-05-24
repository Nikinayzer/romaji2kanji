import { Word } from "../type_declarations/types";
import words from "../data/words.json";

export class WordController {
  /**
   * Method to get a random word based on the inclusion of Hiragana and Katakana
   * @param includeHiragana - Boolean to include Hiragana words
   * @param includeKatakana - Boolean to include Katakana words
   * @returns A random word matching the specified criteria
   */
  public static getRandomWord(
    includeHiragana: boolean,
    includeKatakana: boolean
  ): Word {
    let filteredWords = words;

    if (!includeHiragana) {
      filteredWords = this.filterKatakanaWords(filteredWords);
    }

    if (!includeKatakana) {
      filteredWords = this.filterHiraganaWords(filteredWords);
    }

    return this.getRandomElement(filteredWords);
  }

  /**
   * Private method to filter out Hiragana words
   * @param words - Array of words to filter
   * @returns Filtered array of words including only Katakana
   */
  private static filterHiraganaWords(words: Word[]): Word[] {
    return words.filter((word) => word.jp.isKatakana === false);
  }

  /**
   * Private method to filter out Katakana words
   * @param words - Array of words to filter
   * @returns Filtered array of words including only Hiragana
   */
  private static filterKatakanaWords(words: Word[]): Word[] {
    return words.filter((word) => word.jp.isKatakana === true);
  }

  /**
   * Private method to get a random element from an array
   * @param array - Array from which to select a random element
   * @returns A random element from the array
   */
  private static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}
