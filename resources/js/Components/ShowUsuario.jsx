import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Edit from '@/Components/Edit';
import Datos from '@/Components/Datos';
import Pedidos from '@/Components/Pedidos';
import Direcciones from '@/Components/Direcciones';
import Pcs from './Pcs';

export default function ShowUsuario({ mustVerifyEmail, avatar, pedidos, domicilios, provincias, facturas, pcs }) {
    const [seccionActual, setSeccionActual] = useState("pedidos");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const seccionFromURL = params.get('seccion');
        if (seccionFromURL) {
            setSeccionActual(seccionFromURL.toLowerCase());
        }
    }, []); // Este efecto se ejecutará solo una vez después del montaje del componente

    const handleBotonClick = (seccion) => {
        setSeccionActual(seccion);

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('seccion', seccion.toLowerCase());
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({}, '', newUrl);
    };

    const estilo_boton_normal = "flex items-center justify-center text-xl font-bold lg:p-1 transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer hover:border-l-4 hover:border-gray-400 hover:p-1";
    const estilo_boton_seleccionado = "flex  items-center justify-center text-xl font-bold border-b-4 lg:border-b-0 lg:border-l-4 border-black lg:p-1 transition duration-300 ease-in-out transform hover:cursor-pointer";

    return (
        <div className='block lg:flex lg:px-20'>
            <aside className='flex lg:flex-col lg:pt-32 gap-4 p-3 lg:min-w-36'>
                <a className={seccionActual === 'pedidos' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('pedidos')}>
                    <p className='text-center'>Mis pedidos</p>
                </a>
                <a className={seccionActual === 'pc' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('pc')}>
                    <p className='text-center'>Mis PC</p>
                </a>
                <a className={seccionActual === 'edit' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('edit')}>
                    <p className='text-center'>Editar Perfil</p>
                </a>
                <a className={seccionActual === 'direcciones' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('direcciones')}>
                    <p className='text-center'>Direcciones</p>
                </a>
                <Link className={estilo_boton_normal} href={route('logout')} method="post" as="button">
                    <p className='text-center'>Cerrar sesion</p>
                </Link>
            </aside>
            <div className="flex lg:flex-col items-center justify-center flex-grow ">

                {seccionActual === 'pedidos' && <Pedidos
                    mustVerifyEmail={mustVerifyEmail}
                    avatar={avatar}
                    pedidos={pedidos}
                    facturas={facturas}
                />}
                    {seccionActual === 'pc' && <Pcs
                    mustVerifyEmail={mustVerifyEmail}
                    pcs = {pcs}
                />}
                {seccionActual === 'edit' && <Edit
                    mustVerifyEmail={mustVerifyEmail}
                    avatar={avatar}
                />}
                {seccionActual === 'direcciones' && <Direcciones
                    mustVerifyEmail={mustVerifyEmail}
                    avatar={avatar}
                    domicilios={domicilios}
                    provincias={provincias}
                />}
            </div>
        </div>
    );
}
