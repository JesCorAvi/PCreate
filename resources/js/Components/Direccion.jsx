
import { Head } from '@inertiajs/react';

export default function Direccion({ auth }) {
    return (
        <div className="border-2 border-solid border-black rounded-md my-5 flex flex-col items-center">
            <div className="border-b-2 px-2 py-1 border-solid border-black flex flex-col sm:flex-row gap-5 items-center justify-between">
                <div>
                    <p>Carretera de jerez km 1 junto a hermanos leon, Cadiz</p>
                    <p>Sanlucar de barrameda, 11540, España</p>
                </div>
                <div className="flex xs:flex-col   md:flex-col  gap-2">
                    <button className="h-8 bg-black text-white rounded-md p-1">Editar</button>
                    <button className="bg-black text-white rounded-md p-1 h-8">Borrar</button>
                </div>
            </div>
        </div>
    );
}
