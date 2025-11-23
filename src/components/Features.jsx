import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Features.css';

const Features = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const features = [
    {
      icon: '⚡',
      title: t('features.fast.title', 'Lightning Fast'),
      description: t('features.fast.description', 'Process files in seconds with our optimized algorithms and browser-based processing.')
    },
    {
      icon: '🔒',
      title: t('features.secure.title', '100% Secure'),
      description: t('features.secure.description', 'All processing happens locally in your browser. Your files never leave your device.')
    },
    {
      icon: '💯',
      title: t('features.free.title', 'Completely Free'),
      description: t('features.free.description', 'No hidden costs, no watermarks, no subscription fees. Everything is free forever.')
    },
    {
      icon: '🎯',
      title: t('features.noWatermark.title', 'No Watermarks'),
      description: t('features.noWatermark.description', 'Get clean, professional results without any branding or watermarks.')
    },
    {
      icon: '📱',
      title: t('features.responsive.title', 'Fully Responsive'),
      description: t('features.responsive.description', 'Works perfectly on desktop, tablet, and mobile devices.')
    },
    {
      icon: '🌐',
      title: t('features.noInstall.title', 'No Installation'),
      description: t('features.noInstall.description', 'Use all tools directly in your browser without downloading any software.')
    },
    {
      icon: '🔄',
      title: t('features.realTime.title', 'Real-time Processing'),
      description: t('features.realTime.description', 'See changes instantly with live preview and real-time processing.')
    },
    {
      icon: '🎨',
      title: t('features.professional.title', 'Professional Quality'),
      description: t('features.professional.description', 'Enterprise-grade tools that produce professional-quality results.')
    }
  ];

  return (
    <div className={`features-page ${theme}`}>
      <div className="features-container">
        <header className="features-header">
          <h1>{t('features.title', 'Powerful Features')}</h1>
          <p className="features-subtitle">
            {t('features.subtitle', 'Everything you need to simplify your digital workflow')}
          </p>
        </header>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="features-cta">
          <h2>{t('features.readyToStart', 'Ready to get started?')}</h2>
          <p>{t('features.ctaText', 'Choose from 50+ free tools to simplify your work')}</p>
          <button 
            className="cta-button"
            onClick={() => window.location.href = '/tools'}
          >
            {t('features.exploreTools', 'Explore All Tools')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;