
import { Head } from '@inertiajs/react';
import Pedido from './Pedido';

export default function Pedidos({ auth, facturas }) {
    console.log(facturas);
    return (
        <div className=" min-h-screen w-11/12  xl:w-7/12">
            {facturas ? (
                Object.values(facturas).map((factura) => (
                    <div key={factura.id}>
                        <Pedido
                            factura = {factura}
                        />
                    </div>
                ))
            ) : (
                <h1 className='text-xl p-10'>No hay Facturas</h1>
            )}
        </div>
    );
}
