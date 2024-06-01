import React, { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import Boton from "./Boton";

// Function to get query parameter and handle array notation
function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};

    for (let [key, value] of urlParams.entries()) {
        // Check if the key contains array notation
        const match = key.match(/(.+)\[(\d+)\]/);
        if (match) {
            const arrayKey = match[1];
            const index = parseInt(match[2]);

            if (!params[arrayKey]) {
                params[arrayKey] = [];
            }
            params[arrayKey][index] = parseInt(value);
        } else {
            params[key] = value;
        }
    }

    return params;
}

export default function FiltroPc({ filtrar, sockets }) {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 1000px)' });
    const queryParams = getQueryParams();

    const [precioMinimo, setPrecioMinimo] = useState(queryParams.precioMinimo || "");
    const [precioMaximo, setPrecioMaximo] = useState(queryParams.precioMaximo || "");
    const [plegado, setPlegado] = useState(true);
    const [error, setError] = useState("");
    const [criterio, setCriterio] = useState(queryParams.criterio || "");
    const [selectedSockets, setSelectedSockets] = useState(queryParams.sockets || []);

    useEffect(() => {
        if (!isSmallScreen && !plegado) {
            setPlegado(true);
        }
    }, [isSmallScreen]);

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

    const handleSocketChange = (e) => {
        const socketId = parseInt(e.target.value);
        setSelectedSockets(prevState =>
            prevState.includes(socketId)
                ? prevState.filter(id => id !== socketId)
                : [...prevState, socketId]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (error) {
            return;
        }
        filtrar(criterio, precioMinimo, precioMaximo, selectedSockets);
    };

    const borrarFiltros = () => {
        setCriterio("");
        setPrecioMinimo("");
        setPrecioMaximo("");
        setError("");
        setSelectedSockets([]);
        window.history.pushState({}, "", window.location.pathname);
        filtrar("", "", "", []);
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
                    <h2 className="text-center lg:text-left font-bold text-2xl pb-2">Ordenar por</h2>
                    <div className="my-3 overflow-y-auto flex flex-col gap-3 align-middle justify-center md:justify-start dark:bg-gray-800">
                        <div>
                            <select
                                className="border-blue-800 text-blue-800 rounded-md w-52"
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
                    <h2 className="text-center lg:text-left font-bold text-2xl pb-2">Sockets</h2>
                    <div className="my-3 max-h-52 lg:max-h-72 overflow-y-auto dark:bg-gray-800">
                        <fieldset className="p-2">
                            <ul className="space-y-2 font-medium xs:max-w-42">
                                {sockets.map((socket) => (
                                    <li key={socket.id}>
                                        <input
                                            value={socket.id}
                                            name="sockets"
                                            type="checkbox"
                                            checked={selectedSockets.includes(socket.id)}
                                            onChange={handleSocketChange}
                                        />
                                        <label className="items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group">
                                            {socket.nombre}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </fieldset>
                    </div>
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
