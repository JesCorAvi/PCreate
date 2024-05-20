import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import Configurador from '@/Components/Configurador';
import { Head, Link } from '@inertiajs/react';

export default function Create({ auth, categorias, sockets, articulos }) {
    return (
        <>
            <LayoutLogueado
                user={auth.user}
                categorias = {categorias}
            >
            <Head title="Crear Artículo" />
            <Configurador
                user = {auth.user}
                sockets = {sockets}
                articulos = {articulos}
            ></Configurador>
            </LayoutLogueado>
            <Footer></Footer>
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>

        </>
    );
}
