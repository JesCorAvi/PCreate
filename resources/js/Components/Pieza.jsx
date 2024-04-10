import { Link } from '@inertiajs/react';
import Boton from './Boton';

export default function Pieza({ active = false, classNameName = '', children, ...props }) {
    return (
        <div className="border-2 border-solid  border-black  rounded-xl w-72 h-96 flex flex-col justify-between items-center">
            <div className="flex flex-col justify-center items-center">
                <img className='pb-5 mt-5' width="200px" height="200px" src={props.imagen}></img>
                <Link href={props.ruta} className='px-5  font-semibold text-lg'>{props.nombre}</Link>
                <p className='px-5 text-2xl pt-3  font-bold'>{props.precio}</p>

            </div>
            <Boton tipo="submit" texto="AÑADIR AL CARRITO"></Boton>
        </div>
    );
}
