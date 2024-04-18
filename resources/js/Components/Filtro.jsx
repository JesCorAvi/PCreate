import { Link } from '@inertiajs/react';
import Boton from './Boton';


export default function Filtro({ categorias, marcas, filtrar, resetear }) {
    const resetFiltros = () => {
        const inputs = document.querySelectorAll('aside input');
        inputs.forEach(input => {
            if (input.type === 'text') {
                input.value = '';
            } else if (input.type === 'radio') {
                input.checked = false;
            }
        });
        resetear();
    }
    return (
        <aside id="default-sidebar" className="hidden md:block xs:block pl-10 min-w-80 max-h-60" aria-label="Sidebar">
            <h2 className="font-bold text-2xl">Categorias</h2>
            <div className="my-3 max-h-72 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <fieldset>
                    <ul className="space-y-2 font-medium">
                        {categorias.map((cat) => (
                            <li key={cat.id}>
                                <input value={cat.id} name="componente" type="radio" onChange={() => {filtrar(cat.id, null, null, null)}} />
                                <label className="items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">{cat.nombre}</label>
                            </li>
                        ))}
                    </ul>
                </fieldset>
            </div>
            <h2 className="font-bold text-2xl pb-3">Precio</h2>
            <div className="my-3 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <label htmlFor="">de  </label>
                <input type="text" name="precioMinimo" id="" onBlur={(e) =>{filtrar(null, null, e.target.value, null)}} className="max-w-14 bg-black text-white rounded-md placeholder-white" placeholder='Min'  />
                <label htmlFor="">  a  </label>
                <input type="text" name="precioMaximo" id="" onBlur ={(e) =>{filtrar(null, null, null, e.target.value)}} className="max-w-14 bg-black text-white rounded-md placeholder-white" placeholder='Max'  />
            </div>
            <h2 className="font-bold text-2xl pb-3">Marcas</h2>
            <div className="my-3 max-h-72 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <fieldset>
                <ul className="space-y-2 font-medium">

                    {marcas.map((marc) => (
                        <li key={marc.id}>
                            <input value={marc.id} name="marcas" type="radio" onChange={() =>{filtrar(null, marc.id, null, null)}}/>
                            <label className="items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">{marc.nombre}</label>
                        </li>
                    ))}
                </ul>
                </fieldset>
            </div>
                <Boton texto="Borrar filtros" onClick={resetFiltros}></Boton>
            </aside>
    );
}
