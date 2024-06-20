import { Word } from "../type_declarations/types";
import ApiService from "../api/apiService";

export class WordController {
  private static words: Word[] = [];

  public static async getWord(includeHiragana: boolean, includeKatakana: boolean): Promise<Word> {
    if (this.words.length === 0) {
      await this.fetchWords(includeHiragana, includeKatakana);
    }

    const filteredWords = this.words.filter(word => 
      (includeHiragana && !word.isKatakana) || (includeKatakana && word.isKatakana)
    );

    if (filteredWords.length === 0) {
      throw new Error('No words found matching the criteria');
    }

    return this.getRandomElement(filteredWords);
  }

  private static async fetchWords(includeHiragana: boolean, includeKatakana: boolean): Promise<void> {
    try {
      const words = await ApiService.fetchWords(100, includeHiragana, includeKatakana);
      this.words = words; // Assuming `this.words` is a static variable to store fetched words
    } catch (error) {
      console.error('Failed to fetch words:', error);
      // Retry after 5 seconds
      await new Promise(resolve => setTimeout(resolve, 5000));
      await this.fetchWords(includeHiragana, includeKatakana); // Recursive call
    }
  }
  

  private static getRandomElement<T>(array: T[]): T {
    if (array.length === 0) {
      throw new Error('Array is empty');
    }
    return array[Math.floor(Math.random() * array.length)];
  }
}