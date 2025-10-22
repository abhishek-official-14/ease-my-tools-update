import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/NewsletterSection.css';

const NewsletterSection = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    alert(t('newsletter.success', 'Thank you for subscribing!'));
    setEmail('');
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          <h3>{t('newsletter.title', 'Stay Updated')}</h3>
          <p>{t('newsletter.subtitle', 'Get notified about new tools and features')}</p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder={t('newsletter.placeholder', 'Enter your email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">
              {t('newsletter.subscribe', 'Subscribe')}
            </button>
          </form>
          <small>{t('newsletter.privacy', 'We respect your privacy. Unsubscribe at any time.')}</small>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;