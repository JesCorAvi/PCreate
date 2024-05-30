import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import { Head, Link } from '@inertiajs/react';
import Pieza from '@/Components/Pieza';
import ArticulosSlider from '@/Components/ArticulosSlider';

export default function Index({ auth, categorias, articulos }) {
    return (
        <>
        <LayoutLogueado
            user={auth.user}
            categorias={categorias}
        >
                    </LayoutLogueado>

            <Head title="Inicio" />

            <div className="pt-12">
                <Link href={"/configurador/crear"} className="w-all pt-3">
                    <picture>
                        <source media="(min-width: 1030px)" srcSet="http://127.0.0.1:8000/assets/carrousel.png" />
                        <source media="(min-width: 1024px)" srcSet="http://127.0.0.1:8000/assets/carrouselmd.png" />
                        <source media="(min-width: 420px)" srcSet="http://127.0.0.1:8000/assets/carrouselsm.png" />
                        <img src="http://127.0.0.1:8000/assets/carrousel.png" alt="Carrousel" />
                    </picture>
                </Link>
                <div className="w-all p-10">
                    <h2 className='text-center font-semibold text-3xl'>
                        Explore nuestros productos
                    </h2>
                    <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 xl:gap-8 w-full max-w-5xl mx-auto pt-5">
                        {categorias.slice(1).map((categoria, index) => (
                            <Link key={index} href={'/tienda?categoria='+categoria.id} className="border-2 hover:border-purple-800 flex flex-col items-center rounded-lg shadow-lg h-auto p-2 lg:p-4 xl:p-6 w-full">
                                <img src={"http://127.0.0.1:8000/assets/default" + (categoria.id - 1) + ".png"} alt={categoria.nombre} className="w-28 h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36" />
                                <p className="text-center text-lg font-semibold">{categoria.nombre}</p>
                            </Link>
                        ))}
                    </div>
                </div >
                <div className='bg-black w-all pt-5'>
                    <h2 className='text-center font-semibold text-3xl text-white'>
                        Nuevos componentes
                    </h2>
                <div>
                    <ArticulosSlider articulos={articulos} />
                </div>
                </div>
            </div>
            <Footer />
            </>
    );
}
