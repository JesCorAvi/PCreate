import { useState } from 'react';
import Boton from './Boton';

export default function FormularioSocket({ categorias, marcas, active = false, classNameName = '', children, ...props }) {
    const [imagenPrincipal, setImagenPrincipal] = useState(null);
    const handleImagenPrincipalChange = (event) => {
        const file = event.target.files[0];
        setImagenPrincipal(URL.createObjectURL(file));
    };


    return (
        <div name="socket" className="min-h-screen">
            <form className="max-w-2xl mx-auto">
                <div className="mb-5">
                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Socket</label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <div name="imagen" className="flex justify-center items-center">
                    <div className="mr-2 w-96 h-96">
                        <label htmlFor="imagen_pr" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen principal</label>
                        <input type="file" id="imagen_pr" onChange={handleImagenPrincipalChange} className="hidden" required/>
                        <label htmlFor="imagen_pr" className="cursor-pointer block bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> {/* No se aplica flexbox aquí */}
                            {imagenPrincipal ? <img src={imagenPrincipal} alt="Imagen Principal" className="w-full h-auto" /> : "Seleccionar imagen"}
                        </label>
                    </div>
                </div>
                <Boton tipo="submit" texto="Crear Artículo"></Boton>
            </form>
        </div>
    );
}
