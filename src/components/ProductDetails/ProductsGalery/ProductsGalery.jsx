import scss from './ProductsGalery.module.scss';

const ProductsGalery = ({ images }) => {
  return (
    <div className={scss.images}>
      {images.image1 && <img src={images.image1} alt="Product Image 1" />}
      {images.image2 && <img src={images.image2} alt="Product Image 2" />}
      {images.image3 && <img src={images.image3} alt="Product Image 3" />}
      {images.image4 && <img src={images.image4} alt="Product Image 4" />}
    </div>
  );
};

export default ProductsGalery;
