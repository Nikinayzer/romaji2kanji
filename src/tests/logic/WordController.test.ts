import { WordController } from "../../logic/WordController";
import words from "../../data/words.json";

describe("WordController", () => {
  describe("getRandomWord", () => {
    it("check if words.json is imported correctly", () => {
      expect(words).toBeDefined();
    });
    it("check if words.json is not empty", () => {
      expect(words.length).toBeGreaterThan(0);
    });
    it("should return a random word including both Hiragana and Katakana when includeHiragana and includeKatakana are true", () => {
      const randomWord = WordController.getRandomWord(true, true);
      const isHiragana = randomWord.jp.isKatakana;
      expect(isHiragana).toBeDefined();
    });

    it("should return a random word including only Katakana when includeHiragana is false", () => {
      const randomWord = WordController.getRandomWord(false, true);
      const isHiragana = randomWord.jp.isKatakana;
      expect(isHiragana).toBe(false);
    });

    it("should return a random word including only Hiragana when includeKatakana is false", () => {
      const randomWord = WordController.getRandomWord(true, false);
      const isHiragana = randomWord.jp.isKatakana;
      expect(isHiragana).toBe(true);
    });
  });
});
