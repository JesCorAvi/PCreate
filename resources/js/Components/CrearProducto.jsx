import FormularioSocket from './Formularios/Crear/FormularioSocket';
import FormularioPlaca from './Formularios/Crear/FormularioPlaca';
import FormularioCpu from './Formularios/Crear/FormularioCpu';
import FormularioRam from './Formularios/Crear/FormularioRam';
import FormularioGrafica from './Formularios/Crear/FormularioGrafica';
import FormularioDisipador from './Formularios/Crear/FormularioDisipador';
import FormularioAlmacenamiento from './Formularios/Crear/FormularioAlmacenamiento';
import FormularioFuente from './Formularios/Crear/FormularioFuente';
import FormularioCaja from './Formularios/Crear/FormularioCaja';
import FormularioVentilador from './Formularios/Crear/FormularioVentilador';
import { useState, useEffect } from 'react';
import Alertas from '@/Components/Alertas';




export default function CrearProducto({ marcas, sockets }) {
    const [formularioActual, setFormularioActual] = useState('placa');

    const estilo_boton_normal = "font-bold flex justify-center items-center w-36 h-150 border border-solid border-black rounded-lg hover:bg-gray-300";
    const estilo_boton_seleccionado = "font-bold flex justify-center items-center w-36 h-150 border border-solid border-black rounded-lg bg-black text-white";

    const handleBotonClick = (formulario) => {
        setFormularioActual(formulario);
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('articulo', formulario);
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({}, '', newUrl);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const formularioFromURL = params.get('articulo');
        if (formularioFromURL) {
            setFormularioActual(formularioFromURL);
        }
    }, []);

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
            <Alertas></Alertas>
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
