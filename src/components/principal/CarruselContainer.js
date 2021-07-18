import React from 'react';
import{Carousel} from 'react-bootstrap';
import image1 from '../../images/servicio1.jpeg';
import image2 from '../../images/servicio2.JPG';
import image3 from '../../images/servicio3.jpg';
import image4 from '../../images/servicio4.jpg';

const CarouselContainer = () =>{
    return (
        <Carousel fade={true} pause={false} indicators={true}>
          <Carousel.Item interval={5000}>
            <img
              className="d-block w-100"
              src={image1}
              alt="Manicure Terraza de Frida"
             />
             
            <Carousel.Caption>
              <h3></h3>
              <p className="Parrafo">Aquí encontrarás información respecto al servicio de Manicure.</p>
              <a className="btn" href="servicios">Más Información</a>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img
              className="d-block w-100"
              src={image2}
              alt="Pedicure Terraza de Frida"
            />
            <Carousel.Caption>
              <h3></h3>
              <p className="Parrafo">Aquí encontraras información respecto al servicio de Pedicure.</p>
              <a className="btn" href="servicios">Más Información</a>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img
              className="d-block w-100"
              src={image3}
              alt="Tinturas Terraza de Frida"
            />
            <Carousel.Caption>
              <h3></h3>
              <p className="Parrafo">Aquí encontraras información respecto al servicio de Tinturas.</p>
              <a className="btn" href="servicios">Más Información</a>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img
              className="d-block w-100"
              src={image4}
              alt="Cejas Terraza de Frida"
            />
            <Carousel.Caption>
              <h3></h3>
              <p className="Parrafo">Aquí encontraras información respecto al servicio de Cejas.</p>
              <a className="btn" href="servicios">Más Información</a>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      )
}

export default CarouselContainer;
