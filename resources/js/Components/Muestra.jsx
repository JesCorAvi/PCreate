import { useState } from 'react';
import { Link } from '@inertiajs/react';
import BotonGrande from './BotonGrande';
import Comentario from './Comentario';

export default function Pieza({ active = false, classNameName = '', children, articulo }) {
    const [imagenPrincipal, setImagenPrincipal] = useState("http://127.0.0.1:8000/storage/uploads/piezas/ram1.webp");
    const [lightboxVisible, setLightboxVisible] = useState(false);

    function acortar(cadena, longitud) {
        if (cadena.length <= longitud) {
            return cadena;
        } else {
            return cadena.substring(0, longitud) + '...';
        }
    }

    function handleClickImagenPrincipal(url) {
        setImagenPrincipal(url);
        // Solo abrir el lightbox si se hace clic en la imagen principal
        if (url === imagenPrincipal) {
            setLightboxVisible(true);
        }
    }

    function handleCloseLightbox() {
        setLightboxVisible(false);
    }

    return (
        <div className='xl:px-40 min-h-screen'>
            <p className="py-2"><Link href={route("articulo.index")}>Tienda</Link>{' > '}{articulo.nombre}</p>
            <article className='block xl:flex px-5'>
                <section className="flex-1 flex flex-col items-center justify-center">
                    <img onClick={() => handleClickImagenPrincipal(imagenPrincipal)} src={imagenPrincipal} alt="Imagen principal" className='w-imagen h-imagen object-contain border-2 border-solid rounded-md cursor-pointer' />
                    <div className='flex max-w-full overflow-x-auto justify-center'>
                        <img onClick={() => handleClickImagenPrincipal("http://127.0.0.1:8000/storage/uploads/piezas/ram1.webp")} className='max-w-44 mx-2 object-contain border-2 border-solid rounded-md cursor-pointer' src="http://127.0.0.1:8000/storage/uploads/piezas/ram1.webp" alt="Imagen 1" />
                        <img onClick={() => handleClickImagenPrincipal("http://127.0.0.1:8000/storage/uploads/piezas/ram2.webp")} className='max-w-44 mx-2 object-contain border-2 border-solid rounded-md cursor-pointer' src="http://127.0.0.1:8000/storage/uploads/piezas/ram2.webp" alt="Imagen 2" />
                        <img onClick={() => handleClickImagenPrincipal("http://127.0.0.1:8000/storage/uploads/piezas/ram3.webp")} className='max-w-44 mx-2 object-contain border-2 border-solid rounded-md cursor-pointer' src="http://127.0.0.1:8000/storage/uploads/piezas/ram3.webp" alt="Imagen 3" />
                    </div>
                </section>

                <section className="flex-1 text-justify xl:px-10 ">
                    <h1 className="font-bold text-4xl pt-10 ">{articulo.nombre}</h1>
                    <p className='py-20 xl:py-40 xl:px-10'>{acortar(articulo.descripcion, 400)}</p>
                    <div className="text-center">
                        <p className="font-bold text-4xl">{articulo.precio}€</p>
                    </div>
                    <BotonGrande texto="AÑADIR AL CARRITO"></BotonGrande>
                </section>
            </article>
            <article className='block xl:flex px-5'>
                <section className="flex-1 flex flex-col text-justify ">
                    <h2 className="font-bold text-2xl pt-10 xl:px-20">Sobre el producto</h2>
                    <p className='py-10 xl:py-20 xl:px-20'>{articulo.descripcion}</p>
                </section>

                <section className="flex-1 flex flex-col text-justify ">
                    <div class='flex justify-between'>
                        <h2 class="font-bold text-2xl pt-10 ">Comentarios</h2>
                        <Link href="" class="font-semibold text-lg pt-10 xl:pr-10 underline">Añadir comentario</Link>
                    </div>
                    <Comentario></Comentario>
                    <Comentario></Comentario>
                    <Comentario></Comentario>
                    <Comentario></Comentario>
                </section>
            </article>
            {lightboxVisible && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={handleCloseLightbox}>
                    <img src={imagenPrincipal} alt="Imagen principal" className="max-w-screen-lg max-h-screen p-5 cursor-pointer" />
                </div>
            )}
        </div>
    );
}
