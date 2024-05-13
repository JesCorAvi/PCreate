import { useState } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';

export default function Compra({ user, provincias, domicilios, articulos }) {
    const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);

    function Total() {
        let total = 0;
            articulos.forEach(articulo => {
                total += articulo.precio * articulo.pivot.cantidad;
            });
        return total.toFixed(2);
    }

    function Cantidad() {
        let cantidad = 0;
            articulos.forEach(articulo => {
                cantidad += articulo.pivot.cantidad;
            });
        return cantidad;
    }

    function comprar() {
        axios.post(route('factura.store', {domicilio_id: direccionSeleccionada }))
    }

    return (
        <div className='min-h-screen lg:flex w-full gap-16 lg:p-20'>
            <div className='flex flex-col justify-start items-center w-full lg:w-3/5 p-5'>
                <p className='font-semibold text-2xl'>Domicilio de envio</p>

                {domicilios.map(domicilio => (
                    <div
                        key={domicilio.id}
                        className={`w-full p-5 border-b-2 border-t-2 m-3 border-gray-300 hover:bg-blue-100 cursor-pointer ${
                            direccionSeleccionada === domicilio.id ? 'bg-blue-200' : '' // Condición para aplicar el estilo cuando se selecciona la dirección
                        }`}
                        onClick={() => setDireccionSeleccionada(domicilio.id)} // Establecer la dirección seleccionada al hacer clic
                    >
                        <p className='text-xl font-semibold'>{domicilio.direccion} {domicilio.numero}</p>
                        <p className='text-xl'>{domicilio.ciudad}, {domicilio.provincia.nombre}, {domicilio.cpostal}</p>
                    </div>
                ))}

                    <Link className="text-6xl text-blue-800 font-bold text-center flex justify-center m-3 items-center min-h-28 w-full p-5 border-b-2 border-t-2 border-gray-300 hover:bg-blue-100 cursor-pointer"
                    href={route('profile.show', {seccion:"direcciones"})} method="get"
                    >
                        +
                    </Link>
            </div>
            <div className='h-60 w-full xl:mt-16 lg:w-1/4 flex flex-col text-center justify-center items-center lg:block border border-solid border-gray-300 rounded-md'>
                <p className="font-semibold text-2xl p-5">RESUMEN</p>
                <p className='p-3'>{Cantidad()}  articulos en el carrito</p>
                <p className='p-4 text-3xl font-semibold'>{Total()} €</p>
                <button onClick={comprar}
                className='text-xl bg-blue-600 text-white font-bold text-center flex justify-center items-center rounded-md w-full px-3 py-5  border-b-2 border-t-2 border-gray-300 hover:bg-blue-700 cursor-pointer'
                >
                    Pagar con Paypal
                </button>
            </div>
        </div>
    );
}
