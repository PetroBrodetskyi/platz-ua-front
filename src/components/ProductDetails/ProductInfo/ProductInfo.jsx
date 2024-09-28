import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TbLocation } from "react-icons/tb";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegFaceSmile, FaRegFaceMeh } from "react-icons/fa6";
import scss from "./ProductInfo.module.scss";
import CartPrice from "../../ProductCard/CartPrice/CartPrice";
import ActionButton from "../ActionButton/ActionButton";
import Categoryes from "../Categories/Categories";
import { fetchExchangeRate } from "../../../redux/features/productsSlice";

const ProductInfo = ({
  product,
  isEditing,
  updatedProduct,
  setUpdatedProduct,
  handleEditClick,
  handleSaveClick,
  currentUser,
  handleAddToCart,
  isInCart,
}) => {
  const formattedDate = new Date(product.createdAt).toLocaleDateString();
  const dispatch = useDispatch();
  const exchangeRate = useSelector((state) => state.products.exchangeRate);

  useEffect(() => {
    if (!exchangeRate) {
      dispatch(fetchExchangeRate());
    }
  }, [dispatch, exchangeRate]);

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

  return (
    <div className={scss.details}>
      <div className={scss.info}>
        <div className={scss.namePrice}>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
              className={scss.inputField}
            />
          ) : (
            <h2 className={scss.title}>{product.name}</h2>
          )}
          <div className={scss.priceContainer}>
            {isEditing ? (
              <input
                type="text"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
                className={scss.inputField}
              />
            ) : (
              <CartPrice
                price={product.price}
                exchangeRate={exchangeRate}
                onAddToCart={handleAddToCart}
                isInCart={isInCart}
              />
            )}
          </div>
        </div>

        <p className={scss.description}>
          {isEditing ? (
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
        {currentUser?._id === product.owner && (
          <div className={scss.edit}>
            <ActionButton
              isEditing={isEditing}
              onClick={isEditing ? handleSaveClick : handleEditClick}
            />
          </div>
        )}
      </div>

      <div className={scss.editContainer}>
        <div className={scss.infoContainer}>
          <p className={scss.detailsFlex}>
            PLZ: <TbLocation className={scss.icon} /> {product.PLZ}
          </p>
          <p className={scss.detailsFlex}>
            Місто: <SlLocationPin className={scss.icon} /> {product.city}
          </p>
          <div className={scss.radio}>
            Стан:
            {isEditing ? (
              <div className={scss.conditionOptions}>
                {["новий", "вживаний"].map((condition) => (
                  <label key={condition}>
                    <input
                      type="radio"
                      name="condition"
                      value={condition}
                      checked={updatedProduct.condition === condition}
                      onChange={handleConditionChange}
                    />
                    {condition}
                  </label>
                ))}
              </div>
            ) : (
              <p className={scss.icons}>
                {product.condition === "новий" ? (
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
          <p className={scss.detailsFlex}>
            Додано: <MdOutlineDateRange className={scss.icon} /> {formattedDate}
          </p>
        </div>
      </div>
      <Categoryes product={product} />
    </div>
  );
};

export default ProductInfo;