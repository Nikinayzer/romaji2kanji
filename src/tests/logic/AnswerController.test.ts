import AnswerController from "../../logic/AnswerController";
import words from "../../data/words.json";

describe("AnswerController", () => {
  test("TRUE for correct answer in r2k mode", () => {
    const inputWord = "どんぐり";
    const index = words.findIndex(
      (searchElement) => searchElement.jp.wd === "どんぐり"
    );
    const guessWord = words[index];
    const appMode = "r2k";
    const result = AnswerController.checkAnswer(inputWord, guessWord, appMode);
    expect(result).toBe(true);
  });

  test("TRUE for correct answer in k2r mode", () => {
    const inputWord = "donguri";
    const index = words.findIndex(
      (searchElement) => searchElement.jp.wd === "どんぐり"
    );
    const guessWord = words[index];
    const appMode = "k2r";
    const result = AnswerController.checkAnswer(inputWord, guessWord, appMode);
    expect(result).toBe(true);
  });

  test("FALSE for incorrect answer in r2k mode", () => {
    const inputWord = "どんぐ";
    const index = words.findIndex(
      (searchElement) => searchElement.jp.wd === "どんぐり"
    );
    const guessWord = words[index];
    const appMode = "r2k";
    const result = AnswerController.checkAnswer(inputWord, guessWord, appMode);
    expect(result).toBe(false);
  });

  test("FALSE for incorrect answer in k2r mode", () => {
    const inputWord = "dongurii";
    const index = words.findIndex(
      (searchElement) => searchElement.jp.wd === "どんぐり"
    );
    const guessWord = words[index];
    const appMode = "k2r";
    const result = AnswerController.checkAnswer(inputWord, guessWord, appMode);
    expect(result).toBe(false);
  });
  //TBC
});
