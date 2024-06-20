import { Word } from "../type_declarations/types";
import * as japanese from "japanese";
import * as wanakana from "wanakana";
import Tokenizer from "./Tokenizer";
import JapaneseConfigFactory from "./JapaneseConfigFactory";
import { APPMODE } from "../redux/feautures/appStateSlice";

/**
 * Controller for handling answers
 */
class AnswerController {
  /**
   * Initialize the default config for romanization using the JapaneseConfigFactory
   * @see JapaneseConfigFactory
   * @returns Default config for romanization
   */
  private static initializeDefaultConfig(): Record<string, string> {
    const configFactory = new JapaneseConfigFactory();
    return configFactory.getDefaultConfig();
  }
  private static defaultConfig: Record<string, string> =
    AnswerController.initializeDefaultConfig();

  private static getCorrectOptions(inputWord: string): Romanizations {
    return {
      default: japanese.romanize(inputWord, this.defaultConfig),
      wiki: japanese.romanize(inputWord, "wikipedia"),
      hepburn: japanese.romanize(inputWord, "traditional hepburn"),
      modhepburn: japanese.romanize(inputWord, "modified hepburn"),
      nihon: japanese.romanize(inputWord, "nihon"),
    };
  }

  /**
   * Function to check if an answer is correct
   * @param inputWord - The word input by the user
   * @param guessWord - The word to guess
   * @param appMode - The mode of the application
   * @returns Boolean indicating if the answer is correct
   */
  public static checkAnswer(
    inputWord: string,
    guessWord: GuessWord,
    appMode: APPMODE
  ): boolean {
    let isCorrect = false;
    if (appMode === APPMODE.R2K) {
      isCorrect = inputWord === guessWord.kana;
    } else {
      const romanizations: Romanizations = this.getCorrectOptions(
        guessWord.kana
      );
      const romanizationsKonn: Romanizations = this.getCorrectOptions(
        "こんにちは"
      );
      console.log(romanizationsKonn)

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
