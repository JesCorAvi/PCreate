import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import { Head } from '@inertiajs/react';
import Edit from '../../Components/Edit';
import { useState } from 'react';
import { useEffect } from 'react';
import NavLink from '@/Components/NavLink';

export default function Show({ auth, categorias, mustVerifyEmail, status, avatar }) {
    const [seccionActual, setSeccionActual] = useState(null);
    const handleBotonClick = (seccion) => {
        setSeccionActual(seccion);
    };
    const estilo_boton_normal = "text-xl font-bold p-1 transition duration-300 ease-in-out transform hover:scale-105 hover:cursor-pointer hover:border-l-4 hover:border-gray-400 hover:p-1";
    const estilo_boton_seleccionado = "text-xl font-bold border-l-4 border-black p-1 transition duration-300 ease-in-out transform hover:cursor-pointer";

    return (
        <div>
            <LayoutLogueado
                user={auth.user}
                header={<h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center">Mi cuenta</h2>}
                categorias={categorias}
            >
                <Head title="Tienda" />
            </LayoutLogueado>
            <div className='flex px-20'>
                <aside className='flex flex-col pt-32 gap-4'>
                    <a className={seccionActual === 'mis datos' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('mis datos')}>
                        Mis datos
                    </a>
                    <a className={seccionActual === 'edit' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('edit')}>
                        Editar Perfil
                    </a>
                    <a className={seccionActual === 'pedidos' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('pedidos')}>
                        Mis pedidos
                    </a>
                    <a className={seccionActual === 'direcciones' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('direcciones')}>
                        Direcciones
                    </a>
                    <a className={seccionActual === 'salir' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('salir')}>
                        Cerrar sesión
                    </a>
                </aside>
                <div className="flex flex-col items-center justify-center flex-grow"> {/* Flexbox para centrar vertical y horizontalmente */}
                    {seccionActual === 'edit' && <Edit mustVerifyEmail={mustVerifyEmail} status={status} avatar={avatar} />}
                    {seccionActual === 'pedidos' && <Edit mustVerifyEmail={mustVerifyEmail} status={status} avatar={avatar} />}
                </div>
            </div>
            <Footer />
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </div>
    );
}

