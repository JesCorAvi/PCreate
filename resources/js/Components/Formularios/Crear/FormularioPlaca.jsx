import { Head, Link, useForm } from '@inertiajs/react';
import Boton from '../../Boton';
import { useEffect, useState } from 'react';
import validation from '../../../validation.json';

export default function FormularioPlaca({ sockets, marcas }) {
    const { data, setData, post, errors } = useForm({
        socket_id: '',
        categoria_id: '1',
        marca_id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        slotsm2: '',
        slotsram: '',
        ddrmax: '',
        mhzmax: '',
        clase: '',
        imagenpr: null,
        imagensec1: null,
        imagensec2: null,
        tipo: "Placa base"
    });

    const [imagenes, setImagenes] = useState({
        imagenpr: null,
        imagensec1: null,
        imagensec2: null
    });

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
        post(route('articulo.store', data))
    };
     function validar(target)    {
        if (target.validity.valid) {
            target.classList.remove('border-red-500');
        } else {
            target.classList.add('border-red-500');
        }
    }

    return (

        <div name="placa base" className="min-h-screen">
            <form className="max-w-2xl mx-auto" onSubmit={submit}>
                <div className="mb-5">
                    <label htmlFor="socket" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Socket</label>
                    <select
                        value={data.socket_id}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="socket_id"
                        onChange={(e) => setData('socket_id', e.target.value)}
                        required
                    >
                        <option disabled  value=""> Seleccione un Socket</option>
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
                        pattern={validation.nombre}
                        maxLength="120"
                        value={data.nombre}
                        type="text"
                        name="nombre"
                        id="nombre"

                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Introduzca el nombre del componente"
                        onChange={(e) => setData('nombre', e.target.value)}
                        onBlur={(e) => validar(e.target)}
                    />
                    <p className="text-red-800 py-2">{errors.nombre && <div>{errors.nombre}</div>}</p>
                </div>
                <div className="mb-5">
                    <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción del producto</label>
                    <textarea
                        value={data.descripcion}
                        pattern={validation.descripcion}
                        id="descripcion"
                        name="descripcion"
                        required
                        className="h-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Introduzca la descripcion del producto"
                        onChange={(e) => setData('descripcion', e.target.value)}
                        onBlur={(e) => validar(e.target)}
                    />
                    <p className="text-red-800 py-2">{errors.descripcion && <div>{errors.descripcion}</div>}</p>
                </div>
                <div className="flex">
                    <div className="flex-initial mr-2 mb-5 w-1/2">
                        <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio del producto</label>
                        <input
                            pattern="^\d*\.?\d*$"
                            value={data.precio}
                            type="decimal"
                            name="precio"
                            id="precio"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            onChange={(e) => setData('precio', e.target.value)}
                            onBlur={(e) => validar(e.target)}
                        />
                    <p className="text-red-800 py-2">{errors.precio && <div>{errors.precio}</div>}</p>

                    </div>
                    <div className="flex-initial mb-5 w-1/2">
                        <label htmlFor="marca" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione la Marca del producto</label>
                        <select
                            value={data.marca_id}
                            selected
                            id="marca"
                            required
                            onChange={(e) => setData('marca_id', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >

                            <option disabled  value=""> Seleccione una marca</option>
                            {marcas.map((mar) => (
                                <option
                                    key={mar.id}
                                    value={mar.id}>
                                    {mar.nombre}
                                </option>
                            ))}
                        </select>
                        <p className="text-red-800 py-2">{errors.marca && <div>{errors.marca}</div>}</p>

                    </div>
                </div>
                <div className="flex">
                    <div className="flex-initial mr-2 mb-5 w-1/2">
                        <label htmlFor="slotsm2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slots para M.2</label>
                        <input
                            value={data.slotsm2}
                            type="number"
                            name="slotsm2"
                            d="slotsm2"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="0" max="8" required
                            onChange={(e) => setData('slotsm2', e.target.value)}
                            onBlur={(e) => validar(e.target)}
                        />
                        <p className="text-red-800 py-2">{errors.slotsm2 && <div>{errors.slotsm2}</div>}</p>

                    </div>
                    <div className="flex-initial mr-2 mb-5 w-1/2">
                        <label htmlFor="slotsram" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slots para RAM</label>
                        <input
                            value={data.slotsram}
                            type="number"
                            name="slotsram"
                            id="slotsram" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="0" max="8"
                            required
                            onChange={(e) => setData('slotsram', e.target.value)}
                            onBlur={(e) => validar(e.target)}
                        />
                        <p className="text-red-800 py-2">{errors.slotsram && <div>{errors.slotsram}</div>}</p>
                    </div>

                </div>
                <div className="flex">

                    <div className="flex-initial mb-5 w-1/2">
                        <label htmlFor="ddrmax" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Soporta hasta DDR</label>
                        <input
                            value={data.ddrmax}
                            type="number"
                            name="ddrmax"
                            id="ddrmax"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="3" max="5"
                            required
                            onChange={(e) => setData('ddrmax', e.target.value)}
                            onBlur={(e) => validar(e.target)}
                        />
                        <p className="text-red-800 py-2">{errors.ddrmax && <div>{errors.ddrmax}</div>}</p>
                    </div>
                    <div className="flex-initial mb-5 w-1/2">
                        <label htmlFor="mhzmax" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frecuencia max RAM(Mhz)</label>
                        <input
                            value={data.mhzmax}
                            type="number"
                            name="mhzmax"
                            id="mhzmax"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="0" max="10000"
                            required
                            onChange={(e) => setData('mhzmax', e.target.value)}

                        />
                        <p className="text-red-800 py-2">{errors.mhzmax && <div>{errors.mhzmax}</div>}</p>

                    </div>

                </div>
                <div className="flex">

                    <div className="flex-initial mb-5 w-full">
                    <label htmlFor="clase" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Formato de placa</label>
                        <select
                            required
                            value={data.clase}
                            name="clase"
                            id="clase" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setData('clase', e.target.value)}
                            >
                            <option disabled  value="">Seleccione un tipo</option>
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
                                        required
                                        onChange={(e) => handleImagenChange(e, key)}
                                    />
                                    <label htmlFor={key} className="cursor-pointer block bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {imagenes[key] ? <img src={imagenes[key]} alt={`Imagen ${key === 'imagenpr' ? 'principal' : 'secundaria'}`} className="w-full h-auto" /> : "Seleccionar imagen"}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="flex">
                            <p className="text-red-800 py-2">{errors.imagenpr && <div>{errors.imagenpr}</div>}</p>
                            <p className="text-red-800 py-2">{errors.imagensec1 && <div>{errors.imagensec1}</div>}</p>
                            <p className="text-red-800 py-2">{errors.imagensec2 && <div>{errors.imagensec2}</div>}</p>
                        </div>
                    </div>
                </div>
                <Boton tipo="submit" texto="Crear Artículo"></Boton>
            </form>
        </div>
    );
}
