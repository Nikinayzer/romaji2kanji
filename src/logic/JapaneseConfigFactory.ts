class JapaneseConfigFactory {
  japaneseConfig: JapaneseConfig = {
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

  public getDefaultConfig(): Record<string, string> {
    const defaultConfig: Record<string, string> = {};

    for (const [key, value] of Object.entries(this.japaneseConfig)) {
      const values = value.split(" ");
      defaultConfig[key] = values[0];
    }

    return defaultConfig;
  }
}
interface JapaneseConfig {
  [key: string]: string;
}
export default JapaneseConfigFactory;
