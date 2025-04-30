"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "./ProductSlider.css";

interface ProductSliderProps {
  images: string[];
}

export default function ProductSlider({ images }: ProductSliderProps) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Product Image ${index + 1}`}
              className="w-full  object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev text-black"></div>
      <div className="swiper-button-next text-black"></div>
    </div>
  );
}