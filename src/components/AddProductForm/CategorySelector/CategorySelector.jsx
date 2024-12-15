import SubcategoriesSelect from '../SubcategoriesSelect/SubcategoriesSelect';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import scss from './CategorySelector.module.scss';

const CategorySelector = ({
  categories,
  subcategories,
  register,
  isDarkMode,
  errors
}) => (
  <div className={scss.formGroup}>
    <div className={scss.info}>
      <p>Виберіть розділ та від 1 до 3 категорій</p>
      <IoMdInformationCircleOutline className={scss.icon} />
    </div>
    <select
      id="category"
      {...register('category', { required: true })}
      className={`${scss.select} ${isDarkMode ? scss.darkMode : ''}`}
    >
      <option value="">Виберіть розділ</option>
      {categories.map((cat) => (
        <option key={cat.name} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>
    {errors.category && <span>Це поле обов'язкове</span>}
    <SubcategoriesSelect
      subcategories={subcategories}
      register={register}
      isDarkMode={isDarkMode}
      errors={errors}
    />
  </div>
);

export default CategorySelector;
