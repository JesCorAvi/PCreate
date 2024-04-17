import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function Productos({ articulos }) {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
    const [visibleLinks, setVisibleLinks] = useState([]);

    useEffect(() => {
        const links = articulos.links;
        if (isSmallScreen) {
            // Show fewer links on small screens
            setVisibleLinks(links.slice(0, 5));
        } else {
            setVisibleLinks(links);
        }
    }, [isSmallScreen, articulos.links]);

    return (
        <>
            <div className="flex min-h-screen">
                <Filtro categorias={categorias} marcas={marcas}></Filtro>
                <div className="flex justify-center w-full pb-10">
                    <section className='px-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16'>
                        {articulos.data.map(art => (
                            <Pieza
                                key={art.id}
                                nombre={acortar(art.nombre, 50)}
                                imagen={"http://127.0.0.1:8000/storage/uploads/articulos/" + art.fotos.find(foto => foto.orden === 0)?.imagen}
                                precio={art.precio}
                                ruta={route("articulos.show", { id: art.id })}
                            />

                        ))}
                    </section>

                </div>

            </div>
            <nav className="flex items-center justify-center py-4">
                <div>
                {visibleLinks.map((link, index) => (
                        <Link
                            key={index}
                            className={`
                                px-3 py-2 border border-solid border-black
                                ${link.active ? 'bg-black text-white' : 'text-black'}
                                ${index === 0 ? 'rounded-l' : ''}
                                ${index === articulos.links.length - 1 ? 'rounded-r' : ''}
                            `}
                            href={link.url}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    );
}
