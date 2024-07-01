import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import scss from './AddProductForm.module.scss';

const AddProductForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Product created:', response.data);
      // Додаткові дії після успішного створення оголошення (наприклад, редірект)
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
      <div className={scss.formGroup}>
        <label>Назва:</label>
        <input type="text" {...register('name', { required: true })} />
        {errors.name && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label>Ціна:</label>
        <input type="text" {...register('price', { required: true })} />
        {errors.price && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label>Опис:</label>
        <input type="text" {...register('description', { required: true })} />
        {errors.description && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label>Стан:</label>
        <input type="text" {...register('condition', { required: true })} />
        {errors.condition && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label>Поштовий індекс:</label>
        <input type="text" {...register('location.PLZ', { required: true })} />
        {errors.location?.PLZ && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label>Місто:</label>
        <input type="text" {...register('location.city', { required: true })} />
        {errors.location?.city && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label>Зображення 1:</label>
        <input type="text" {...register('gallery.image1')} />
      </div>

      <div className={scss.formGroup}>
        <label>Зображення 2:</label>
        <input type="text" {...register('gallery.image2')} />
      </div>

      <div className={scss.formGroup}>
        <label>Зображення 3:</label>
        <input type="text" {...register('gallery.image3')} />
      </div>

      <div className={scss.formGroup}>
        <label>Перегляди:</label>
        <input type="text" {...register('views', { required: true })} />
        {errors.views && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label>Підкатегорія 1:</label>
        <input type="text" {...register('category.subcategory1')} />
      </div>

      <div className={scss.formGroup}>
        <label>Підкатегорія 2:</label>
        <input type="text" {...register('category.subcategory2')} />
      </div>

      <div className={scss.formGroup}>
        <label>Підкатегорія 3:</label>
        <input type="text" {...register('category.subcategory3')} />
      </div>

      <button type="submit">Додати оголошення</button>
    </form>
  );
};

export default AddProductForm;
