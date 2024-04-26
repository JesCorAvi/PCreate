import { Head } from '@inertiajs/react';
import Direccion from './Direccion';

export default function Direcciones({ auth, direcciones, provincias }) {
    return (
        <div class="min-h-screen px-10">
            <div className=' xl:p-24'>
                <Head title="Direcciones" />
                {direcciones ? (
                    direcciones.map((direccion) => (
                        <div className="w-full md:w-1/2 xl:w-1/3 p-2 md:p-4 mb-1 md:mb-2">
                            <Direccion
                                direccion={direccion.direccion}
                                ciudad={direccion.ciudad}
                                cpostal={direccion.cpostal}
                                provincia={direccion.provincias.nombre}
                                provincias={provincias}
                            />
                        </div>
                    ))
                ) : (
                    <h1 className='text-xl p-10'>No hay direcciones</h1>
                )}

                <div>
                    <Direccion
                        direccion={""}
                        ciudad={""}
                        cpostal={""}
                        provincia={""}
                        provincias={provincias}
                    />
                </div>
            </div>
        </div>
    );
}
