import {
  MdOutlinePhonelink,
  MdOutlineMapsHomeWork,
  MdOutlineToys,
  MdEmojiFoodBeverage,
  MdSportsBasketball
} from 'react-icons/md';
import { FaCar, FaCampground } from 'react-icons/fa';
import { GiClothes } from 'react-icons/gi';
import { PiSneakerBold } from 'react-icons/pi';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { SiGumtree } from 'react-icons/si';
import { BsPersonWorkspace } from 'react-icons/bs';
import { TbPoint } from 'react-icons/tb';

const categoryIcons = {
  'мода і стиль': { icon: <PiSneakerBold />, label: 'Взуття' },
  електроніка: { icon: <MdOutlinePhonelink />, label: 'Електроніка' },
  подорожі: { icon: <FaCampground />, label: 'Подорожі' },
  транспорт: { icon: <FaCar />, label: 'Транспорт' },
  дім: { icon: <MdOutlineMapsHomeWork />, label: 'Дім' },
  сад: { icon: <SiGumtree />, label: 'Сад' },
  одяг: { icon: <GiClothes />, label: 'Одяг' },
  робота: { icon: <BsPersonWorkspace />, label: 'Робота' },
  іграшки: { icon: <MdOutlineToys />, label: 'Іграшки' },
  послуги: { icon: <RiCustomerService2Fill />, label: 'Послуги' },
  продукти: { icon: <MdEmojiFoodBeverage />, label: 'Продукти' },
  спорт: { icon: <MdSportsBasketball />, label: 'Спорт' },
  default: { icon: <TbPoint />, label: 'Інше' }
};

const subcategoryIcons = {
  default: { icon: <TbPoint />, label: 'Інше' }
};

export const getCategoryIcon = (name) => {
  return categoryIcons[name]
    ? categoryIcons[name].icon
    : categoryIcons['default'].icon;
};

export const getCategoryLabel = (name) => {
  return categoryIcons[name]
    ? categoryIcons[name].label
    : categoryIcons['default'].label;
};

// export const getSubcategoryIcon = (name) => {
//   return subcategoryIcons[name]
//     ? subcategoryIcons[name].icon
//     : subcategoryIcons['default'].icon;
// };

// export const getSubcategoryLabel = (name) => {
//   return subcategoryIcons[name]
//     ? subcategoryIcons[name].label
//     : subcategoryIcons['default'].label;
// };
