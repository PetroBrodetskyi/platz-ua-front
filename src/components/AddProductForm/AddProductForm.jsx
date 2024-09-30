import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SubmitButton from '../SubmitButton/SubmitButton';
import productsData from '../Categories/products.json';
import cityes from '../SearchLocation/locations.json';
import FormInput from './FormInput/FormInput';
import LocationInput from './LocationInput/LocationInput';
import ImageUploader from './ImageUploader/ImageUploader';
import CategorySelector from './CategorySelector/CategorySelector';
import ProductCondition from './ProductCondition/ProductCondition';
import Loader from '../Loader/Loader';
import scss from './AddProductForm.module.scss';

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
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
    const selectedCat = categories.find((cat) => cat.name === selectedCategory);
    if (selectedCat) {
      setSubcategories(selectedCat.categories);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory, categories]);

  const handlePLZChange = (e) => {
    const plz = e.target.value;
    setValue('PLZ', plz);

    if (plz) {
      const filtered = cityes.filter((city) =>
        city.plz.toString().startsWith(plz)
      );
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

    const filtered = cityes.filter((city) =>
      city.city.toLowerCase().includes(cityName)
    );
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

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setValue('price', value);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
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
      const response = await axios.post(
        'https://platz-ua-back.vercel.app/api/products',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Product created:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error creating product:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={scss.formContainer}>
      <h3 className={scss.title}>Додайте нове оголошення</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
        <div className={scss.formInputs}>
          <div className={scss.inputs}>
            <FormInput
              id="name"
              label=""
              register={register}
              errors={errors}
              placeholder="Назва"
            />
            <FormInput
              id="price"
              label=""
              register={register}
              errors={errors}
              placeholder="Ціна €"
              onChange={handlePriceChange}
              value={watch('price')}
            />
          </div>
          <ProductCondition register={register} errors={errors} />
          <div className={scss.locationGroup}>
            <LocationInput
              id="PLZ"
              register={register}
              errors={errors}
              placeholder="PLZ"
              onChange={handlePLZChange}
              onClear={handleClearField}
              value={watch('PLZ')}
            />
            <LocationInput
              id="city"
              register={register}
              errors={errors}
              placeholder="Місто"
              onChange={handleCityChange}
              onClear={handleClearField}
              value={watch('city')}
            />
          </div>
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
          <CategorySelector
            categories={categories}
            subcategories={subcategories}
            register={register}
            errors={errors}
          />
        </div>
        <div className={scss.imageDescription}>
          <ImageUploader register={register} watch={watch} />
          <div className={scss.formGroup}>
            <label htmlFor="description"></label>
            <textarea
              id="description"
              {...register('description', { required: true })}
              placeholder="Опис"
              autoComplete="off"
              className={scss.textarea}
              onInput={handleDescriptionChange}
              value={watch('description')}
            ></textarea>
            <p className={scss.chars}>
              Доступно символів: {maxChars - charCount}
            </p>
            {errors.description && <span>Це поле обов&apos;язкове</span>}
          </div>
          <SubmitButton buttonText="Розмістити" />
          {isLoading && <Loader />}
          <p className={scss.info}>
            Ваше оголошення буде опубліковане після перевірки. Ви отримаєте лист
            з підтвердженням
          </p>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
