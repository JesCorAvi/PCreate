
import { Head } from '@inertiajs/react';
import Direccion from './Direccion';

export default function Pedidos({ auth }) {
    return (
<div class="min-h-screen ">
    <div className='flex flex-wrap p-24'>
    <Head title="Direcciones" />
    <div class="w-full md:w-1/2 lg:w-1/3 p-2 md:p-4 mb-1 md:mb-2">
        <Direccion/>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-2 md:p-4 mb-1 md:mb-2">
        <Direccion/>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-2 md:p-4 mb-1 md:mb-2">
        <Direccion/>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-2 md:p-4 mb-1 md:mb-2">
        <Direccion/>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-2 md:p-4 mb-1 md:mb-2">
        <Direccion/>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-2 md:p-4 mb-1 md:mb-2">
        <Direccion/>
    </div>
</div>
</div>



    );
}
