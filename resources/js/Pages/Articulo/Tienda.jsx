import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import Filtro from '@/Components/Filtro';


import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <>
            <LayoutLogueado
                user={auth.user}
                header={<h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center">Tienda</h2>}
            >
                <Head title="Tienda" />
            </LayoutLogueado>
            <Filtro></Filtro>
            <Footer></Footer>
        </>
    );
}
