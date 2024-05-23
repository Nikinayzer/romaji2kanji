import { Word } from "../type_declarations/types";
import * as japanese from "japanese";
import Tokenizer from "./Tokenizer";
import JapaneseConfigFactory from "./JapaneseConfigFactory";

/**
 * Controller for handling answers
 */
class AnswerController {
  private static defaultConfig: Record<string, string> = AnswerController.initializeDefaultConfig();

  /**
   * Initialize the default config for romanization using the JapaneseConfigFactory
   * @see JapaneseConfigFactory
   * @returns Default config for romanization
   */
  private static initializeDefaultConfig(): Record<string, string> {
    const configFactory = new JapaneseConfigFactory();
    return configFactory.getDefaultConfig();
  }

  /**
   * Function to find the wrong part of an answer
   * @param inputWord - The word input by the user
   * @param guessWord - The word to guess
   * @param appMode - The mode of the application
   */
  private static findWrongPart(
    inputWord: string,
    guessWord: GuessWord,
    appMode: string
  ): void {
    const tokenizedGuessWord = Tokenizer.tokenize(guessWord.jp);

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
        this.defaultConfig
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

  /**
   * Function to check if an answer is correct
   * @param inputWord - The word input by the user
   * @param guessWord - The word to guess
   * @param appMode - The mode of the application
   * @returns Boolean indicating if the answer is correct
   */
  static checkAnswer(
    inputWord: string,
    guessWord: GuessWord,
    appMode: string
  ): boolean {
    let isCorrect = false;
    if (appMode === "r2k" && inputWord === guessWord.jp.wd) {
      isCorrect = true;
    } else if (appMode === "k2r") {
      const romanizations: Romanizations = {
        default: japanese.romanize(
          guessWord.jp.wd,
          this.defaultConfig
        ) as string,
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
      console.log(romanizations);
      for (const romanization of Object.values(romanizations)) {
        if (inputWord === romanization) {
          isCorrect = true;
          break;
        }
      }
    }

    return isCorrect;
  }
}

interface GuessWord extends Word {}
interface Romanizations {
  default: string;
  wiki: string;
  hepburn: string;
  modhepburn: string;
  nihon: string;
}

export default AnswerController;
