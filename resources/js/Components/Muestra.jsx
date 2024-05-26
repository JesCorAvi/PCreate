import { useState } from 'react';
import { Link } from '@inertiajs/react';
import BotonGrande from './BotonGrande';
import Comentario from './Comentario';
import PrimaryButton from './PrimaryButton';
import Alertas from './Alertas';
import useCarritoStore from '@/carritoStore';
import axios from 'axios';
import Modal from '@/Components/Modal';
import SecondaryButton from './SecondaryButton';
import Comentarios from './Comentarios';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';




export default function Muestra({ user, active = false, classNameName = '', children, articulo }) {
    const { actualizarCantidadArticulos } = useCarritoStore((state) => state);
    const { actualizarCantidadArticulosCookies } = useCarritoStore((state) => state);

    const imagenpr = articulo.fotos.find(foto => foto.orden === 1)?.imagen;
    const imagenSec1 = articulo.fotos.find(foto => foto.orden === 2)?.imagen;
    const imagenSec2 = articulo.fotos.find(foto => foto.orden === 3)?.imagen;

    const [imagenGrande, setGrande] = useState(`http://127.0.0.1:8000/storage/uploads/articulos/${imagenpr}`);
    const [imagenPrincipal] = useState(`http://127.0.0.1:8000/storage/uploads/articulos/${imagenpr}`);
    const [imagenSecundaria1] = useState(`http://127.0.0.1:8000/storage/uploads/articulos/${imagenSec1}`);
    const [imagenSecundaria2] = useState(`http://127.0.0.1:8000/storage/uploads/articulos/${imagenSec2}`);
    const [nota, setNota] = useState(calcularNota());
    const [valoraciones, setValoraciones] = useState(articulo.comentarios.length);
    const [lightboxVisible, setLightboxVisible] = useState(false);
    const datos = articulo.datos;

    function calcularNota() {
        if (articulo.comentarios.length === 0) return 0;
        let suma = 0;
        articulo.comentarios.forEach(comentario => {
            suma += comentario.estrellas;
        });
        return suma / articulo.comentarios.length;
    }
    function añadirAlCarrito() {
        handleAddToCartClick()
        if (user) {
            axios.post(route('carrito.store'), {
                articulo_id: articulo.id,
            }).then(response => {
                actualizarCantidadArticulos();
            }).catch(error => {
                console.log(error);
            });
        } else {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            let articuloEncontrado = carrito.find(art => art.id === articulo.id);
            if (articuloEncontrado) {
                articuloEncontrado.pivot.cantidad++;
            } else {
                carrito.push({
                    id: articulo.id,
                    nombre: articulo.nombre,
                    precio: articulo.precio,
                    fotos: [{ imagen: articulo.fotos[0].imagen }],
                    pivot: { cantidad: 1 },
                });
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCantidadArticulosCookies();
        }
    }

    function acortar(cadena, longitud) {
        return cadena.length <= longitud ? cadena : cadena.substring(0, longitud) + '...';
    }
    function handleComentarioCreado(nuevaNota) {
        setValoraciones(valoraciones + 1);
        let resultado;
        if (valoraciones === 0) {
            resultado = nuevaNota; // o cualquier valor que tenga sentido en este contexto
        } else {
            resultado = (nota * valoraciones + nuevaNota) / (valoraciones + 1);
        }
        setNota(resultado);

    };
    function handleComentarioBorrado(nuevaNota) {
        setValoraciones(valoraciones - 1);
        setNota((nota * valoraciones - nuevaNota) / (valoraciones - 1));
    };
    function handleGrande(url) {
        setGrande(url);
    }
    function handleOpenLightbox() {
        setLightboxVisible(true);
    }

    function handleCloseLightbox() {
        setLightboxVisible(false);
    }

    const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

    const handleAddToCartClick = () => {
        setIsAddToCartModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsAddToCartModalVisible(false);
    };

    return (
        <>
            <Alertas></Alertas>
            <div className='xl:px-40 min-h-screen'>
                <p className="py-2"><Link href={route("articulo.index")}>Tienda</Link>{' > '}{articulo.nombre}</p>

                <article className='block xl:flex px-5'>
                    <section className="flex-1 flex flex-col items-center justify-center">
                        <div className="lg:w-imagen lg:h-imagen ">
                            <img onClick={() => handleOpenLightbox()} src={imagenGrande} alt="Imagen seleccionada en grande" className='w-imagen h-imagen object-contain  rounded-md cursor-zoom-in' />
                        </div>
                        <div className='flex max-w-full overflow-x-auto justify-center'>
                            <img onClick={() => handleGrande(imagenPrincipal)} src={imagenPrincipal} alt="Imagen principal" className='w-32 h-32 object-contain rounded-md cursor-pointer' />
                            <img onClick={() => handleGrande(imagenSecundaria1)} src={imagenSecundaria1} alt="Imagen secundaria 1" className='w-32 h-32 object-contain rounded-md cursor-pointer' />
                            <img onClick={() => handleGrande(imagenSecundaria2)} src={imagenSecundaria2} alt="Imagen secundaria 2" className='w-32 h-32 object-contain rounded-md cursor-pointer' />
                        </div>
                    </section>
                    <section className="flex-1 text-justify xl:px-10 flex flex-col justify-between " >
                        <h1 className="font-bold text-4xl pt-10 ">{articulo.nombre}</h1>
                        <div className='flex'>
                            {[...Array(5)].map((star, index) => {
                                const starValue = index + 1;
                                return (
                                    <span key={starValue}
                                        className='text-purple-800'
                                    >
                                        {starValue <= nota ? <StarIcon /> : <StarBorderIcon className="text-gray-400" />}
                                    </span>
                                );
                            })}<p className='text-purple-800 font-semibold'>{valoraciones} valoraciones</p>
                        </div>
                        <p className='py-10 xl:py-20 xl:px-10 max-w-2xl overflow-hidden whitespace-pre-wrap'>
                            {acortar(articulo.descripcion, 400)}<br></br>
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
                                <img
                                    className={`w-32 y-32 m-5 pt-5 ${isAddToCartModalVisible ? 'aparecer' : ''}`}
                                    src="http://127.0.0.1:8000/assets/exito.svg"

                                ></img>
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


                    <Comentarios onComentarioCreado={handleComentarioCreado} onComentarioBorrado={handleComentarioBorrado} id={articulo.id} user={user}></Comentarios>
                </article>
                {lightboxVisible && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={handleCloseLightbox}>
                        <img src={imagenGrande} alt="Imagen principal" className="max-w-screen-lg max-h-screen p-5 cursor-zoom-out" />
                    </div>
                )}
            </div>
        </>
    );
}
