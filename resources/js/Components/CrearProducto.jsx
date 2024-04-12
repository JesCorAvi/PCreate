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
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';



export default function CrearProducto({ marcas, sockets }) {
    const [formularioActual, setFormularioActual] = useState('placa');
    const { messages } = usePage().props;
    const [mensajeActual, setMensajeActual] = useState(null);
    const [open, setOpen] = useState(true);

    const estilo_boton_normal = "font-bold flex justify-center items-center w-40 h-150 border border-solid border-black rounded-lg hover:bg-gray-300";
    const estilo_boton_seleccionado = "font-bold flex justify-center items-center w-40 h-150 border border-solid border-black rounded-lg bg-black text-white";

    const handleBotonClick = (formulario) => {
        setFormularioActual(formulario);
    };

    useEffect(() => {
        setMensajeActual(messages[formularioActual]);
        // Cerrar el collapse cuando se cambia el mensaje
        setOpen(true);
    }, [messages, formularioActual]);

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
{            console.log(messages)
}
            <Collapse in={open}>
                {messages.success && (
                    <Alert
                        severity='success'
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false); // Cambia el estado de open cuando se hace clic
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {messages.success}
                    </Alert>

                )}
                {messages.error && (
                    <Alert
                        severity='error'
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false); // Cambia el estado de open cuando se hace clic
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {messages.error}
                    </Alert>

                )}
            </Collapse>
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
