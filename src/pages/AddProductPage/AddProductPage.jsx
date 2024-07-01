import React from 'react';
import AddProductForm from '../../components/AddProductForm/AddProductForm';
import Categories from '../../components/Categories/Categories';

const AddProductPage = () => {
  return (
    <div>
        <h1>Додати нове оголошення</h1>
        <Categories />
        <AddProductForm />
    </div>
  );
};

export default AddProductPage;
