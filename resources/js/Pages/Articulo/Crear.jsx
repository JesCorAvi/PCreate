import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import CrearProducto from '@/Components/CrearProducto';


import { Head } from '@inertiajs/react';

export default function Crear({ auth, categorias, marcas }) {
    return (
        <>
            <LayoutLogueado
                user={auth.user}
                header={<h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center">Tienda</h2>}
                categorias = {categorias}
            >
                <Head title="Tienda" />
            </LayoutLogueado>
            <CrearProducto
                categorias = {categorias}
                marcas = {marcas}>
            </CrearProducto>
            <Footer></Footer>
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>

        </>
    );
}
