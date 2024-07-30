import React, { useState, useEffect } from 'react';
import scss from './Categories.module.scss';
import data from './products.json';
import { MdOutlineFilterList, MdOutlineFilterListOff } from "react-icons/md";
import { getCategoryIcon, getSubcategoryIcon } from './icons.jsx';

const Categories = ({ onSubcategoriesChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [categoriesVisible, setCategoriesVisible] = useState(true);

  useEffect(() => {
    if (onSubcategoriesChange) {
      onSubcategoriesChange(selectedSubcategories);
    }
  }, [selectedSubcategories, onSubcategoriesChange]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategories([]);
  };

  const handleSubcategoryChange = (event) => {
    const subcategory = event.target.value;
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory]
    );
  };

  const handleToggleCategories = () => {
    if (categoriesVisible) {
      setSelectedCategory(null);
    }
    setCategoriesVisible(!categoriesVisible);
  };

  const sortedProducts = data.products.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={scss.categories}>
      <div className={scss.container}>
        <button className={scss.toggleButton} onClick={handleToggleCategories}>
          {categoriesVisible ? <MdOutlineFilterList /> : <MdOutlineFilterListOff />}
        </button>
        {categoriesVisible && (
          <div className={scss.categoryButtons}>
            {sortedProducts.map((product) => (
              <button
                key={product.id}
                className={`${scss.categoryButton} ${selectedCategory === product.id ? scss.active : ''}`}
                value={product.id}
                onClick={handleCategoryChange}
              >
                {getCategoryIcon(product.name)}
                {product.name}
              </button>
            ))}
          </div>
        )}
        {categoriesVisible && selectedCategory && (
          <div className={scss.subcategories}>
            <div className={scss.subcategoryButtons}>
              {sortedProducts
                .find((product) => product.id === selectedCategory)
                .categories.sort((a, b) => a.name.localeCompare(b.name))
                .map((subcategory) => (
                  <button
                    key={subcategory.id}
                    className={`${scss.subcategoryButton} ${selectedSubcategories.includes(subcategory.id) ? scss.active : ''}`}
                    value={subcategory.id}
                    onClick={handleSubcategoryChange}
                  >
                    {getSubcategoryIcon(subcategory.name)}
                    {subcategory.name}
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
