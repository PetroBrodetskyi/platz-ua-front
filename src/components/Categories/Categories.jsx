import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import data from './products.json';
import { getCategoryIcon, getSubcategoryIcon } from './icons.jsx';
import scss from './Categories.module.scss';

const Categories = ({ onSubcategoriesChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    data.products[0].name
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (onSubcategoriesChange) {
      onSubcategoriesChange(selectedSubcategories);
    }
  }, [selectedSubcategories, onSubcategoriesChange]);

  const handleCategoryHover = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategories([]);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory]
    );
  };

  const sortedProducts = data.products.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className={`${scss.categories} ${isDarkMode ? scss.darkMode : ''}`}>
      <h4>Розділи та категорії</h4>
      <div className={scss.container}>
        <div className={scss.categoryButtons}>
          {sortedProducts.map((product, index) => (
            <button
              key={index}
              className={`${scss.categoryButton} ${isDarkMode ? scss.darkMode : ''} ${selectedCategory === product.name ? scss.active : ''}`}
              onMouseEnter={() => handleCategoryHover(product.name)}
            >
              {getCategoryIcon(product.name)}
              {product.name}
            </button>
          ))}
        </div>

        <div className={scss.subcategories}>
          <div className={scss.subcategoryButtons}>
            {sortedProducts
              .find((product) => product.name === selectedCategory)
              .categories.sort((a, b) => a.localeCompare(b))
              .map((subcategory, index) => (
                <button
                  key={index}
                  className={`${scss.subcategoryButton} ${isDarkMode ? scss.darkMode : ''} ${selectedSubcategories.includes(subcategory) ? scss.active : ''}`}
                  onClick={() => handleSubcategoryClick(subcategory)}
                >
                  {getSubcategoryIcon(subcategory)}
                  {subcategory}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
