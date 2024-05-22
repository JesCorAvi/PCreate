import { Head } from '@inertiajs/react';
import Direccion from './Direccion';

export default function Direcciones({ auth, domicilios, provincias }) {

    return (
        <div className="min-h-screen w-9/12">
            <div className=' xl:p-24'>
                <Head title="Direcciones" />

                {domicilios ? (
                    domicilios.map((direccion) => (

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
        </div>
    );
}
