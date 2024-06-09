import { useState, useEffect } from 'react';
import axios from 'axios';
import DangerButton from '../DangerButton';
import { Link } from '@inertiajs/react';
import SecondaryButton from '../SecondaryButton';

export default function ArticulosTabla({categorias}) {
    const [articulos, setArticulos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [marcas, setMarcas] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState('');
    const [selectedMarca, setSelectedMarca] = useState('');

    useEffect(() => {
        getArticulos(currentPage);
        getMarcas();
    }, [currentPage]);

    function getArticulos(page, query = '', categoria = '', marca = '') {
        axios.post(route('articulo.getArticulos', { page, search: query, categoria, marca }))
            .then((response) => {
                setArticulos(response.data.data);
                setTotalPages(response.data.last_page);
            })
            .catch((error) => {
                console.error('Error al obtener articulos:', error);
            });
    }


    function getMarcas() {
        axios.get(route('marca.getAllMarcas'))
            .then((response) => {
                setMarcas(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener marcas:', error);
            });
    }

    function handleSearch() {
        setCurrentPage(1);
        getArticulos(1, searchQuery, selectedCategoria, selectedMarca);
    }

    function handleClearFilters() {
        setSearchQuery('');
        setSelectedCategoria('');
        setSelectedMarca('');
        setCurrentPage(1);
        getArticulos(1);
    }

    function changePage(page) {
        setCurrentPage(page);
        getArticulos(page, searchQuery, selectedCategoria, selectedMarca);
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    function darDeBaja(id) {
        axios.post(route('articulo.destroy', { id: id }))
            .then(() => {
                getArticulos(currentPage, searchQuery, selectedCategoria, selectedMarca);
            })
            .catch((error) => {
                console.error('Error al eliminar articulo:', error);
            });
    }

    function darDeAlta(id) {
        axios.post(route('articulo.restore', { id: id }))
            .then(() => {
                getArticulos(currentPage, searchQuery, selectedCategoria, selectedMarca);
            })
            .catch((error) => {
                console.error('Error al restaurar articulo:', error);
            });
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 bg-white dark:bg-gray-800">
            <div className="flex items-center mb-4 justify-between">
                <Link
                    className='bg-blue-900 text-white rounded-md px-4 py-2 mx-6 font-semibold'
                    href={route('articulo.create')}
                    method="get"
                    as="button"
                >
                    Crear artículo
                </Link>
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-300 rounded p-2 mr-2 w-full max-w-xs"
                    />
                    <select
                        value={selectedCategoria}
                        onChange={(e) => setSelectedCategoria(e.target.value)}
                        className="border border-gray-300 rounded p-2 mr-2"
                    >
                        <option value="">Todas las categorías</option>
                        {categorias.map(categoria => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedMarca}
                        onChange={(e) => setSelectedMarca(e.target.value)}
                        className="border border-gray-300 rounded p-2 mr-2"
                    >
                        <option value="">Todas las marcas</option>
                        {marcas.map(marca => (
                            <option key={marca.id} value={marca.id}>
                                {marca.nombre}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700"
                    >
                        Buscar
                    </button>
                    <button
                        onClick={handleClearFilters}
                        className="bg-gray-500 text-white rounded p-2 hover:bg-gray-700 ml-2"
                    >
                        Limpiar filtros
                    </button>
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">
                            Nombre del artículo
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Categoría
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Marca
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {articulos.map((articulo) => (
                        <tr key={articulo.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                <Link className='underline' href={"/tienda/" + articulo.id}>{articulo.nombre}</Link>
                            </td>
                            <td className="px-6 py-4 text-center">
                                {articulo.categoria.nombre}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {articulo.marca.nombre}
                            </td>
                            <td className="px-6 py-4 flex gap-2 items-center justify-center">
                                <Link
                                    className='inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150'
                                    href={route('articulo.edit', articulo.id)}
                                    method="get"
                                    as="button"
                                >
                                    Editar
                                </Link>
                                {articulo.deleted_at ? (
                                    <SecondaryButton onClick={() => darDeAlta(articulo.id)}>Dar de Alta</SecondaryButton>
                                ) : (
                                    <DangerButton text="Dar de Baja" onClick={() => darDeBaja(articulo.id)} />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center pt-10'>
                <button className='h-8 w-20 bg-black text-white rounded-l-lg' onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                {pageNumbers.map((pageNumber) => (
                    <button className={`border border-solid border-black h-8 w-8 ${pageNumber === currentPage ? 'bg-gray-700 text-white' : ''}`} key={pageNumber} onClick={() => changePage(pageNumber)} disabled={pageNumber === currentPage}>
                        {pageNumber}
                    </button>
                ))}
                <button className='h-8 w-20 bg-black text-white rounded-r-lg' onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
            </div>
        </div>
    );
}
