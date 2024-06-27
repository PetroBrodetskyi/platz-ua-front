import React from 'react';
import { MdOutlinePhonelink, MdOutlineMapsHomeWork, MdMapsHomeWork, MdOutlineToys, MdEmojiFoodBeverage } from "react-icons/md";
import { FaBookDead, FaCar } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { PiPottedPlantBold, PiHammerBold, PiLampPendantBold } from "react-icons/pi";
import { SiGumtree } from "react-icons/si";
import { TbPoint, TbSofa } from "react-icons/tb";

const categoryIcons = {
  'електроніка': <MdOutlinePhonelink />,
  'транспорт': <FaCar />,
  'дім': <MdOutlineMapsHomeWork />,
  'сад': <SiGumtree />,
  'одяг': <GiClothes />,
  'книги': <FaBookDead />,
  'іграшки': <MdOutlineToys />,
  'продукти': <MdEmojiFoodBeverage />,
  'default': <TbPoint />
};

const subcategoryIcons = {
  'декор': <PiPottedPlantBold />,
  'інструменти': <PiHammerBold />,
  'освітлення': <PiLampPendantBold />,
  'телефони': <MdOutlinePhonelink />,
  'авто': <FaCar />,
  'меблі': <TbSofa />,
  'садові інструменти': <SiGumtree />,
  'чоловічий одяг': <GiClothes />,
  'жіночий одяг': <GiClothes />,  // Додали іконку для жіночого одягу
  'взуття': <GiClothes />,       // Додали іконку для взуття
  'художня література': <FaBookDead />,
  'ляльки': <MdOutlineToys />,
  'продукти харчування': <MdEmojiFoodBeverage />,
  'default': <TbPoint />
};

export const getCategoryIcon = (name) => {
  return categoryIcons[name] || categoryIcons['default'];
};

export const getSubcategoryIcon = (name) => {
  return subcategoryIcons[name] || subcategoryIcons['default'];
};
