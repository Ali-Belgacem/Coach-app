import { assets } from "../assets";

export const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "Program",
    link: "/Program",
  },
  {
    id: 3,
    title: "Transformation",
    link: "/Transformation",
  },
  {
    id: 4,
    title: "About us",
    link: "/About-us",
  },
  {
    id: 5,
    title: "Subscribe",
    link: "/subscribe",
  },
];

export const CardsProgram = [
  {
    id: 1,
    title: "Cardio planing",
    description:
      "The cardio program is customized based on your fitness level and goals, whether it's fat loss or endurance. It follows the latest scientific approaches and is adjusted regularly to keep you progressing safely and effectively",
    img: assets.cardio,
  },
  {
    id: 2,
    title: "Crosfit-programme",
    description:
      "The CrossFit program is built on strength and fitness assessments, tailored to your level and injury history. It uses the latest scientific methods and is updated regularly to match your progress",
    img: assets.crosfit,
  },
  {
    id: 3,
    title: "Trainig plan",
    description:
      "The training program is designed based on tests that assess strength and fitness level, taking injuries into account, using the latest scientific methods, and it is regularly updated.",
    img: assets.Muscle,
  },
  {
    id: 4,
    title: "Diet of your choice",
    description:
      "A flexible system that helps you reach your goal based on your daily routine and your body’s nutritional needs, using healthy ingredients of your choice.",
    img: assets.food,
  },
];

export const TransformationData = [
  {
    id: 1,
    imgBefore: assets.Transformation2,
    imgAfter: assets.Transformation1,
    duration: "12 weeks",
  },
  {
    id: 2,
    imgBefore: assets.Transformation4,
    imgAfter: assets.Transformation3,
    duration: "8 weeks",
  },
  {
    id: 3,
    imgBefore: assets.Transformation6,
    imgAfter: assets.Transformation5,
    duration: "16 weeks",
  },
  {
    id: 4,
    imgBefore: assets.Transformation8,
    imgAfter: assets.Transformation7,
    duration: "10 weeks",
  },
];
