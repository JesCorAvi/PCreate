import { Link, router } from '@inertiajs/react';
import Filtro from '@/Components/Filtro';
import Pieza from '@/Components/Pieza';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Modal from '@/Components/Modal';
import BotonGrande from '@/Components/BotonGrande';

export default function Productos({ user, articulos, categorias, marcas, cantidad, active = false, classNameName = '', children, ...props }) {
    function acortar(cadena, longitud) {
        if (cadena.length <= longitud) {
            return cadena; // Devuelve la cadena original si es igual o menor que la longitud especificada
        } else {
            return cadena.substring(0, longitud) + '...'; // Acorta la cadena y añade puntos suspensivos
        }
    }

    function calcularNota(articulo) {
        if (articulo.comentarios.length === 0) return 0;
        let suma = 0;
        articulo.comentarios.forEach(comentario => {
            suma += comentario.estrellas;
        });
        return suma / articulo.comentarios.length;
    }

    const [articulosFiltrados, setArticulos] = useState(articulos);
    const filtrar = (categoria, marca, precioMinimo, precioMaximo, orden) => {
        const params = {};
        if (categoria != "") {
            params.categoria = categoria;
        }
        if (marca != "") {
            params.marca = marca;
        }
        if (precioMinimo != "") {
            params.precioMinimo = precioMinimo;
        }
        if (precioMaximo != "") {
            params.precioMaximo = precioMaximo;
        }
        if (orden != "") {
            params.orden = orden;
        }
        router.get(route('articulo.index', params));
    };

    const isSmallScreen = useMediaQuery({ query: '(max-width: 760px)' });
    const [visibleLinks, setVisibleLinks] = useState(articulosFiltrados.links);

    useEffect(() => {
        if (isSmallScreen) {
            // Mostrar solo el primer enlace, el último enlace y el enlace activo en pantallas pequeñas
            const activeLink = articulosFiltrados.links.find(link => link.active);
            setVisibleLinks([articulosFiltrados.links[0], activeLink, articulosFiltrados.links[articulosFiltrados.links.length - 1]]);
        } else {
            // Mostrar todos los enlaces en pantallas grandes
            setVisibleLinks(articulosFiltrados.links);
        }
    }, [isSmallScreen, articulosFiltrados.links]);

    const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

    const handleAddToCartClick = () => {
        setIsAddToCartModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsAddToCartModalVisible(false);
    };
    const recogerFiltradoUrl = () => {
        const parametros = new URLSearchParams(window.location.search);
        parametros.delete('page');
        return parametros.toString();
    };
    return (
        <>
            <div className="flex min-h-screen">
                <Filtro
                    categorias={categorias} marcas={marcas}
                    filtrar={filtrar}
                >
                </Filtro>
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
                <div className="flex justify-center items-center w-full pb-10">
                    {articulosFiltrados.data.length === 0 ? (
                        <h1 className='font-semibold text-xl'>No hay artículos</h1>
                    ) : (
                        <section className='px-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16'>
                            {articulosFiltrados.data.map(art => {
                                const estrellasValor = calcularNota(art);
                                return (
                                    <Pieza
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
                        </section>
                    )}
                </div>
            </div>
            <nav className="flex items-center justify-center py-4">
                {visibleLinks.length > 3 &&
                (visibleLinks.map((link, index) => (
                    <Link
                        key={index}
                        className={`
                            px-3 py-2 border border-solid border-black
                            ${link.active ? 'bg-black text-white' : 'text-black'}
                            ${index === 0 ? 'rounded-l' : ''}
                            ${index === visibleLinks.length - 1 ? 'rounded-r' : ''}
                        `}
                        href={`${link.url}&${recogerFiltradoUrl()}`}
                    >
                        {link.label}
                    </Link>
                )))
            }
            </nav>
        </>
    );
}
