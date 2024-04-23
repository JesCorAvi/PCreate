import { Head, Link, useForm } from '@inertiajs/react';
import Boton from '../../Boton';
import { useEffect, useState } from 'react';
import validation from '../../../validation.json';

export default function FormularioFuente({ marcas }) {
    const { data, setData, post } = useForm({
        marca_id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        poder: '',
        imagenpr: null,
        imagensec1: null,
        imagensec2: null,
        tipo: "Fuente de alimentación"
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

        <div  className="min-h-screen">
            <form className="max-w-2xl mx-auto" onSubmit={submit}>
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
                        onBlur={(e) => validar(e.target)}
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
                        onBlur={(e) => validar(e.target)}
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
                            onBlur={(e) => validar(e.target)}
                        />

                    </div>
                    <div className="flex-initial mb-5 w-1/2">
                        <label htmlFor="marca" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione la Marca del producto</label>
                        <select
                            value={data.marca_id}
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
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-initial mr-2 mb-5 w-full">
                        <label htmlFor="poder" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capacidad de alimentación(en W)</label>
                        <input
                            value={data.poder}
                            pattern={validation.poder}
                            type="number"
                            name="poder"
                            id="poder"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="0"
                            required
                            onChange={(e) => setData('poder', e.target.value)}
                            onBlur={(e) => validar(e.target)}
                        />
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
                    </div>
                </div>
                <Boton tipo="submit" texto="Crear Artículo"></Boton>
            </form>
        </div>
    );
}
