import { Link, router } from "@inertiajs/react";
import Boton from "./Boton";
import { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';


export default function Filtro({ categorias, marcas, filtrar }) {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    const isSmallScreen = useMediaQuery({ query: '(max-width: 1000px)' });

    useEffect(() => {
        if (!isSmallScreen && !plegado) {
            setPlegado(true);
        }
    }, [isSmallScreen]);

    const [categoria, setCategoria] = useState(
        getQueryParam("categoria") || ""
    );
    const [marca, setMarca] = useState(getQueryParam("marca") || "");
    const [precioMinimo, setPrecioMinimo] = useState(
        getQueryParam("precioMinimo") || ""
    );
    const [precioMaximo, setPrecioMaximo] = useState(
        getQueryParam("precioMaximo") || ""
    );
    const [plegado, setPlegado] = useState(true);

    const togglePlegado = () => {
        setPlegado(!plegado);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        filtrar(categoria, marca, precioMinimo, precioMaximo);
    };

    const borrarFiltros = () => {
        // Restablecer los estados de los filtros
        setCategoria("");
        setMarca("");
        setPrecioMinimo("");
        setPrecioMaximo("");

        // Borrar los parámetros de la URL
        window.history.pushState({}, "", window.location.pathname);

        // Actualizar los productos mostrados
        filtrar("", "", "", "");
    };

    return (
        <>
            <aside
                id="default-sidebar"
                className={`md:block ${plegado? 'hidden' : 'fixed top-[70px] left-0 w-full h-screen bg-white z-40 flex flex-col justify-start items-start p-4 transition duration-300 ease-in-out'} pl-10 min-w-80 overflow-y-auto`}
                aria-label="Sidebar"
            >

                <form action="" onSubmit={handleSubmit}>
                    <h2 className="font-bold text-2xl">Categorias</h2>
                    <div className="my-3 max-h-52 lg:max-h-72 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <fieldset>
                            <ul className="space-y-2 font-medium xs:max-w-42">
                                {categorias.map((cat) => (
                                    <li key={cat.id}>
                                        <input
                                            value={cat.id}
                                            checked={
                                                parseInt(categoria) === cat.id
                                            }
                                            onChange={() =>
                                                setCategoria(cat.id)
                                            }
                                            name="componente"
                                            type="radio"
                                        />
                                        <label className="items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            {cat.nombre}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </fieldset>
                    </div>
                    <h2 className="font-bold text-2xl pb-3">Precio</h2>
                    <div className="my-3 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <label htmlFor="">de </label>
                        <input
                            type="text"
                            value={precioMinimo}
                            name="precioMinimo"
                            onChange={(e) => setPrecioMinimo(e.target.value)}
                            id=""
                            className="max-w-14 bg-black text-white rounded-md placeholder-white"
                            placeholder="Min"
                        />
                        <label htmlFor=""> a </label>
                        <input
                            type="text"
                            value={precioMaximo}
                            name="precioMaximo"
                            onChange={(e) => setPrecioMaximo(e.target.value)}
                            id=""
                            className="max-w-14 bg-black text-white rounded-md placeholder-white"
                            placeholder="Max"
                        />
                    </div>
                    <h2 className="font-bold text-2xl pb-3">Marcas</h2>
                    <div className="my-3 max-h-52 lg:max-h-72 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <fieldset>
                            <ul className="space-y-2 font-medium">
                                {marcas.map((marc) => (
                                    <li key={marc.id}>
                                        <input
                                            value={marc.id}
                                            onChange={() => setMarca(marc.id)}
                                            checked={
                                                parseInt(marca) === marc.id
                                            }
                                            name="marcas"
                                            type="radio"
                                        />
                                        <label className="items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            {marc.nombre}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </fieldset>
                    </div>
                    <div className="block md:flex md:flex-col">
                        <Boton  tipo="submit" texto="Filtrar"></Boton>
                        <Boton
                            onClick={borrarFiltros}
                            texto="Borrar Filtros"
                        ></Boton>
                    </div>
                </form>
            </aside>
            <div className="md:hidden fixed bottom-5 right-24 z-50">
                <Boton tipo="button" onClick={togglePlegado} texto={plegado ? "Mostrar Filtro" : "Ocultar Filtro"} />
            </div>
        </>
    );
}
