import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Business.css';

const Business = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const features = [
    {
      icon: '⚡',
      title: t('business.feature1.title', 'Team Collaboration'),
      description: t('business.feature1.description', 'Share tools and workflows across your entire team with centralized management.')
    },
    {
      icon: '🔒',
      title: t('business.feature2.title', 'Enhanced Security'),
      description: t('business.feature2.description', 'Enterprise-grade security with advanced access controls and audit logs.')
    },
    {
      icon: '📊',
      title: t('business.feature3.title', 'Usage Analytics'),
      description: t('business.feature3.description', 'Track tool usage and optimize your team\'s workflow with detailed analytics.')
    },
    {
      icon: '💬',
      title: t('business.feature4.title', 'Priority Support'),
      description: t('business.feature4.description', 'Get dedicated support with guaranteed response times and personalized assistance.')
    }
  ];

  const useCases = [
    {
      industry: t('business.useCase1.industry', 'Marketing & Design'),
      description: t('business.useCase1.description', 'Create stunning visuals, resize images for social media, and optimize graphics for campaigns.'),
      tools: ['Remove Background', 'Image Resizer', 'Format Converter']
    },
    {
      industry: t('business.useCase2.industry', 'Development'),
      description: t('business.useCase2.description', 'Process data, convert formats, and generate code assets efficiently.'),
      tools: ['JSON Formatter', 'CSV Converter', 'Code Generator']
    },
    {
      industry: t('business.useCase3.industry', 'Education'),
      description: t('business.useCase3.description', 'Create educational materials, convert documents, and process academic content.'),
      tools: ['PDF Tools', 'Document Converter', 'Image Editor']
    }
  ];

  return (
    <div className={`business-page ${theme}`}>
      <div className="business-container">
        <header className="business-header">
          <div className="header-content">
            <h1>{t('business.title', 'EaseMyTools for Business')}</h1>
            <p className="subtitle">
              {t('business.subtitle', 'Empower your team with enterprise-grade tools that boost productivity and streamline workflows.')}
            </p>
            <div className="header-actions">
              <button className="primary-button">
                {t('business.startTrial', 'Start Free Trial')}
              </button>
              <button className="secondary-button">
                {t('business.contactSales', 'Contact Sales')}
              </button>
            </div>
          </div>
        </header>

        <section className="business-features">
          <h2>{t('business.featuresTitle', 'Why Businesses Choose EaseMyTools')}</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="use-cases">
          <h2>{t('business.useCasesTitle', 'Trusted by Teams Across Industries')}</h2>
          <div className="use-cases-grid">
            {useCases.map((useCase, index) => (
              <div key={index} className="use-case-card">
                <h3>{useCase.industry}</h3>
                <p>{useCase.description}</p>
                <div className="tools-list">
                  {useCase.tools.map((tool, toolIndex) => (
                    <span key={toolIndex} className="tool-tag">{tool}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="business-pricing">
          <h2>{t('business.pricingTitle', 'Simple Team Pricing')}</h2>
          <div className="pricing-cards">
            <div className="pricing-card">
              <h3>{t('business.plan1.name', 'Team')}</h3>
              <div className="price">$29<span>/month</span></div>
              <p>{t('business.plan1.description', 'Perfect for small to medium teams')}</p>
              <ul>
                <li>Up to 10 team members</li>
                <li>All 50+ tools included</li>
                <li>Centralized billing</li>
                <li>Basic analytics</li>
                <li>Email support</li>
              </ul>
              <button className="pricing-button">
                {t('business.startTrial', 'Start Free Trial')}
              </button>
            </div>
            <div className="pricing-card highlighted">
              <div className="popular-badge">{t('business.mostPopular', 'Most Popular')}</div>
              <h3>{t('business.plan2.name', 'Business')}</h3>
              <div className="price">$99<span>/month</span></div>
              <p>{t('business.plan2.description', 'For growing organizations')}</p>
              <ul>
                <li>Up to 50 team members</li>
                <li>All tools + advanced features</li>
                <li>Advanced analytics</li>
                <li>Custom workflows</li>
                <li>Priority support</li>
              </ul>
              <button className="pricing-button primary">
                {t('business.startTrial', 'Start Free Trial')}
              </button>
            </div>
            <div className="pricing-card">
              <h3>{t('business.plan3.name', 'Enterprise')}</h3>
              <div className="price">{t('business.custom', 'Custom')}</div>
              <p>{t('business.plan3.description', 'For large organizations')}</p>
              <ul>
                <li>Unlimited team members</li>
                <li>Custom tool development</li>
                <li>Dedicated infrastructure</li>
                <li>SLA guarantee</li>
                <li>24/7 dedicated support</li>
              </ul>
              <button className="pricing-button">
                {t('business.contactSales', 'Contact Sales')}
              </button>
            </div>
          </div>
        </section>

        <section className="business-cta">
          <div className="cta-content">
            <h2>{t('business.ctaTitle', 'Ready to Transform Your Team\'s Workflow?')}</h2>
            <p>{t('business.ctaText', 'Join thousands of businesses that trust EaseMyTools for their daily operations.')}</p>
            <div className="cta-buttons">
              <button className="cta-button primary">
                {t('business.startTrial', 'Start Free Trial')}
              </button>
              <button className="cta-button secondary">
                {t('business.scheduleDemo', 'Schedule a Demo')}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Business;