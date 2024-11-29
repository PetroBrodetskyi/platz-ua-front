import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import scss from './ProductList.module.scss';
import ViewToggle from './ViewToggle';

const ProductList = () => {
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    const savedViewMode = localStorage.getItem('viewMode');
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem('viewMode', mode);
  };

  return (
    <div className={scss.productListWrapper}>
      <div className={`${scss.productList} ${scss[viewMode]}`}>
        <div className={scss.header}>
          <h3 className={scss.title}>Найновіші</h3>
          <ViewToggle viewMode={viewMode} setViewMode={handleViewModeChange} />
        </div>
        <div className={scss.container}>
          <ProductCard viewMode={viewMode} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
