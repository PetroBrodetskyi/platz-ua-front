import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import scss from './ProductList.module.scss';
import ViewToggle from './ViewToggle/ViewToggle';

const ProductList = () => {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className={`${scss.productList} ${scss[viewMode]}`}>
      <div className={scss.header}>
        <h3>Найновіші</h3>
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <div className={scss.container}>
        <ProductCard viewMode={viewMode} />
      </div>
    </div>
  );
};

export default ProductList;
