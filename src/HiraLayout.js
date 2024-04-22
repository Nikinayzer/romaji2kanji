import "./App.css";
import hiragana from "./hiragana.json"; //hiragana.json is a file that contains the hiragana characters and their corresponding romaji
import Util from "./Util";

function HiraLayout() {

  const filteredHiraKeys = hiragana.filter(d => 
    d.type !== "youon" && d.type !== "extended"
  );

  const gojuuonKeys = hiragana.filter(d => d.type === "gojuuon" || d.type === "empty");
  const dakuonKeys = hiragana.filter(d => d.type === "dakuon");

  const chunkedGojuuon = Util.chunkArray(gojuuonKeys, 5);
  const chunkedDakuon = Util.chunkArray(dakuonKeys, 5);

  const gojuuonLayout = chunkedGojuuon.map((chunk, index) => (
    <div key={index} className={"layout-column"}>
      {chunk.map((d, idx) => (
        <div key={idx} className={(d.type==="empty"?"key-empty":"key")}>
          <span className="Keyboard_keyboardKeyTo__OyXaq">{d.kana}</span>
          <span className="Keyboard_keyboardKeyFrom__DQFmJ">{d.roumaji}</span>
        </div>
      ))}
    </div>
  ));

  const dakuonLayout = chunkedDakuon.map((chunk, index) => (
    <div key={index} className={"layout-column"}>
      {chunk.map((d, idx) => (
        <div key={idx} className={(d.type==="empty"?"key-empty":"key")}>
          <span className="Keyboard_keyboardKeyTo__OyXaq">{d.kana}</span>
          <span className="Keyboard_keyboardKeyFrom__DQFmJ">{d.roumaji}</span>
        </div>
      ))}
    </div>
  ));

  return <div className="hiragana-layout">
    <div className="gojuuon-layout layout-part">{gojuuonLayout}</div>
    <div className="dakuon-layout layout-part">{dakuonLayout}</div>
    </div>;
}


export default HiraLayout;