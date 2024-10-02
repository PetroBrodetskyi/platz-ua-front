import { useState, useEffect } from 'react';
import scss from './Categories.module.scss';
import data from './products.json';
import { getCategoryIcon, getSubcategoryIcon } from './icons.jsx';

const Categories = ({ onSubcategoriesChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  useEffect(() => {
    if (onSubcategoriesChange) {
      onSubcategoriesChange(selectedSubcategories);
    }
  }, [selectedSubcategories, onSubcategoriesChange]);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSelectedSubcategories([]);
    } else {
      setSelectedCategory(category);
      setSelectedSubcategories([]);
    }
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
    <div className={scss.categories}>
      <h4>Розділи та категорії</h4>
      <div className={scss.container}>
        <div className={scss.categoryButtons}>
          {sortedProducts.map((product, index) => (
            <button
              key={index}
              className={`${scss.categoryButton} ${selectedCategory === product.name ? scss.active : ''}`}
              onClick={() => handleCategoryClick(product.name)}
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
                    onClick={() => handleSubcategoryClick(subcategory)}
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
