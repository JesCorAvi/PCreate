import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';


export default function Pedido({ factura }) {
    function Total() {
        let total = 0;
        factura.articulos.forEach(articulo => {
            total += articulo.precio * articulo.pivot.cantidad;
        });
        return total.toFixed(2);
    }

    function formatDate(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
        // Convertir el mes a mayúsculas
        const mesMayusculas = formattedDate.replace(/\b[a-z]/g, function (char) {
            return char.toUpperCase();
        });
        return mesMayusculas;
    }

    return (
        <div className="border-2 border-solid border-black rounded-md xl:my-5">
            <div className="border-b-2 px-2 py-1 border-solid border-black flex gap-5">
                <div>
                    <p className='font-bold'>PEDIDO REALIZADO</p>
                    <p>{formatDate(factura.fecha_creacion)}</p>
                </div>
                <div>
                    <p className='font-bold'>Total</p>
                    <p>{Total()}€</p>
                </div>
                <div className="ml-auto">
                    <p ><strong>PEDIDO Nº</strong> {factura.id}</p>
                    <a href="#" className='underline'>Ver los detalles de los pedidos</a>
                </div>
            </div>
            <div className='px-2 py-1'>
                <p><strong>Fecha de entrega:</strong> {formatDate(factura.entrega_aproximada)}</p>
                <p><strong>Direccion:</strong> {factura.domicilio.direccion}, {factura.domicilio.ciudad}, {factura.domicilio.cpostal}, {factura.domicilio.provincia.nombre}</p>

                <div className='flex flex-col gap-4'>
                    {factura.articulos.map((articulo, index) => (
                        <div key={index} className="flex items-center">
                            <img className='w-20 h-20 rounded-md' src={"http://127.0.0.1:8000/storage/uploads/articulos/" + articulo.fotos[0].imagen}></img>
                            <div>
                            <Link href={route("articulos.show", { id: articulo.id })} className="text-sm ml-2 underline">{articulo.nombre} </Link>
                            <p className='ml-2 font-semibold'>{articulo.precio}€</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
