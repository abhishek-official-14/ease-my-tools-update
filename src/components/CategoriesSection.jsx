// import { useTranslation } from 'react-i18next';
// import '../styles/CategoriesSection.css';

// const CategoriesSection = () => {
//   const { t } = useTranslation();

//   const categories = [
//     {
//       icon: '🖼️',
//       title: t('categories.images', 'Image Tools'),
//       count: '6 tools',
//       description: t('categories.imagesDesc', 'Resize, convert and edit images'),
//       path: '/image-tools'
//     },
//     {
//       icon: '🔄',
//       title: t('categories.converters', 'Converters'),
//       count: '4 tools',
//       description: t('categories.convertersDesc', 'Various format converters'),
//       path: '/converters'
//     },
//     {
//       icon: '📝',
//       title: t('categories.text', 'Text Tools'),
//       count: '3 tools',
//       description: t('categories.textDesc', 'Text formatting and analysis'),
//       path: '/text-tools'
//     },
//     {
//       icon: '🧮',
//       title: t('categories.calculators', 'Calculators'),
//       count: '3 tools',
//       description: t('categories.calculatorsDesc', 'Various calculation tools'),
//       path: '/calculators'
//     },
//     {
//       icon: '🎬',
//       title: t('categories.video', 'Video Tools'),
//       count: '2 tools',
//       description: t('categories.videoDesc', 'MP4 to GIF, video converter'),
//       path: '/video-tools'
//     },
//     {
//       icon: '🔐',
//       title: t('categories.security', 'Security Tools'),
//       count: '3 tools',
//       description: t('categories.securityDesc', 'Password generator, hash tools'),
//       path: '/security-tools'
//     }
//   ];

//   return (
//     <section className="categories-section">
//       <div className="container">
//         <h2>{t('categories.title', 'All Tool Categories')}</h2>
//         <div className="categories-grid">
//           {categories.map((category, index) => (
//             <div key={index} className="category-card">
//               <div className="category-icon">{category.icon}</div>
//               <h3>{category.title}</h3>
//               <p className="category-count">{category.count}</p>
//               <p className="category-desc">{category.description}</p>
//               <button className="category-btn">
//                 {t('categories.explore', 'Explore →')}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoriesSection;




import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../styles/CategoriesSection.css';

const CategoriesSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const categories = [
    {
      icon: '🖼️',
      title: t('categories.images', 'Image Tools'),
      count: '6 tools',
      description: t('categories.imagesDesc', 'Resize, convert and edit images'),
      categoryId: 'image' // This should match your category IDs in toolsData.js
    },
    {
      icon: '🔄',
      title: t('categories.converters', 'Converters'),
      count: '4 tools',
      description: t('categories.convertersDesc', 'Various format converters'),
      categoryId: 'converter'
    },
    {
      icon: '📝',
      title: t('categories.text', 'Text Tools'),
      count: '3 tools',
      description: t('categories.textDesc', 'Text formatting and analysis'),
      categoryId: 'text'
    },
    {
      icon: '🧮',
      title: t('categories.calculators', 'Calculators'),
      count: '3 tools',
      description: t('categories.calculatorsDesc', 'Various calculation tools'),
      categoryId: 'calculator'
    },
    {
      icon: '🎬',
      title: t('categories.video', 'Video Tools'),
      count: '2 tools',
      description: t('categories.videoDesc', 'MP4 to GIF, video converter'),
      categoryId: 'video'
    },
    {
      icon: '🔐',
      title: t('categories.security', 'Security Tools'),
      count: '3 tools',
      description: t('categories.securityDesc', 'Password generator, hash tools'),
      categoryId: 'security'
    }
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/tools/${categoryId}`);
  };

  return (
    <section className="categories-section">
      <div className="container">
        <h2>{t('categories.title', 'All Tool Categories')}</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="category-card"
              onClick={() => handleCategoryClick(category.categoryId)}
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p className="category-count">{category.count}</p>
              <p className="category-desc">{category.description}</p>
              <button className="category-btn">
                {t('categories.explore', 'Explore →')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;