import React from 'react';
import { AiOutlineAudio } from "react-icons/ai";
import { MdOutlinePhonelink, MdOutlineMapsHomeWork, MdOutlineToys, MdEmojiFoodBeverage, MdPhoneIphone, MdOutlineLaptopChromebook, MdTabletMac, MdOutlineDesktopWindows, MdOutlineChildFriendly, MdElectricScooter, MdFitnessCenter } from "react-icons/md";
import { FaBookDead, FaCar, FaBaby, FaCarBattery, FaTrailer } from "react-icons/fa";
import { FaComputer, FaChessBoard } from "react-icons/fa6";
import { GiClothes, GiBilledCap, GiLargeDress, GiCakeSlice, GiTomato, GiSlicedMushroom } from "react-icons/gi";
import { LuApple, LuSoup, LuToyBrick, LuVegan } from "react-icons/lu";
import { PiPottedPlantBold, PiHammerBold, PiLampPendantBold, PiForkKnifeBold, PiBowlSteamBold, PiBroomFill, PiBathtubBold, PiTelevisionSimpleFill, PiVideoCameraBold, PiSwordBold, PiBooksBold, PiSneakerBold, PiPantsFill, PiTruckTrailerFill, PiMotorcycleBold, PiMopedBold, PiTaxiBold, PiMartiniBold } from "react-icons/pi";
import { RiScales2Line, RiRobot3Line, RiBearSmileLine, RiCustomerService2Fill } from "react-icons/ri";
import { SiGumtree } from "react-icons/si";
import { GrBike } from "react-icons/gr";
import { TbPoint, TbSofa, TbBatteryCharging2, TbPlaystationSquare, TbMicrowave, TbWashTumbleDry, TbCarSuv, TbPuzzle, TbCarrot, TbCamper, TbEggs } from "react-icons/tb";
import { ImWrench } from "react-icons/im";

const categoryIcons = {
  'електроніка': <MdOutlinePhonelink />,
  'транспорт': <FaCar />,
  'дім': <MdOutlineMapsHomeWork />,
  'сад': <SiGumtree />,
  'одяг': <GiClothes />,
  'іграшки': <MdOutlineToys />,
  'послуги': <RiCustomerService2Fill />,
  'продукти': <MdEmojiFoodBeverage />,
  'default': <TbPoint />
};

const subcategoryIcons = {
  'декор': <PiPottedPlantBold />,
  'книги': <PiBooksBold />,
  'інструменти': <PiHammerBold />,
  'освітлення': <PiLampPendantBold />,
  'побутова техніка': <RiScales2Line />,
  'посуд': <PiBowlSteamBold />,
  'кухня': <PiForkKnifeBold />,
  'прибирання': <PiBroomFill />,
  'сантехніка': <PiBathtubBold />,
  'планшети': <MdTabletMac />,
  'зарядки': <TbBatteryCharging2 />,
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
  'художня література': <FaBookDead />,
  'настільні': <FaChessBoard />,
  'іграшкова зброя': <PiSwordBold />,
  'інтерактивні': <RiRobot3Line />,
  'конструктори': <LuToyBrick />,
  'машинки': <TbCarSuv />,
  'ляльки': <FaBaby />,
  'пазли': <TbPuzzle />,
  'плюшеві': <RiBearSmileLine />,
  'аксесуари': <GiBilledCap />,
  'взуття': <PiSneakerBold />,
  'жіночий': <GiLargeDress />,
  'чоловічий': <PiPantsFill />,
  'продукти харчування': <MdEmojiFoodBeverage />,
  'дитячі візочки': <MdOutlineChildFriendly />,
  'автосервіс': <ImWrench />,
  'вантажні авто': <PiTruckTrailerFill />,
  'велосипеди': <GrBike />,
  'запчастини': <FaCarBattery />,
  'електротранспорт': <MdElectricScooter />,
  'мотоцикли': <PiMotorcycleBold />,
  'причепи': <FaTrailer />,
  'скутери': <PiMopedBold />,
  'кемпери': <TbCamper />,
  'органічні продукти': <TbCarrot />,
  'таксі': <PiTaxiBold />,
  'спорт': <MdFitnessCenter />,
  'десерти': <GiCakeSlice />,
  'напої': <PiMartiniBold />,
  'веганські': <LuVegan />,
  'органічні': <GiTomato />,
  'дієтичні': <TbEggs />,
  'місцеві': <GiSlicedMushroom />,
  'домашня кухня': <LuSoup />,
  'здорові': <LuApple />,
  'default': <TbPoint />
};

export const getCategoryIcon = (name) => {
  return categoryIcons[name] || categoryIcons['default'];
};

export const getSubcategoryIcon = (name) => {
  return subcategoryIcons[name] || subcategoryIcons['default'];
};
