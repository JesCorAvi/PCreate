import { Link } from '@inertiajs/react';
import Filtro from '@/Components/Filtro';
import Pieza from '@/Components/Pieza';

export default function Productos({categorias,marcas, active = false, classNameName = '', children, ...props }) {
    return (
        <div className="flex min-h-screen">
            <Filtro categorias={categorias} marcas = {marcas}></Filtro>
            <div className="flex justify-center w-full pb-10">
                <section className='px-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16'>
                    <Pieza
                        nombre="Corsair Vengeance RGB Pro 32 GB (2 x 16 GB) DDR4 3600 MHz "
                        imagen = "http://127.0.0.1:8000/storage/uploads/piezas/grafica.png"
                        precio = "299.99"
                        ruta=""
                    >
                    </Pieza>
                    <Pieza
                        nombre="Corsair Vengeance RGB Pro 32 GB (2 x 16 GB) DDR4 3600 MHz "
                        imagen = "http://127.0.0.1:8000/storage/uploads/piezas/grafica.png"
                        precio = "299.99"
                        ruta=""
                    >
                    </Pieza>
                    <Pieza
                        nombre="Corsair Vengeance RGB Pro 32 GB (2 x 16 GB) DDR4 3600 MHz "
                        imagen = "http://127.0.0.1:8000/storage/uploads/piezas/grafica.png"
                        precio = "299.99"
                        ruta=""
                    >
                    </Pieza>
                    <Pieza
                        nombre="Corsair Vengeance RGB Pro 32 GB (2 x 16 GB) DDR4 3600 MHz "
                        imagen = "http://127.0.0.1:8000/storage/uploads/piezas/grafica.png"
                        precio = "299.99"
                        ruta=""

                    >
                    </Pieza>
                    <Pieza
                        nombre="Corsair Vengeance RGB Pro 32 GB (2 x 16 GB) DDR4 3600 MHz "
                        imagen = "http://127.0.0.1:8000/storage/uploads/piezas/grafica.png"
                        precio = "299.99"
                        ruta=""

                    >
                    </Pieza>
                    <Pieza
                        nombre="Corsair Vengeance RGB Pro 32 GB (2 x 16 GB) DDR4 3600 MHz "
                        imagen = "http://127.0.0.1:8000/storage/uploads/piezas/grafica.png"
                        precio = "299.99"
                        ruta=""

                    >
                    </Pieza>
                    <Pieza
                        nombre="Corsair Vengeance RGB Pro 32 GB (2 x 16 GB) DDR4 3600 MHz "
                        imagen = "http://127.0.0.1:8000/storage/uploads/piezas/grafica.png"
                        precio = "299.99"
                        ruta=""

                    >
                    </Pieza>
                </section>
            </div>
        </div>
    );
}
