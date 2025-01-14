"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";

const Carousel = ({
  children,
  infinite = true,
  autoplay = false,
  autoplaySpeed = 2000,
  speed = 900,
  pauseOnHover = true,
  slidesToShow = 5,
  slidesToShow560,
  slidesToShow680,
  slidesToShow970,
  slidesToShow1280,
  arrows = false,
  dots = false,
  className,
}) => {
  const settings = {
    dots: dots,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    adaptiveHeight: true,
    lazyLoad: true,
    infinite: infinite,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
    speed: speed,
    pauseOnHover: pauseOnHover,
    slidesToShow: slidesToShow,
    arrows: arrows,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: slidesToShow1280 || 4,
          arrows: arrows,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: slidesToShow970 || 3,
          arrows: arrows,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow970 || 3,
          arrows: arrows,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: slidesToShow680 || 2,
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: slidesToShow560 || 1,
          arrows: false,
          dots: true,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative">
      <Slider
        {...settings}
        className={`${className} cursor-grab active:cursor-grabbing bg-white ${
          arrows && "px-2 md:px-4"
        }`}
      >
        {children}
      </Slider>
    </div>
  );
};

export default Carousel;

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 cursor-pointer bg-white/80 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
    >
      <IoArrowBackSharp size={24} className="text-gray-700" />
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 cursor-pointer bg-white/80 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
    >
      <IoArrowForwardSharp size={24} className="text-gray-700" />
    </div>
  );
};
