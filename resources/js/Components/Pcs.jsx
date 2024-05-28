import Pc from "./Pc";
import { Head } from '@inertiajs/react';
import {Link} from '@inertiajs/react';
import { useMediaQuery } from 'react-responsive';
import React, { useState, useEffect } from 'react';

export default function Pcs({ pcs }) {

    const isSmallScreen = useMediaQuery({ query: '(max-width: 760px)' });
    const [visibleLinks, setVisibleLinks] = useState(pcs.links);
    useEffect(() => {
        if (isSmallScreen) {
            // Mostrar solo el primer enlace, el último enlace y el enlace activo en pantallas pequeñas
            const activeLink = pcs.links.find(link => link.active);
            setVisibleLinks([pcs.links[0], activeLink, pcs.links[pcs.links.length - 1]]);
        } else {
            // Mostrar todos los enlaces en pantallas grandes
            setVisibleLinks(pcs.links);
        }
    }, [isSmallScreen, pcs.links]);

    return (
        <>
            <div className=" min-h-screen w-11/12  xl:w-7/12">
                <Head title="Mis PC" />
                {pcs.data && pcs.data.length ? (
                    pcs.data.map((pc) => (
                        <div key={pc.id}>
                            <Pc
                                pc={pc}
                            />
                        </div>
                    ))
                ) : (
                    <h1 className='text-2xl font-semibold pt-40 p-10 text-center'>No hay Configuraciones</h1>
                )}
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
