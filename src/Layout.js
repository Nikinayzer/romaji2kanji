import "./App.css";
import hiragana from "./hiragana.json";
import katagana from "./katagana.json";
import Util from "./util";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue, setTypingMode } from './actions';

function Layout() {
  const inputValue = useSelector((state) => state.inputValue);
  const typingMode = useSelector((state) => state.typingMode);
  const dispatch = useDispatch();

  // Layout states
  const [showKana, setShowKana] = useState(true);
  const [showRomaji, setShowRomaji] = useState(true);

  const handleKeyPress = (kana) => {
    dispatch(setInputValue(inputValue + kana));
  };

  const hiraGojuuonKeys = hiragana.filter(d => d.type === "gojuuon" || d.type === "empty");
  const hiraAdditionalKeys = hiragana.filter(d => d.type === "dakuon" || d.type === "handakuon");

  const kataGojuuonKeys = katagana.filter(d => d.type === "gojuuon" || d.type === "empty");
  const kataAdditionalKeys = katagana.filter(d => d.type === "dakuon" || d.type === "handakuon");

  const hiraChunkedGojuuon = Util.chunkArray(hiraGojuuonKeys, 5);
  const hiraChunkedAdditional = Util.chunkArray(hiraAdditionalKeys, 5);

  const kataChunkedGojuuon = Util.chunkArray(kataGojuuonKeys, 5);
  const kataChunkedAdditional = Util.chunkArray(kataAdditionalKeys, 5);

  const hiraGojuuonLayout = hiraChunkedGojuuon.map((chunk, index) => (
    <div key={index} className={"layout-column"}>
      {chunk.map((d, idx) => (
        <div key={idx} className={(d.type === "empty" ? "key-empty" : "key")} onClick={() => handleKeyPress(d.kana)}>
          {showKana && <span className="Keyboard_keyboardKeyTo__OyXaq">{d.kana}</span>}
          {showRomaji && <span className="Keyboard_keyboardKeyFrom__DQFmJ">{d.roumaji}</span>}
        </div>
      ))}
    </div>
  ));
  const hiraAdditionalLayout = hiraChunkedAdditional.map((chunk, index) => (
    <div key={index} className={"layout-column"}>
      {chunk.map((d, idx) => (
        <div key={idx} className={(d.type === "empty" ? "key-empty" : "key")} onClick={() => handleKeyPress(d.kana)}>
          {showKana && <span className="Keyboard_keyboardKeyTo__OyXaq">{d.kana}</span>}
          {showRomaji && <span className="Keyboard_keyboardKeyFrom__DQFmJ">{d.roumaji}</span>}
        </div>
      ))}
    </div>
  ));
  const kataGojuuonLayout = kataChunkedGojuuon.map((chunk, index) => (
    <div key={index} className={"layout-column"}>
      {chunk.map((d, idx) => (
        <div key={idx} className={(d.type === "empty" ? "key-empty" : "key")} onClick={() => handleKeyPress(d.kana)}>
          {showKana && <span className="Keyboard_keyboardKeyTo__OyXaq">{d.kana}</span>}
          {showRomaji && <span className="Keyboard_keyboardKeyFrom__DQFmJ">{d.roumaji}</span>}
        </div>
      ))}
    </div>
  ));
  const kataAdditionalLayout = kataChunkedAdditional.map((chunk, index) => (
    <div key={index} className={"layout-column"}>
      {chunk.map((d, idx) => (
        <div key={idx} className={(d.type === "empty" ? "key-empty" : "key")} onClick={() => handleKeyPress(d.kana)}>
          {showKana && <span className="Keyboard_keyboardKeyTo__OyXaq">{d.kana}</span>}
          {showRomaji && <span className="Keyboard_keyboardKeyFrom__DQFmJ">{d.roumaji}</span>}
        </div>
      ))}
    </div>
  ));

  return (
    <div className="keyboard">
      <div className="layout-buttons">
        <button className={showRomaji ? 'active' : ''}
          onClick={() => setShowRomaji(!showRomaji)}>A</button>
        <button className={showKana ? 'active' : ''}
          onClick={() => setShowKana(!showKana)}>あ</button>
        <div className="layout-switch">
        <button 
    className="layout-switch-hira" 
    data-active={typingMode === "hiragana"} 
    onClick={() => dispatch(setTypingMode("hiragana"))}
  >
    Hiragana
  </button>
  <button 
    className="layout-switch-kata" 
    data-active={typingMode === "katagana"} 
    onClick={() =>  dispatch(setTypingMode("katagana"))}
  >
    Katakana
  </button>
        </div>
      </div>
      <div className="layout">
        <div className="gojuuon-layout layout-part">{(typingMode === "hiragana" ? hiraGojuuonLayout : kataGojuuonLayout)}</div>
        <div className="dakuon-layout layout-part">{(typingMode === "hiragana" ? hiraAdditionalLayout : kataAdditionalLayout)}</div>
      </div>
    </div>
  );
}

export default Layout;