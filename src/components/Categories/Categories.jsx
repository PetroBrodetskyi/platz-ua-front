import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import data from './products.json';
import { getCategoryIcon } from './icons.jsx';
import scss from './Categories.module.scss';

const Categories = ({ onSubcategoriesChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    data.products[0]?.name || ''
  );
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState({});
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (onSubcategoriesChange) {
      const currentSubcategories =
        subcategoriesByCategory[selectedCategory] || [];
      if (currentSubcategories.length !== 0 || selectedCategory === '') {
        console.log('Виклик onSubcategoriesChange з даними:', {
          category: selectedCategory,
          subcategories: currentSubcategories
        });
        onSubcategoriesChange({
          category: selectedCategory,
          subcategories: currentSubcategories
        });
      }
    }
  }, [selectedCategory, subcategoriesByCategory, onSubcategoriesChange]);

  const handleCategorySelect = (category) => {
    console.log('Категорія вибрана:', category);
    setSelectedCategory(category);

    setSubcategoriesByCategory((prevState) => ({
      ...prevState,
      [category]: prevState[category] || []
    }));
  };

  const handleSubcategoryClick = (subcategory) => {
    const updatedSubcategories =
      subcategoriesByCategory[selectedCategory] || [];
    const newSubcategories = updatedSubcategories.includes(subcategory)
      ? updatedSubcategories.filter((item) => item !== subcategory)
      : [...updatedSubcategories, subcategory];

    console.log('Підкатегорія вибрана/знята:', subcategory);
    console.log('Новий список підкатегорій:', newSubcategories);

    setSubcategoriesByCategory({
      ...subcategoriesByCategory,
      [selectedCategory]: newSubcategories
    });
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
                  (subcategoriesByCategory[selectedCategory] || []).includes(
                    subcategory
                  )
                    ? scss.active
                    : ''
                }`}
                onClick={() => handleSubcategoryClick(subcategory)}
                aria-pressed={(
                  subcategoriesByCategory[selectedCategory] || []
                ).includes(subcategory)}
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
