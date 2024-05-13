import { Head } from '@inertiajs/react';
import Direccion from './Direccion';
import { Collapse, IconButton, Alert } from '@mui/material';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';




export default function Direcciones({ auth, domicilios, provincias }) {

    return (
        <div className="min-h-screen w-9/12">
            <div className=' xl:p-24'>
                <Head title="Direcciones" />

                {domicilios ? (
                    domicilios.map((direccion) => (

                        <div key={direccion.id}>
                            <Direccion
                                id={direccion.id}
                                direccion={direccion.direccion}
                                ciudad={direccion.ciudad}
                                cpostal={direccion.cpostal}
                                provincia_id={direccion.provincia.id}
                                provincias={provincias}
                                initialIsEditing={true}
                                telefono={direccion.telefono}
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
        </div>
    );
}
