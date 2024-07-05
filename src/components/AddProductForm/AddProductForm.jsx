import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import scss from './AddProductForm.module.scss';

const AddProductForm = ({ selectedSubcategories }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    data.subcategories = selectedSubcategories;

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post('https://platz-ua-back.vercel.app/api/products', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Product created:', response.data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
      <div className={scss.formGroup}>
        <label htmlFor="name">Назва:</label>
        <input id="name" type="text" {...register('name', { required: true })} />
        {errors.name && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="price">Ціна:</label>
        <input id="price" type="text" {...register('price', { required: true })} />
        {errors.price && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="description">Опис:</label>
        <input id="description" type="text" {...register('description', { required: true })} />
        {errors.description && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="condition">Стан:</label>
        <input id="condition" type="text" {...register('condition', { required: true })} />
        {errors.condition && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="location">Локація:</label>
        <input id="location" type="text" {...register('location', { required: true })} />
        {errors.location && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="gallery">Галерея (URL зображень через кому):</label>
        <input id="gallery" type="text" {...register('gallery', { required: true })} />
        {errors.gallery && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="views">Перегляди:</label>
        <input id="views" type="number" {...register('views', { required: true })} />
        {errors.views && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="category">Категорія:</label>
        <input id="category" type="text" {...register('category', { required: true })} />
        {errors.category && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.buttonWrapper}>
        <button type="submit">Додати продукт</button>
      </div>
    </form>
  );
};

export default AddProductForm;
