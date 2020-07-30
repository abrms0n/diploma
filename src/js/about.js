import "../pages/about.css";
import "../../node_modules/normalize.css/normalize.css"

import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

const mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: false,
    speed: 500,
    slidesPerView: 3,
    spaceBetween: 16,
    uniqueNavElements: true,
    slidesOffsetBefore: 104,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    scrollbar: false,
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })
