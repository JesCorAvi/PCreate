
import { Head } from '@inertiajs/react';

export default function Pedido({ auth }) {
    return (
            <div className="border-2 border-solid border-black rounded-md my-5">
                <div className="border-b-2 px-2 py-1 border-solid border-black flex gap-5">
                    <div>
                        <p className='font-bold'>PEDIDO REALIZADO</p>
                        <p>14 de Noviembre de 2023</p>
                    </div>
                    <div>
                        <p className='font-bold'>Total</p>
                        <p>54.36€</p>
                    </div>
                    <div className="ml-auto">
                        <p ><strong>PEDIDO Nº</strong> 3434.343433</p>
                        <a href="#" className='underline'>Ver los detalles de los pedidos</a>
                    </div>
                </div>
                <div className='px-2 py-1'>
                    <p><strong>Fecha de entrega:</strong> 17 de Noviembre de 2023</p>
                    <div className='flex p-4 gap-4'>
                        <img className='w-28 h-28 rounded-md' src="http://127.0.0.1:8000/assets/grafica.webp"></img>
                        <a href="#" className="text-2xl underline pt-3">Corsair Vengeance DDR5 6400MHz 64GB 2x32GB CL32</a>
                    </div>
                </div>
            </div>
    );
}
