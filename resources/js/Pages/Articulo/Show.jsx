import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import Muestra from '@/Components/Muestra';


import { Head } from '@inertiajs/react';

export default function Show({ auth, categorias, articulo}) {
    return (
        <>
            <LayoutLogueado
                user={auth.user}
                header={<h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center"></h2>}
                categorias = {categorias}
            />
            <Head title="Detalles" />
            <Muestra
                articulo = {articulo}

            ></Muestra>
            <Footer></Footer>
        </>
    );
}
