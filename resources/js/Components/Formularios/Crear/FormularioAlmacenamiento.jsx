import { Head, Link, useForm } from '@inertiajs/react';
import Boton from '../../Boton';
import { useEffect, useState } from 'react';
import validation from '../../../validation.json';



export default function FormularioAlmacenamiento({ sockets, marcas }) {
    const { data, setData, post, errors, setError, clearErrors } = useForm({
        socket_id: '',
        marca_id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        memoria: '',
        clase: "",
        imagenpr: null,
        imagensec1: null,
        imagensec2: null,
        tipo: "Almacenamiento"
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
                        required
                        onBlur={(e) => validar(e.target)}
                        onChange={(e) => setData('nombre', e.target.value)}
                    />
                    <p className="text-red-800 py-2">{errors.nombre && <div>{errors.nombre}</div>}</p>
                </div>
                <div className="mb-5">
                    <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción del producto</label>
                    <textarea
                        pattern={validation.descripcion}
                        value={data.descripcion}
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
                            pattern={validation.precio}
                            value={data.precio}
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
                            required
                            id="marca"
                            value={data.marca_id}
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
                    <div className="flex-initial mr-2 mb-5 w-1/2">
                        <label htmlFor="memoria" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantidad de memoria(En Gb)</label>
                        <input
                            pattern={validation.memoria}
                            value={data.memoria}
                            type="number"
                            name="memoria"
                            id="memoria"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="0"  required
                            onChange={(e) => setData('memoria', e.target.value)}
                            onBlur={(e) => validar(e.target)}
                        />
                        <p className="text-red-800 py-2">{errors.memoria && <div>{errors.memoria}</div>}</p>
                    </div>
                    <div className="flex-initial mr-2 mb-5 w-1/2">
                        <label htmlFor="clase" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de almacenamiento</label>
                        <select
                            value={data.clase}
                            required
                            name="clase"
                            id="clase" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setData('clase', e.target.value)}
                            >
                            <option disabled  value="">Seleccione un tipo</option>
                            <option value="Mecánico">Mecánico</option>
                            <option value="SSD Sata">SSD Sata</option>
                            <option value="SSD M.2">SSD M.2</option>
                        </select>

                    </div>
                </div>
                <div className="flex">
                    <div className="flex-initial mb-5 w-1/2">
                        <label htmlFor="escritura" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Velocidad de escritura(en Mb/s)</label>
                        <input
                            pattern={validation.escritura}
                            value={data.escritura}
                            type="number"
                            name="escritura"
                            id="escritura"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="1"
                            required
                            onChange={(e) => setData('escritura', e.target.value)}
                            onBlur={(e) => validar(e.target)}
                        />
                        <p className="text-red-800 py-2">{errors.escritura && <div>{errors.escritura}</div>}</p>
                    </div>
                    <div className="flex-initial mb-5 w-1/2">
                        <label htmlFor="lectura" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Velocidad de lectura(en Mb/s)</label>
                        <input
                            pattern={validation.lectura}
                            value={data.lectura}
                            type="number"
                            name="lectura"
                            id="lectura"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="1"
                            required
                            onChange={(e) => setData('lectura', e.target.value)}
                            onBlur={(e) => validar(e.target)}
                        />
                        <p className="text-red-800 py-2">{errors.lectura && <div>{errors.lectura}</div>}</p>
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
