import { useTranslation } from 'react-i18next';
import '../styles/BenefitsSection.css';

const BenefitsSection = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: '🔒',
      title: t('benefits.secure', '100% Secure'),
      description: t('benefits.secureDesc', 'Files processed locally, never stored on servers')
    },
    {
      icon: '⚡',
      title: t('benefits.fast', 'Lightning Fast'),
      description: t('benefits.fastDesc', 'Process files in seconds with our optimized tools')
    },
    {
      icon: '🎯',
      title: t('benefits.noWatermark', 'No Watermarks'),
      description: t('benefits.noWatermarkDesc', 'Get clean results without any branding')
    },
    {
      icon: '💯',
      title: t('benefits.free', 'Completely Free'),
      description: t('benefits.freeDesc', 'No hidden costs or subscription fees')
    }
  ];

  return (
    <section className="benefits-section">
      <div className="container">
        <h2>{t('benefits.title', 'Why Choose EaseMyTools?')}</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;