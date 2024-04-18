import { Link, router } from '@inertiajs/react';
import Boton from './Boton';
import { useState } from 'react';



export default function Filtro({ categorias, marcas, filtrar }) {
    const [categoria, setCategoria] = useState(null);
    const [marca, setMarca] = useState(null);
    const [precioMinimo, setPrecioMinimo] = useState(null);
    const [precioMaximo, setPrecioMaximo] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        filtrar(categoria, marca, precioMinimo, precioMaximo);
    };
    return (
        <aside id="default-sidebar" className="hidden md:block xs:block pl-10 min-w-80 max-h-60" aria-label="Sidebar">
            <form action="" onSubmit={handleSubmit}>
            <h2 className="font-bold text-2xl">Categorias</h2>
            <div className="my-3 max-h-72 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <fieldset>
                    <ul className="space-y-2 font-medium">
                        {categorias.map((cat) => (
                            <li key={cat.id}>
                                <input value={cat.id} onChange={() => setCategoria(cat.id)}  name="componente" type="radio" />
                                <label className="items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">{cat.nombre}</label>
                            </li>
                        ))}
                    </ul>
                </fieldset>
            </div>
            <h2 className="font-bold text-2xl pb-3">Precio</h2>
            <div className="my-3 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <label htmlFor="">de  </label>
                <input type="text" name="precioMinimo" onChange={e => setPrecioMinimo(e.target.value)}  id=""  className="max-w-14 bg-black text-white rounded-md placeholder-white" placeholder='Min'  />
                <label htmlFor="">  a  </label>
                <input type="text" name="precioMaximo" onChange={e => setPrecioMaximo(e.target.value)}  id=""  className="max-w-14 bg-black text-white rounded-md placeholder-white" placeholder='Max'  />
            </div>
            <h2 className="font-bold text-2xl pb-3">Marcas</h2>
            <div className="my-3 max-h-72 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <fieldset>
                <ul className="space-y-2 font-medium">

                    {marcas.map((marc) => (
                        <li key={marc.id}>
                            <input value={marc.id} onChange={() => setMarca(marc.id)} name="marcas" type="radio"/>
                            <label className="items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">{marc.nombre}</label>
                        </li>
                    ))}
                </ul>
                </fieldset>
            </div>
                <Boton tipo="submit" texto="Filtrar"></Boton>
                </form>
            </aside>
    );
}
