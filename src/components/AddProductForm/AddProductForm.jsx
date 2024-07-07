import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import SubmitButton from '../SubmitButton/SubmitButton';
import scss from './AddProductForm.module.scss';
import productsData from '../Categories/products.json';

const AddProductForm = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const selectedCategory = watch('category');

  useEffect(() => {
    setCategories(productsData.products);
  }, []);

  useEffect(() => {
    const selectedCat = categories.find(cat => cat.name === selectedCategory);
    if (selectedCat) {
      setSubcategories(selectedCat.categories);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory, categories]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('condition', data.condition);
    formData.append('PLZ', data.PLZ);
    formData.append('city', data.city);
    formData.append('image1', data.image1[0]);
    formData.append('image2', data.image2[0]);
    formData.append('image3', data.image3[0]);
    formData.append('category', data.category);
    formData.append('subcategory1', data.subcategory1);
    formData.append('subcategory2', data.subcategory2);
    formData.append('subcategory3', data.subcategory3);

    try {
      const response = await axios.post('https://platz-ua-back.vercel.app/api/products', formData, {
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
        <textarea id="description" {...register('description', { required: true })}></textarea>
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
        <label htmlFor="PLZ">Поштовий індекс:</label>
        <input id="PLZ" type="text" {...register('PLZ', { required: true })} />
        {errors.PLZ && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="city">Місто:</label>
        <input id="city" type="text" {...register('city', { required: true })} />
        {errors.city && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="image1">Зображення 1:</label>
        <input id="image1" type="file" {...register('image1')} />
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="image2">Зображення 2:</label>
        <input id="image2" type="file" {...register('image2')} />
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="image3">Зображення 3:</label>
        <input id="image3" type="file" {...register('image3')} />
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="category">Категорія:</label>
        <select id="category" {...register('category', { required: true })}>
          <option value="">Виберіть категорію</option>
          {categories.map(cat => (
            <option key={cat.name} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        {errors.category && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="subcategory1">Підкатегорія 1:</label>
        <select id="subcategory1" {...register('subcategory1', { required: true })}>
          <option value="">Виберіть підкатегорію</option>
          {subcategories.map(subcat => (
            <option key={subcat} value={subcat}>{subcat}</option>
          ))}
        </select>
        {errors.subcategory1 && <span>Це поле обов'язкове</span>}
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="subcategory2">Підкатегорія 2:</label>
        <select id="subcategory2" {...register('subcategory2')}>
          <option value="">Виберіть підкатегорію</option>
          {subcategories.map(subcat => (
            <option key={subcat} value={subcat}>{subcat}</option>
          ))}
        </select>
      </div>

      <div className={scss.formGroup}>
        <label htmlFor="subcategory3">Підкатегорія 3:</label>
        <select id="subcategory3" {...register('subcategory3')}>
          <option value="">Виберіть підкатегорію</option>
          {subcategories.map(subcat => (
            <option key={subcat} value={subcat}>{subcat}</option>
          ))}
        </select>
      </div>

      <SubmitButton buttonText="Розмістити"/>
    </form>
  );
};

export default AddProductForm;
