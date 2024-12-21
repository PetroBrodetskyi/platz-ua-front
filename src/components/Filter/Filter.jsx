import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategory,
  setSubcategories,
  fetchProductsByCategory
} from '../../redux/features/productsSlice';
import Categories from '../Categories';
import scss from './Filter.module.scss';
import { scrollToSection } from '../../helpers/scrollToSection';

const Filter = () => {
  const { category, subcategory } = useParams();
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.products.selectedCategory
  );
  const selectedSubcategories = useSelector(
    (state) => state.products.selectedSubcategories
  );

  useEffect(() => {
    if (category) {
      dispatch(setCategory(category));
    }
    if (subcategory) {
      dispatch(setSubcategories([subcategory]));
    }
    if (category || subcategory) {
      dispatch(
        fetchProductsByCategory({
          category,
          subcategories: subcategory ? [subcategory] : []
        })
      );
      // Після вибору категорії чи підкатегорії прокручуємо до ProductList
      const productListSection = document.querySelector('#productList');
      if (productListSection) {
        // Викликаємо scrollToSection без типізації
        scrollToSection(
          { currentTarget: { getAttribute: () => '#productList' } },
          false
        );
      }
    }
  }, [category, subcategory, dispatch]);

  const handleCategoryChange = (newCategory) => {
    dispatch(setCategory(newCategory));
    dispatch(setSubcategories([]));
  };

  const handleSubcategoriesChange = (newSubcategories) => {
    dispatch(setSubcategories(newSubcategories));
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
