import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/HomePage.css';

// Import the new sections
import HeroSection from './HeroSection';
import CategoriesSection from './CategoriesSection';
import FeaturedTools from './FeaturedTools';
import BenefitsSection from './BenefitsSection';
import TestimonialsSection from './TestimonialsSection';
import NewsletterSection from './NewsletterSection';

const HomePage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className={`home-page ${theme}`}>
      <HeroSection />
      <CategoriesSection />
      <FeaturedTools />
      <BenefitsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;