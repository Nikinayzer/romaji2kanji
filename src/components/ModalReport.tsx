import React, {useEffect, useState} from "react";
import "../styles/modal.scss";
import {useAppSelector} from "../redux/hooks";
import * as japanese from "japanese";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import {APP_MODE, ReportRequest} from "../type_declarations/types";
import {getEnumString} from "../util/util";
import ApiService from "../api/apiService";

interface ModalReportProps {
  onClose: () => void;
}

const ModalReport: React.FC<ModalReportProps> = ({ onClose }) => {
  const loggedIn = useAppSelector((state) => state.session.loggedIn);
  const inputValue = useAppSelector((state) => state.appState.inputValue);
  const guessWord = useAppSelector((state) => state.appState.guessWord);
  const appMode = useAppSelector((state) => state.appState.appMode);
  const [report, setReport] = useState<ReportRequest>({
    reportedWordId: 0,
    reportedWord: "",
    inputValue: "",
    appMode: "",
    variant: "",
    notes: null,
  });

  useEffect(() => {
    if (guessWord) {
      setReport({
        reportedWordId: guessWord.id,
        reportedWord: guessWord.kana,
        inputValue: japanese.romanize(guessWord.kana),
        appMode: getEnumString(APP_MODE, appMode),
        variant: report.variant,
        notes: report.notes,
      });
    }
  }, [guessWord, appMode]);
  const validateReport = () => {
    if (!report.variant) {
      //alert("Please provide a correct variant.");
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validateReport()) {
      return;
    }
    try {
      const response = await ApiService.createReport(report);
      console.log("Report submitted successfully:", response);
      onClose();
    } catch (error) {
      console.error("Failed to submit report:", error);
      // Handle error state or display an error message to the user
    }
  };

  const handleGitHubSubmit = () => {
    const title = encodeURIComponent("Wrong Word Report");
    const githubUrl = `https://github.com/nikinayzer/romaji2kanji/issues/new?title=${title}&body=${JSON.stringify(
      report,
      null,
      2
    )}`;

    window.open(githubUrl, "_blank");

    onClose();
  };

  const handleMailSubmit = () => {
    const subject = encodeURIComponent("Wrong Word Report");
    const body = encodeURIComponent(JSON.stringify(report, null, 2));
    window.location.href = `mailto:nikinayzer@gmail.com?subject=${subject}&body=${body}`;

    onClose();
  };

  if (!guessWord) {
    return null; // Render nothing if guessWord is null
  }

  return (
    <>
      <div className="modal-form">
        <form>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="reportedWord">Reported word:</label>
              <input
                type="text"
                id="reportedWord"
                value={guessWord?.kana || ""}
                required
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputValue">In romaji:</label>
              <input
                type="text"
                id="inputValue"
                value={guessWord ? japanese.romanize(guessWord.kana) : ""}
                required
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="reportedWord">App mode:</label>
              <input
                type="text"
                id="reportedWord"
                value={report.appMode}
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
              value={report.variant || ""}
              onChange={(e) =>
                setReport({ ...report, variant: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Any notes?</label>
            <input
              type="text"
              id="notes"
              value={report.notes || ""}
              onChange={(e) => setReport({ ...report, notes: e.target.value })}
            />
          </div>
          <div className="form-group code-label">
            <label htmlFor="reportText">Report Text:</label>
            <textarea
              id="reportText"
              value={JSON.stringify(report, null, 2)}
              readOnly
            />
          </div>
          <div className="button-container">
            <button className="system-button" onClick={handleSubmit} disabled={!loggedIn}>
              <FontAwesomeIcon icon={faEnvelope} /> {loggedIn ? "Submit" : "login to Submit"}
            </button>
            <button className="github-button" onClick={handleGitHubSubmit}>
              <FontAwesomeIcon icon={faGithub} /> Submit to GitHub
            </button>
            <button className="mail-button" onClick={handleMailSubmit}>
              <FontAwesomeIcon icon={faEnvelope} /> Submit via Email
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalReport;
