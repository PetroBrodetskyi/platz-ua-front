import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import scss from './AddProductForm.module.scss';

const AddProductForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Create a FormData object to handle file uploads
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
        <label htmlFor="locationPLZ">Поштовий індекс:</label>
        <input id="locationPLZ" type="text" {...register('location.PLZ', { required: true })} />
        {errors.location?.PLZ && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="locationCity">Місто:</label>
        <input id="locationCity" type="text" {...register('location.city', { required: true })} />
        {errors.location?.city && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="galleryImage1">Зображення 1:</label>
        <input id="galleryImage1" type="file" {...register('gallery.image1')} />
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="galleryImage2">Зображення 2:</label>
        <input id="galleryImage2" type="file" {...register('gallery.image2')} />
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="galleryImage3">Зображення 3:</label>
        <input id="galleryImage3" type="file" {...register('gallery.image3')} />
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="views">Перегляди:</label>
        <input id="views" type="text" {...register('views', { required: true })} />
        {errors.views && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="categorySub1">Підкатегорія 1:</label>
        <input id="categorySub1" type="text" {...register('category.subcategory1')} />
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="categorySub2">Підкатегорія 2:</label>
        <input id="categorySub2" type="text" {...register('category.subcategory2')} />
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="categorySub3">Підкатегорія 3:</label>
        <input id="categorySub3" type="text" {...register('category.subcategory3')} />
      </div>

      <button type="submit">Додати оголошення</button>
    </form>
  );
};

export default AddProductForm;
