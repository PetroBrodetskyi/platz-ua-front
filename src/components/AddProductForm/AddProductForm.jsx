import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import SubmitButton from '../SubmitButton/SubmitButton';
import productsData from '../Categories/products.json';
import ImageButton from './ImageButton/ImageButton';
import scss from './AddProductForm.module.scss';
import cityes from '../SearchLocation/locations.json';
import SubcategoriesSelect from './SubcategoriesSelect/SubcategoriesSelect';
import { IoMdInformationCircleOutline } from "react-icons/io";

const AddProductForm = () => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const [charCount, setCharCount] = useState(0);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const selectedCategory = watch('category');
  const token = useSelector((state) => state.auth.token);

  const maxChars = 800;

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

  const handlePriceChange = (e) => {
  const value = e.target.value;
  const numericValue = value.replace(/[^0-9]/g, '');
  setValue('price', numericValue);
};

  const handlePLZChange = (e) => {
    const plz = e.target.value;
    setValue('PLZ', plz);

    if (plz) {
      const filtered = cityes.filter(city => city.plz.toString().startsWith(plz));
      setFilteredCities(filtered);

      if (filtered.length === 1) {
        setValue('city', filtered[0].city);
      } else {
        setValue('city', '');
      }
    } else {
      setFilteredCities([]);
      setValue('city', '');
    }
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value.toLowerCase();
    setValue('city', cityName);

    const filtered = cityes.filter(city => city.city.toLowerCase().includes(cityName));
    setFilteredCities(filtered);

    if (filtered.length === 1) {
      setValue('PLZ', filtered[0].plz);
    } else {
      setValue('PLZ', '');
    }
  };

  const handleCitySelect = (city) => {
    setValue('city', city.city);
    setValue('PLZ', city.plz.toString());
    setFilteredCities([]);
  };

  const handleClearField = (field) => {
    setValue(field, '');
    if (field === 'PLZ' || field === 'city') {
      setFilteredCities([]);
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value.slice(0, maxChars);
    setCharCount(value.length);
    setValue('description', value);
  };

  const onSubmit = async (data) => {
    console.log('Форма надсилається');
    console.log('Дані форми:', data);
    console.log('Token:', token);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('condition', data.condition);
    formData.append('PLZ', data.PLZ);
    formData.append('city', data.city);

    if (data.image1 && data.image1.length > 0) {
      formData.append('image', data.image1[0]);
    }
    if (data.image2 && data.image2.length > 0) {
      formData.append('image', data.image2[0]);
    }
    if (data.image3 && data.image3.length > 0) {
      formData.append('image', data.image3[0]);
    }
    if (data.image4 && data.image4.length > 0) {
      formData.append('image', data.image4[0]);
    }

    formData.append('category', data.category);
    formData.append('subcategory1', data.subcategory1);
    formData.append('subcategory2', data.subcategory2);
    formData.append('subcategory3', data.subcategory3);

    try {
      const response = await axios.post('https://platz-ua-back.vercel.app/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Product created:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error creating product:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  };

  return (
    <div className={scss.formContainer}>
      <h3 className={scss.title}>Додайте нове оголошення</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
        <div className={scss.formInputs}>
          <div>
          <div className={scss.formGroup}>
            <label htmlFor="name"></label>
            <input 
              id="name" 
              type="text" 
              {...register('name', { required: true })} 
              placeholder='Назва' 
              autoComplete="on" 
            />
            {errors.name && <span>Це поле обов'язкове</span>}
          </div>

          <div className={scss.formGroup}>
            <label htmlFor="price"></label>
            <input 
              id="price" 
              type="text" 
              {...register('price', { required: true })} 
              placeholder='Ціна €' 
              autoComplete="on"
              onInput={handlePriceChange}
              value={watch('price')}
            />
            {errors.price && <span>Це поле обов'язкове</span>}
          </div>
          </div>
          <div className={scss.stateGroup}>
            <div>
              <label htmlFor="new">
                <div className={scss.stateButton}>
                <input 
                  type="radio" 
                  id="new" 
                  value="новий" 
                  {...register('condition', { required: true })} 
                />
                  <span>Новий</span>
                  </div>
              </label>
            </div>
            <div>
              <label htmlFor="used">
                <div className={scss.stateButton}>
                  <input 
                    type="radio" 
                    id="used" 
                    value="вживаний" 
                    {...register('condition', { required: true })} 
                  />
                    <span>Вживаний</span>
                </div>
              </label>
            </div>
            {errors.condition && <span>Це поле обов'язкове</span>}
          </div>
          <div className={scss.locationGroup}>
            <div className={scss.formGroup}>
              <div className={scss.inputPlz}>
                <input
                  id="PLZ"
                  type="text"
                  {...register('PLZ', { required: true })}
                  placeholder='PLZ'
                  autoComplete="postal-code"
                  onChange={handlePLZChange}
                  value={watch('PLZ')}
                />
                <button 
                  type="button" 
                  className={scss.clearButton} 
                  onClick={() => handleClearField('PLZ')}
                >
                  <IoClose className={scss.icon} />
                </button>
              </div>
              {errors.PLZ && <span>Це поле обов'язкове</span>}
            </div>

            <div className={scss.formGroup}>
              <div className={scss.inputPlz}>
                <input
                  id="city"
                  type="text"
                  {...register('city', { required: true })}
                  placeholder='Місто'
                  autoComplete="address-level2"
                  onChange={handleCityChange}
                  value={watch('city')}
                />
                <button 
                  type="button" 
                  className={scss.clearButton} 
                  onClick={() => handleClearField('city')}
                >
                  <IoClose className={scss.icon} />
                </button>
              </div>
              {errors.city && <span>Це поле обов'язкове</span>}
            </div>
          </div>
          <div>
            {filteredCities.length > 0 && (
              <ul className={scss.searchResults}>
                {filteredCities.map((city) => (
                  <li 
                    key={`${city.plz}-${city.city}`} 
                    onClick={() => handleCitySelect(city)} 
                    className={scss.resultItem}
                  >
                    {city.city} ({city.plz})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={scss.formGroup}>
            <div className={scss.info}>
              <h4>Виберіть категорію та від 1 до 3 підкатегорій</h4>
              <IoMdInformationCircleOutline className={scss.icon} />
            </div>
            <div>
            <label htmlFor="category"></label>
            <select 
              id="category" 
              {...register('category', { required: true })} 
              autoComplete="category"
            >
              <option value="">Виберіть категорію</option>
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
              {errors.category && <span>Це поле обов'язкове</span>}
              </div>
            <SubcategoriesSelect subcategories={subcategories} register={register} errors={errors} />
          </div>
        </div>

        <div className={scss.imageDescription}>
          
          <div className={scss.imageContainer}>
            <ImageButton id="image1" register={register} />
            <ImageButton id="image2" register={register} />
            <ImageButton id="image3" register={register} />
            <ImageButton id="image4" register={register} />
          </div>

          <div className={scss.formGroup}>
            <label htmlFor="description"></label>
            <textarea 
              id="description" 
              {...register('description', { required: true })} 
              placeholder='Опис' 
              autoComplete="off"
              className={scss.textarea}
              onInput={handleDescriptionChange}
              value={watch('description')}

            ></textarea>
             <p className={scss.chars}>Доступно символів: {maxChars - charCount}</p>
            {errors.description && <span>Це поле обов'язкове</span>}
          </div>
          <SubmitButton buttonText="Розмістити" />
          <p>Ваше оголошення буде опубліковане після перевірки. Ви отримаєте лист з підтвердженням</p>
        </div>
        
      </form>
        
    </div>
  );
};

export default AddProductForm;
