
import { Head } from '@inertiajs/react';
import Pedido from './Pedido';

export default function Pedidos({ auth, facturas }) {
    return (
        <div className=" min-h-screen w-11/12  xl:w-7/12">
            <Head title="Pedidos"/>
            {facturas && facturas.length ? (
                Object.values(facturas).map((factura) => (
                    <div key={factura.id}>
                        <Pedido
                            factura = {factura}
                        />
                    </div>
                ))
            ) : (
                <h1 className='text-2xl font-semibold pt-40 p-10 text-center'>No hay Facturas</h1>
            )}
        </div>
    );
}
