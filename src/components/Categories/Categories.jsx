import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import data from './products.json';
import { getCategoryIcon } from './icons.jsx';
import scss from './Categories.module.scss';

const Categories = ({ onSubcategoriesChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    data.products[0]?.name || ''
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (onSubcategoriesChange) {
      console.log('Виклик onSubcategoriesChange з даними:', {
        category: selectedCategory,
        subcategories: selectedSubcategories
      });
      onSubcategoriesChange({
        category: selectedCategory,
        subcategories: selectedSubcategories
      });
    }
  }, [selectedCategory, selectedSubcategories, onSubcategoriesChange]);

  const handleCategorySelect = (category) => {
    console.log('Категорія вибрана:', category);
    setSelectedCategory(category);
    setSelectedSubcategories([]);
  };

  const handleSubcategoryClick = (subcategory) => {
    const newSubcategories = selectedSubcategories.includes(subcategory)
      ? selectedSubcategories.filter((item) => item !== subcategory)
      : [...selectedSubcategories, subcategory];

    console.log('Підкатегорія вибрана/знята:', subcategory);
    console.log('Новий список підкатегорій:', newSubcategories);

    setSelectedSubcategories(newSubcategories);
  };

  const sortedProducts =
    data.products?.sort((a, b) => a.name.localeCompare(b.name)) || [];

  const currentCategory = sortedProducts.find(
    (product) => product.name === selectedCategory
  );

  const allSubcategories = sortedProducts.flatMap(
    (product) => product.categories || []
  );

  const subcategories =
    currentCategory?.categories?.sort((a, b) => a.localeCompare(b)) ||
    allSubcategories.sort((a, b) => a.localeCompare(b));

  return (
    <div className={`${scss.categories} ${isDarkMode ? scss.darkMode : ''}`}>
      <div className={scss.container}>
        <h3 className={scss.title}>Розділи та категорії</h3>

        <div className={scss.categoryButtons}>
          {sortedProducts.map((product, index) => (
            <button
              key={index}
              className={`${scss.categoryButton} ${isDarkMode ? scss.darkMode : ''} ${
                selectedCategory === product.name ? scss.active : ''
              }`}
              onClick={() => handleCategorySelect(product.name)}
            >
              {getCategoryIcon(product.name)}
              {product.name}
            </button>
          ))}
        </div>

        <div className={scss.subcategories}>
          <div className={scss.subcategoryButtons}>
            {subcategories.map((subcategory, index) => (
              <button
                key={index}
                className={`${scss.subcategoryButton} ${isDarkMode ? scss.darkMode : ''} ${
                  selectedSubcategories.includes(subcategory) ? scss.active : ''
                }`}
                onClick={() => handleSubcategoryClick(subcategory)}
                aria-pressed={selectedSubcategories.includes(subcategory)}
              >
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
