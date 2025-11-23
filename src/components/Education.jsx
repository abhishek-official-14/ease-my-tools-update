import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Education.css';

const Education = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const features = [
    {
      icon: '🏫',
      title: t('education.feature1.title', 'Classroom Ready'),
      description: t('education.feature1.description', 'Tools designed specifically for educational environments and classroom use.')
    },
    {
      icon: '🔒',
      title: t('education.feature2.title', 'Student Privacy'),
      description: t('education.feature2.description', 'COPPA and FERPA compliant with enhanced student data protection.')
    },
    {
      icon: '💻',
      title: t('education.feature3.title', 'No Installation'),
      description: t('education.feature3.description', 'Works on any device with a browser, no IT setup required.')
    },
    {
      icon: '📚',
      title: t('education.feature4.title', 'Curriculum Resources'),
      description: t('education.feature4.description', 'Lesson plans and educational materials for teachers.')
    }
  ];

  const useCases = [
    {
      role: t('education.useCase1.role', 'Teachers'),
      description: t('education.useCase1.description', 'Create engaging learning materials, convert documents, and prepare classroom resources.'),
      tools: ['PDF Tools', 'Image Editor', 'Document Converter']
    },
    {
      role: t('education.useCase2.role', 'Students'),
      description: t('education.useCase2.description', 'Complete assignments, create projects, and learn digital skills with easy-to-use tools.'),
      tools: ['Presentation Tools', 'Image Resizer', 'Text Formatter']
    },
    {
      role: t('education.useCase3.role', 'Administrators'),
      description: t('education.useCase3.description', 'Manage school documents, create reports, and streamline administrative tasks.'),
      tools: ['Bulk Processing', 'Document Merger', 'Data Converter']
    }
  ];

  const plans = [
    {
      name: t('education.plan1.name', 'K-12 Schools'),
      price: t('education.plan1.price', 'Free'),
      description: t('education.plan1.description', 'For primary and secondary educational institutions'),
      features: [
        t('education.plan1.feature1', 'Unlimited students and teachers'),
        t('education.plan1.feature2', 'Basic educational tools'),
        t('education.plan1.feature3', 'Standard security features'),
        t('education.plan1.feature4', 'Email support')
      ]
    },
    {
      name: t('education.plan2.name', 'Higher Education'),
      price: t('education.plan2.price', 'Custom'),
      description: t('education.plan2.description', 'For colleges, universities, and research institutions'),
      features: [
        t('education.plan2.feature1', 'Advanced research tools'),
        t('education.plan2.feature2', 'Bulk processing capabilities'),
        t('education.plan2.feature3', 'Enhanced security compliance'),
        t('education.plan2.feature4', 'Dedicated support')
      ]
    }
  ];

  return (
    <div className={`education-page ${theme}`}>
      <div className="education-container">
        <header className="education-header">
          <div className="header-content">
            <h1>{t('education.title', 'EaseMyTools for Education')}</h1>
            <p className="subtitle">
              {t('education.subtitle', 'Empower students and educators with safe, accessible digital tools for learning and teaching.')}
            </p>
            <div className="header-actions">
              <button className="primary-button">
                {t('education.getStarted', 'Get Started for Free')}
              </button>
              <button className="secondary-button">
                {t('education.contactTeam', 'Contact Education Team')}
              </button>
            </div>
          </div>
        </header>

        <section className="education-features">
          <h2>{t('education.featuresTitle', 'Built for Learning Environments')}</h2>
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

        <section className="education-use-cases">
          <h2>{t('education.useCasesTitle', 'Tools for Every Role in Education')}</h2>
          <div className="use-cases-grid">
            {useCases.map((useCase, index) => (
              <div key={index} className="use-case-card">
                <h3>{useCase.role}</h3>
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

        <section className="education-pricing">
          <h2>{t('education.pricingTitle', 'Education Pricing')}</h2>
          <p className="pricing-subtitle">
            {t('education.pricingSubtitle', 'Special pricing and features designed for educational institutions')}
          </p>
          <div className="pricing-cards">
            {plans.map((plan, index) => (
              <div key={index} className="pricing-card">
                <h3>{plan.name}</h3>
                <div className="price">{plan.price}</div>
                <p>{plan.description}</p>
                <ul>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
                <button className="pricing-button">
                  {plan.price === 'Free' ? t('education.getStarted', 'Get Started') : t('education.contactSales', 'Contact Sales')}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="education-resources">
          <h2>{t('education.resourcesTitle', 'Educational Resources')}</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">📖</div>
              <h3>{t('education.resource1.title', 'Lesson Plans')}</h3>
              <p>{t('education.resource1.description', 'Ready-to-use lesson plans integrating our tools into curriculum')}</p>
              <a href="#" className="resource-link">{t('education.viewResources', 'View Resources')}</a>
            </div>
            <div className="resource-card">
              <div className="resource-icon">🎓</div>
              <h3>{t('education.resource2.title', 'Teacher Training')}</h3>
              <p>{t('education.resource2.description', 'Professional development materials and training sessions')}</p>
              <a href="#" className="resource-link">{t('education.learnMore', 'Learn More')}</a>
            </div>
            <div className="resource-card">
              <div className="resource-icon">👨‍🏫</div>
              <h3>{t('education.resource3.title', 'Classroom Guides')}</h3>
              <p>{t('education.resource3.description', 'Step-by-step guides for classroom implementation')}</p>
              <a href="#" className="resource-link">{t('education.downloadGuides', 'Download Guides')}</a>
            </div>
          </div>
        </section>

        <section className="education-cta">
          <div className="cta-content">
            <h2>{t('education.ctaTitle', 'Ready to Bring EaseMyTools to Your School?')}</h2>
            <p>{t('education.ctaText', 'Join thousands of educational institutions using our tools to enhance learning experiences.')}</p>
            <div className="cta-buttons">
              <button className="cta-button primary">
                {t('education.getStarted', 'Get Started for Free')}
              </button>
              <button className="cta-button secondary">
                {t('education.scheduleDemo', 'Schedule a Demo')}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Education;