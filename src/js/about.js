import "../pages/about.css";
import "../../node_modules/normalize.css/normalize.css"

import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

const mySwiper = new Swiper('.slider', {
    // Optional parameters
    loop: false,
    speed: 500,
    uniqueNavElements: true,
    pagination: {
      el: '.swiper-pagination',
    },
    scrollbar: false,
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 16,
        slidesOffsetBefore: 104
      },

      600: {
        slidesPerView: 2,
        spaceBetween: 8,
        slidesOffsetBefore: 40
      }
    },
    navigation: {
      nextEl: '.slider__button-next',
      prevEl: '.slider__button-prev',
    }
  })
