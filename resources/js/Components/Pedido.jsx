import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function Pedido({ factura }) {
    const { csrf_token } = usePage().props;

    function Total() {
        let total = 0;
        factura.articulos.forEach(articulo => {
            total += articulo.pivot.precio * articulo.pivot.cantidad;
        });
        return total.toFixed(2);
    }

    function formatDate(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
        const mesMayusculas = formattedDate.replace(/\b[a-z]/g, function (char) {
            return char.toUpperCase();
        });
        return mesMayusculas;
    }

    function handleDownload() {
        const url = route('factura.download', { id: factura.id });
        window.location.href = url;
    }

    return (
        <div className="border-2 rounded-md my-5 xl:my-10 overflow-hidden shadow-2xl">
            <div className=" px-2 py-1 border-solid border-black flex gap-5 bg-slate-200">
                <div>
                    <p className='font-bold'>PEDIDO REALIZADO</p>
                    <p>{formatDate(factura.fecha_creacion)}</p>
                </div>

                <div className="ml-auto">
                    <p><strong>PEDIDO #</strong> {factura.id}</p>
                    <button onClick={handleDownload} className='underline'>Descargar Factura</button>
                </div>
            </div>
            <div className='px-2 py-1'>
                <p><strong>Fecha de entrega:</strong> {formatDate(factura.entrega_aproximada)}</p>
                <p><strong>Dirección:</strong> {factura.domicilio.direccion}, {factura.domicilio.ciudad}, {factura.domicilio.cpostal}, {factura.domicilio.provincia.nombre}</p>

                <div className='flex flex-col gap-4'>
                    {factura.articulos.map((articulo, index) => (
                        <div key={index} className="flex items-center">
                            <img className='w-20 h-20 rounded-md' src={"http://127.0.0.1:8000/storage/uploads/articulos/" + articulo.fotos[0].imagen}></img>
                            <div className='flex-1 ml-2'>
                                    <Link href={route("articulos.show", { id: articulo.id })} className="text-md underline">{articulo.nombre}</Link>
                                <div className='flex justify-between'>

                                <p className='ml-2'>Cantidad: {articulo.pivot.cantidad}</p>
                                <p className='font-semibold px-10'>{articulo.pivot.precio}€</p>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className=" px-2 py-1 border-solid border-black flex justify-between bg-slate-200">
                <p className='font-bold text-2xl px-5'>Total:</p>
                <p className='text-2xl px-10 font-semibold'>{Total()}€</p>
            </div>
        </div>
    );
}
