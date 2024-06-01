import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import Configurador from '@/Components/Configurador';
import { Head, Link } from '@inertiajs/react';
import Configuraciones from '@/Components/Configuraciones';

export default function Create({ auth, categorias, cantidad, pcs }) {
    return (
        <>
            <LayoutLogueado
                user={auth.user}
                categorias = {categorias}
                header={
                <>
                    <h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center">Ordenadores PCreate</h2>
                    <p className=" text-gray-800 leading-tight text-center">Se han encontrado {cantidad} articulos</p>
                </>
                }

            >
            <Head title="Ordenadores PCreate" />
            </LayoutLogueado>
            <Configuraciones
                pcs = {pcs}
            ></Configuraciones>
            <Footer></Footer>
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>

        </>
    );
}
