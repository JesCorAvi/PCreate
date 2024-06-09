import { Link, router } from '@inertiajs/react';
import FiltroPc from '@/Components/FiltroPc';
import Pc from '@/Components/Pc';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function Configuraciones({ cantidad, pcs, sockets }) {
    const [pcsFiltrados, setPcs] = useState(pcs);
    const isSmallScreen = useMediaQuery({ query: '(max-width: 760px)' });
    const [visibleLinks, setVisibleLinks] = useState(pcsFiltrados.links);
    const recogerFiltradoUrl = () => {
        const parametros = new URLSearchParams(window.location.search);
        parametros.delete('page');
        return parametros.toString();
    };
    useEffect(() => {
        if (isSmallScreen) {
            const activeLink = pcsFiltrados.links.find(link => link.active);
            setVisibleLinks([pcsFiltrados.links[0], activeLink, pcsFiltrados.links[pcsFiltrados.links.length - 1]]);
        } else {
            setVisibleLinks(pcsFiltrados.links);
        }
    }, [isSmallScreen, pcsFiltrados.links]);

    const filtrar = (criterio, precioMinimo, precioMaximo, sockets) => {
        const params = {};

        if (precioMinimo !== "") {
            params.precioMinimo = precioMinimo;
        }
        if (precioMaximo !== "") {
            params.precioMaximo = precioMaximo;
        }
        if (criterio !== "") {
            params.criterio = criterio;
        }
        if (sockets.length > 0) {
            params.sockets = sockets;
        }

        router.get(route('pc.index', params), {}, {
            onSuccess: (page) => setPcs(page.props.pcs)
        });
    };

    function calcularNota(articulo) {
        if (articulo.comentarios.length === 0) return 0;
        let suma = 0;
        articulo.comentarios.forEach(comentario => {
            suma += comentario.estrellas;
        });
        return suma / articulo.comentarios.length;
    }

    return (
        <>
            <div className="flex min-h-screen">
                <FiltroPc filtrar={filtrar} sockets={sockets} />
                <div className="flex justify-center items-center w-full pb-10">
                    {pcsFiltrados.data.length === 0 ? (
                        <h1 className='font-semibold text-xl'>No hay ordenadores</h1>
                    ) : (
                        <section className='px-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16'>
                            {pcsFiltrados.data.map(pc => {
                                const estrellasValor = calcularNota(pc);
                                return (
                                    <Pc
                                        key={pc.id}
                                        pc={pc}
                                        editable={false}
                                        estrellas={estrellasValor}
                                        valoraciones={pc.comentarios.length}
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
