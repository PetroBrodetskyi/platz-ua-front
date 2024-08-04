import scss from './SubcategoriesSelect.module.scss';

const SubcategoriesSelect = ({ subcategories, register, errors }) => {
  return (
    <div className={scss.formGroup}>
      <label htmlFor="subcategory1"></label>
      <select 
        id="subcategory1" 
        {...register('subcategory1', { required: true })} 
        autoComplete="off"
      >
        <option value="">Виберіть підкатегорію</option>
        {subcategories.map(subcat => (
          <option key={subcat} value={subcat}>{subcat}</option>
        ))}
      </select>
      {errors.subcategory1 && <span>Це поле обов'язкове</span>}
      
      <label htmlFor="subcategory2"></label>
      <select 
        id="subcategory2" 
        {...register('subcategory2')} 
        autoComplete="off"
      >
        <option value="">Виберіть підкатегорію</option>
        {subcategories.map(subcat => (
          <option key={subcat} value={subcat}>{subcat}</option>
        ))}
      </select>
      
      <label htmlFor="subcategory3"></label>
      <select 
        id="subcategory3" 
        {...register('subcategory3')} 
        autoComplete="off"
      >
        <option value="">Виберіть підкатегорію</option>
        {subcategories.map(subcat => (
          <option key={subcat} value={subcat}>{subcat}</option>
        ))}
      </select>
    </div>
  );
};

export default SubcategoriesSelect;
