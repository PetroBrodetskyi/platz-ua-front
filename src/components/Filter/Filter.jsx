import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProductsByCategoryAndSubcategories,
  setCategory,
  setSubcategories
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
    if (category && subcategories.length) {
      dispatch(
        fetchProductsByCategoryAndSubcategories({ category, subcategories })
      );
    }
  };

  const handleCategoryChange = (category, subcategories) => {
    dispatch(setCategory(category));
    dispatch(setSubcategories([]));
    fetchFilteredProducts(category, subcategories);
  };

  const handleSubcategoriesChange = (subcategories) => {
    dispatch(setSubcategories(subcategories));
    fetchFilteredProducts(selectedCategory, subcategories);
  };

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
