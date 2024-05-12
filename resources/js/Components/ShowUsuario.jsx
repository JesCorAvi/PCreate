import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Edit from '@/Components/Edit';
import Datos from '@/Components/Datos';
import Pedidos from '@/Components/Pedidos';
import Direcciones from '@/Components/Direcciones';

export default function ShowUsuario({mustVerifyEmail, avatar, pedidos, domicilios, provincias}) {
    const [seccionActual, setSeccionActual] = useState("pedidos");

    const handleBotonClick = (seccion) => {
        setSeccionActual(seccion);
    };
    const estilo_boton_normal = "flex items-center justify-center text-xl font-bold lg:p-1 transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer hover:border-l-4 hover:border-gray-400 hover:p-1";
    const estilo_boton_seleccionado = "flex  items-center justify-center text-xl font-bold border-b-4 lg:border-b-0 lg:border-l-4 border-black lg:p-1 transition duration-300 ease-in-out transform hover:cursor-pointer";
    return (
        <div className='block lg:flex lg:px-20'>
            <aside className='flex lg:flex-col lg:pt-32 gap-4 p-3'>
                <a className={seccionActual === 'pedidos' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('pedidos')}>
                    <p className='text-center'>Mis pedidos</p>
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
                {seccionActual === 'mis datos' && <Datos />}
                {seccionActual === 'edit' && <Edit
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    avatar={avatar}
                />}
                {seccionActual === 'pedidos' && <Pedidos
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    avatar={avatar}
                    pedidos={pedidos}
                />}
                {seccionActual === 'direcciones' && <Direcciones
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    avatar={avatar}
                    domicilios={domicilios}
                    provincias={provincias}
                />}

            </div>
        </div>
    );
}
