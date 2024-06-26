import scss from './Categories.module.scss';

const Categories = () => {
  return (
    <div className={scss.categories}>
      <div className={scss.container}>
        <h2>Categories</h2>
        <ul>
          <li>Electronics</li>
          <li>Fashion</li>
          <li>Home & Garden</li>
          <li>Sports</li>
          <li>Toys</li>
        </ul>
      </div>
    </div>
  );
};

export default Categories;