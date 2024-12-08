import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  setCategory,
  setSubcategories,
  clearProducts,
  fetchProductsByCategory
} from '../../redux/features/productsSlice';
import Categories from '../Categories';
import scss from './Filter.module.scss';

const Filter = () => {
  const dispatch = useDispatch();

  const selectedCategory = useSelector(
    (state) => state.products.selectedCategory
  );
  const selectedSubcategories = useSelector(
    (state) => state.products.selectedSubcategories
  );

  const fetchFilteredProducts = (category, subcategories) => {
    if (!category) return;
    dispatch(clearProducts());
    dispatch(fetchProductsByCategory({ category, subcategories }));
  };

  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
    dispatch(setSubcategories([]));
    fetchFilteredProducts(category, []);
  };

  const handleSubcategoriesChange = (subcategories) => {
    dispatch(setSubcategories(subcategories));
    fetchFilteredProducts(selectedCategory, subcategories);
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchFilteredProducts(selectedCategory, selectedSubcategories);
    }
  }, [selectedCategory, selectedSubcategories]);

  return (
    <div className={scss.filter}>
      <Categories
        selectedCategory={selectedCategory}
        selectedSubcategories={selectedSubcategories}
        onCategoryChange={handleCategoryChange}
        onSubcategoriesChange={handleSubcategoriesChange}
      />
    </div>
  );
};

export default Filter;
