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
        <>
            <div className="flex min-h-screen">
                <Filtro categorias={categorias} marcas={marcas}></Filtro>
                <div className="flex justify-center w-full pb-10">
                    <section className='px-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16'>
                        {articulos.data.map(art => (
                            <Pieza
                                key={art.id}
                                nombre={acortar(art.nombre, 50)}
                                imagen={"http://127.0.0.1:8000/storage/uploads/articulos/" + art.fotos.find(foto => foto.orden === 0)?.imagen}
                                precio={art.precio}
                                ruta={route("articulos.show", { id: art.id })}
                            />

                        ))}
                    </section>

                </div>

            </div>
            <nav className="flex items-center justify-between pt-4 max-w-60">
                {articulos.prev_page_url && (
                    <Link className="px-3 py-2 rounded bg-black text-white" href={articulos.prev_page_url} > Anterior</Link>
                )}
                <div>
                    {articulos.links.map((link, index) => (
                        <Link key={index} className={`mx-1 px-3 py-2 rounded ${link.active ? 'bg-black text-white' : 'text-black'}`} href={link.url}>{link.label}</Link>
                    ))}
                </div>
                {articulos.next_page_url && (
                    <Link className="px-3 py-2 rounded bg-black text-white" href={articulos.next_page_url}>Siguiente </Link>
                )}
            </nav>
        </>
    );
}
