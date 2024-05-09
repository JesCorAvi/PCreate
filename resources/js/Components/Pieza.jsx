import { Link } from '@inertiajs/react';
import Boton from './Boton';
import useCarritoStore from '../carritoStore';


export default function Pieza({ active = false, classNameName = '',handleAddToCartClick, children, ...props }) {
    const { actualizarCantidadArticulos } = useCarritoStore((state) => state);

    function añadirAlCarrito() {
        handleAddToCartClick()
        if(user){
            axios.post(route('carrito.store'), {
                articulo_id: articulo.id,
            }).then(response => {
                actualizarCantidadArticulos();
            }).catch(error => {
                console.log(error);
            });
        }else{
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            let articuloEncontrado = carrito.find(art => art.articulo_id === articulo.id);
            if (articuloEncontrado) {
                articuloEncontrado.cantidad++;
            } else {
                carrito.push({
                    id: articulo.id,
                    nombre: articulo.nombre,
                    precio: articulo.precio,
                    fotos:[{imagen: articulo.fotos[0].imagen}],
                    pivot: { cantidad: 1 },
                });
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCantidadArticulosCookies();
        }
    }

    return (
        <div className="border-2 border-solid  border-black  rounded-xl w-72 h-comp flex flex-col justify-between items-center">
            <div className="flex flex-col justify-center items-center">
                <img className='pb- mt-5' width="200px" height="200px" src={props.imagen}></img>
                <Link href={props.ruta} className='px-5 min-h-24 font-semibold text-lg'>{props.nombre}</Link>
                <p className='px-5 text-2xl pt-3  font-bold'>{props.precio}€</p>

            </div>
            <Boton onClick={añadirAlCarrito} tipo="submit" texto="AÑADIR AL CARRITO"></Boton>
        </div>
    );
}
