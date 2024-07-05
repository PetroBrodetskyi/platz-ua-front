import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import scss from './AddProductForm.module.scss';

const AddProductForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { name, price, description, condition, locationPLZ, locationCity, galleryImage1, galleryImage2, galleryImage3, views } = data;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('condition', condition);
    formData.append('locationPLZ', locationPLZ);
    formData.append('locationCity', locationCity);
    formData.append('galleryImage1', galleryImage1[0]);
    formData.append('galleryImage2', galleryImage2[0]);
    formData.append('galleryImage3', galleryImage3[0]);
    formData.append('views', views);

    try {
      const response = await axios.post('https://platz-ua-back.vercel.api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
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
        <label>Стан:</label>
        <div>
          <label>
            <input type="radio" value="новий" {...register('condition', { required: true })} />
            Новий
          </label>
        </div>
        <div>
          <label>
            <input type="radio" value="вживаний" {...register('condition', { required: true })} />
            Вживаний
          </label>
        </div>
        {errors.condition && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="locationPLZ">Поштовий індекс:</label>
        <input id="locationPLZ" type="text" {...register('locationPLZ', { required: true })} />
        {errors.locationPLZ && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="locationCity">Місто:</label>
        <input id="locationCity" type="text" {...register('locationCity', { required: true })} />
        {errors.locationCity && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="galleryImage1">Зображення 1:</label>
        <input id="galleryImage1" type="file" {...register('galleryImage1')} />
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="galleryImage2">Зображення 2:</label>
        <input id="galleryImage2" type="file" {...register('galleryImage2')} />
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="galleryImage3">Зображення 3:</label>
        <input id="galleryImage3" type="file" {...register('galleryImage3')} />
      </div>

      <button type="submit">Додати оголошення</button>
    </form>
  );
};

export default AddProductForm;
