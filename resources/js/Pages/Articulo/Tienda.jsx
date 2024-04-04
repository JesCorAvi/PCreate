import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';

import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <>
            <LayoutLogueado
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tienda</h2>}
            >
                <Head title="Tienda" />

            </LayoutLogueado>
            <Footer></Footer>
        </>
    );
}
