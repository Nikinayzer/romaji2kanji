import React, { useEffect, useState } from "react";
import "../styles/Modal.css";
import { useSelector, useDispatch } from "react-redux";
import * as wanakana from "wanakana";
import * as japanese from "japanese";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const Modal = ({ isOpen, onClose }) => {
  const inputValue = useSelector((state) => state.inputValue);
  const typingMode = useSelector((state) => state.typingMode);
  const showLayout = useSelector((state) => state.showLayout);
  const guessWord = useSelector((state) => state.guessWord);

  const appMode = useSelector((state) => state.appMode);
  const [variant, setVariant] = useState("");
  const [notes, setNotes] = useState("");
  const [reportText, setReportText] = useState("");

  useEffect(() => {
    setVariant(inputValue);
  }, [inputValue]);

  useEffect(() => {
    const errorReport = {
      reportedWord: guessWord.jp.wd,
      inputValue: japanese.romanize(guessWord.jp.wd),
      appMode: appMode,
      variant: variant,
      notes: notes,
    };

    const jsonBody = JSON.stringify(errorReport, null, 2);
    setReportText(jsonBody);
  }, [guessWord, appMode, variant, notes]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = encodeURIComponent("Wrong Word Report");
    const body = encodeURIComponent(`Incorrect word: '${guessWord.jp.wd}'`);
    const githubUrl = `https://github.com/nikinayzer/romaji2kanji/issues/new?title=${title}&body=${reportText}`;

    window.open(githubUrl, "_blank");

    onClose();
  };
  const handleMailSubmit = () => {
    const subject = encodeURIComponent("Wrong Word Report");
    const body = encodeURIComponent(reportText);
    const mailtoUrl = `mailto:nikinayzer@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;
  };

  return (
    <>
      {isOpen && (
        <div className="modal-container">
          <div className="modal-overlay" onClick={onClose}></div>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close-button" onClick={onClose}>
                X
              </button>
            </div>
            <div className="modal-form">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="reportedWord">Reported word:</label>
                    <input
                      type="text"
                      id="reportedWord"
                      value={guessWord.jp.wd}
                      required
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputValue">In romaji:</label>
                    <input
                      type="text"
                      id="inputValue"
                      value={japanese.romanize(guessWord.jp.wd)}
                      required
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reportedWord">App mode:</label>
                    <input
                      type="text"
                      id="reportedWord"
                      value={appMode}
                      required
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="variant">What's correct variant?</label>
                  <input
                    type="text"
                    id="variant"
                    value={variant}
                    onChange={(e) => setVariant(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="notes">Any notes?</label>
                  <input
                    type="text"
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                <div className="form-group code-label">
                  <label htmlFor="reportText">Report Text:</label>
                  <textarea
                    id="reportText"
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    required
                    readOnly
                  />
                </div>
                <div className="button-container">
                  <button className="github-button" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faGithub} /> Submit to GitHub
                  </button>
                  <button className="mail-button" onClick={handleMailSubmit}>
                    <FontAwesomeIcon icon={faEnvelope} /> Submit via Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
