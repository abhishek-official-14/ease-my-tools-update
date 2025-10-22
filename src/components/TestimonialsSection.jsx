import { useTranslation } from 'react-i18next';
import '../styles/TestimonialsSection.css';

const TestimonialsSection = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      text: t('testimonials.one', 'This website saved me hours of work! The background removal tool is magical.'),
      name: 'Sarah Chen',
      role: t('testimonials.designer', 'Graphic Designer')
    },
    {
      text: t('testimonials.two', 'As a student, these free tools are a lifesaver for my projects and assignments.'),
      name: 'Alex Rodriguez',
      role: t('testimonials.student', 'University Student')
    },
    {
      text: t('testimonials.three', 'The image tools are incredibly fast and produce professional-quality results.'),
      name: 'Michael Thompson',
      role: t('testimonials.photographer', 'Photographer')
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2>{t('testimonials.title', 'Loved by Thousands of Users')}</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-content">
                <p>"{testimonial.text}"</p>
              </div>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;