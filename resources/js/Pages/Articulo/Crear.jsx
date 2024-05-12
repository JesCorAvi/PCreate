import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import CrearProducto from '@/Components/CrearProducto';


import { Head, Link } from '@inertiajs/react';

export default function Crear({ auth, categorias, marcas, sockets }) {
    return (
        <>
            <LayoutLogueado
                user={auth.user}
                header={<h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center">Crear componente</h2>}
                categorias = {categorias}
            >
                <Head title="Crear Artículo" />
            </LayoutLogueado>
            <Link href={route('profile.show')} className="underline px-10">Volver al dashboard</Link>
            <CrearProducto
                categorias = {categorias}
                marcas = {marcas}
                sockets = {sockets}>

            </CrearProducto>
            <Footer></Footer>
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>

        </>
    );
}
