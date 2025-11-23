import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className={`privacy-policy ${theme}`}>
      <div className="privacy-container">
        <header className="privacy-header">
          <h1>{t('privacy.title', 'Privacy Policy')}</h1>
          <p className="last-updated">
            {t('privacy.lastUpdated', 'Last Updated:')} {new Date().toLocaleDateString()}
          </p>
        </header>

        <div className="privacy-content">
          <section className="policy-section">
            <h2>{t('privacy.introduction', 'Introduction')}</h2>
            <p>
              {t('privacy.introText', 'Welcome to EaseMyTools. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and tools.')}
            </p>
          </section>

          <section className="policy-section">
            <h2>{t('privacy.informationWeCollect', 'Information We Collect')}</h2>
            <h3>{t('privacy.automaticCollection', 'Automatically Collected Information')}</h3>
            <ul>
              <li>{t('privacy.collect1', 'IP address and browser type')}</li>
              <li>{t('privacy.collect2', 'Device information and operating system')}</li>
              <li>{t('privacy.collect3', 'Usage data and access times')}</li>
              <li>{t('privacy.collect4', 'Referring website addresses')}</li>
            </ul>

            <h3>{t('privacy.filesYouProcess', 'Files You Process')}</h3>
            <p>
              {t('privacy.filesText', 'All file processing happens locally in your browser. We do not store, upload, or permanently save any files you process through our tools. Your files remain on your device and are never transmitted to our servers.')}
            </p>
          </section>

          <section className="policy-section">
            <h2>{t('privacy.howWeUseInfo', 'How We Use Your Information')}</h2>
            <ul>
              <li>{t('privacy.use1', 'To provide and maintain our services')}</li>
              <li>{t('privacy.use2', 'To improve user experience and tool functionality')}</li>
              <li>{t('privacy.use3', 'To analyze usage patterns and optimize performance')}</li>
              <li>{t('privacy.use4', 'To communicate with you about updates and features')}</li>
              <li>{t('privacy.use5', 'To ensure the security of our platform')}</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>{t('privacy.dataRetention', 'Data Retention and Storage')}</h2>
            <p>
              {t('privacy.retentionText', 'We do not retain any processed files or their contents. Any temporary data generated during tool usage is automatically cleared when you close your browser or navigate away from the page. Analytics data is retained for 24 months to help us improve our services.')}
            </p>
          </section>

          <section className="policy-section">
            <h2>{t('privacy.cookies', 'Cookies and Tracking Technologies')}</h2>
            <p>
              {t('privacy.cookiesText', 'We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.')}
            </p>
            
            <h3>{t('privacy.cookieTypes', 'Types of Cookies We Use')}</h3>
            <ul>
              <li>
                <strong>{t('privacy.essentialCookies', 'Essential Cookies:')}</strong> 
                {t('privacy.essentialDesc', ' Required for basic website functionality')}
              </li>
              <li>
                <strong>{t('privacy.analyticsCookies', 'Analytics Cookies:')}</strong> 
                {t('privacy.analyticsDesc', ' Help us understand how visitors interact with our website')}
              </li>
              <li>
                <strong>{t('privacy.preferenceCookies', 'Preference Cookies:')}</strong> 
                {t('privacy.preferenceDesc', ' Remember your settings and preferences')}
              </li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>{t('privacy.thirdParty', 'Third-Party Services')}</h2>
            <p>
              {t('privacy.thirdPartyText', 'We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf, perform service-related services, or assist us in analyzing how our service is used. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.')}
            </p>
          </section>

          <section className="policy-section">
            <h2>{t('privacy.dataSecurity', 'Data Security')}</h2>
            <p>
              {t('privacy.securityText', 'We implement appropriate technical and organizational security measures designed to protect your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.')}
            </p>
          </section>

          <section className="policy-section">
            <h2>{t('privacy.userRights', 'Your Rights')}</h2>
            <p>{t('privacy.rightsText', 'Depending on your location, you may have the following rights regarding your personal information:')}</p>
            <ul>
              <li>{t('privacy.right1', 'The right to access personal information we hold about you')}</li>
              <li>{t('privacy.right2', 'The right to request correction of inaccurate personal information')}</li>
              <li>{t('privacy.right3', 'The right to request deletion of your personal information')}</li>
              <li>{t('privacy.right4', 'The right to object to processing of your personal information')}</li>
              <li>{t('privacy.right5', 'The right to data portability')}</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>{t('privacy.childrenPrivacy', "Children's Privacy")}</h2>
            <p>
              {t('privacy.childrenText', 'Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.')}
            </p>
          </section>

          <section className="policy-section">
            <h2>{t('privacy.changesToPolicy', 'Changes to This Privacy Policy')}</h2>
            <p>
              {t('privacy.changesText', 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.')}
            </p>
          </section>

          <section className="policy-section">
            <h2>{t('privacy.contactUs', 'Contact Us')}</h2>
            <p>
              {t('privacy.contactText', 'If you have any questions about this Privacy Policy, please contact us:')}
            </p>
            <div className="contact-info">
              <p><strong>{t('privacy.email', 'Email:')}</strong> privacy@easemytools.com</p>
              <p><strong>{t('privacy.website', 'Website:')}</strong> https://easemytools.com/contact</p>
            </div>
          </section>
        </div>

        <div className="privacy-actions">
          <button 
            className="back-button"
            onClick={() => window.history.back()}
          >
            {t('privacy.goBack', 'Go Back')}
          </button>
          <button 
            className="print-button"
            onClick={() => window.print()}
          >
            {t('privacy.print', 'Print Policy')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;