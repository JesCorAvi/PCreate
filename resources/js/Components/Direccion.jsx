import { Head, useForm   } from '@inertiajs/react';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Direccion({ auth, direccion, ciudad, cpostal, provincia_id, provincias, id, initialIsEditing}) {
    const [isEditing, setIsEditing] = useState(!!id); // Si id existe, estamos en modo de edición

    const { data, setData, reset, post, put } = useForm({
        id: id,
        direccion: direccion,
        ciudad: ciudad,
        cpostal: cpostal,
        provincia_id: provincia_id
    });

    function crearDireccion(e) {
        e.preventDefault();
        reset();
        if (isEditing) {
            put(route('domicilio.update', id), data);
            setData({
                direccion: data.direccion,
                ciudad: data.ciudad,
                cpostal: data.cpostal,
                provincia_id: data.provincia_id
            });
        } else {
            post(route('domicilio.store'), data);
        }
    }

    function eliminarDireccion(e) {
        e.preventDefault();
        post(route('domicilio.destroy'), id);
    }

    return (
        <form method='post' onSubmit={crearDireccion}>
            <div className="border-2 border-solid border-black rounded-md my-5 relative">
                {isEditing && (
                    <button className="bg-black rounded-xl w-6 h-6 absolute top-0 right-0 -mt-2 -mr-2" onClick={eliminarDireccion}>
                        <p className="text-white">X</p>
                    </button>
                )}
                <div className="border-b-2 border-solid border-black">
                    <input
                        className='w-full'
                        name='direccion'
                        placeholder='Direccion'
                        value={data.direccion}
                        required
                        onChange={(e) => setData('direccion', e.target.value)}
                    />
                    <div className='flex flex-col sm:flex-row items-center justify-between'>
                        <input className='w-full'
                            name='ciudad'
                            required
                            placeholder='Ciudad'
                            value={data.ciudad}
                            onChange={(e) => setData('ciudad', e.target.value)}
                        />
                        <input className='w-full'
                            name='cpostal'
                            required
                            placeholder='Código Postal'
                            value={data.cpostal}
                            onChange={(e) => setData('cpostal', e.target.value)}
                        />
                        <select className='w-full'
                            name='provincia_id'
                            onChange={(e) => setData('provincia_id', e.target.value)}
                            value={data.provincia_id}
                            required
                        >
                            <option disabled>Provincias...</option>
                            {provincias.map((provincia) => (
                                <option key={provincia.id} value={provincia.id}>
                                    {provincia.nombre}
                                </option>
                            ))}
                        </select>
                        <div className="flex xs:flex-col md:flex-col">
                            <button className="w-full h-10 bg-black text-white p-1">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
