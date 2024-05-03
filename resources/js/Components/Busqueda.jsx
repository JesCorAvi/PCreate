import { useState } from "react";
import { Link, router } from '@inertiajs/react';


function Busqueda({ categorias }) {

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    const [categoria, setCategoria] = useState(
        getQueryParam("categoria") || ""
    );
    const [palabras, setPalabras] = useState(
        getQueryParam("palabras") || ""
    );
    const filtrar = (categoria, palabras) => {
        const params = {};
        if (categoria != "") {
            params.categoria = categoria;
        }
        if (palabras != "") {
            params.palabras = palabras;
        }

        router.get(route('articulo.index', params));

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        filtrar(categoria, palabras);
    };

    return (
        <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
            <div className="flex pt-3">
                <select
                    className="flex-shrink-0 z-10 inline-flex items-center py-2 px-6 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-black rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                >
                    <option value="">Categorias</option>
                    {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.nombre}
                        </option>
                    ))}
                </select>
                <div className="relative flex-grow">
                    <div className="flex">
                        <input
                            type="search"
                            id="search-dropdown"
                            className="block w-full xl:w-72 z-20 text-sm text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-black focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                            placeholder="¿Qué desea buscar?"
                            value={palabras}
                            onChange={(e) => setPalabras(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="p-2.5 text-sm font-medium h-full text-white bg-black rounded-r-lg border hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            <span className="sr-only">Buscar</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Busqueda;
