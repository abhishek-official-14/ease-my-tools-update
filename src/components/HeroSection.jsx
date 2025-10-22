import { useTranslation } from 'react-i18next';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>{t('hero.title', 'Simplify Your Digital Workflow')}</h1>
        <p>{t('hero.subtitle', 'Free, powerful online tools for PDFs, images, videos, and more. No installation required.')}</p>
        
        <div className="hero-stats">
          <div className="stat">
            <h3>50+</h3>
            <p>{t('hero.tools', 'Free Tools')}</p>
          </div>
          <div className="stat">
            <h3>100K+</h3>
            <p>{t('hero.users', 'Monthly Users')}</p>
          </div>
          <div className="stat">
            <h3>99.9%</h3>
            <p>{t('hero.uptime', 'Uptime')}</p>
          </div>
        </div>
        
        <button className="cta-button">
          {t('hero.cta', 'Explore All Tools')}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;