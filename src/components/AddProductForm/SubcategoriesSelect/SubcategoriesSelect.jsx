import scss from './SubcategoriesSelect.module.scss';

const SubcategoriesSelect = ({
  subcategories,
  register,
  isDarkMode,
  errors
}) => {
  return (
    <div className={scss.formGroup}>
      <div>
        <label htmlFor="subcategory1"></label>
        <select
          id="subcategory1"
          {...register('subcategory1', { required: true })}
          autoComplete="off"
          className={`${scss.select} ${isDarkMode ? scss.darkMode : ''}`}
        >
          <option value="">Виберіть категорію</option>
          {subcategories.map((subcat) => (
            <option key={subcat} value={subcat}>
              {subcat}
            </option>
          ))}
        </select>
        {errors.subcategory1 && <span>Це поле обов&apos;язкове</span>}
      </div>
      <div>
        <label htmlFor="subcategory2"></label>
        <select
          id="subcategory2"
          {...register('subcategory2')}
          autoComplete="off"
          className={`${scss.select} ${isDarkMode ? scss.darkMode : ''}`}
        >
          <option value="">Виберіть категорію</option>
          {subcategories.map((subcat) => (
            <option key={subcat} value={subcat}>
              {subcat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="subcategory3"></label>
        <select
          id="subcategory3"
          {...register('subcategory3')}
          autoComplete="off"
          className={`${scss.select} ${isDarkMode ? scss.darkMode : ''}`}
        >
          <option value="">Виберіть категорію</option>
          {subcategories.map((subcat) => (
            <option key={subcat} value={subcat}>
              {subcat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SubcategoriesSelect;
