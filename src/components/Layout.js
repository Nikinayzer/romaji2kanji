import "../styles/App.css";
import "../styles/Layout.css";
import hiragana from "../data/hiragana.json";
import katakana from "../data/katakana.json";
import Util from "../scripts/util";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue, setTypingMode, setShowLayout } from "../redux/actions";

import Modal from "./Modal.js"; // Import the Modal component

const Layout = () => {
  const inputValue = useSelector((state) => state.inputValue);
  const typingMode = useSelector((state) => state.typingMode);
  const showLayout = useSelector((state) => state.showLayout);

  const [showModal, setShowModal] = useState(false);

  const appMode = useSelector((state) => state.appMode);
  const dispatch = useDispatch();

  // Layout states
  const [showRomaji, setShowRomaji] = useState(true);

  const handleKeyPress = (kana) => {
    if (appMode !== "k2r") {
      dispatch(setInputValue(inputValue + kana));
    }
  };

  const filterKeys = (data, types) =>
    data.filter((d) => types.includes(d.type));
  const chunkKeys = (keys) => Util.chunkArray(keys, 5);

  const getFilteredAndChunkedKeys = (data) => ({
    gojuuon: chunkKeys(filterKeys(data, ["gojuuon", "empty"])),
    additional: chunkKeys(filterKeys(data, ["dakuon", "handakuon"])),
  });

  const hiraKeys = getFilteredAndChunkedKeys(hiragana);
  const kataKeys = getFilteredAndChunkedKeys(katakana);

  const renderLayout = (chunks) =>
    chunks.map((chunk, index) => (
      <div key={index} className="layout-column">
        {chunk.map((d, idx) => (
          <div
            key={idx}
            className={`key ${d.type === "empty" ? "key-empty" : ""} ${
              appMode === "k2r" ? "disabled" : ""
            }`}
            onClick={() =>
              handleKeyPress(appMode === "r2k" ? d.kana : d.roumaji)
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
            //disabled={appMode === "k2r"}
          >
            あ
          </button>
          <button
            className={showRomaji && showLayout ? "active" : ""}
            onClick={() => setShowRomaji(!showRomaji)}
            //disabled={appMode === "k2r" || !showLayout}
          >
            A
          </button>

          <div className="layout-switch">
            <button
              className="layout-switch-hira"
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
