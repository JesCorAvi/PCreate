import { Head, Link, useForm } from '@inertiajs/react';
import Boton from '../../Boton';
import { useEffect, useState } from 'react';
import validation from '../../../validation.json';

export default function FormularioPlaca({ sockets, marcas }) {
    const { data, setData, post, errors, setError, clearErrors } = useForm({
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

    function validar(target){
        if (target.validity.valid) {
            target.classList.remove('border-red-500');
            clearErrors(target.name);
        } else {
            target.classList.add('border-red-500');
            let errorMessage = '';
            if (target.validity.valueMissing) {
                errorMessage = 'Este campo es requerido';
            } else if (target.validity.patternMismatch) {
                errorMessage = 'Formato incorrecto';
            } else if (target.validity.tooLong) {
                errorMessage = `Máximo ${target.maxLength} caracteres`;
            }
            setError(target.name, errorMessage);
        }
    };

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
                        onBlur={(e) => validar(e.target)}
                        required
                    >
                        <option disabled value="">Seleccione un Socket</option>
                        {sockets.map((soc) => (
                            <option key={soc.id} value={soc.id}>{soc.nombre}</option>
                        ))}
                    </select>
                    {errors.socket_id && <p className="text-red-800 py-2">{errors.socket_id}</p>}
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
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Introduzca el nombre del componente"
                        onChange={(e) => setData('nombre', e.target.value)}
                        onBlur={(e) => validar(e.target)}
                    />
                    {errors.nombre && <p className="text-red-800 py-2">{errors.nombre}</p>}
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
                    {errors.descripcion && <p className="text-red-800 py-2">{errors.descripcion}</p>}
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
                        {errors.precio && <p className="text-red-800 py-2">{errors.precio}</p>}
                    </div>
                    <div className="flex-initial mb-5 w-1/2">
                        <label htmlFor="marca" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione la Marca del producto</label>
                        <select
                            value={data.marca_id}
                            selected
                            id="marca"
                            required
                            onChange={(e) => setData('marca_id', e.target.value)}
                            onBlur={(e) => validar(e.target)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option disabled value="">Seleccione una marca</option>
                            {marcas.map((mar) => (
                                <option key={mar.id} value={mar.id}>{mar.nombre}</option>
                            ))}
                        </select>
                        {errors.marca_id && <p className="text-red-800 py-2">{errors.marca_id}</p>}
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-initial mr-2 mb-5 w-1/2">
                        <label htmlFor="slotsm2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slots para M.2</label>
                        <input
                            value={data.slotsm2}
                            type="number"
                            name="slotsm2"
                            id="slotsm2"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="0" max="8" required
                            onChange={(e) => setData('slotsm2', e.target.value)}
                            onBlur={(e) => validar(e.target)}
                        />
                        {errors.slotsm2 && <p className="text-red-800 py-2">{errors.slotsm2}</p>}
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
                        {errors.slotsram && <p className="text-red-800 py-2">{errors.slotsram}</p>}
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
                        {errors.ddrmax && <p className="text-red-800 py-2">{errors.ddrmax}</p>}
                    </div>
                    <div className="flex-initial mb-5 w-1/2">
                        <label htmlFor="mhzmax" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frecuencia max RAM (Mhz)</label>
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
                            onBlur={(e) => validar(e.target)}
                        />
                        {errors.mhzmax && <p className="text-red-800 py-2">{errors.mhzmax}</p>}
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
                            onBlur={(e) => validar(e.target)}
                        >
                            <option disabled value="">Seleccione un tipo</option>
                            <option value="ATX">ATX</option>
                            <option value="Micro-ATX">Micro-ATX</option>
                        </select>
                        {errors.clase && <p className="text-red-800 py-2">{errors.clase}</p>}
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
                            {errors.imagenpr && <p className="text-red-800 py-2">{errors.imagenpr}</p>}
                            {errors.imagensec1 && <p className="text-red-800 py-2">{errors.imagensec1}</p>}
                            {errors.imagensec2 && <p className="text-red-800 py-2">{errors.imagensec2}</p>}
                        </div>
                    </div>
                </div>
                <Boton tipo="submit" texto="Crear Artículo"></Boton>
            </form>
        </div>
    );
}
