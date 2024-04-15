import { useState } from 'react';
import { Link } from '@inertiajs/react';
import BotonGrande from './BotonGrande';
import Comentario from './Comentario';

export default function Pieza({ active = false, classNameName = '', children, articulo }) {
    const [imagenPrincipal, setImagenPrincipal] = useState(`http://127.0.0.1:8000/storage/uploads/articulos/${articulo.fotos[1].imagen}`);
    const [lightboxVisible, setLightboxVisible] = useState(false);
    const datos = JSON.parse(articulo.datos);

    function acortar(cadena, longitud) {
        return cadena.length <= longitud ? cadena : cadena.substring(0, longitud) + '...';
    }

    function handleClickImagenPrincipal(url) {
        setImagenPrincipal(url);
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
                        {articulo.fotos.slice(1).map((foto, index) => (
                            <img key={index} onClick={() => handleClickImagenPrincipal(`http://127.0.0.1:8000/storage/uploads/articulos/${foto.imagen}`)} className='max-w-44 mx-2 object-contain border-2 border-solid rounded-md cursor-pointer' src={`http://127.0.0.1:8000/storage/uploads/articulos/${foto.imagen}`} alt={`Imagen ${index + 1}`} />
                        ))}
                    </div>
                </section>
                <section className="flex-1 text-justify xl:px-10 flex flex-col justify-between">
                    <h1 className="font-bold text-4xl pt-10 ">{articulo.nombre}</h1>
                    <p className='py-20 xl:py-40 xl:px-10'>{acortar(articulo.descripcion, 400)}</p>
                    <div className="text-center">
                        <p className="font-bold text-4xl">{articulo.precio}€</p>
                    </div>
                    <div className='text-center'>
                        <BotonGrande texto="AÑADIR AL CARRITO" />
                    </div>
                </section>

            </article>
            <article className='block xl:flex px-5'>
                <section className="flex-1 flex flex-col text-justify ">
                    <h2 className="font-bold text-2xl pt-10 xl:px-20">Sobre el producto</h2>
                    <p className='py-10 xl:px-20'>{articulo.descripcion}</p>
                    <ul>
                        <li className='py-5 xl:px-20'> <strong>Marca:</strong> {articulo.marca.nombre}</li>
                        <li className='py-5 xl:px-20'> <strong>Categoría:</strong> {articulo.categoria.nombre}</li>
                        {Object.keys(datos).map((key, index) => (
                            <li className='py-5 xl:px-20' key={index}>
                                <strong>{key}:</strong> {datos[key]}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="flex-1 flex flex-col text-justify ">
                    <div className='flex justify-between'>
                        <h2 className="font-bold text-2xl pt-10 ">Comentarios</h2>
                        <Link href="" className="font-semibold text-lg pt-10 xl:pr-10 underline">Añadir comentario</Link>
                    </div>
                    {[...Array(4)].map((_, index) => (
                        <Comentario
                            key={index}
                            usuario="Jesus. C"
                            avatar='http://127.0.0.1:8000/assets/avatar.jpg'
                            nota="4.5"
                            comentario="Muy buena placa base, me la compré más que nada por estética, ya que las luces que tiene me gustan bastante, pero en términos de conectividad y rendimiento está genial. Tiene bastantes puertos USB, compatibilidad con conectores tipo C que pueda tener tu caja y 2 puertos M.2 para las SSD. Muy contento con la compra."
                            fecha="22 de Septiembre de 2024"
                        />
                    ))}
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
