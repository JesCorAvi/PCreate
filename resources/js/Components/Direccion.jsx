import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Direccion({ auth, direccion, ciudad, cpostal, provincia, provincias }) {
    const [direccionValue, setDireccionValue] = useState(direccion);
    const [ciudadValue, setCiudadValue] = useState(ciudad);
    const [cpostalValue, setCpostalValue] = useState(cpostal);
    const [provinciaValue, setProvinciaValue] = useState(provincia);

    return (
        <div className="border-2 border-solid border-black rounded-md my-5 ">
            <div className="border-b-2 px-2 py-1 border-solid border-black ">
                <input className='w-full' placeholder='Direccion' value={direccionValue} onChange={e => setDireccionValue(e.target.value)}></input>
                <div className='flex flex-col sm:flex-row gap-5 items-center justify-between'>
                    <input placeholder='ciudad' value={ciudadValue} onChange={e => setCiudadValue(e.target.value)}></input>
                    <input placeholder='cpostal' value={cpostalValue} onChange={e => setCpostalValue(e.target.value)}></input>
                    <select value={provinciaValue} onChange={e => setProvinciaValue(e.target.value)}>
                        {provincias.map((provincia) => (
                            <option key={provincia.id} value={provincia.id}>
                                {provincia.nombre}
                            </option>
                        ))}
                    </select>
                    <div className="flex xs:flex-col   md:flex-col  gap-2">
                        <form method='post' action="">
                            <button className="h-8 bg-black text-white rounded-md p-1 m-1">Guardar</button>
                        </form>
                        <form method="post" action="">
                            <button className="bg-black text-white rounded-md p-1 h-8 m-1">Borrar</button>
                        </form>    vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  c
                    </div>
                </div>
            </div>
        </div>
    );
}
