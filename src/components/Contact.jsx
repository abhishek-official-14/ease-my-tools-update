import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/LegalPage.css';

const Contact = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className={`legal-page ${theme}`}>
      <div className="legal-container">
        <header className="legal-header">
          <h1>{t('contact.title', 'Contact Us')}</h1>
        </header>

        <div className="legal-content">
          <section className="policy-section">
            <h2>{t('contact.getInTouch', 'Get In Touch')}</h2>
            <p>
              {t('contact.getInTouchText', 'We would love to hear from you! Whether you have questions, feedback, or need support, our team is here to help.')}
            </p>
          </section>

          <section className="policy-section">
            <h2>{t('contact.contactInfo', 'Contact Information')}</h2>
            <div className="contact-info">
              <p><strong>{t('contact.email', 'Email:')}</strong> support@easemytools.com</p>
              <p><strong>{t('contact.business', 'Business Inquiries:')}</strong> business@easemytools.com</p>
              <p><strong>{t('contact.support', 'Technical Support:')}</strong> help@easemytools.com</p>
            </div>
          </section>

          <section className="policy-section">
            <h2>{t('contact.responseTime', 'Response Time')}</h2>
            <p>
              {t('contact.responseTimeText', 'We typically respond to all inquiries within 24-48 hours. For urgent matters, please include "URGENT" in your subject line.')}
            </p>
          </section>
        </div>

        <div className="legal-actions">
          <button className="back-button" onClick={() => window.history.back()}>
            {t('contact.goBack', 'Go Back')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;