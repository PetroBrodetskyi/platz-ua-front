import { AiOutlineAudio } from 'react-icons/ai';
import {
  MdOutlinePhonelink,
  MdOutlineMapsHomeWork,
  MdOutlineToys,
  MdEmojiFoodBeverage,
  MdPhoneIphone,
  MdOutlineLaptopChromebook,
  MdTabletMac,
  MdOutlineDesktopWindows,
  MdOutlineChildFriendly,
  MdElectricScooter,
  MdFitnessCenter
} from 'react-icons/md';
import {
  FaBookDead,
  FaCar,
  FaBaby,
  FaCarBattery,
  FaTrailer,
  FaCampground,
  FaBed
} from 'react-icons/fa';
import { FaComputer, FaChessBoard } from 'react-icons/fa6';
import {
  GiClothes,
  GiBilledCap,
  GiLargeDress,
  GiCakeSlice,
  GiTomato,
  GiSlicedMushroom,
  GiCampingTent,
  GiSleepingBag
} from 'react-icons/gi';
import { LuApple, LuSoup, LuToyBrick, LuVegan } from 'react-icons/lu';
import {
  PiPottedPlantBold,
  PiHammerBold,
  PiLampPendantBold,
  PiForkKnifeBold,
  PiBowlSteamBold,
  PiBroomFill,
  PiBathtubBold,
  PiTelevisionSimpleFill,
  PiVideoCameraBold,
  PiSwordBold,
  PiBooksBold,
  PiSneakerBold,
  PiPantsFill,
  PiTruckTrailerFill,
  PiMotorcycleBold,
  PiMopedBold,
  PiTaxiBold,
  PiMartiniBold,
  PiSuitcaseRollingBold,
  PiBackpackBold
} from 'react-icons/pi';
import {
  RiScales2Line,
  RiRobot3Line,
  RiBearSmileLine,
  RiCustomerService2Fill
} from 'react-icons/ri';
import { SiGumtree } from 'react-icons/si';
import { GrBike } from 'react-icons/gr';
import { BsPersonWorkspace } from 'react-icons/bs';
import {
  TbPoint,
  TbSofa,
  TbBatteryCharging2,
  TbPlaystationSquare,
  TbMicrowave,
  TbWashTumbleDry,
  TbCarSuv,
  TbPuzzle,
  TbCarrot,
  TbCamper,
  TbEggs
} from 'react-icons/tb';
import { ImWrench } from 'react-icons/im';
import { IoShirtOutline } from 'react-icons/io5';

const categoryIcons = {
  взуття: { icon: <PiSneakerBold />, label: 'Взуття' },
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
  default: { icon: <TbPoint />, label: 'Інше' }
};

const subcategoryIcons = {
  декор: { icon: <PiPottedPlantBold />, label: 'Декор' },
  книги: { icon: <PiBooksBold />, label: 'Книги' },
  інструменти: { icon: <PiHammerBold />, label: 'Інструменти' },
  освітлення: { icon: <PiLampPendantBold />, label: 'Освітлення' },
  'побутова техніка': { icon: <RiScales2Line />, label: 'Побутова техніка' },
  посуд: { icon: <PiBowlSteamBold />, label: 'Посуд' },
  кухня: { icon: <PiForkKnifeBold />, label: 'Кухня' },
  прибирання: { icon: <PiBroomFill />, label: 'Прибирання' },
  сантехніка: { icon: <PiBathtubBold />, label: 'Сантехніка' },
  планшети: { icon: <MdTabletMac />, label: 'Планшети' },
  зарядки: { icon: <TbBatteryCharging2 />, label: 'Зарядки' },
  'для кухні': { icon: <TbMicrowave />, label: 'Для кухні' },
  'пральні машини': { icon: <TbWashTumbleDry />, label: 'Пральні машини' },
  аудіотехніка: { icon: <AiOutlineAudio />, label: 'Аудіотехніка' },
  'ігрові консолі': { icon: <TbPlaystationSquare />, label: 'Ігрові консолі' },
  "комп'ютери": { icon: <FaComputer />, label: "Комп'ютери" },
  монітори: { icon: <MdOutlineDesktopWindows />, label: 'Монітори' },
  ноутбуки: { icon: <MdOutlineLaptopChromebook />, label: 'Ноутбуки' },
  телефони: { icon: <MdPhoneIphone />, label: 'Телефони' },
  телевізори: { icon: <PiTelevisionSimpleFill />, label: 'Телевізори' },
  'фото та відеокамери': {
    icon: <PiVideoCameraBold />,
    label: 'Фото та відеокамери'
  },
  авто: { icon: <FaCar />, label: 'Авто' },
  меблі: { icon: <TbSofa />, label: 'Меблі' },
  'садові інструменти': { icon: <SiGumtree />, label: 'Садові інструменти' },
  'чоловічий одяг': { icon: <GiClothes />, label: 'Чоловічий одяг' },
  'художня література': { icon: <FaBookDead />, label: 'Художня література' },
  настільні: { icon: <FaChessBoard />, label: 'Настільні' },
  'іграшкова зброя': { icon: <PiSwordBold />, label: 'Іграшкова зброя' },
  інтерактивні: { icon: <RiRobot3Line />, label: 'Інтерактивні' },
  конструктори: { icon: <LuToyBrick />, label: 'Конструктори' },
  машинки: { icon: <TbCarSuv />, label: 'Машинки' },
  ляльки: { icon: <FaBaby />, label: 'Ляльки' },
  пазли: { icon: <TbPuzzle />, label: 'Пазли' },
  плюшеві: { icon: <RiBearSmileLine />, label: 'Плюшеві' },
  аксесуари: { icon: <GiBilledCap />, label: 'Аксесуари' },
  жіночий: { icon: <GiLargeDress />, label: 'Жіночий' },
  чоловічий: { icon: <PiPantsFill />, label: 'Чоловічий' },
  'продукти харчування': {
    icon: <MdEmojiFoodBeverage />,
    label: 'Продукти харчування'
  },
  'дитячі візочки': {
    icon: <MdOutlineChildFriendly />,
    label: 'Дитячі візочки'
  },
  автосервіс: { icon: <ImWrench />, label: 'Автосервіс' },
  'вантажні авто': { icon: <PiTruckTrailerFill />, label: 'Вантажні авто' },
  велосипеди: { icon: <GrBike />, label: 'Велосипеди' },
  запчастини: { icon: <FaCarBattery />, label: 'Запчастини' },
  електротранспорт: { icon: <MdElectricScooter />, label: 'Електротранспорт' },
  мотоцикли: { icon: <PiMotorcycleBold />, label: 'Мотоцикли' },
  причепи: { icon: <FaTrailer />, label: 'Причепи' },
  скутери: { icon: <PiMopedBold />, label: 'Скутери' },
  кемпери: { icon: <TbCamper />, label: 'Кемпери' },
  'органічні продукти': { icon: <TbCarrot />, label: 'Органічні продукти' },
  таксі: { icon: <PiTaxiBold />, label: 'Таксі' },
  спорт: { icon: <MdFitnessCenter />, label: 'Спорт' },
  десерти: { icon: <GiCakeSlice />, label: 'Десерти' },
  напої: { icon: <PiMartiniBold />, label: 'Напої' },
  веганські: { icon: <LuVegan />, label: 'Веганські' },
  органічні: { icon: <GiTomato />, label: 'Органічні' },
  дієтичні: { icon: <TbEggs />, label: 'Дієтичні' },
  місцеві: { icon: <GiSlicedMushroom />, label: 'Місцеві' },
  'домашня кухня': { icon: <LuSoup />, label: 'Домашня кухня' },
  здорові: { icon: <LuApple />, label: 'Здорові' },
  валізи: { icon: <PiSuitcaseRollingBold />, label: 'Валізи' },
  рюкзаки: { icon: <PiBackpackBold />, label: 'Рюкзаки' },
  палатки: { icon: <GiCampingTent />, label: 'Палатки' },
  каремати: { icon: <FaBed />, label: 'Каремати' },
  спальники: { icon: <GiSleepingBag />, label: 'Спальники' },
  футболки: { icon: <IoShirtOutline />, label: 'Футболки' },
  // 'гамаки': { icon: <GiHammock />, label: 'Гамаки' },
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

export const getSubcategoryIcon = (name) => {
  return subcategoryIcons[name]
    ? subcategoryIcons[name].icon
    : subcategoryIcons['default'].icon;
};

export const getSubcategoryLabel = (name) => {
  return subcategoryIcons[name]
    ? subcategoryIcons[name].label
    : subcategoryIcons['default'].label;
};
