import { useState } from 'react';

export default function CrearProducto({ categorias, marcas, active = false, classNameName = '', children, ...props }) {
    const [imagenPrincipal, setImagenPrincipal] = useState(null);
    const [imagenSec1, setImagenSec1] = useState(null);
    const [imagenSec2, setImagenSec2] = useState(null);

    const handleImagenPrincipalChange = (event) => {
        const file = event.target.files[0];
        setImagenPrincipal(URL.createObjectURL(file));
    };

    const handleImagenSec1Change = (event) => {
        const file = event.target.files[0];
        setImagenSec1(URL.createObjectURL(file));
    };

    const handleImagenSec2Change = (event) => {
        const file = event.target.files[0];
        setImagenSec2(URL.createObjectURL(file));
    };

    return (
        <div className="min-h-screen">

            <form className="max-w-2xl mx-auto">
                <div className="mb-5">
                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del componente</label>
                    <input type="text" id="nombre" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Introduzca el nombre del componente" required />
                </div>
                <div className="mb-5">
                    <div className="flex">
                        <div className="mr-2 w-52 h-52">
                            <label htmlFor="imagen_pr" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen principal</label>
                            <input type="file" id="imagen_pr" onChange={handleImagenPrincipalChange} className="hidden" />
                            <label htmlFor="imagen_pr" className="cursor-pointer block bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {imagenPrincipal ? <img src={imagenPrincipal} alt="Imagen Principal" className="w-full h-auto" /> : "Seleccionar imagen"}
                            </label>
                        </div>
                        <div className="mr-2 w-52 h-52">
                            <label htmlFor="imagen_sec_1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen secundaria 1</label>
                            <input type="file" id="imagen_sec_1" onChange={handleImagenSec1Change} className="hidden" />
                            <label htmlFor="imagen_sec_1" className="cursor-pointer block bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {imagenSec1 ? <img src={imagenSec1} alt="Imagen Secundaria 1" className="w-full h-auto" /> : "Seleccionar imagen"}
                            </label>
                        </div>
                        <div className="mr-2 w-52 h-52">
                            <label htmlFor="imagen_sec_2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen secundaria 2</label>
                            <input type="file" id="imagen_sec_2" onChange={handleImagenSec2Change} className="hidden" />
                            <label htmlFor="imagen_sec_2" className="cursor-pointer block bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {imagenSec2 ? <img src={imagenSec2} alt="Imagen Secundaria 2" className="w-full h-auto" /> : "Seleccionar imagen"}
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <select name="categoria" id="categoria">
                        <option value="">Categorias</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}> {cat.nombre} </option>
                        ))}
                    </select>
                    <select name="marca" id="marca">
                        <option value="">Marca</option>
                        {marcas.map((mar) => (
                            <option key={mar.id} value={mar.id}> {mar.nombre} </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear artículo</button>
            </form>

        </div>
    );
}
