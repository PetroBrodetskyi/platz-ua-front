import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryIcon } from './icons.jsx';
import scss from './Categories.module.scss';
import {
  fetchProductsByCategoryAndSubcategories,
  setCategory
} from '../../redux/features/productsSlice';
import { useTheme } from '../../context/ThemeContext';

const Categories = ({ onSubcategoriesChange }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.products.selectedCategory
  );
  const products = useSelector((state) => state.products.products);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (onSubcategoriesChange) {
      onSubcategoriesChange(selectedSubcategories);
    }
  }, [selectedSubcategories, onSubcategoriesChange]);

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
    setSelectedSubcategories([]);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory]
    );
  };

  useEffect(() => {
    if (selectedCategory) {
      dispatch(
        fetchProductsByCategoryAndSubcategories({
          category: selectedCategory,
          subcategories: selectedSubcategories
        })
      );
    }
  }, [selectedCategory, selectedSubcategories, dispatch]);

  const categories = [...new Set(products.map((product) => product.category))];

  const subcategories = selectedCategory
    ? products
        .filter((product) => product.category === selectedCategory)
        .flatMap((product) => product.categories)
        .filter((value, index, self) => self.indexOf(value) === index)
    : [];

  return (
    <div className={`${scss.categories} ${isDarkMode ? scss.darkMode : ''}`}>
      <div className={scss.container}>
        <h3 className={scss.title}>Розділи та категорії</h3>

        <div className={scss.categoryButtons}>
          {categories.sort().map((category, index) => (
            <button
              key={index}
              className={`${scss.categoryButton} ${isDarkMode ? scss.darkMode : ''} ${selectedCategory === category ? scss.active : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {getCategoryIcon(category)}
              {category}
            </button>
          ))}
        </div>

        <div className={scss.subcategories}>
          {selectedCategory && (
            <div className={scss.subcategoryButtons}>
              {subcategories.sort().map((subcategory, index) => (
                <button
                  key={index}
                  className={`${scss.subcategoryButton} ${isDarkMode ? scss.darkMode : ''} ${selectedSubcategories.includes(subcategory) ? scss.active : ''}`}
                  onClick={() => handleSubcategoryClick(subcategory)}
                >
                  {subcategory}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
