
import { Head } from '@inertiajs/react';
import Pedido from './Pedido';
import {Link} from '@inertiajs/react';
import { useMediaQuery } from 'react-responsive';
import React, { useState, useEffect } from 'react';

export default function Pedidos({ auth, facturas }) {
    console.log(facturas);
    const isSmallScreen = useMediaQuery({ query: '(max-width: 760px)' });
    const [visibleLinks, setVisibleLinks] = useState(facturas.links);
    useEffect(() => {
        if (isSmallScreen) {
            // Mostrar solo el primer enlace, el último enlace y el enlace activo en pantallas pequeñas
            const activeLink = facturas.links.find(link => link.active);
            setVisibleLinks([facturas.links[0], activeLink, facturas.links[facturas.links.length - 1]]);
        } else {
            // Mostrar todos los enlaces en pantallas grandes
            setVisibleLinks(facturas.links);
        }
    }, [isSmallScreen, facturas.links]);

    return (
        <>
        <div className=" min-h-screen w-11/12  xl:w-7/12">
            <Head title="Pedidos"/>
            {facturas.data && facturas.data.length ? (
                facturas.data.map((factura) => (
                    <div key={factura.id}>
                        <Pedido
                            factura = {factura}
                        />
                    </div>
                ))
            ) : (
                <h1 className='text-2xl font-semibold pt-40 p-10 text-center'>No hay Facturas</h1>
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
