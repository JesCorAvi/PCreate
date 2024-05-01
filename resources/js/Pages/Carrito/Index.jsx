import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import Alertas from '@/Components/Alertas';
import Linea from '@/Components/Linea';
import { Head } from '@inertiajs/react';
import Boton from '@/Components/Boton';

export default function Index({ auth, categorias, carrito, articulos, cantidad }) {
    function precioTotal() {
        let total = 0;
        if (!articulos) return 0;
        articulos.forEach(articulo => {
            total += articulo.precio * articulo.pivot.cantidad;
        });
        return total.toFixed(2);;
    }
    return (
        <>
            <LayoutLogueado
                user={auth.user}
                header={<><h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center">Carrito</h2><p className=" text-gray-800 leading-tight text-center">Tienes {cantidad} carticulos en la cesta</p></>}
                categorias={categorias}
            >
                <Head title="Tienda" />
            </LayoutLogueado>
            <Alertas></Alertas>
            <div className=' lg:flex w-full min-h-screen lg:p-20'>

                {articulos ? (
                    <div className='flex flex-col justify-start items-center w-full lg:w-3/4'>
                        {articulos.map((articulo) => (
                            <Linea
                                key={articulo.id}
                                nombre={articulo.nombre}
                                precio={articulo.precio}
                                imagen={articulo.fotos[0].imagen}
                                cantidad={articulo.pivot.cantidad}
                                id={articulo.id}
                            />
                        ))}
                    </div>
                ) : (
                    <h1>No hay articulos en el carrito</h1>
                )}

                <div className='w-full lg:w-1/4 flex flex-col justify-start items-center lg:block'>
                    <p className="font-semibold text-2xl p-5">SUBTOTAL</p>
                    <p className='p-5'>{cantidad} articulos en el carrito</p>
                    <p className='p-5 text-xl font-semibold'>{precioTotal()} €</p>
                    <Boton texto="Comprar"></Boton>
                </div>
            </div>
            <Footer></Footer>
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </>
    );
}
