import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersProducts, fetchExchangeRate } from '../../redux/features/productsSlice';
import { TbLocation } from "react-icons/tb";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegFaceSmile, FaRegFaceMeh } from "react-icons/fa6";
import ActionButton from '../ProductDetails/ActionButton/ActionButton';
import { getCategoryIcon, getSubcategoryIcon } from '../Categories/icons';
import Loader from '../Loader/Loader';
import axios from 'axios';
import scss from './UserProducts.module.scss';
import { useParams } from 'react-router-dom';

const UserProducts = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products.userProducts);
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const currentUser = useSelector((state) => state.auth.user);

  const [isEditing, setIsEditing] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    price: '',
    description: '',
    condition: '',
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchUsersProducts(userId));
    }
    dispatch(fetchExchangeRate());
  }, [dispatch, userId]);

  const handleEditClick = (productId) => {
    const product = userProducts.find((prod) => prod._id === productId);
    setIsEditing(productId);
    setUpdatedProduct({
      name: product.name || '',
      price: product.price || '',
      description: product.description || '',
      condition: product.condition || '',
    });
  };

  const handleSaveClick = async () => {
    if (!currentUser || currentUser._id !== userId) {
      alert('Ви не маєте права редагувати ці оголошення.');
      return;
    }

    try {
      const response = await axios.patch(
        `https://platz-ua-back.vercel.app/api/products/${isEditing}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Update response:', response.data);
      dispatch(fetchUserProducts(userId)); // Оновлення продуктів після редагування
      setIsEditing(null);
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
      alert('Виникла помилка при оновленні продукту. Спробуйте ще раз.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleConditionChange = (e) => {
    setUpdatedProduct((prevState) => ({
      ...prevState,
      condition: e.target.value,
    }));
  };

  if (loading) return <Loader />;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <div className={scss.userProducts}>
      <h2 className={scss.title}>Ваші активні оголошення</h2>
      <ul className={scss.productsList}>
        {userProducts.map((product) => (
          <li className={scss.productsItem} key={product._id}>
            <div className={scss.imageContainer}>
              <img className={scss.image} src={product.image1} alt={product.name} />
              <img className={scss.image} src={product.image2} alt={product.name} />
              <img className={scss.image} src={product.image3} alt={product.name} />
              <img className={scss.image} src={product.image4} alt={product.name} />
            </div>
            <div className={scss.productDetails}>
              <div className={scss.namePrice}>
                {isEditing === product._id ? (
                  <input
                    type="text"
                    name="name"
                    value={updatedProduct.name}
                    onChange={handleChange}
                    className={scss.inputField}
                  />
                ) : (
                  <h3>{product.name}</h3>
                )}
                {isEditing === product._id ? (
                  <input
                    type="text"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleChange}
                    className={scss.inputField}
                  />
                ) : (
                  <div>
                    <p className={scss.price}>€{product.price}</p>
                    {exchangeRate && (
                      <p className={scss.priceUan}>₴{(product.price * exchangeRate).toFixed(2)}</p>
                    )}
                  </div>
                )}
              </div>
              <p className={scss.description}>
                {isEditing === product._id ? (
                  <textarea
                    name="description"
                    value={updatedProduct.description}
                    onChange={handleChange}
                    className={scss.descriptionField}
                  />
                ) : (
                  product.description
                )}
              </p>
            </div>
            <div className={scss.detailsContainer}>
              <div className={scss.detailsFlex}>PLZ:<TbLocation className={scss.icon}/><p>{product.PLZ}</p></div>
              <div className={scss.detailsFlex}>Місто:<SlLocationPin className={scss.icon}/><p>{product.city}</p></div>
              <div className={scss.radioFlex}>
                Стан:
                {isEditing === product._id ? (
                  <div className={scss.conditionOptions}>
                    <label>
                      <input
                        type="radio"
                        name="condition"
                        value="новий"
                        checked={updatedProduct.condition === 'новий'}
                        onChange={handleConditionChange}
                      />
                      новий
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="condition"
                        value="вживаний"
                        checked={updatedProduct.condition === 'вживаний'}
                        onChange={handleConditionChange}
                      />
                      вживаний
                    </label>
                  </div>
                ) : (
                  <p className={scss.icons}>
                    {product.condition === 'новий' ? (
                      <>
                        <FaRegFaceSmile className={scss.icon} /> новий
                      </>
                    ) : (
                      <>
                        <FaRegFaceMeh className={scss.icon} /> вживаний
                      </>
                    )}
                  </p>
                )}
              </div>
              <div className={scss.detailsFlex}>
                Оновлено:<MdOutlineDateRange className={scss.icon}/>
                <p>{new Date(product.updatedAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className={scss.detailsFlex}>
                  Категорія: {getCategoryIcon(product.category)} {product.category}
                </p>
                <p className={scss.detailsFlex}>
                  Підкатегорія: {getSubcategoryIcon(product.subcategory1)} {product.subcategory1}
                </p>
                <p className={scss.detailsFlex}>
                  Підкатегорія: {getSubcategoryIcon(product.subcategory2)} {product.subcategory2}
                </p>
                <p className={scss.detailsFlex}>
                  Підкатегорія: {getSubcategoryIcon(product.subcategory3)} {product.subcategory3}
                </p>
              </div>
            </div>
            <div className={scss.buttonsMenu}>
              <ActionButton
                isEditing={isEditing === product._id}
                onClick={() => (isEditing === product._id ? handleSaveClick() : handleEditClick(product._id))}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProducts;
