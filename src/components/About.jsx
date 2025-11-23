import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/LegalPage.css';

const About = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className={`legal-page ${theme}`}>
      <div className="legal-container">
        <header className="legal-header">
          <h1>{t('about.title', 'About EaseMyTools')}</h1>
        </header>

        <div className="legal-content">
          <section className="policy-section">
            <h2>{t('about.ourMission', 'Our Mission')}</h2>
            <p>
              {t('about.missionText', 'EaseMyTools was created to provide free, easy-to-use online tools that simplify everyday digital tasks. We believe everyone should have access to powerful tools without complexity or cost.')}
            </p>
          </section>

          <section className="policy-section">
            <h2>{t('about.whatWeDo', 'What We Do')}</h2>
            <p>
              {t('about.whatWeDoText', 'We develop and maintain a comprehensive suite of online tools for file conversion, image editing, text processing, and data analysis. All processing happens locally in your browser for maximum privacy.')}
            </p>
          </section>

          <section className="policy-section">
            <h2>{t('about.ourTeam', 'Our Team')}</h2>
            <p>
              {t('about.teamText', 'We are a passionate team of developers and designers committed to creating tools that make digital life easier. Our focus is on user experience, privacy, and performance.')}
            </p>
          </section>
        </div>

        <div className="legal-actions">
          <button className="back-button" onClick={() => window.history.back()}>
            {t('about.goBack', 'Go Back')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;