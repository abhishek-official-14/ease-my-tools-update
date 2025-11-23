import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Security.css';

const Security = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const securityFeatures = [
    {
      icon: '🔒',
      title: t('security.feature1.title', 'Local Processing'),
      description: t('security.feature1.description', 'All file processing happens locally in your browser. Your files never leave your device.')
    },
    {
      icon: '🚫',
      title: t('security.feature2.title', 'No Data Storage'),
      description: t('security.feature2.description', 'We do not store, upload, or permanently save any files you process through our tools.')
    },
    {
      icon: '🔐',
      title: t('security.feature3.title', 'End-to-End Encryption'),
      description: t('security.feature3.description', 'All data transmissions are encrypted using industry-standard TLS 1.3 protocols.')
    },
    {
      icon: '📜',
      title: t('security.feature4.title', 'Compliance Certified'),
      description: t('security.feature4.description', 'We comply with GDPR, CCPA, and other major privacy regulations.')
    }
  ];

  const compliance = [
    {
      standard: 'GDPR',
      description: t('security.compliance.gdpr', 'General Data Protection Regulation compliance for EU users'),
      status: t('security.compliance.compliant', 'Compliant')
    },
    {
      standard: 'CCPA',
      description: t('security.compliance.ccpa', 'California Consumer Privacy Act compliance'),
      status: t('security.compliance.compliant', 'Compliant')
    },
    {
      standard: 'COPPA',
      description: t('security.compliance.coppa', 'Children\'s Online Privacy Protection Act'),
      status: t('security.compliance.compliant', 'Compliant')
    },
    {
      standard: 'FERPA',
      description: t('security.compliance.ferpa', 'Family Educational Rights and Privacy Act for education'),
      status: t('security.compliance.compliant', 'Compliant')
    }
  ];

  const securityPractices = [
    {
      area: t('security.practice1.area', 'Data Processing'),
      practices: [
        t('security.practice1.practice1', 'All processing occurs client-side in the browser'),
        t('security.practice1.practice2', 'No file uploads to external servers'),
        t('security.practice1.practice3', 'Automatic cleanup of temporary files')
      ]
    },
    {
      area: t('security.practice2.area', 'Infrastructure'),
      practices: [
        t('security.practice2.practice1', 'Regular security audits and penetration testing'),
        t('security.practice2.practice2', 'DDoS protection and rate limiting'),
        t('security.practice2.practice3', '99.9% uptime SLA')
      ]
    },
    {
      area: t('security.practice3.area', 'Privacy'),
      practices: [
        t('security.practice3.practice1', 'No tracking or analytics on tool usage'),
        t('security.practice3.practice2', 'Minimal data collection for essential services'),
        t('security.practice3.practice3', 'Clear data retention policies')
      ]
    }
  ];

  return (
    <div className={`security-page ${theme}`}>
      <div className="security-container">
        <header className="security-header">
          <div className="header-content">
            <h1>{t('security.title', 'Security & Privacy')}</h1>
            <p className="subtitle">
              {t('security.subtitle', 'Your privacy and data security are our top priorities. Learn how we protect your information.')}
            </p>
          </div>
        </header>

        <section className="security-features">
          <h2>{t('security.featuresTitle', 'Our Security Promise')}</h2>
          <div className="features-grid">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="compliance-section">
          <h2>{t('security.complianceTitle', 'Compliance & Certifications')}</h2>
          <div className="compliance-grid">
            {compliance.map((item, index) => (
              <div key={index} className="compliance-card">
                <div className="compliance-header">
                  <h3>{item.standard}</h3>
                  <span className="compliance-status">{item.status}</span>
                </div>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="security-practices">
          <h2>{t('security.practicesTitle', 'Security Practices')}</h2>
          <div className="practices-grid">
            {securityPractices.map((practice, index) => (
              <div key={index} className="practice-card">
                <h3>{practice.area}</h3>
                <ul>
                  {practice.practices.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="security-faq">
          <h2>{t('security.faqTitle', 'Security FAQs')}</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>{t('security.faq1.question', 'Where are my files processed?')}</h3>
              <p>{t('security.faq1.answer', 'All file processing happens locally in your web browser. Your files never leave your device and are never transmitted to our servers.')}</p>
            </div>
            <div className="faq-item">
              <h3>{t('security.faq2.question', 'Do you store any of my data?')}</h3>
              <p>{t('security.faq2.answer', 'No. We do not store, upload, or permanently save any files you process. Temporary data is automatically cleared when you close your browser.')}</p>
            </div>
            <div className="faq-item">
              <h3>{t('security.faq3.question', 'What information do you collect?')}</h3>
              <p>{t('security.faq3.answer', 'We only collect essential information for service operation, such as anonymous usage statistics and error reports. No personal file data is collected.')}</p>
            </div>
            <div className="faq-item">
              <h3>{t('security.faq4.question', 'How do you ensure compliance?')}</h3>
              <p>{t('security.faq4.answer', 'We undergo regular third-party security audits and maintain comprehensive documentation of our security practices and compliance measures.')}</p>
            </div>
          </div>
        </section>

        <section className="security-contact">
          <div className="contact-content">
            <h2>{t('security.contactTitle', 'Have Security Questions?')}</h2>
            <p>{t('security.contactText', 'Our security team is available to answer any questions about our practices and compliance.')}</p>
            <div className="contact-actions">
              <a href="mailto:security@easemytools.com" className="contact-button">
                {t('security.contactTeam', 'Contact Security Team')}
              </a>
              <a href="/privacy-policy" className="contact-button secondary">
                {t('security.viewPolicy', 'View Privacy Policy')}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Security;