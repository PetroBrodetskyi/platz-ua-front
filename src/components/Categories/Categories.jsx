import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import data from './products.json';
import { getCategoryIcon } from './icons.jsx';
import scss from './Categories.module.scss';

const Categories = ({
  selectedCategory,
  selectedSubcategories,
  onCategoryChange,
  onSubcategoriesChange
}) => {
  const [localSelectedCategory, setLocalSelectedCategory] = useState(
    selectedCategory || data.products[0]?.name
  );
  const [localSelectedSubcategories, setLocalSelectedSubcategories] = useState(
    selectedSubcategories || []
  );
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (onSubcategoriesChange) {
      onSubcategoriesChange(localSelectedSubcategories);
    }
    if (onCategoryChange) {
      onCategoryChange(localSelectedCategory, localSelectedSubcategories);
    }
  }, [
    localSelectedCategory,
    localSelectedSubcategories,
    onCategoryChange,
    onSubcategoriesChange
  ]);

  const handleCategorySelect = (category) => {
    console.log('Обрана категорія:', category);
    setLocalSelectedCategory(category);
    setLocalSelectedSubcategories([]);
    if (onCategoryChange) {
      onCategoryChange(category, []);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    const updatedSubcategories = localSelectedSubcategories.includes(
      subcategory
    )
      ? localSelectedSubcategories.filter((item) => item !== subcategory)
      : [...localSelectedSubcategories, subcategory];

    console.log('Обрані підкатегорії після кліку:', updatedSubcategories);
    setLocalSelectedSubcategories(updatedSubcategories);
    if (onSubcategoriesChange) {
      onSubcategoriesChange(updatedSubcategories);
    }
  };

  const sortedProducts =
    data.products?.sort((a, b) => a.name.localeCompare(b.name)) || [];

  const currentCategory = sortedProducts.find(
    (product) => product.name === localSelectedCategory
  );

  const subcategories =
    currentCategory?.categories?.sort((a, b) => a.localeCompare(b)) || [];

  return (
    <div className={`${scss.categories} ${isDarkMode ? scss.darkMode : ''}`}>
      <div className={scss.container}>
        <h3 className={scss.title}>Розділи та категорії</h3>

        <div className={scss.categoryButtons}>
          {sortedProducts.map((product, index) => (
            <button
              key={index}
              className={`${scss.categoryButton} ${isDarkMode ? scss.darkMode : ''} ${
                localSelectedCategory === product.name ? scss.active : ''
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
                  localSelectedSubcategories.includes(subcategory)
                    ? scss.active
                    : ''
                }`}
                onClick={() => handleSubcategoryClick(subcategory)}
                aria-pressed={localSelectedSubcategories.includes(subcategory)}
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
