import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import Alertas from '@/Components/Alertas';
import Linea from '@/Components/Linea';
import { Head } from '@inertiajs/react';

export default function Index({ auth, categorias, carrito,articulos, cantidad }) {
    return (
        <>
            <LayoutLogueado
                user={auth.user}
                header={<><h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center">Carrito</h2><p className=" text-gray-800 leading-tight text-center">Tienes x carticulos en la cesta</p></>}
                categorias = {categorias}
            >
            <Head title="Tienda" />
            </LayoutLogueado>
            <Alertas></Alertas>
            <div className='flex flex-col justify-center items-center'>

                <Linea></Linea>
                <Linea></Linea>
                <Linea></Linea>
                <Linea></Linea>
                <Linea></Linea>
                <Linea></Linea>
                <Linea></Linea>

            </div>
            <Footer></Footer>
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </>
    );
}
