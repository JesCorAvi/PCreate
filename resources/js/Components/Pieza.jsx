import { Link } from '@inertiajs/react';
import Boton from './Boton';
import useCarritoStore from '../carritoStore';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';


export default function Pieza({ user, active = false, className = '', handleAddToCartClick, children, ...props }) {
    console.log(props.estrellas, props.valoraciones)
    const { actualizarCantidadArticulos } = useCarritoStore((state) => state);
    const { actualizarCantidadArticulosCookies } = useCarritoStore((state) => state);

    function añadirAlCarrito() {
        handleAddToCartClick()
        if (user) {
            axios.post(route('carrito.store'), {
                articulo_id: props.id,
            }).then(response => {
                actualizarCantidadArticulos();
            }).catch(error => {
                console.log(error);
            });
        } else {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            let articuloEncontrado = carrito.find(art => art.id === props.id);
            if (articuloEncontrado) {
                articuloEncontrado.pivot.cantidad++;
            } else {
                carrito.push({
                    id: props.id,
                    nombre: props.nombre,
                    precio: props.precio,
                    fotos: [{ imagen: props.imagen }],
                    pivot: { cantidad: 1 },
                });
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCantidadArticulosCookies();
        }
    }

    return (
        <div  className={"bg-white border-2 border-solid border-white shadow-2xl  hover:border-purple-800  rounded-xl w-72 h-comp flex flex-col justify-between items-center "+ className}>
            <Link href={props.ruta}
                className={"flex flex-col justify-center items-center" }>
                <img className='pb- mt-5' width="200px" height="200px" src={"/storage/uploads/articulos/" + props.imagen}></img>
                <div className='flex'>
                    {[...Array(5)].map((star, index) => {
                        const starValue = index + 1;
                        return (
                            <span key={starValue}
                                className='text-purple-800'
                            >
                                {starValue <= props.estrellas ? <StarIcon /> : <StarBorderIcon className="text-gray-400" />}
                            </span>
                        );
                    })}<p className='text-purple-800 font-semibold'>{props.valoraciones} valoraciones</p>
                        </div>
                <p  className='px-5 min-h-24 font-semibold text-lg'>{props.nombre}</p>
                <p className='px-5 text-2xl pt-3  font-bold'>{props.precio}€</p>

            </Link>
            <Boton onClick={añadirAlCarrito} tipo="submit" texto="AÑADIR AL CARRITO"></Boton>
        </div>
    );
}
