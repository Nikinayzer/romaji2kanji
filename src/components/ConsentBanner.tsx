import React, { useState } from 'react';
import '../styles/consentBanner.scss';

interface ConsentBannerProps {
  onConsent: (consent: boolean) => void;
}

const ConsentBanner: React.FC<ConsentBannerProps> = ({ onConsent }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleConsent = (consent: boolean) => {
    setIsVisible(false);
    onConsent(consent);
  };

  if (!isVisible) return null;

  return (
    <div className='consent-banner'>
      <p>We use cookies to improve your experience. Do you consent to the use of cookies?</p>
      <div className='consent-buttons-container'>
      <button onClick={() => handleConsent(true)}>Yes</button>
      <button onClick={() => handleConsent(false)}>No</button>
      </div>
    </div>
  );
};

export default ConsentBanner;