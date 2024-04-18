import { Link, router } from '@inertiajs/react';
import Filtro from '@/Components/Filtro';
import Pieza from '@/Components/Pieza';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';


export default function Productos({ articulos, categorias, marcas, active = false, classNameName = '', children, ...props }) {
    function acortar(cadena, longitud) {
        if (cadena.length <= longitud) {
            return cadena; // Devuelve la cadena original si es igual o menor que la longitud especificada
        } else {
            return cadena.substring(0, longitud) + '...'; // Acorta la cadena y añade puntos suspensivos
        }
    }
    const [articulosFiltrados, setArticulos] = useState(articulos);
    const filtrar = (categoria, marca, precioMinimo, precioMaximo) => {
            const formData = new FormData();
            formData.append('categoria', categoria);
            formData.append('marca', marca);
            formData.append('precioMinimo', precioMinimo);
            formData.append('precioMaximo', precioMaximo);
            router.get(route('articulo.filtrar'), formData)

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


    return (
        <>
            <div className="flex min-h-screen">
                <Filtro
                    categorias={categorias} marcas={marcas}
                    filtrar={filtrar}
                >
                </Filtro>
                <div className="flex justify-center items-center w-full pb-10">
                    {articulosFiltrados.data.length === 0 ? (
                        <h1 className='font-semibold text-xl'>No hay artículos</h1>
                    ) : (
                        <section className='px-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16'>
                            {articulosFiltrados.data.map(art => (
                                <Pieza
                                    key={art.id}
                                    nombre={acortar(art.nombre, 50)}
                                    imagen={"http://127.0.0.1:8000/storage/uploads/articulos/" + art.fotos.find(foto => foto.orden === 0)?.imagen}
                                    precio={art.precio}
                                    ruta={route("articulos.show", { id: art.id })}
                                />
                            ))}
                        </section>
                    )}
                </div>
            </div>
            <nav className="flex items-center justify-center py-4">
                {visibleLinks.map((link, index) => (
                    <Link
                        key={index}
                        className={`
                            px-3 py-2 border border-solid border-black
                            ${link.active ? 'bg-black text-white' : 'text-black'}
                            ${index === 0 ? 'rounded-l' : ''}
                            ${index === visibleLinks.length - 1 ? 'rounded-r' : ''}
                        `}
                        href={link.url}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </>
    );
}
