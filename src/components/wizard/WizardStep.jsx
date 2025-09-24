import { useEffect, useRef } from 'react';

const WizardStep = ({ title, children }) => {
  const stepRef = useRef(null);

  // Focus management según AGENTS.md
  useEffect(() => {
    if (stepRef.current) {
      // Enfocar el contenido del step para lectores de pantalla
      stepRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div 
      ref={stepRef}
      className="wizard-step"
      role="region"
      aria-labelledby="step-title"
    >
      <h2 id="step-title" className="step-title">
        {title}
      </h2>
      <div className="step-content">
        {children}
      </div>
    </div>
  );
};

export default WizardStep;