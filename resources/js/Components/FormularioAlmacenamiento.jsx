import { useState } from 'react';
import Boton from './Boton';

export default function FormularioAlmacenamiento({ marcas }) {
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

            <div name="placa base" className="min-h-screen">
                <form className="max-w-2xl mx-auto">

                    <div className="mb-5">
                        <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modelo</label>
                        <input type="number" id="precio" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Introduzca el nombre del componente" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción del producto</label>
                        <textarea id="descripcion" className="h-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Introduzca la descripcion del producto" required />
                    </div>
                    <div className="flex">
                        <div className="flex-initial mr-2 mb-5 w-1/3">
                            <label htmlFor="categoria" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio del producto</label>
                            <input type="number" id="puntuacion_servidor" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Introduzca un valor numerico" required />
                        </div>
                        <div className="flex-initial mr-2 mb-5 w-1/3">
                            <label htmlFor="categoria" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">¿Es SSD?</label>
                            <input type="checkbox" id="puntuacion_servidor" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                        </div>
                        <div className="flex-initial mb-5 w-1/3">
                            <label htmlFor="marca" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione la Marca del producto</label>
                            <select id="marca" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="">Marca</option>
                                {marcas.map((mar) => (
                                    <option key={mar.id} value={mar.id}> {mar.nombre} </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex-initial mr-2 mb-5 w-full">
                            <label htmlFor="puntuacion_gaming" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Almacenaminto(Gb)</label>
                            <input type="number" id="puntuacion_gaming" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Introduzca un valor numerico" min="1" requirec/>
                        </div>
                    </div>

                    <div className="mb-5">
                        <div className="flex">
                            <div className="mr-2 w-52 h-52">
                                <label htmlFor="imagen_pr" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen principal</label>
                                <input type="file" id="imagen_pr" onChange={handleImagenPrincipalChange} className="hidden" required/>
                                <label htmlFor="imagen_pr" className="cursor-pointer block bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {imagenPrincipal ? <img src={imagenPrincipal} alt="Imagen Principal" className="w-full h-auto" /> : "Seleccionar imagen"}
                                </label>
                            </div>
                            <div className="mr-2 w-52 h-52">
                                <label htmlFor="imagen_sec_1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen secundaria 1</label>
                                <input type="file" id="imagen_sec_1" onChange={handleImagenSec1Change} className="hidden" required/>
                                <label htmlFor="imagen_sec_1" className="cursor-pointer block bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {imagenSec1 ? <img src={imagenSec1} alt="Imagen Secundaria 1" className="w-full h-auto" /> : "Seleccionar imagen"}
                                </label>
                            </div>
                            <div className="mr-2 w-52 h-52">
                                <label htmlFor="imagen_sec_2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen secundaria 2</label>
                                <input type="file" id="imagen_sec_2" onChange={handleImagenSec2Change} className="hidden" required/>
                                <label htmlFor="imagen_sec_2" className="cursor-pointer block bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {imagenSec2 ? <img src={imagenSec2} alt="Imagen Secundaria 2" className="w-full h-auto" /> : "Seleccionar imagen"}
                                </label>
                            </div>
                        </div>
                    </div>
                    <Boton tipo="submit" texto="Crear Artículo"></Boton>
                </form>
            </div>
    );
}
