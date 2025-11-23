import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/LegalPage.css';

const TermsConditions = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className={`legal-page ${theme}`}>
      <div className="legal-container">
        <header className="legal-header">
          <h1>{t('terms.title', 'Terms & Conditions')}</h1>
          <p className="last-updated">
            {t('terms.lastUpdated', 'Last Updated:')} {new Date().toLocaleDateString()}
          </p>
        </header>

        <div className="legal-content">
          <section className="policy-section">
            <h2>{t('terms.acceptance', 'Acceptance of Terms')}</h2>
            <p>
              {t('terms.acceptanceText', 'By accessing and using EaseMyTools, you accept and agree to be bound by the terms and provision of this agreement.')}
            </p>
          </section>

          <section className="policy-section">
            <h2>{t('terms.useLicense', 'Use License')}</h2>
            <p>
              {t('terms.licenseText', 'Permission is granted to temporarily use EaseMyTools for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.')}
            </p>
          </section>

          <section className="policy-section">
            <h2>{t('terms.userResponsibilities', 'User Responsibilities')}</h2>
            <p>
              {t('terms.responsibilitiesText', 'You are responsible for the files you process through our tools. Ensure you have the right to use and process any content you upload.')}
            </p>
          </section>

          <section className="policy-section">
            <h2>{t('terms.limitations', 'Limitations')}</h2>
            <p>
              {t('terms.limitationsText', 'In no event shall EaseMyTools or its suppliers be liable for any damages arising out of the use or inability to use our tools.')}
            </p>
          </section>
        </div>

        <div className="legal-actions">
          <button className="back-button" onClick={() => window.history.back()}>
            {t('terms.goBack', 'Go Back')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;