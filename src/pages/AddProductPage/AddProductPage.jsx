import React, { useState } from 'react';
import AddProductForm from '../../components/AddProductForm/AddProductForm';
import Categories from '../../components/Categories/Categories';

const AddProductPage = () => {
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const handleSubcategoriesChange = (subcategories) => {
    setSelectedSubcategories(subcategories);
  };

  return (
    <div>
        <h1>Додати нове оголошення</h1>
        <Categories onSubcategoriesChange={handleSubcategoriesChange} />
        <AddProductForm selectedSubcategories={selectedSubcategories} />
    </div>
  );
};

export default AddProductPage;
