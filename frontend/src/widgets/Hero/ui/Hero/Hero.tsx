import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { heroSlides } from "../../model/Slide/slide";
import { Slide } from "../Slide/Slide";
import style from "./hero.module.css";

import tourist from "../../../../assets/hero/tourist.webp"
import { CTAButton } from "../CTA-Button/CTAButton";

export function Hero() {
  return (
    <div className={style.container}>
      <img src={tourist} className={style.tourist} />
      <CTAButton>Забронировать тур</CTAButton>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        speed={900}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className={style.hero}
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Slide slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}
