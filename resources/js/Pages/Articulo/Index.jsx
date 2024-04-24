import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import Productos from '@/Components/Productos';


import { Head } from '@inertiajs/react';

export default function Index({ auth, categorias, marcas, articulos }) {
    return (
        <>
            <LayoutLogueado
                user={auth.user}
                header={<h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center">Tienda</h2>}
                categorias = {categorias}
            >
                <Head title="Tienda" />
            </LayoutLogueado>
            <Productos
                categorias = {categorias}
                marcas = {marcas}
                articulos = {articulos}
            >
            </Productos>
            <Footer></Footer>
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </>
    );
}
