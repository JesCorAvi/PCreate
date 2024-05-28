import { Head } from '@inertiajs/react';
import Direccion from './Direccion';
import { useMediaQuery } from 'react-responsive';
import React, { useState, useEffect } from 'react';
import {Link} from '@inertiajs/react';


export default function Direcciones({ auth, domicilios, provincias }) {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 760px)' });
    const [visibleLinks, setVisibleLinks] = useState(domicilios.links);
    useEffect(() => {
        if (isSmallScreen) {
            // Mostrar solo el primer enlace, el último enlace y el enlace activo en pantallas pequeñas
            const activeLink = domicilios.links.find(link => link.active);
            setVisibleLinks([domicilios.links[0], activeLink, domicilios.links[domicilios.links.length - 1]]);
        } else {
            // Mostrar todos los enlaces en pantallas grandes
            setVisibleLinks(domicilios.links);
        }
    }, [isSmallScreen, domicilios.links]);
    return (
        <div className="min-h-screen w-9/12">
            <div className=' xl:p-24'>
                <Head title="Direcciones" />

                {domicilios.data ? (
                    domicilios.data.map((direccion) => (

                        <div key={direccion.id}>
                            <Direccion
                                nombre = {direccion.nombre}
                                id={direccion.id}
                                direccion={direccion.direccion}
                                ciudad={direccion.ciudad}
                                cpostal={direccion.cpostal}
                                provincia_id={direccion.provincia.id}
                                provincias={provincias}
                                initialIsEditing={true}
                                telefono={direccion.telefono}
                                favorito={direccion.favorito}

                            />
                        </div>
                    ))
                ) : (
                    <h1 className='text-xl p-10'>No hay direcciones</h1>
                )}
                <h2 className="text-center text-xl font-semibold">Crear nueva dirección</h2>
                <div>
                    <Direccion
                        direccion={""}
                        ciudad={""}
                        cpostal={""}
                        provincia={""}
                        provincias={provincias}
                        initialIsEditing={false}
                    />
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
