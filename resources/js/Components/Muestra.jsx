import { useState } from 'react';
import { Link } from '@inertiajs/react';
import BotonGrande from './BotonGrande';
import Comentario from './Comentario';
import PrimaryButton from './PrimaryButton';
import Alertas from './Alertas';
import useCarritoStore from '@/carritoStore';
import axios from 'axios';
import Modal from '@/Components/Modal'; // Asegúrate de importar tu componente Modal



export default function Pieza({ active = false, classNameName = '', children, articulo }) {
    const { actualizarCantidadArticulos } = useCarritoStore((state) => state);

    const imagenpr = articulo.fotos.find(foto => foto.orden === 1)?.imagen;
    const imagenSec1 = articulo.fotos.find(foto => foto.orden === 2)?.imagen;
    const imagenSec2 = articulo.fotos.find(foto => foto.orden === 3)?.imagen;

    const [imagenGrande, setGrande] = useState(`http://127.0.0.1:8000/storage/uploads/articulos/${imagenpr}`);
    const [imagenPrincipal] = useState(`http://127.0.0.1:8000/storage/uploads/articulos/${imagenpr}`);
    const [imagenSecundaria1] = useState(`http://127.0.0.1:8000/storage/uploads/articulos/${imagenSec1}`);
    const [imagenSecundaria2] = useState(`http://127.0.0.1:8000/storage/uploads/articulos/${imagenSec2}`);

    const [lightboxVisible, setLightboxVisible] = useState(false);
    const datos = JSON.parse(articulo.datos);

    function añadirAlCarrito() {
        handleAddToCartClick()
        axios.post(route('carrito.store'), {
            articulo_id: articulo.id,
        }).then(response => {
            actualizarCantidadArticulos();
        }).catch(error => {
            console.log(error);
        });
    }

    function acortar(cadena, longitud) {
        return cadena.length <= longitud ? cadena : cadena.substring(0, longitud) + '...';
    }

    function handleGrande(url) {
        setGrande(url);
    }
    function handleOpenLightbox() {
        setLightboxVisible(true);
    }

    function handleCloseLightbox() {
        setLightboxVisible(false);
    }

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);


    const handleDeleteClick = () => {
        setIsDeleteModalVisible(true);
    };
    const handleAddToCartClick = () => {
        setIsAddToCartModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsDeleteModalVisible(false);
        setIsAddToCartModalVisible(false);
    };

    return (
        <>
            <Alertas></Alertas>
            <div className='xl:px-40 min-h-screen'>
                <p className="py-2"><Link href={route("articulo.index")}>Tienda</Link>{' > '}{articulo.nombre}</p>
                <article className='block xl:flex px-5'>
                    <section className="flex-1 flex flex-col items-center justify-center">
                        <img onClick={() => handleOpenLightbox()} src={imagenGrande} alt="Imagen seleccionada en grande" className='w-imagen h-imagen object-contain border-2 border-solid rounded-md cursor-pointer' />
                        <div className='flex max-w-full overflow-x-auto justify-center'>
                            <img onClick={() => handleGrande(imagenPrincipal)} src={imagenPrincipal} alt="Imagen principal" className='w-20 h-20 object-contain border-2 border-solid rounded-md cursor-pointer' />
                            <img onClick={() => handleGrande(imagenSecundaria1)} src={imagenSecundaria1} alt="Imagen secundaria 1" className='w-20 h-20 object-contain border-2 border-solid rounded-md cursor-pointer' />
                            <img onClick={() => handleGrande(imagenSecundaria2)} src={imagenSecundaria2} alt="Imagen secundaria 2" className='w-20 h-20 object-contain border-2 border-solid rounded-md cursor-pointer' />
                        </div>
                    </section>
                    <section className="flex-1 text-justify xl:px-10 flex flex-col justify-between " >
                        <h1 className="font-bold text-4xl pt-10 ">{articulo.nombre}</h1>
                        <p className='py-10 xl:py-20 xl:px-10 max-w-2xl overflow-hidden whitespace-pre-wrap'>
                            {acortar(articulo.descripcion, 400)}
                            <a href="#descripcion-completa" className='underline'>Seguir leyendo</a>
                        </p>


                        <div className="text-center overflow-hidden">
                            <p className="font-bold text-4xl overflow-hidden">{articulo.precio}€</p>
                        </div>
                        <div className='text-center'>
                            <BotonGrande onClick={() => { añadirAlCarrito(); handleAddToCartClick(); }} texto="AÑADIR AL CARRITO" />
                        </div>
                        <Modal className="p-6" show={isAddToCartModalVisible} onClose={handleCloseModal}>
                            <div className='flex flex-col items-center'>
                                <img className='w-32 y-32 m-5 pt-5' src="http://127.0.0.1:8000/assets/exito.png"></img>
                                <h2 className="text-lg text-gray-900 font-semibold pt-5">
                                    Producto añadido al carrito
                                </h2>
                            </div>
                            <BotonGrande onClick={handleCloseModal} texto={"Aceptar"}></BotonGrande>
                        </Modal>
                    </section>

                </article>
                <article className='block xl:flex px-5'>
                    <section className="flex-1 flex flex-col text-justify ">
                        <h2 id="descripcion-completa" className="font-bold text-2xl pt-10 xl:px-20">Sobre el producto</h2>
                        <p className='py-10 xl:px-20 max-w-4xl overflow-hidden whitespace-pre-wrap'>{articulo.descripcion}</p>
                        <div className="flex justify-center">
                            <table className="border-2 border-solid border-black rounded-md w-96">
                                <tbody className="border-2 border-solid border-black">
                                    <tr className="border-2 border-solid border-black">
                                        <td><strong>Marca:</strong></td>
                                        <td>{articulo.marca.nombre}</td>
                                    </tr>
                                    <tr className="border-2 border-solid border-black">
                                        <td><strong>Categoría:</strong></td>
                                        <td>{articulo.categoria.nombre}</td>
                                    </tr>
                                    {datos && Object.keys(datos).map((key, index) => (
                                        key === 'socket_id' ? null : (
                                            <tr className="border-2 border-solid border-black" key={index}>
                                                <td><strong>{key}:</strong></td>
                                                <td>{datos[key]}</td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
                                fecha="22/4/2024"
                            />
                        ))}
                    </section>
                </article>
                {lightboxVisible && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={handleCloseLightbox}>
                        <img src={imagenGrande} alt="Imagen principal" className="max-w-screen-lg max-h-screen p-5 cursor-pointer" />
                    </div>
                )}
                <div className='flex justify-between'>
                    <div className="bg-black text-white rounded-md p-1 m-1">
                        <Link href={route("articulo.edit", articulo.id)}>Editar artículo</Link>
                    </div>
                    <div className="bg-black text-white rounded-md p-1 m-1">
                        <div className="bg-black text-white rounded-md p-1 m-1">
                            <button onClick={handleDeleteClick}>
                                Borrar artículo
                            </button>
                        </div>
                        <Modal className="p-6" show={isDeleteModalVisible} onClose={handleCloseModal}>
                            <h2 className="text-lg font-medium text-gray-900 font-semibold p-10">
                                ¿Estás seguro de que quieres borrar este artículo?
                            </h2>
                            <p className="mt-1 text-lg px-10 text-gray-600">
                                Esta acción no puede ser revertida.
                            </p>
                            <Link className=" text-white bg-red-900 hover:bg-red-600 rounded-md m-10 p-1" as='Button' method="DELETE" href={route("articulo.destroy", articulo.id)}>
                                Borrar artículo
                            </Link>
                            <button className=" text-white bg-black hover:bg-slate-700 rounded-md p-1" onClick={handleCloseModal}>Cancelar</button>
                        </Modal>


                    </div>
                </div>

            </div>
        </>
    );
}
