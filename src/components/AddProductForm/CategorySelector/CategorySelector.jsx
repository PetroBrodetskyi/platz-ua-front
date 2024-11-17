import SubcategoriesSelect from '../SubcategoriesSelect/SubcategoriesSelect';
import scss from './CategorySelector.module.scss';
import { IoMdInformationCircleOutline } from 'react-icons/io';

const CategorySelector = ({ categories, subcategories, register, errors }) => (
  <div className={scss.formGroup}>
    <div className={scss.info}>
      <h4>Виберіть розділ та від 1 до 3 категорій</h4>
      <IoMdInformationCircleOutline className={scss.icon} />
    </div>
    <select
      id="category"
      {...register('category', { required: true })}
      className={scss.select}
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
      errors={errors}
    />
  </div>
);

export default CategorySelector;
