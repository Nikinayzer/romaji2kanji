import React from "react";
import "../../../styles/FAQPage.css";

const FAQPage: React.FC = () => {
  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq">
        <h2>What is Romaji2Kanji?</h2>
        <p>
          Romaji2Kanji is an application designed to help you practice and learn
          Japanese hiragana and katakana by converting words between kana and
          romaji. It's a useful tool for learners at begginer level.
        </p>
      </div>
      <div className="faq">
        <h2>How do I use the app?</h2>
        <p>
          Simply select the mode you want to practice: Kana to Romaji (K2R) or
          Romaji to Kana (R2K). In R2K, you will need to rewrite given word in
          romaji. In K2R - the opposite thing.
        </p>
      </div>
      <div className="faq">
        <h2>What are Hiragana and Katakana?</h2>
        <p>
          Hiragana and Katakana are two of the three writing systems used in
          Japanese. Hiragana is primarily used for native Japanese words, while
          Katakana is used for foreign words and names.
        </p>
      </div>
      <div className="faq">
        <h2>What is Romaji?</h2>
        <p>
          Romaji is the Romanization of Japanese sounds. It uses the Latin
          alphabet to represent Japanese syllables, making it easier for
          learners who are not yet familiar with kana and want to improve
          reading/writing.
        </p>
      </div>
      <div className="faq">
        <h2>Can I report errors or suggestions?</h2>
        <p>
          Yes, you can report any errors or suggestions using the report feature
          in the app. I appreciate your feedback to help me improve the
          application.
        </p>
      </div>
    </div>
  );
};

export default FAQPage;
