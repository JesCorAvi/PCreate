import { useState } from 'react';
import FormularioSocket from './FormularioSocket';
import FormularioPlaca from './FormularioPlaca';
import FormularioCpu from './FormularioCpu';
import FormularioRam from './FormularioRam';
import FormularioGrafica from './FormularioGrafica';
import FormularioDisipador from './FormularioDisipador';
import FormularioAlmacenamiento from './FormularioAlmacenamiento';
import FormularioFuente from './FormularioFuente';
import FormularioCaja from './FormularioCaja';
import FormularioVentilador from './FormularioVentilador';

export default function CrearProducto({ marcas, sockets }) {
    const [formularioActual, setFormularioActual] = useState('placa'); // Estado inicializado con 'placa' para que el formulario de Placa Base se abra por defecto

    const estilo_boton_normal = "font-bold flex justify-center items-center w-40 h-150 border border-solid border-black rounded-lg hover:bg-gray-300";
    const estilo_boton_seleccionado = "font-bold flex justify-center items-center w-40 h-150 border border-solid border-black rounded-lg bg-black text-white";

    const handleBotonClick = (formulario) => {
        setFormularioActual(formulario); // Cambia el estado para mostrar el formulario seleccionado
    };

    return (
        <>
            <div className='flex flex-wrap justify-between lg:px-52 lg:pb-20'>
                <button className={formularioActual === 'socket' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('socket')}>
                    Socket
                </button>
                <button className={formularioActual === 'placa' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('placa')}>
                    Placa Base
                </button>
                <button className={formularioActual === 'cpu' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('cpu')}>
                    CPU
                </button>
                <button className={formularioActual === 'ram' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('ram')}>
                    RAM
                </button>
                <button className={formularioActual === 'grafica' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('grafica')}>
                    Gráfica
                </button>
                <button className={formularioActual === 'disipador' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('disipador')}>
                    Disipador
                </button>
                <button className={formularioActual === 'almacenamiento' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('almacenamiento')}>
                    Almacenamiento
                </button>
                <button className={formularioActual === 'fuente' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('fuente')}>
                    Fuente
                </button>
                <button className={formularioActual === 'caja' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('caja')}>
                    Caja
                </button>
                <button className={formularioActual === 'ventiladores' ? estilo_boton_seleccionado : estilo_boton_normal} onClick={() => handleBotonClick('ventiladores')}>
                    Ventiladores
                </button>
            </div>

            {formularioActual === 'socket' && <FormularioSocket />}
            {formularioActual === 'placa' && <FormularioPlaca marcas={marcas} sockets={sockets} />}
            {formularioActual === 'cpu' && <FormularioCpu marcas={marcas} sockets={sockets} />}
            {formularioActual === 'ram' && <FormularioRam marcas={marcas} />}
            {formularioActual === 'grafica' && <FormularioGrafica marcas={marcas} />}
            {formularioActual === 'disipador' && <FormularioDisipador marcas={marcas} sockets={sockets} />}
            {formularioActual === 'almacenamiento' && <FormularioAlmacenamiento marcas={marcas} />}
            {formularioActual === 'fuente' && <FormularioFuente marcas={marcas} />}
            {formularioActual === 'caja' && <FormularioCaja marcas={marcas} />}
            {formularioActual === 'ventiladores' && <FormularioVentilador marcas={marcas} />}

            {/* Otros formularios aquí */}
        </>
    );
}
