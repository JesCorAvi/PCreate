import { Head, Link, useForm } from '@inertiajs/react';
import Boton from '../../Boton';
import { useEffect, useState } from 'react';
import validation from '../../../validation.json';


export default function FormularioPlaca({ sockets, marcas, articulo }) {
    const { data, setData, post } = useForm({
        id: articulo.id,
        socket_id: JSON.parse(articulo.datos).socket_id,
        marca_id: articulo.marca_id,
        nombre: articulo.nombre,
        descripcion: articulo.descripcion,
        precio: articulo.precio,
        slotsm2: JSON.parse(articulo.datos).slotsm2,
        slotsram: JSON.parse(articulo.datos).slotsram,
        ddrmax: JSON.parse(articulo.datos).ddrmax,
        mhzmax: JSON.parse(articulo.datos).mhzmax,
        clase: JSON.parse(articulo.datos).clase,
        imagenpr: articulo.fotos.find(foto => foto.orden === 1)?.imagen,
        imagensec1: articulo.fotos.find(foto => foto.orden === 2)?.imagen,
        imagensec2: articulo.fotos.find(foto => foto.orden === 3)?.imagen,
        tipo: "Placa base"
    });

    const [imagenes, setImagenes] = useState({
        imagenpr: null,
        imagensec1: null,
        imagensec2: null
    });

    useEffect(() => {
        // Pre-cargar las imágenes existentes
        setImagenes({
            imagenpr: articulo.fotos.find(foto => foto.orden === 1)?.imagen ? `/storage/uploads/articulos/${articulo.fotos.find(foto => foto.orden === 1)?.imagen}` : null,
            imagensec1: articulo.fotos.find(foto => foto.orden === 2)?.imagen ? `/storage/uploads/articulos/${articulo.fotos.find(foto => foto.orden === 2)?.imagen}` : null,
            imagensec2: articulo.fotos.find(foto => foto.orden === 3)?.imagen ? `/storage/uploads/articulos/${articulo.fotos.find(foto => foto.orden === 3)?.imagen}` : null
        });
    }, []);

    const handleImagenChange = (event, key) => {
        const file = event.target.files[0];
        setImagenes({
            ...imagenes,
            [key]: URL.createObjectURL(file)
        });
        setData(key, file);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('articulo.update', articulo.id, data));
    };

    return (

        <div name="placa base" className="min-h-screen">
            <form className="max-w-2xl mx-auto" onSubmit={submit}>
                <div className="mb-5">
                    <label htmlFor="socket" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Socket</label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="socket_id"
                        id="socket_id"
                        value={data.socket_id}
                        onChange={(e) => setData('socket_id', e.target.value)}
                        required
                    >
                        <option> Seleccione un Socket</option>
                        {sockets.map((soc) => (
                            <option
                                key={soc.id}
                                value={soc.id}>
                                {soc.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modelo</label>
                    <input
                        value={data.nombre}
                        pattern={validation.nombre}

                        type="text"
                        name="nombre"
                        id="nombre"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Introduzca el nombre del componente"
                        required
                        onChange={(e) => setData('nombre', e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción del producto</label>
                    <textarea
                        value={data.descripcion}
                        pattern={validation.descripcion}

                        id="descripcion"
                        name="descripcion"
                        className="h-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Introduzca la descripcion del producto"
                        required
                        onChange={(e) => setData('descripcion', e.target.value)}
                    />
                </div>
                <div className="flex">
                    <div className="flex-initial mr-2 mb-5 w-1/2">
                        <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio del producto</label>
                        <input
                            value={data.precio}
                            pattern={validation.precio}

                            type="decimal"
                            name="precio"
                            id="precio"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="1"
                            onChange={(e) => setData('precio', e.target.value)}
                        />

                    </div>
                    <div className="flex-initial mb-5 w-1/2">
                        <label htmlFor="marca" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione la Marca del producto</label>
                        <select
                            id="marca"
                            value={data.marca_id}
                            onChange={(e) => setData('marca_id', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option > Seleccione una marca</option>
                            {marcas.map((mar) => (
                                <option
                                    key={mar.id}
                                    value={mar.id}>
                                    {mar.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-initial mr-2 mb-5 w-1/2">
                        <label htmlFor="slotsm2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slots para M.2</label>
                        <input
                            value={data.slotsm2}
                            pattern={validation.slotsm2}

                            type="number"
                            name="slotsm2"
                            d="slotsm2"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="0" max="8" required
                            onChange={(e) => setData('slotsm2', e.target.value)}
                        />
                    </div>
                    <div className="flex-initial mr-2 mb-5 w-1/2">
                        <label htmlFor="slotsram" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slots para RAM</label>
                        <input
                            value={data.slotsram}
                            pattern={validation.slotsram}

                            type="number"
                            name="slotsram"
                            id="slotsram" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="0" max="8"
                            required
                            onChange={(e) => setData('slotsram', e.target.value)}
                        />
                    </div>

                </div>
                <div className="flex">

                    <div className="flex-initial mb-5 w-1/2">
                        <label htmlFor="ddrmax" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Soporta hasta DDR</label>
                        <input
                            value={data.ddrmax}
                            pattern={validation.ddrmax}

                            type="number"
                            name="ddrmax"
                            id="ddrmax"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="3" max="5"
                            required
                            onChange={(e) => setData('ddrmax', e.target.value)}
                        />
                    </div>
                    <div className="flex-initial mb-5 w-1/2">
                        <label htmlFor="mhzmax" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frecuencia max RAM(Mhz)</label>
                        <input
                            value={data.mhzmax}
                            pattern={validation.mhzmax}

                            type="number"
                            name="mhzmax"
                            id="mhzmax"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="0" max="10000"
                            required
                            onChange={(e) => setData('mhzmax', e.target.value)}
                        />
                    </div>

                </div>
                <div className="flex">

                    <div className="flex-initial mb-5 w-full">
                    <label htmlFor="clase" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Formato de placa</label>
                        <select
                            value={data.clase}
                            name="clase"
                            id="clase" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setData('clase', e.target.value)}
                            >
                            <option value="">Seleccione un tipo</option>
                            <option value="ATX">ATX</option>
                            <option value="Micro-ATX">Micro-ATX</option>
                        </select>

                    </div>

                </div>

                <div className="mb-5">
                    <div className="mb-5">
                        <div className="flex">
                            {['imagenpr', 'imagensec1', 'imagensec2'].map((key) => (
                                <div key={key} className="mr-2 w-52 h-52">
                                    <label htmlFor={key} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen {key === 'imagenpr' ? 'principal' : 'secundaria'}</label>
                                    <input
                                        type="file"
                                        name={key}
                                        id={key}
                                        className="hidden"
                                        onChange={(e) => handleImagenChange(e, key)}
                                    />
                                    <label htmlFor={key} className="cursor-pointer block bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {imagenes[key] ? <img src={imagenes[key]} alt={`Imagen ${key === 'imagenpr' ? 'principal' : 'secundaria'}`} className="w-full h-auto" /> : "Seleccionar imagen"}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Boton tipo="submit" texto="Editar Artículo"></Boton>
            </form>
        </div>
    );
}
