import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import Alertas from '@/Components/Alertas';
import Linea from '@/Components/Linea';
import { Head } from '@inertiajs/react';
import Boton from '@/Components/Boton';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from '@inertiajs/react';


export default function Index({ auth, categorias, articulos: InitialArticulos, cantidad }) {

    const [articulos, setArticulos] = useState(InitialArticulos);
    const [precioTotal, setPrecioTotal] = useState(Total());
    const [cantidadTotal, setCantidadTotal] = useState(cantidad);
    useEffect(() => {
        if (!auth.user) {
            calcCantidadLocal()
        }
    }, []);

    function calcCantidadLocal() {
        let carrito = JSON.parse(localStorage.getItem('carrito'));
        setArticulos(carrito);
        let total = 0;
        carrito?.forEach(e => {
            total += e.pivot.cantidad;
        });
        setCantidadTotal(total);
    }
    function Total() {
        let total = 0;
        if (!articulos) return 0;
        articulos.forEach(articulo => {
            total += articulo.precio * articulo.pivot.cantidad;
        });
        return total.toFixed(2);;

    }

    function recargarArticulos() {
        if (auth.user) {
            axios.get("/carritoActualizar").then(response => {
                setArticulos(response.data.articulos);
                setCantidadTotal(response.data.cantidad);
            }).catch(error => {
                console.error('Error al cargar los artículos:', error);
            });
            return;
        } else {
            calcCantidadLocal()
        }

    }
    function borrarCarrito() {
        if (auth.user) {
            axios.delete(route('carrito.destroy'))
            .then(response => {
                setArticulos([]);
                setCantidadTotal(0);
            }).catch(error => {
                console.error('Error al borrar el carrito:', error);
            });
            return;
        } else {
            localStorage.removeItem('carrito');
            setArticulos([]);
            setCantidadTotal(0);
        }
    }
    useEffect(() => {
        setPrecioTotal(Total());
    }, [articulos]);
    return (
        <>
            <LayoutLogueado
                user={auth.user}
                header={<>
                    <h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center">Carrito</h2>
                    <p className=" text-gray-800 leading-tight text-center">Tienes {cantidadTotal} carticulos en la cesta</p>
                    {cantidadTotal > 0 && <button onClick={borrarCarrito} className='text-red-600 leading-tight text-center font-semibold w-full underline'>Borrar carrito</button>}
                </>}
                categorias={categorias}

            >
                <Head title="Carrito" />
            </LayoutLogueado>
            <Alertas></Alertas>

            <div className=' lg:flex w-full min-h-screen lg:p-20'>
                {articulos && articulos.length ? (
                    <>
                        <div className='flex flex-col justify-start items-center w-full lg:w-3/4'>
                            {articulos.map((articulo) => (
                                <Linea
                                    auth={auth}
                                    key={articulo.id}
                                    nombre={articulo.nombre}
                                    precio={articulo.precio}
                                    imagen={articulo.fotos[0].imagen}
                                    cantidad={articulo.pivot.cantidad}
                                    id={articulo.id}
                                    recargarArticulos={recargarArticulos}
                                    ruta={route("articulos.show", { id: articulo.id })}
                                />
                            ))}
                        </div>


                        <div className='w-full lg:w-1/4 flex flex-col justify-start items-center lg:block'>
                            <p className="font-semibold text-2xl p-5">SUBTOTAL</p>
                            <p className='p-5'>{cantidadTotal} articulos en el carrito</p>
                            <p className='p-5 text-xl font-semibold'>{precioTotal} €</p>
                            <Link
                                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-800  hover:to-purple-800 text-white font-bold text-center flex justify-center m-3 items-center rounded-md w-full px-3 py-5 border-b-2 border-t-2 border-gray-300 cursor-pointer'
                                href={route('factura.create')} method="get"
                            >Procesar pedido
                            </Link>
                        </div>
                    </>
                ) : (
                    <h1 className="font-semibold text-2xl text-center w-full p-20">No hay articulos en el carrito</h1>
                )}
            </div>

            <Footer></Footer>
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </>
    );
}
