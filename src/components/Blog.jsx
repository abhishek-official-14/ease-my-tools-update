import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Blog.css';

const Blog = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const featuredPosts = [
    {
      id: 1,
      title: t('blog.post1.title', '10 Ways to Boost Your Productivity with Online Tools'),
      excerpt: t('blog.post1.excerpt', 'Discover how to streamline your workflow and save time with these essential productivity tips and tools.'),
      category: t('blog.category.productivity', 'Productivity'),
      date: '2024-01-15',
      readTime: '5 min read',
      image: '📊'
    },
    {
      id: 2,
      title: t('blog.post2.title', 'The Future of Browser-Based Image Processing'),
      excerpt: t('blog.post2.excerpt', 'Explore how modern web technologies are revolutionizing image editing and processing directly in your browser.'),
      category: t('blog.category.technology', 'Technology'),
      date: '2024-01-10',
      readTime: '7 min read',
      image: '🖼️'
    },
    {
      id: 3,
      title: t('blog.post3.title', 'Privacy-First: Why Local Processing Matters'),
      excerpt: t('blog.post3.excerpt', 'Learn why processing files locally in your browser is crucial for data privacy and security in the digital age.'),
      category: t('blog.category.security', 'Security'),
      date: '2024-01-05',
      readTime: '4 min read',
      image: '🔒'
    }
  ];

  const categories = [
    { name: t('blog.category.all', 'All'), count: 12 },
    { name: t('blog.category.productivity', 'Productivity'), count: 4 },
    { name: t('blog.category.technology', 'Technology'), count: 3 },
    { name: t('blog.category.tutorials', 'Tutorials'), count: 3 },
    { name: t('blog.category.security', 'Security'), count: 2 }
  ];

  const recentPosts = [
    {
      id: 4,
      title: t('blog.post4.title', 'How to Convert PDFs Without Losing Formatting'),
      date: '2024-01-03',
      readTime: '3 min read'
    },
    {
      id: 5,
      title: t('blog.post5.title', 'Batch Processing: Save Time with Multiple Files'),
      date: '2024-01-01',
      readTime: '6 min read'
    },
    {
      id: 6,
      title: t('blog.post6.title', 'New Tool Release: Advanced Image Resizer'),
      date: '2023-12-28',
      readTime: '2 min read'
    }
  ];

  return (
    <div className={`blog-page ${theme}`}>
      <div className="blog-container">
        <header className="blog-header">
          <h1>{t('blog.title', 'EaseMyTools Blog')}</h1>
          <p className="blog-subtitle">
            {t('blog.subtitle', 'Tips, tutorials, and insights to help you get the most out of our tools')}
          </p>
        </header>

        <div className="blog-layout">
          <main className="blog-content">
            <section className="featured-posts">
              <h2>{t('blog.featured', 'Featured Posts')}</h2>
              <div className="posts-grid">
                {featuredPosts.map((post) => (
                  <article key={post.id} className="post-card featured">
                    <div className="post-image">
                      {post.image}
                    </div>
                    <div className="post-content">
                      <div className="post-meta">
                        <span className="post-category">{post.category}</span>
                        <span className="post-date">{post.date}</span>
                        <span className="post-read-time">{post.readTime}</span>
                      </div>
                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-excerpt">{post.excerpt}</p>
                      <a href="#" className="read-more">
                        {t('blog.readMore', 'Read More')} →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="all-posts">
              <h2>{t('blog.allPosts', 'All Posts')}</h2>
              <div className="posts-list">
                {[...featuredPosts, ...recentPosts].map((post) => (
                  <article key={post.id} className="post-item">
                    <div className="post-info">
                      <div className="post-meta">
                        <span className="post-date">{post.date}</span>
                        <span className="post-read-time">{post.readTime}</span>
                      </div>
                      <h3 className="post-title">{post.title}</h3>
                      {post.excerpt && (
                        <p className="post-excerpt">{post.excerpt}</p>
                      )}
                    </div>
                    <a href="#" className="read-more">
                      {t('blog.readMore', 'Read More')} →
                    </a>
                  </article>
                ))}
              </div>
            </section>
          </main>

          <aside className="blog-sidebar">
            <div className="sidebar-section">
              <h3>{t('blog.categories', 'Categories')}</h3>
              <div className="categories-list">
                {categories.map((category, index) => (
                  <a key={index} href="#" className="category-item">
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">({category.count})</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>{t('blog.newsletter', 'Newsletter')}</h3>
              <div className="newsletter-box">
                <p>{t('blog.newsletterText', 'Get the latest updates and tips delivered to your inbox.')}</p>
                <form className="newsletter-form">
                  <input
                    type="email"
                    placeholder={t('blog.emailPlaceholder', 'Enter your email')}
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-button">
                    {t('blog.subscribe', 'Subscribe')}
                  </button>
                </form>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>{t('blog.recentPosts', 'Recent Posts')}</h3>
              <div className="recent-posts">
                {recentPosts.map((post) => (
                  <a key={post.id} href="#" className="recent-post">
                    <h4>{post.title}</h4>
                    <div className="post-meta">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Blog;