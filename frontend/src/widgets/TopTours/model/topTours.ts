import baikal from "../../../assets/topTours/baikal.webp";
import bereg from "../../../assets/topTours/bereg.webp";
import yurta from "../../../assets/topTours/yurta.webp";
import step from "../../../assets/topTours/step.webp";
import buuzy from "../../../assets/topTours/buuzy.webp";
import fon from "../../../assets/topTours/cherniyFon.webp";


export type topTour = {
  title: string;
  image: string;
  background: string;
  description: string;
};

export const TOP_TOURS: topTour[] = [
  {
    title: "Самый сок!",
    image: bereg,
    background: baikal,
    description:
      "Откройте для себя уникальное путешествие, где природа, культура и традиции соединяются в незабываемый опыт. Идеальный тур для тех, кто хочет увидеть больше и почувствовать настоящее приключение.",
  },
  {
  title: "Стать кочевником за 3 дня",
  image: yurta,
  background: step,
  description:
    "Никаких офисов. Только степь, кони и ощущение свободы. Проживёшь жизнь настоящего кочевника — без Wi-Fi, зато с максимальным внутренним апдейтом.",
},
  {
  title: "Бууз-трип 🍽️",
  image: buuzy,
  background: fon,
  description:
    "Да, мы едем в Бурятию ради бууз. И шаманских вайбов. И Байкала. И видов, которые выглядят как заставка Windows, только настоящая.",
}
];
