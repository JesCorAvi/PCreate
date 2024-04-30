import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import Productos from '@/Components/Productos';
import Alertas from '@/Components/Alertas';

import { Head } from '@inertiajs/react';

export default function Index({ auth, categorias, marcas, articulos, cantidad }) {
    return (
        <>
            <LayoutLogueado
                user={auth.user}
                header={<><h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center">Tienda</h2><p className=" text-gray-800 leading-tight text-center">Se han encontrado {cantidad} articulos</p></>}
                categorias = {categorias}
            >
                <Head title="Tienda" />
            </LayoutLogueado>
            <Alertas></Alertas>
            <Productos
                categorias = {categorias}
                marcas = {marcas}
                articulos = {articulos}
                cantidad = {cantidad}
            >
            </Productos>
            <Footer></Footer>
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </>
    );
}
