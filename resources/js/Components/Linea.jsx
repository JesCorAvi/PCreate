
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function Linea({ auth, nombre, precio, imagen, cantidad : initialCantidad, id}) {
    const [cantidad, setCantidad] = useState(initialCantidad);
    function modificarCantidad(tipo) {
        axios.post("carrito/update", {
            tipo: tipo,
            articulo_id: id
        }).then(response => {
            setCantidad(response.data.cantidad);
        });
    }
    function borrar() {
        axios.post("carrito/destroy", {
            articulo_id: id
        })
    }
    return (
        <div className="border-2 border-solid border-black rounded-md my-5 w-3/4">
            <div className='flex p-4 gap-4'>
                <img className='w-28 h-28 rounded-md' src={"http://127.0.0.1:8000/storage/uploads/articulos/" + imagen}/>
                <div className='w-full'>
                    <a href="#" className="text-2xl  underline pt-3">{nombre}</a>
                    <div className='flex pt-8 gap-4 justify-between'>
                        <p className='font-semibold text-xl'>{precio}€</p>
                        <div className='flex gap-2' >
                            <button onClick={() => modificarCantidad("-")} className=' bg-black text-white text-xl rounded-xl w-6 h-6 font-semibold hover:bg-gray-700'> - </button>
                            <p className=' font-semibold text-xl'> {cantidad} </p>
                            <button onClick={() => modificarCantidad("+")} className='bg-black text-xl rounded-xl text-white w-6 h-6 font-semibold  hover:bg-gray-700'> + </button>
                        </div>
                    </div>
                    <button className='underline' onClick={borrar}>Borrar</button>
                </div>
            </div>
        </div>
    );

}
