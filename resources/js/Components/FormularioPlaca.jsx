import { Head, Link, useForm } from '@inertiajs/react';
import Boton from './Boton';

export default function FormularioPlaca({ sockets, marcas }) {
    const { data, setData, post, processing, errors, reset } = useForm({
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
        imagenpr: null,
        imagensec1: null,
        imagensec2: null,
        tipo: "Placa base"
    });



    const submit = (e) => {
        e.preventDefault();
        post(route('articulo.store', data))
    };

    return (

        <div name="placa base" className="min-h-screen">
            <form className="max-w-2xl mx-auto" onSubmit={submit}>
                <div className="mb-5">
                    <label htmlFor="socket" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Socket</label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="socket_id"
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
                <div className="mb-5">
                    <div className="flex">
                        <div className="mr-2 w-52 h-52">
                            <label htmlFor="imagenpr" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen principal</label>
                            <input
                                type="file"
                                name="imagenpr"
                                id="imagenpr"
                                className="hidden" required
                                onChange={(e) => setData('imagenpr', e.target.value)}
                            />
                            <label htmlFor="imagenpr" className="cursor-pointer block bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {data.imagenpr ? <img src={data.imagenpr} alt="Imagen Principal" className="w-full h-auto" /> : "Seleccionar imagen"}
                            </label>
                        </div>
                        <div className="mr-2 w-52 h-52">
                            <label htmlFor="imagensec1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen secundaria 1</label>
                            <input
                                type="file"
                                name="imagensec1"
                                id="imagensec1"
                                className="hidden"
                                required
                                onChange={(e) => setData('imagensec1', e.target.value)}

                            />
                            <label htmlFor="imagensec1" className="cursor-pointer block bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {data.imagenSec1 ? <img src={data.imagenSec1} alt="Imagen Secundaria 1" className="w-full h-auto" /> : "Seleccionar imagen"}
                            </label>
                        </div>
                        <div className="mr-2 w-52 h-52">
                            <label htmlFor="imagensec2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen secundaria 2</label>
                            <input
                                type="file"
                                name="imagensec2"
                                id="imagensec2"
                                className="hidden"
                                required
                                onChange={(e) => setData('imagensec2', e.target.value)}
                            />
                            <label htmlFor="imagensec2" className="cursor-pointer block bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {data.imagenSec2 ? <img src={data.imagenSec2} alt="Imagen Secundaria 2" className="w-full h-auto" /> : "Seleccionar imagen"}
                            </label>
                        </div>
                    </div>
                </div>
                <Boton tipo="submit" texto="Crear Artículo"></Boton>
            </form>
        </div>
    );
}
