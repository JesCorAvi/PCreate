
import { Head } from '@inertiajs/react';

export default function Pedido({factura}) {
    function Total(){
        let total = 0;
        factura.articulos.forEach(articulo => {
            total += articulo.precio * articulo.pivot.cantidad;
        });
        return total;
    }
    return (
            <div className="border-2 border-solid border-black rounded-md xl:my-5">
                <div className="border-b-2 px-2 py-1 border-solid border-black flex gap-5">
                    <div>
                        <p className='font-bold'>PEDIDO REALIZADO</p>
                        <p>{factura.fecha_creacion}</p>
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
                    <p><strong>Fecha de entrega:</strong> {factura.entrega_aproximada}</p>
                    <div className='flex items-center flex-col p-4 gap-4 xl:flex-row'>
                        <img className='w-36 h-36 rounded-md' src={"http://127.0.0.1:8000/storage/uploads/articulos/" + factura.articulos[0].fotos[0].imagen}></img>
                        <a href="#" className="text-2xl underline pt-3">{factura.articulos[0].nombre + ", " + factura.articulos[0].nombre + "..."}</a>
                    </div>
                </div>
            </div>
    );
}
