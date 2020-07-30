import "../pages/about.css";
import "../../node_modules/normalize.css/normalize.css"

import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

const mySwiper = new Swiper('.slider', {
    // Optional parameters
    loop: false,
    speed: 500,
    slidesPerView: 3,
    spaceBetween: 16,
    uniqueNavElements: true,
    slidesOffsetBefore: 104,
    pagination: {
      el: '.swiper-pagination',
    },
    scrollbar: false,
    navigation: {
      nextEl: '.slider__button-next',
      prevEl: '.slider__button-prev',
    }
  })
