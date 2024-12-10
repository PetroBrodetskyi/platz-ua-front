import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [localSelectedCategory, setLocalSelectedCategory] =
    useState(selectedCategory);
  const [localSelectedSubcategories, setLocalSelectedSubcategories] = useState(
    selectedSubcategories || []
  );
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (localSelectedCategory !== selectedCategory) {
      onCategoryChange(localSelectedCategory);
    }
  }, [localSelectedCategory]);

  useEffect(() => {
    if (localSelectedSubcategories !== selectedSubcategories) {
      onSubcategoriesChange(localSelectedSubcategories);
    }
  }, [localSelectedSubcategories]);

  const handleCategorySelect = (category) => {
    setLocalSelectedCategory(category);
    setLocalSelectedSubcategories([]);
    navigate(`/category/${category}`);
  };

  const handleSubcategoryClick = (subcategory) => {
    const updatedSubcategories = localSelectedSubcategories.includes(
      subcategory
    )
      ? localSelectedSubcategories.filter((item) => item !== subcategory)
      : [...localSelectedSubcategories, subcategory];

    setLocalSelectedSubcategories(updatedSubcategories);
    navigate(
      `/category/${localSelectedCategory}?subcategories=${updatedSubcategories.join(',')}`
    );
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

        {subcategories.length > 0 && (
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
                  aria-pressed={localSelectedSubcategories.includes(
                    subcategory
                  )}
                >
                  {subcategory}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
