import React, { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import Boton from "./Boton";

export default function FiltroPc({ filtrar }) {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 1000px)' });

    useEffect(() => {
        if (!isSmallScreen && !plegado) {
            setPlegado(true);
        }
    }, [isSmallScreen]);

    const [precioMinimo, setPrecioMinimo] = useState("");
    const [precioMaximo, setPrecioMaximo] = useState("");
    const [plegado, setPlegado] = useState(true);
    const [error, setError] = useState("");
    const [criterio, setCriterio] = useState("");

    const togglePlegado = () => {
        setPlegado(!plegado);
    };

    const validatePrices = () => {
        if (precioMinimo && precioMaximo && parseFloat(precioMinimo) > parseFloat(precioMaximo)) {
            setError("El precio mínimo debe ser menor o igual al precio máximo.");
        } else {
            setError("");
        }
    };

    useEffect(() => {
        validatePrices();
    }, [precioMinimo, precioMaximo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (error) {
            return;
        }
        filtrar(criterio, precioMinimo, precioMaximo);
    };

    const borrarFiltros = () => {
        setCriterio("");
        setPrecioMinimo("");
        setPrecioMaximo("");
        setError("");
        window.history.pushState({}, "", window.location.pathname);
        filtrar("", "", "");
    };

    const handleOrdenChange = (e) => {
        setCriterio(e.target.value);
    };

    return (
        <>
            <aside
                id="default-sidebar"
                className={`md:block ${plegado ? 'hidden' : 'fixed top-[70px] left-0 w-full h-screen bg-white z-40 flex flex-col justify-start items-start p-4 transition duration-300 ease-in-out'} lg:pl-10 min-w-80 overflow-y-auto`}
                aria-label="Sidebar"
            >
                <form className="px-20 lg:px-0" onSubmit={handleSubmit}>
                    <h2 className="text-center lg:text-left font-bold text-2xl pb-2">Filtrar por</h2>
                    <div className="my-3 overflow-y-auto flex flex-col gap-3 align-middle justify-center md:justify-start dark:bg-gray-800">
                        <div>
                            <select
                                id="orden"
                                value={criterio}
                                onChange={handleOrdenChange}
                            >
                                <option value="">Seleccionar</option>
                                <option value="calidadPrecio">Calidad/Precio</option>
                                <option value="potencia">Potencia</option>
                            </select>
                        </div>
                    </div>
                    <h2 className="text-center lg:text-left font-bold text-2xl py-2">Precio</h2>
                    <div className="my-3 overflow-y-auto flex gap-3 align-middle justify-center md:justify-start dark:bg-gray-800">
                        <label htmlFor="precioMinimo">de </label>
                        <input
                            type="text"
                            value={precioMinimo}
                            name="precioMinimo"
                            onChange={(e) => setPrecioMinimo(e.target.value)}
                            id="precioMinimo"
                            className="max-w-14 border-blue-800 text-blue-800 rounded-md placeholder-blue-800"
                            placeholder="Min"
                        />
                        <label htmlFor="precioMaximo"> a </label>
                        <input
                            type="text"
                            value={precioMaximo}
                            name="precioMaximo"
                            onChange={(e) => setPrecioMaximo(e.target.value)}
                            id="precioMaximo"
                            className="max-w-14 border-blue-800 text-blue-800 rounded-md placeholder-blue-800"
                            placeholder="Max"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex justify-center md:justify-start mt-5">
                        <Boton className="m-0" type="submit" color="blue-800" texto="Filtrar"></Boton>
                    </div>
                    <div className="flex justify-center md:justify-start mt-5">
                        <Boton className="m-0" type="button" color="gray-500" onClick={borrarFiltros} texto="Borrar filtros"></Boton>
                    </div>
                </form>
            </aside>
            <div className="md:hidden fixed bottom-5 right-24 z-50">
                <Boton tipo="button" onClick={togglePlegado} texto={plegado ? "Mostrar Filtro" : "Ocultar Filtro"} />
            </div>
        </>
    );
}
