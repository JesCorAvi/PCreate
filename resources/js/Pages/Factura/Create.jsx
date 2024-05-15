import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import CrearProducto from '@/Components/CrearProducto';
import Compra from '@/Components/Compra';


import { Head, Link } from '@inertiajs/react';

export default function Create({ auth, user, provincias, domicilios, articulos, categorias }) {
    return (
        <>
            <LayoutLogueado
                user={auth.user}
                categorias = {categorias}
            >
            <Head title="Crear Artículo" />
            </LayoutLogueado>
            <Compra
                user={user}
                domicilios={domicilios}
                articulos={articulos}
                provincias={provincias}
            />
            <Footer></Footer>
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>

        </>
    );
}
