import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsByCategoryAndSubcategories } from '../../redux/features/productsSlice';
import Categories from '../Categories';
import scss from './Filter.module.scss';

const Filter = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.products.selectedCategory
  );

  const handleSubcategoriesChange = (subcategories) => {
    dispatch(
      fetchProductsByCategoryAndSubcategories({
        category: selectedCategory,
        subcategories
      })
    );
  };

  return (
    <div className={scss.filter}>
      <Categories onSubcategoriesChange={handleSubcategoriesChange} />
    </div>
  );
};

export default Filter;
