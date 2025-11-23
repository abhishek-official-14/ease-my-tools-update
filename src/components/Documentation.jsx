import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Documentation.css';

const Documentation = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: t('docs.gettingStarted.title', 'Getting Started'),
      content: t('docs.gettingStarted.content', 'Learn how to quickly start using EaseMyTools in your projects.'),
      subsections: [
        {
          title: t('docs.gettingStarted.quickStart', 'Quick Start'),
          content: `# ${t('docs.gettingStarted.quickStart', 'Quick Start')}

${t('docs.gettingStarted.quickStartText', 'Start using EaseMyTools in just a few minutes:')}

1. **${t('docs.gettingStarted.step1', 'Choose Your Tool')}** - Browse our collection of 50+ tools
2. **${t('docs.gettingStarted.step2', 'Upload Your File')}** - Drag and drop or click to upload
3. **${t('docs.gettingStarted.step3', 'Process')}** - Let our tools work their magic
4. **${t('docs.gettingStarted.step4', 'Download')}** - Get your processed file instantly

${t('docs.gettingStarted.note', 'All processing happens locally in your browser for maximum privacy and speed.')}`
        },
        {
          title: t('docs.gettingStarted.account', 'Creating an Account'),
          content: `# ${t('docs.gettingStarted.account', 'Creating an Account')}

${t('docs.gettingStarted.accountText', 'While not required, creating an account unlocks additional features:')}

- **${t('docs.gettingStarted.benefit1', 'Save Preferences')}** - Remember your favorite settings
- **${t('docs.gettingStarted.benefit2', 'Usage History')}** - Track your past conversions
- **${t('docs.gettingStarted.benefit3', 'Advanced Features')}** - Access premium tools

${t('docs.gettingStarted.signup', 'Sign up for free at')} [${t('docs.gettingStarted.signupLink', 'https://easemytools.com/signup')}](https://easemytools.com/signup)`
        }
      ]
    },
    {
      id: 'api-integration',
      title: t('docs.api.title', 'API Integration'),
      content: t('docs.api.content', 'Learn how to integrate our tools into your applications.'),
      subsections: [
        {
          title: t('docs.api.authentication', 'Authentication'),
          content: `# ${t('docs.api.authentication', 'Authentication')}

${t('docs.api.authText', 'All API requests require authentication using your API key:')}

\`\`\`javascript
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};
\`\`\`

${t('docs.api.getKey', 'Get your API key from the')} [${t('docs.api.apiDashboard', 'API Dashboard')}](https://easemytools.com/api)`
        },
        {
          title: t('docs.api.rateLimiting', 'Rate Limiting'),
          content: `# ${t('docs.api.rateLimiting', 'Rate Limiting')}

${t('docs.api.rateText', 'We implement rate limiting to ensure fair usage:')}

- **${t('docs.api.freeTier', 'Free Tier')}**: 1,000 requests/month
- **${t('docs.api.startupTier', 'Startup Tier')}**: 50,000 requests/month
- **${t('docs.api.enterpriseTier', 'Enterprise Tier')}**: 500,000 requests/month

${t('docs.api.rateNote', 'Rate limits reset at the beginning of each calendar month.')}`
        }
      ]
    },
    {
      id: 'tutorials',
      title: t('docs.tutorials.title', 'Tutorials'),
      content: t('docs.tutorials.content', 'Step-by-step guides for common use cases.'),
      subsections: [
        {
          title: t('docs.tutorials.bulkProcessing', 'Bulk File Processing'),
          content: `# ${t('docs.tutorials.bulkProcessing', 'Bulk File Processing')}

${t('docs.tutorials.bulkText', 'Learn how to process multiple files efficiently:')}

1. **${t('docs.tutorials.step1', 'Prepare Your Files')}** - Organize files in a single folder
2. **${t('docs.tutorials.step2', 'Use Batch Tools')}** - Select tools that support batch processing
3. **${t('docs.tutorials.step3', 'Monitor Progress')}** - Track processing in real-time
4. **${t('docs.tutorials.step4', 'Download Results')}** - Get all processed files at once

${t('docs.tutorials.tip', 'Pro Tip: Use our desktop app for faster bulk processing.')}`
        },
        {
          title: t('docs.tutorials.workflow', 'Automating Workflows'),
          content: `# ${t('docs.tutorials.workflow', 'Automating Workflows')}

${t('docs.tutorials.workflowText', 'Create automated workflows using our API:')}

\`\`\`python
import requests
import os

def process_images(folder_path):
    for filename in os.listdir(folder_path):
        if filename.endswith(('.png', '.jpg', '.jpeg')):
            # Process each image through our API
            response = process_image(os.path.join(folder_path, filename))
            save_result(response)
\`\`\`

${t('docs.tutorials.workflowNote', 'This example shows how to automate image processing for a folder of images.')}`
        }
      ]
    }
  ];

  return (
    <div className={`documentation-page ${theme}`}>
      <div className="docs-container">
        <header className="docs-header">
          <h1>{t('docs.title', 'Documentation')}</h1>
          <p className="docs-subtitle">
            {t('docs.subtitle', 'Comprehensive guides and tutorials for EaseMyTools')}
          </p>
        </header>

        <div className="docs-layout">
          <nav className="docs-sidebar">
            <div className="sidebar-content">
              <h3>{t('docs.contents', 'Contents')}</h3>
              <ul className="sidebar-nav">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      {section.title}
                    </button>
                    {activeSection === section.id && (
                      <ul className="subsections">
                        {section.subsections.map((subsection, index) => (
                          <li key={index}>
                            <a href={`#${subsection.title.toLowerCase().replace(/\s+/g, '-')}`}>
                              {subsection.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <main className="docs-content">
            {sections
              .filter(section => section.id === activeSection)
              .map(section => (
                <div key={section.id} className="section-content">
                  <h2>{section.title}</h2>
                  <p className="section-description">{section.content}</p>
                  
                  {section.subsections.map((subsection, index) => (
                    <article key={index} className="subsection" id={subsection.title.toLowerCase().replace(/\s+/g, '-')}>
                      <div className="subsection-content">
                        <div 
                          className="markdown-content"
                          dangerouslySetInnerHTML={{ 
                            __html: subsection.content.replace(/\n/g, '<br/>').replace(/# (.*?)\n/g, '<h3>$1</h3>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code>$1</code>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
                          }}
                        />
                      </div>
                    </article>
                  ))}
                </div>
              ))}
          </main>
        </div>

        <div className="docs-support">
          <h2>{t('docs.needHelp', 'Need Help?')}</h2>
          <p>{t('docs.supportText', "Can't find what you're looking for? Our support team is here to help.")}</p>
          <div className="support-links">
            <a href="/contact" className="support-link">
              {t('docs.contactSupport', 'Contact Support')}
            </a>
            <a href="/api" className="support-link">
              {t('docs.apiReference', 'API Reference')}
            </a>
            <a href="/faq" className="support-link">
              {t('docs.viewFaq', 'View FAQ')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;