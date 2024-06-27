import React from 'react';
import { AiOutlineAudio } from "react-icons/ai";
import { MdOutlinePhonelink, MdOutlineMapsHomeWork, MdMapsHomeWork, MdOutlineToys, MdEmojiFoodBeverage, MdPhoneIphone, MdOutlineLaptopChromebook, MdTabletMac, MdOutlineDesktopWindows } from "react-icons/md";
import { FaBookDead, FaCar } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";
import { PiPottedPlantBold, PiHammerBold, PiLampPendantBold, PiForkKnifeBold, PiBowlSteamBold, PiBroomFill, PiBathtubBold, PiTelevisionSimpleFill, PiVideoCameraBold } from "react-icons/pi";
import { RiScales2Line } from "react-icons/ri";
import { SiGumtree } from "react-icons/si";
import { TbPoint, TbSofa, TbBatteryCharging2, TbPlaystationSquare, TbMicrowave, TbWashTumbleDry } from "react-icons/tb";

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
  'побутова техніка': <RiScales2Line />,
  'посуд': <PiBowlSteamBold />,
  'приладдя для кухні': <PiForkKnifeBold />,
  'приладдя для прибирання': <PiBroomFill />,
  'сантехніка': <PiBathtubBold />,
  'планшети': <MdTabletMac />,
  'пристрої для зарядки': <TbBatteryCharging2 />,
  'для кухні': <TbMicrowave />,
  'пральні машини': <TbWashTumbleDry />,
  'аудіотехніка': <AiOutlineAudio />,
  'ігрові консолі': <TbPlaystationSquare />,
  "комп'ютери": <FaComputer />,
  'монітори': <MdOutlineDesktopWindows />,
  'ноутбуки': <MdOutlineLaptopChromebook />,
  'телефони': <MdPhoneIphone />,
  'телевізори': <PiTelevisionSimpleFill />,
  'фото та відеокамери': <PiVideoCameraBold />,
  'авто': <FaCar />,
  'меблі': <TbSofa />,
  'садові інструменти': <SiGumtree />,
  'чоловічий одяг': <GiClothes />,
  'жіночий одяг': <GiClothes />,
  'взуття': <GiClothes />,
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
