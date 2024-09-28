import SubcategoriesSelect from "../SubcategoriesSelect/SubcategoriesSelect";
import scss from "./CategorySelector.module.scss";
import { IoMdInformationCircleOutline } from "react-icons/io";

const CategorySelector = ({ categories, subcategories, register, errors }) => (
  <div className={scss.formGroup}>
    <div className={scss.info}>
      <h4>Виберіть категорію та від 1 до 3 підкатегорій</h4>
      <IoMdInformationCircleOutline className={scss.icon} />
    </div>
    <select id="category" {...register("category", { required: true })}>
      <option value="">Виберіть категорію</option>
      {categories.map((cat) => (
        <option key={cat.name} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>
    {errors.category && <span>Це поле обов&apos;язкове</span>}
    <SubcategoriesSelect
      subcategories={subcategories}
      register={register}
      errors={errors}
    />
  </div>
);

export default CategorySelector;
