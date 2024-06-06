
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import useCarritoStore from '../carritoStore';
import { Link } from '@inertiajs/react';

export default function Linea({ auth, nombre, precio, imagen, cantidad: initialCantidad, id, recargarArticulos, ruta }) {
    const [cantidad, setCantidad] = useState(initialCantidad);
    const { actualizarCantidadArticulos } = useCarritoStore((state) => state);
    const { actualizarCantidadArticulosCookies } = useCarritoStore((state) => state);


    function modificarCantidad(tipo) {
        if(auth.user){
            axios.post("carrito/update", {
                tipo: tipo,
                articulo_id: id
            }).then(response => {
                setCantidad(response.data.cantidad);
                recargarArticulos();
                actualizarCantidadArticulos();
            });
        }else{
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            let articulo = carrito.find(articulo => articulo.id == id);
            if (tipo == "+") {
                articulo.pivot.cantidad++;
            } else if( tipo == "-") {
                if (articulo.pivot.cantidad > 1) {
                    articulo.pivot.cantidad--;
                }else{
                    carrito = carrito.filter(item => item.id !== id);
                }
            } else{
                carrito = carrito.filter(item => item.id !== id);
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            setCantidad(articulo.pivot.cantidad);
            recargarArticulos();
            actualizarCantidadArticulosCookies();
        }

    }
    function borrar() {
        if(auth.user){
            axios.post("carrito/destroy", {
                articulo_id: id
            }).then(response => {
                recargarArticulos();
                actualizarCantidadArticulos();

            });
        }else{
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito = carrito.filter(item => item.id !== id);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            recargarArticulos();
            actualizarCantidadArticulosCookies();
        }
    }
    return (
        <div className="border-2 border-solid border-blue-800 rounded-md my-5 w-4/6">
            <div className='flex flex-col xl:flex-row  p-4 gap-4'>
                <img className='w-40 h-40 rounded-md self-center' src={"/storage/uploads/articulos/" + imagen} />
                <div className='w-full'>
                    <div className='min-h-32'>
                    <Link href={ruta} className=' min-h-24 font-semibold underline text-2xl'>{nombre}</Link>
                    </div>
                    <div name="abajo">
                        <div className='flex gap-4 justify-between'>
                            <p className='font-semibold text-xl'>{precio}€</p>
                            <div className='flex gap-2' >
                                <button onClick={() => modificarCantidad("-")} className=' bg-blue-600 text-white text-xl rounded-xl w-6 h-6 font-semibold hover:bg-blue-700'> - </button>
                                <p className=' font-semibold text-xl'> {cantidad} </p>
                                <button onClick={() => modificarCantidad("+")} className='bg-blue-600 text-xl rounded-xl text-white w-6 h-6 font-semibold  hover:bg-blue-700'> + </button>
                            </div>
                        </div>
                        <button className='underline' onClick={() => modificarCantidad("borrar")}>Borrar</button>
                    </div>
                </div>
            </div>
        </div>
    );

}
