import Tokenizer from "../../logic/Tokenizer";
import "@testing-library/jest-dom";

describe("Tokenizer", () => {
  test("without any special characters", () => {
    const word = "のり";
    const expected = ["の","り"];
    const result = Tokenizer.tokenize(word);
    expect(result).toEqual(expected);
  });

  test("long vowels", () => {
    const word = "ジーンズ";
    const expected = ["ジー", "ン", "ズ"];
    const result = Tokenizer.tokenize(word);
    expect(result).toEqual(expected);
  });
  test("small tsu ッ", () => {
    const word = "マッチ";
    const expected = ["マ", "ッチ"];
    const result = Tokenizer.tokenize(word);
    expect(result).toEqual(expected);
  });

  test("digraphs", () => {
    const word = "きょう";
    const expected = ["きょう"];
    const result = Tokenizer.tokenize(word);
    expect(result).toEqual(expected);
  });

  test("う combinations", () => {
    const word = "ようこう";
    const expected = ["よう", "こう"];
    const result = Tokenizer.tokenize(word);
    expect(result).toEqual(expected);
  });
  test("ウ combinations", () => {
    const word = "よウこウ";
    const expected = ["よウ", "こウ"];
    const result = Tokenizer.tokenize(word);
    expect(result).toEqual(expected);
  });

  test("small tsu っ", () => {
    const word = "きっさてん";
    const expected = ["き", "っさ", "て", "ん"];
    const result = Tokenizer.tokenize(word);
    expect(result).toEqual(expected);
  });

  test("same vowel as previous last sound", () => {
    const word = "かあさん";
    const expected = ["かあ", "さ", "ん"];
    const result = Tokenizer.tokenize(word);
    expect(result).toEqual(expected);
  });

});