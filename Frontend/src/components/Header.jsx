import React from 'react';
import Navbar from '../components/Navbar';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchBar from './Searchbar';
import Footer from './Footer';

const images = [
  'home1.jpg',
  'home2.jpg',
  'home3.jpg',
  'home4.jpg'
];

const Header = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="relative w-[100vw] h-[100vh]">
      <Navbar className="z-50 " />
      <Slider {...settings} >
        {images.map((image, index) => (
          <div key={index} className="w-full h-screen relative">
            <img src={`${image}`} alt={`Slide ${index}`} className=" object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black opacity-70"></div>
          </div>
        ))}
      </Slider>
      <Footer/>
    </div>
   
  );
};

export default Header;
