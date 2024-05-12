
import { useState } from 'react';
import UsuariosTabla from '@/Components/TablasAdmin/UsuariosTabla';

export default function AdminDashboard({ }) {

    const [tablaActual, setTablaActual] = useState('Usuarios');

    const estilo_boton_normal = "font-bold flex justify-center items-center w-36 h-150 border border-solid border-black rounded-lg hover:bg-gray-300";
    const estilo_boton_seleccionado = "font-bold flex justify-center items-center w-36 h-150 border border-solid border-black rounded-lg bg-black text-white";

    const handleBotonClick = (formulario) => {
        setTablaActual(formulario);
    };

    return (
        <div className='min-h-screen'>
         <div className='flex flex-wrap justify-between lg:px-52 lg:pb-20'>
                <button className={tablaActual === 'Usuarios' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('Usuarios')}>
                    Usuarios
                </button>
                <button className={tablaActual === 'Articulos' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('Articulos')}>
                    Articulos
                </button>
                <button className={tablaActual === 'Categorias' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('Categorias')}>
                    Categorias
                </button>
                <button className={tablaActual === 'Marcas' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('Marcas')}>
                    Marcas
                </button>
                <button className={tablaActual === 'Pedidos' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('Pedidos')}>
                    Pedidos
                </button>
                <button className={tablaActual === 'Comentarios' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('Comentarios')}>
                    Comentarios
                </button>
            </div>
            {tablaActual === 'Usuarios' && < UsuariosTabla/>}


        </div>
    );
}
