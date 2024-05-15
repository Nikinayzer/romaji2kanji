import "./App.css";
import hiragana from "./hiragana.json";
import katagana from "./katagana.json";
import Util from "./util";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue, setTypingMode, setShowLayout, setAppMode } from './actions';

function Layout() {
  const inputValue = useSelector((state) => state.inputValue);
  const typingMode = useSelector((state) => state.typingMode);
  const showLayout = useSelector((state) => state.showLayout);
  const appMode = useSelector((state) => state.appMode);
  const dispatch = useDispatch();

  // Layout states
  const [showRomaji, setShowRomaji] = useState(true);

  const handleKeyPress = (kana) => {
    dispatch(setInputValue(inputValue + kana));
  };

  const hiraGojuuonKeys = hiragana.filter(d => d.type === "gojuuon" || d.type === "empty"); //empty is for the space between the keys to make it look proper 
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
        <div key={idx} className={(d.type === "empty" ? "key-empty" : "key")} onClick={() => handleKeyPress(appMode === "r2k" ? d.kana : d.roumaji)}>
          <span className="key-kana">{d.kana}</span>
          {showRomaji && <span className="key-romaji">{d.roumaji}</span>}
        </div>
      ))}
    </div>
  ));
  const hiraAdditionalLayout = hiraChunkedAdditional.map((chunk, index) => (
    <div key={index} className={"layout-column"}>
      {chunk.map((d, idx) => (
        <div key={idx} className={(d.type === "empty" ? "key-empty" : "key")} onClick={() => handleKeyPress(appMode === "r2k" ? d.kana : d.roumaji)}>
          <span className="key-kana">{d.kana}</span>
          {showRomaji && <span className="key-romaji">{d.roumaji}</span>}
        </div>
      ))}
    </div>
  ));
  const kataGojuuonLayout = kataChunkedGojuuon.map((chunk, index) => (
    <div key={index} className={"layout-column"}>
      {chunk.map((d, idx) => (
        <div key={idx} className={(d.type === "empty" ? "key-empty" : "key")} onClick={() => handleKeyPress(appMode === "r2k" ? d.kana : d.roumaji)}>
          <span className="key-kana">{d.kana}</span>
          {showRomaji && <span className="key-romaji">{d.roumaji}</span>}
        </div>
      ))}
    </div>
  ));
  const kataAdditionalLayout = kataChunkedAdditional.map((chunk, index) => (
    <div key={index} className={"layout-column"}>
      {chunk.map((d, idx) => (
        <div key={idx} className={(d.type === "empty" ? "key-empty" : "key")} onClick={() => handleKeyPress(appMode === "r2k" ? d.kana : d.roumaji)}>
          <span className="key-kana">{d.kana}</span>
          {showRomaji && <span className="key-romaji">{d.roumaji}</span>}
        </div>
      ))}
    </div>
  ));

  return (
    <div className="keyboard">
      <div className={`layout${!showLayout ? ' hide' : ''}`}>
        {showLayout && <div className="gojuuon-layout layout-part">{(typingMode === "hiragana" ? hiraGojuuonLayout : kataGojuuonLayout)}</div>}
        {showLayout && <div className="layout-divider"></div>}
        {showLayout && <div className="dakuon-layout layout-part">{(typingMode === "hiragana" ? hiraAdditionalLayout : kataAdditionalLayout)}</div>}
      </div>

      <div className="layout-buttons-container">
        <div className="layout-buttons">
          <button className={showLayout ? 'active' : ''}
            onClick={() => dispatch(setShowLayout(!showLayout))}>あ</button>
          <button className={showRomaji && showLayout ? 'active' : ''}
            onClick={() => setShowRomaji(!showRomaji)}
            disabled={!showLayout}
          >A</button>

          <div className="layout-switch">
            <button
              className="layout-switch-hira"
              data-active={typingMode === "hiragana"}
              onClick={() => dispatch(setTypingMode("hiragana"))}
              disabled={!showLayout}
            >
              Hiragana
            </button>
            <button
              className="layout-switch-kata"
              data-active={typingMode === "katagana"}
              onClick={() => dispatch(setTypingMode("katagana"))}
              disabled={!showLayout}
            >
              Katakana
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;