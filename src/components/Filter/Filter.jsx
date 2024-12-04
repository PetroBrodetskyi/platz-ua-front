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

  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
    dispatch(setSubcategories([]));
    dispatch(
      fetchProductsByCategoryAndSubcategories({
        category,
        subcategories: []
      })
    );
  };

  const handleSubcategoriesChange = (subcategories) => {
    dispatch(setSubcategories(subcategories));
    dispatch(
      fetchProductsByCategoryAndSubcategories({
        category: selectedCategory,
        subcategories
      })
    );
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
