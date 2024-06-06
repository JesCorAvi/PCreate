import React from 'react';
import Slider from 'react-slick';
import Pieza from './Pieza'; // Asegúrate de tener este componente
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import BotonGrande from './BotonGrande';
import Modal from './Modal';

const ArticulosSlider = ({user, articulos }) => {
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
    function calcularNota(articulo) {
        if (articulo.comentarios.length === 0) return 0;
        let suma = 0;
        articulo.comentarios.forEach(comentario => {
            suma += comentario.estrellas;
        });
        return suma / articulo.comentarios.length;
    }

    function acortar(cadena, longitud) {
        if (cadena.length <= longitud) {
            return cadena; // Devuelve la cadena original si es igual o menor que la longitud especificada
        } else {
            return cadena.substring(0, longitud) + '...'; // Acorta la cadena y añade puntos suspensivos
        }
    }

    const handleAddToCartClick = () => {
        setIsAddToCartModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsAddToCartModalVisible(false);
    };
    const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

    return (
        <>
        <Modal className="p-6" show={isAddToCartModalVisible} onClose={handleCloseModal}>
            <div className='flex flex-col items-center'>
                <img
                    className={`w-32 y-32 m-5 pt-5 ${isAddToCartModalVisible ? 'aparecer' : ''}`}
                    src="/assets/exito.svg"

                ></img>
                <h2 className="text-lg text-gray-900 font-semibold pt-5">
                    Producto añadido al carrito
                </h2>
            </div>
            <BotonGrande onClick={handleCloseModal} texto={"Aceptar"}></BotonGrande>
        </Modal>
        <div className="w-full max-w-5xl mx-auto pt-5">
            <Slider {...settings}>
            {articulos.map(art => {
                const estrellasValor = calcularNota(art);
                return (
                    <Pieza
                        className='mx-auto'
                        key={art.id}
                        nombre={acortar(art.nombre, 50)}
                        imagen={art.fotos.find(foto => foto.orden === 0)?.imagen}
                        precio={art.precio}
                        ruta={route("articulos.show", { id: art.id })}
                        id={art.id}
                        estrellas={estrellasValor}
                        valoraciones={art.comentarios.length}
                        handleAddToCartClick={handleAddToCartClick}
                        user={user}
                    />
                );
            })}
            </Slider>
        </div>
        </>
    );
};

export default ArticulosSlider;
