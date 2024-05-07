import { Head, Link, useForm } from '@inertiajs/react';
import Boton from '../../Boton';
import { useEffect, useState } from 'react';
import validation from '../../../validation.json';



export default function FormularioRam({ marcas, articulo  }) {
    const { data, setData, post, errors } = useForm({
        id: articulo.id,
        marca_id: articulo.marca_id,
        nombre: articulo.nombre,
        descripcion: articulo.descripcion,
        precio: articulo.precio,
        cantidad: JSON.parse(articulo.datos).cantidad,
        memoria: JSON.parse(articulo.datos).memoria,
        frecuencia: JSON.parse(articulo.datos).frecuencia,
        ddr: JSON.parse(articulo.datos).ddr,
        imagenpr: articulo.fotos.find(foto => foto.orden === 1)?.imagen,
        imagensec1: articulo.fotos.find(foto => foto.orden === 2)?.imagen,
        imagensec2: articulo.fotos.find(foto => foto.orden === 3)?.imagen,
        tipo: "RAM"
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
        post(route('articulo.update', data))
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
                </div>
                <div className="mb-5">
                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modelo</label>
                    <input
                        value={data.nombre}
                        validation={validation.nombre}
                        type="text"
                        name="nombre"
                        id="nombre"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Introduzca el nombre del componente"
                        required
                        onChange={(e) => setData('nombre', e.target.value)}
                        onBlur={(e) => validar(e.target)}
                    />
                    <p className="text-red-800 py-2">{errors.nombre && <div>{errors.nombre}</div>}</p>
                </div>
                <div className="mb-5">
                    <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción del producto</label>
                    <textarea
                        value={data.descripcion}
                        validation={validation.descripcion}

                        id="descripcion"
                        name="descripcion"
                        className="h-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Introduzca la descripcion del producto"
                        required
                        onChange={(e) => setData('descripcion', e.target.value)}
                        onBlur={(e) => validar(e.target)}
                    />
                    <p className="text-red-800 py-2">{errors.descripcion && <div>{errors.descripcion}</div>}</p>
                </div>
                <div className="flex">
                    <div className="flex-initial mr-2 mb-5 w-1/2">
                        <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio del producto</label>
                        <input
                            value={data.precio}
                            validation={validation.precio}

                            type="decimal"
                            name="precio"
                            id="precio"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="1"
                            onChange={(e) => setData('precio', e.target.value)}
                            onBlur={(e) => validar(e.target)}
                        />
                        <p className="text-red-800 py-2">{errors.precio && <div>{errors.precio}</div>}</p>
                    </div>
                    <div className="flex-initial mb-5 w-1/2">
                        <label htmlFor="marca" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione la Marca del producto</label>
                        <select
                            id="marca"
                            required
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
                        <label htmlFor="cantidad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número de módulos</label>
                        <input
                            value={data.cantidad}
                            validation={validation.cantidad}

                            type="number"
                            name="cantidad"
                            id="cantidad"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="1" max="8" required
                            onChange={(e) => setData('cantidad', e.target.value)}
                            onBlur={(e) => validar(e.target)}
                        />
                        <p className="text-red-800 py-2">{errors.cantidad && <div>{errors.cantidad}</div>}</p>
                    </div>
                    <div className="flex-initial mr-2 mb-5 w-1/2">
                        <label htmlFor="memoria" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total de memoria(En Gb)</label>
                        <input
                            value={data.memoria}
                            validation={validation.memoria}

                            type="decimal"
                            name="memoria"
                            id="memoria" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="1" max="512"
                            required
                            onChange={(e) => setData('memoria', e.target.value)}
                            onBlur={(e) => validar(e.target)}
                        />
                        <p className="text-red-800 py-2">{errors.memoria && <div>{errors.memoria}</div>}</p>
                    </div>

                </div>
                <div className="flex">

                    <div className="flex-initial mb-5 w-1/2">
                        <label htmlFor="frecuencia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Frecuencia(En Mhz)</label>
                        <input
                            value={data.frecuencia}
                            validation={validation.frecuencia}

                            type="number"
                            name="frecuencia"
                            id="frecuencia"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="1"
                            required
                            onChange={(e) => setData('frecuencia', e.target.value)}
                            onBlur={(e) => validar(e.target)}
                        />
                        <p className="text-red-800 py-2">{errors.frecuencia && <div>{errors.frecuencia}</div>}</p>
                    </div>
                    <div className="flex-initial mb-5 w-1/2">
                        <label htmlFor="tipo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Memoria DDR</label>
                        <input
                            value={data.ddr}
                            validation={validation.ddr}

                            type="number"
                            name="ddr"
                            id="ddr"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="3" max="5"
                            required
                            onChange={(e) => setData('ddr', e.target.value)}
                            onBlur={(e) => validar(e.target)}
                        />
                        <p className="text-red-800 py-2">{errors.ddr && <div>{errors.ddr}</div>}</p>
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
