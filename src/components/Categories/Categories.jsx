import React, { useState } from 'react';
import scss from './Categories.module.scss';
import data from './products.json';
import { getCategoryIcon, getSubcategoryIcon } from './icons.jsx';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

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

  const sortedProducts = data.products.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={scss.categories}>
      <div className={scss.container}>
        <div className={scss.categoryButtons}>
          {sortedProducts.map((product, index) => (
            <button
              key={index}
              className={`${scss.categoryButton} ${selectedCategory === product.name ? scss.active : ''}`}
              value={product.name}
              onClick={handleCategoryChange}
            >
              {getCategoryIcon(product.name)}
              {product.name}
            </button>
          ))}
        </div>
        {selectedCategory && (
          <div className={scss.subcategories}>
            <div className={scss.subcategoryButtons}>
              {sortedProducts
                .find((product) => product.name === selectedCategory)
                .categories.sort((a, b) => a.localeCompare(b))
                .map((subcategory, index) => (
                  <button
                    key={index}
                    className={`${scss.subcategoryButton} ${selectedSubcategories.includes(subcategory) ? scss.active : ''}`}
                    value={subcategory}
                    onClick={handleSubcategoryChange}
                  >
                    {getSubcategoryIcon(subcategory)}
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
