import React, { useState, useEffect } from 'react';
import Pc from "./Pc";
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useMediaQuery } from 'react-responsive';

export default function Pcs({user, pcs }) {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 760px)' });
    const [visibleLinks, setVisibleLinks] = useState(pcs.links);
    const [pcData, setPcData] = useState(pcs.data);

    useEffect(() => {
        if (isSmallScreen) {
            const activeLink = pcs.links.find(link => link.active);
            setVisibleLinks([pcs.links[0], activeLink, pcs.links[pcs.links.length - 1]]);
        } else {
            setVisibleLinks(pcs.links);
        }
    }, [isSmallScreen, pcs.links]);

    function handleDeletePc(id){
        setPcData(pcData.filter(pc => pc.id !== id));
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
        <div>
            <div className=" min-h-screen w-11/12 ">
                <Head title="Mis PC" />
                <div className="flex justify-center items-center w-full pb-10">
                    {pcData.length === 0 ? (
                        <h1 className='font-semibold text-xl'>No hay ordenadores</h1>
                    ) : (
                        <section className='px-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16'>
                            {pcData.map(pc => {
                            const estrellasValor = calcularNota(pc);
                                return (
                                <Pc
                                    key={pc.id}
                                    pc={pc}
                                    editable={user.id === pc.user_id ? true : false}
                                    estrellas={estrellasValor}
                                    valoraciones={pc.comentarios.length}
                                    onDelete={handleDeletePc}
                                    />
                                );
                            })}
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
        </div>
    );
}
