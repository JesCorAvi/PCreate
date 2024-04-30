
import { Head } from '@inertiajs/react';
import Pedido from './Pedido';

export default function Pedidos({ auth }) {
    return (
        <div className="min-h-screen">
            <Head title="Pedidos" />
            <Pedido/>
            <Pedido/>
            <Pedido/>
            <Pedido/>
            <Pedido/>
            <Pedido/>

        </div>
    );
}
