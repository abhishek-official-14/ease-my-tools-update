import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/FAQ.css';

const FAQ = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqCategories = [
    {
      title: t('faq.general.title', 'General Questions'),
      items: [
        {
          question: t('faq.general.q1', 'What is EaseMyTools?'),
          answer: t('faq.general.a1', 'EaseMyTools is a collection of free online tools that help you with various digital tasks like file conversion, image editing, text processing, and more. All tools work directly in your browser.')
        },
        {
          question: t('faq.general.q2', 'Is EaseMyTools really free?'),
          answer: t('faq.general.a2', 'Yes! All our tools are completely free to use. There are no hidden costs, no watermarks, and no subscription fees. We believe in providing accessible tools for everyone.')
        },
        {
          question: t('faq.general.q3', 'Do I need to create an account?'),
          answer: t('faq.general.a3', 'No account is required to use our tools. You can start using any tool immediately without signing up. However, creating an account lets you save your preferences and access additional features.')
        }
      ]
    },
    {
      title: t('faq.technical.title', 'Technical Questions'),
      items: [
        {
          question: t('faq.technical.q1', 'Are my files safe and private?'),
          answer: t('faq.technical.a1', 'Absolutely! All file processing happens locally in your browser. Your files never leave your device and are never uploaded to our servers. We cannot access or see your files.')
        },
        {
          question: t('faq.technical.q2', 'What file formats do you support?'),
          answer: t('faq.technical.a2', 'We support a wide range of file formats including PDF, JPG, PNG, GIF, MP4, DOC, TXT, and many more. Each tool page specifies the supported formats.')
        },
        {
          question: t('faq.technical.q3', 'Is there a file size limit?'),
          answer: t('faq.technical.a3', 'Most tools can handle files up to 100MB, but this may vary depending on the tool and your device capabilities. Larger files may take longer to process.')
        },
        {
          question: t('faq.technical.q4', 'Why is a tool not working?'),
          answer: t('faq.technical.a4', 'If a tool isn\'t working, try refreshing the page, clearing your browser cache, or using a different browser. Most issues are resolved by these simple steps.')
        }
      ]
    },
    {
      title: t('faq.account.title', 'Account & Billing'),
      items: [
        {
          question: t('faq.account.q1', 'What are the benefits of creating an account?'),
          answer: t('faq.account.a1', 'With an account, you can save your tool preferences, access usage history, create custom tool presets, and get early access to new features.')
        },
        {
          question: t('faq.account.q2', 'How do I reset my password?'),
          answer: t('faq.account.a2', 'Click on "Forgot Password" on the login page and enter your email address. We\'ll send you instructions to reset your password.')
        },
        {
          question: t('faq.account.q3', 'Can I delete my account?'),
          answer: t('faq.account.a3', 'Yes, you can delete your account at any time from your account settings. This will permanently remove all your data from our systems.')
        }
      ]
    }
  ];

  return (
    <div className={`faq-page ${theme}`}>
      <div className="faq-container">
        <header className="faq-header">
          <h1>{t('faq.title', 'Frequently Asked Questions')}</h1>
          <p className="faq-subtitle">
            {t('faq.subtitle', 'Find answers to common questions about EaseMyTools')}
          </p>
        </header>

        <div className="faq-search">
          <input
            type="text"
            placeholder={t('faq.searchPlaceholder', 'Search questions...')}
            className="search-input"
          />
        </div>

        <div className="faq-content">
          {faqCategories.map((category, categoryIndex) => (
            <section key={categoryIndex} className="faq-category">
              <h2>{category.title}</h2>
              <div className="faq-items">
                {category.items.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 10 + itemIndex;
                  return (
                    <div 
                      key={itemIndex} 
                      className={`faq-item ${openItems[globalIndex] ? 'open' : ''}`}
                    >
                      <div 
                        className="faq-question"
                        onClick={() => toggleItem(globalIndex)}
                      >
                        <h3>{item.question}</h3>
                        <span className="toggle-icon">
                          {openItems[globalIndex] ? '−' : '+'}
                        </span>
                      </div>
                      {openItems[globalIndex] && (
                        <div className="faq-answer">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="faq-support">
          <h2>{t('faq.needHelp', 'Still need help?')}</h2>
          <p>{t('faq.contactSupport', "Can't find the answer you're looking for? Please contact our support team.")}</p>
          <div className="support-buttons">
            <button 
              className="support-button primary"
              onClick={() => window.location.href = '/contact'}
            >
              {t('faq.contactUs', 'Contact Support')}
            </button>
            <button 
              className="support-button secondary"
              onClick={() => window.location.href = '/tools'}
            >
              {t('faq.browseTools', 'Browse All Tools')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;