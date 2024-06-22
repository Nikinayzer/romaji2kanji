import * as japanese from "japanese";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import "../styles/modal.scss";

import { ModalProps } from "../type_declarations/types";

interface ErrorReport {
  reportedWord: string;
  inputValue: string;
  appMode: string;
  variant: string;
  notes: string;
}
enum ModalType {
  REPORT,
  SETTINGS,
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const inputValue = useAppSelector((state) => state.appState.inputValue);
  const guessWord = useAppSelector((state) => state.appState.guessWord);
  const appMode = useAppSelector((state) => state.appState.appMode);
  const [variant, setVariant] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [reportText, setReportText] = useState<string>("");
  const [modalType, setModalType] = useState<ModalType>(ModalType.REPORT);
  useEffect(() => {
    if(modalType === ModalType.REPORT) {
      setReportText("");
    }
  }, 
  []);
  useEffect(() => {
    setVariant(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (guessWord) {
      const errorReport: ErrorReport = {
        reportedWord: guessWord.kana,
        inputValue: japanese.romanize(guessWord.kana),
        appMode: appMode.toString(),
        variant: variant,
        notes: notes,
      };

      const jsonBody = JSON.stringify(errorReport, null, 2);
      setReportText(jsonBody);
    }
  }, [guessWord, appMode, variant, notes]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = encodeURIComponent("Wrong Word Report");
    const githubUrl = `https://github.com/nikinayzer/romaji2kanji/issues/new?title=${title}&body=${reportText}`;

    window.open(githubUrl, "_blank");

    onClose();
  };

  const handleMailSubmit = () => {
    const subject = encodeURIComponent("Wrong Word Report");
    const body = encodeURIComponent(reportText);
    const mailtoUrl = `mailto:nikinayzer@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;

    onClose();
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
            {children}
          </div>
        </div>
      )}
    </>
  );
};


export default Modal;
