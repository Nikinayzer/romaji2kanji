import "../styles/App.css";
import "../styles/Layout.css";
import hiragana from "../data/hiragana.json";
import katakana from "../data/katakana.json";
import Util from "../logic/util";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setInputValue,
  setTypingMode,
  setShowLayout,
  APPMODE,
} from "../redux/feautures/appStateSlice";
import { Symbol } from "../type_declarations/types";

import Modal from "./Modal";

const Layout: React.FC = () => {
  const inputValue = useAppSelector((state) => state.appState.inputValue);
  const typingMode = useAppSelector((state) => state.appState.typingMode);
  const showLayout = useAppSelector((state) => state.appState.showLayout);
  const appMode = useAppSelector((state) => state.appState.appMode);
  const dispatch = useAppDispatch();

  const [showRomaji, setShowRomaji] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleKeyPress = (kana: string) => {
    if (appMode !== APPMODE.K2R) {
      dispatch(setInputValue(inputValue + kana));
    }
  };

  const filterKeys = (data: Symbol[], types: string[]) =>
    data.filter((d) => types.includes(d.type));
  const chunkKeys = (keys: Symbol[]) => Util.chunkArray(keys, 5);

  const getFilteredAndChunkedKeys = (data: Symbol[]) => ({
    gojuuon: chunkKeys(filterKeys(data, ["gojuuon", "empty"])),
    additional: chunkKeys(filterKeys(data, ["dakuon", "handakuon"])),
  });

  const hiraKeys = getFilteredAndChunkedKeys(hiragana);
  const kataKeys = getFilteredAndChunkedKeys(katakana);

  const renderLayout = (chunks: Symbol[][]) =>
    chunks.map((chunk, index) => (
      <div key={index} className="layout-column">
        {chunk.map((d, idx) => (
          <div
            key={idx}
            className={`key ${d.type === "empty" ? "key-empty" : ""} ${
              appMode === APPMODE.K2R ? "disabled" : ""
            }`}
            onClick={() =>
              handleKeyPress(appMode === APPMODE.R2K ? d.kana : d.roumaji)
            }
          >
            <span className="key-kana">{d.kana}</span>
            {showRomaji && <span className="key-romaji">{d.roumaji}</span>}
          </div>
        ))}
      </div>
    ));

  return (
    <div className="keyboard">
      <div className={`layout${!showLayout ? " hide" : ""}`}>
        {showLayout && (
          <>
            <div className="gojuuon-layout layout-part">
              {renderLayout(
                typingMode === "hiragana" ? hiraKeys.gojuuon : kataKeys.gojuuon
              )}
            </div>
            <div className="layout-divider"></div>
            <div className="dakuon-layout layout-part">
              {renderLayout(
                typingMode === "hiragana"
                  ? hiraKeys.additional
                  : kataKeys.additional
              )}
            </div>
          </>
        )}
      </div>

      <div className="layout-buttons-container">
        <div className="layout-buttons">
          <button
            className={showLayout ? "active" : ""}
            onClick={() => dispatch(setShowLayout(!showLayout))}
            data-testid="toggle-layout-button"
            //disabled={appMode === "k2r"}
          >
            あ
          </button>
          <button
            className={showRomaji && showLayout ? "active" : ""}
            onClick={() => setShowRomaji(!showRomaji)}
            data-testid="toggle-romaji-button"
            //disabled={appMode === "k2r" || !showLayout}
          >
            A
          </button>

          <div className="layout-switch">
            <button
              className="layout-switch-hira"
              data-testid="toggle-hira-kana-button"
              data-active={typingMode === "hiragana"}
              onClick={() => dispatch(setTypingMode("hiragana"))}
              //disabled={appMode === "k2r" || !showLayout}
            >
              Hiragana
            </button>
            <button
              className="layout-switch-kata"
              data-active={typingMode === "katakana"}
              onClick={() => dispatch(setTypingMode("katakana"))}
              //disabled={appMode === "k2r" || !showLayout}
            >
              Katakana
            </button>
          </div>
          <button>
            <div
              className="report-button-container"
              title="Report a word"
              onClick={() => setShowModal(true)}
            >
              🚩
            </div>
          </button>
        </div>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Layout;
