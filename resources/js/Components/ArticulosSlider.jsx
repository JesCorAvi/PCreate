import React from 'react';
import Slider from 'react-slick';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Pieza from './Pieza'; // Asegúrate de tener este componente
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const ArticulosSlider = ({ articulos }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Cambia este valor según tus necesidades
        slidesToScroll: 3,
        autoplay: true, // Añade esta línea
        autoplaySpeed: 6000, // Cambia el valor (en milisegundos) según tus necesidades

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="w-full max-w-5xl mx-auto pt-5">
            <Slider {...settings}>
                {articulos.map((articulo, index) => (
                    <div key={index} className="px-2 flex justify-center items-center">
                        <Pieza
                            className='ml-5'
                            id={articulo.id}
                            nombre={articulo.nombre}
                            precio={articulo.precio}
                            imagen={articulo.fotos[0].imagen}
                            ruta={route("articulos.show", { id: articulo.id })}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ArticulosSlider;
