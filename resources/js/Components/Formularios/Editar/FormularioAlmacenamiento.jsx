import { Head, Link, useForm } from '@inertiajs/react';
import Boton from '../../Boton';
import { useEffect, useState } from 'react';


export default function FormularioAlmacenamiento({ marcas, articulo }) {
    const { data, setData, post } = useForm({
        id: articulo.id,
        marca_id: articulo.marca_id,
        nombre: articulo.nombre,
        descripcion: articulo.descripcion,
        precio: articulo.precio,
        memoria: JSON.parse(articulo.datos).memoria,
        clase: JSON.parse(articulo.datos).clase,
        lectura: JSON.parse(articulo.datos).lectura,
        escritura: JSON.parse(articulo.datos).escritura,
        imagenpr: articulo.fotos.find(foto => foto.orden === 1)?.imagen,
        imagensec1: articulo.fotos.find(foto => foto.orden === 2)?.imagen,
        imagensec2: articulo.fotos.find(foto => foto.orden === 3)?.imagen,
        tipo: "Almacenamiento"
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
                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modelo</label>
                    <input
                        value={data.nombre}
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
                        <label htmlFor="nucleos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantidad de memoria(En Gb)</label>
                        <input
                            value={data.memoria}
                            type="number"
                            name="memoria"
                            id="memoria"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="0" required
                            onChange={(e) => setData('memoria', e.target.value)}
                        />
                    </div>
                    <div className="flex-initial mr-2 mb-5 w-1/2">
                        <label htmlFor="clase" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de almacenamiento</label>
                        <select
                            value={data.clase}
                            name="clase"
                            id="clase" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setData('clase', e.target.value)}
                        >
                            <option value="">Seleccione un tipo</option>
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
                            value={data.escritura}
                            type="number"
                            name="escritura"
                            id="escritura"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="1"
                            required
                            onChange={(e) => setData('escritura', e.target.value)}
                        />
                    </div>
                    <div className="flex-initial mb-5 w-1/2">
                        <label htmlFor="lectura" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Velocidad de lectura(en Mb/s)</label>
                        <input
                            value={data.lectura}
                            type="number"
                            name="lectura"
                            id="lectura"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Introduzca un valor numerico"
                            min="1"
                            required
                            onChange={(e) => setData('lectura', e.target.value)}
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
