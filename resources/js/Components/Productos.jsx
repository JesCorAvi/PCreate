import { Link } from '@inertiajs/react';
import Filtro from '@/Components/Filtro';
import Pieza from '@/Components/Pieza';

export default function Productos({ articulos, categorias, marcas, active = false, classNameName = '', children, ...props }) {
    function acortar(cadena, longitud) {
        if (cadena.length <= longitud) {
            return cadena; // Devuelve la cadena original si es igual o menor que la longitud especificada
        } else {
            return cadena.substring(0, longitud) + '...'; // Acorta la cadena y añade puntos suspensivos
        }
    }
    return (
        <div className="flex min-h-screen">
            <Filtro categorias={categorias} marcas={marcas}></Filtro>
            <div className="flex justify-center w-full pb-10">
                <section className='px-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16'>
                    {articulos.map(art => (
                            <Pieza
                                key={art.id}
                                nombre={acortar(art.nombre, 50)}
                                imagen={"http://127.0.0.1:8000/storage/uploads/articulos/" +  art.fotos[0].imagen}
                                precio={art.precio}
                                ruta={route("articulos.show", { id: art.id })}
                            />

                    ))}
                </section>
            </div>
        </div>
    );
}
