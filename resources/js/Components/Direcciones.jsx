import { Head } from '@inertiajs/react';
import Direccion from './Direccion';
import { Collapse, IconButton } from '@mui/material';

export default function Direcciones({ auth, domicilios, provinciasn, messages }) {
    console.log(domicilios);
    return (
        <div className="min-h-screen w-9/12">
            <div className=' xl:p-24'>
                <Head title="Direcciones" />
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
                {domicilios ? (
                    domicilios.map((direccion) => (

                        <div>
                            <Direccion
                                id={direccion.id}
                                direccion={direccion.direccion}
                                ciudad={direccion.ciudad}
                                cpostal={direccion.cpostal}
                                provincia_id={direccion.provincia.id}
                                provincias={provincias}
                                initialIsEditing={true}
                            />
                        </div>
                    ))
                ) : (
                    <h1 className='text-xl p-10'>No hay direcciones</h1>
                )}
                <h2 className="text-center text-xl">Crear nueva dirección</h2>
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
        </div>
    );
}
