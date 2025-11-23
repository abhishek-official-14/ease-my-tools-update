import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Pricing.css';

const Pricing = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const plans = [
    {
      name: t('pricing.free.name', 'Free Forever'),
      price: t('pricing.free.price', '$0'),
      description: t('pricing.free.description', 'Perfect for individuals and casual users'),
      features: [
        t('pricing.free.feature1', 'Access to all 50+ tools'),
        t('pricing.free.feature2', 'No file size limits'),
        t('pricing.free.feature3', 'Local browser processing'),
        t('pricing.free.feature4', 'No watermarks'),
        t('pricing.free.feature5', 'Basic support')
      ],
      highlighted: false,
      cta: t('pricing.free.cta', 'Get Started Free')
    },
    {
      name: t('pricing.pro.name', 'Pro Plan'),
      price: t('pricing.pro.price', '$9'),
      period: t('pricing.pro.period', '/month'),
      description: t('pricing.pro.description', 'For professionals and power users'),
      features: [
        t('pricing.pro.feature1', 'Everything in Free, plus:'),
        t('pricing.pro.feature2', 'Priority processing'),
        t('pricing.pro.feature3', 'Batch operations'),
        t('pricing.pro.feature4', 'Advanced tool options'),
        t('pricing.pro.feature5', 'Priority email support'),
        t('pricing.pro.feature6', 'Early access to new tools')
      ],
      highlighted: true,
      cta: t('pricing.pro.cta', 'Start Pro Trial')
    },
    {
      name: t('pricing.team.name', 'Team Plan'),
      price: t('pricing.team.price', '$29'),
      period: t('pricing.team.period', '/month'),
      description: t('pricing.team.description', 'For teams and businesses'),
      features: [
        t('pricing.team.feature1', 'Everything in Pro, plus:'),
        t('pricing.team.feature2', 'Up to 10 team members'),
        t('pricing.team.feature3', 'Centralized billing'),
        t('pricing.team.feature4', 'Usage analytics'),
        t('pricing.team.feature5', 'Dedicated support'),
        t('pricing.team.feature6', 'Custom tool requests')
      ],
      highlighted: false,
      cta: t('pricing.team.cta', 'Contact Sales')
    }
  ];

  return (
    <div className={`pricing-page ${theme}`}>
      <div className="pricing-container">
        <header className="pricing-header">
          <h1>{t('pricing.title', 'Simple, Transparent Pricing')}</h1>
          <p className="pricing-subtitle">
            {t('pricing.subtitle', 'Choose the plan that works best for you. All plans include access to all tools.')}
          </p>
        </header>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
            >
              {plan.highlighted && (
                <div className="popular-badge">
                  {t('pricing.mostPopular', 'Most Popular')}
                </div>
              )}
              
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  {plan.period && <span className="period">{plan.period}</span>}
                </div>
                <p className="plan-description">{plan.description}</p>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <span className="check-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className={`plan-button ${plan.highlighted ? 'primary' : 'secondary'}`}
                onClick={() => window.location.href = plan.highlighted ? '/signup' : '/tools'}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="pricing-faq">
          <h2>{t('pricing.faqTitle', 'Frequently Asked Questions')}</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>{t('pricing.faq1.question', 'Can I change plans later?')}</h3>
              <p>{t('pricing.faq1.answer', 'Yes, you can upgrade, downgrade, or cancel your plan at any time.')}</p>
            </div>
            <div className="faq-item">
              <h3>{t('pricing.faq2.question', 'Is there a free trial?')}</h3>
              <p>{t('pricing.faq2.answer', 'All paid plans include a 14-day free trial. No credit card required.')}</p>
            </div>
            <div className="faq-item">
              <h3>{t('pricing.faq3.question', 'What payment methods do you accept?')}</h3>
              <p>{t('pricing.faq3.answer', 'We accept all major credit cards, PayPal, and bank transfers for annual plans.')}</p>
            </div>
            <div className="faq-item">
              <h3>{t('pricing.faq4.question', 'Do you offer discounts?')}</h3>
              <p>{t('pricing.faq4.answer', 'Yes, we offer educational and nonprofit discounts. Contact us for more information.')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;