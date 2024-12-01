import axios from "axios"
import { useEffect, useState } from "react";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Container } from "react-bootstrap"
import SlideCard from "./SliderCard/SlideCard"


const SliderHome = () => {
  const settings = {
    nav:false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }
  const [sliders, setsliders] = useState([]);
  useEffect(() => {
      getSlider();
  }, []);

  function getSlider() {
      axios.get('http://localhost/php/API/?key=slider').then(function(response) {
          console.log(response.data);
          setsliders(response.data);
      });
  }

  return (
      <section className='homeSlide'>
        <Container>
          <Slider {...settings}>
          {sliders.map((value, index) => {
            return (
              <SlideCard key={index} title={value.title} cover={value.cover} desc={value.desc} />
            )
          })}
        </Slider>
        </Container>
      </section>
  )
}

export default SliderHome
