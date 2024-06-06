import { useState, useEffect } from 'react';
import axios from 'axios';
import DangerButton from '../DangerButton';
import SecondaryButton from '../SecondaryButton';

export default function ComentarioTabla() {
    const [comentarios, setComentarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [starFilter, setStarFilter] = useState('');
    const [filters, setFilters] = useState({ search: '', stars: '' });

    useEffect(() => {
        getComentarios(currentPage, filters.search, filters.stars);
    }, [currentPage, filters]);

    function getComentarios(page, query = '', stars = '') {
        axios.post(route('comentario.getComentarios', { page: page, search: query, stars: stars }))
            .then((response) => {
                setComentarios(response.data.data);
                setTotalPages(response.data.last_page);
            })
            .catch((error) => {
                console.error('Error al obtener comentarios:', error);
            });
    }

    function changePage(page) {
        setCurrentPage(page);
    }

    function delComentarios(id) {
        axios.post(route('comentario.destroy', { id: id }))
            .then((response) => {
                getComentarios(currentPage, filters.search, filters.stars);
            })
            .catch((error) => {
                console.error('Error al borrar comentario:', error);
            });
    }

    function handleSearch() {
        setCurrentPage(1);
        setFilters({ search: searchQuery, stars: starFilter });
    }

    function handleClearFilters() {
        setSearchQuery('');
        setStarFilter('');
        setFilters({ search: '', stars: '' });
        setCurrentPage(1);
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar usuario, producto, comentario..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded p-2 mr-2 w-full max-w-xs"
                />
                <select
                    value={starFilter}
                    onChange={(e) => setStarFilter(e.target.value)}
                    className="border border-gray-300 rounded p-2 mr-2"
                >
                    <option value="">Todas las estrellas</option>
                    <option value="0">0 estrellas</option>
                    <option value="1">1 estrella</option>
                    <option value="2">2 estrellas</option>
                    <option value="3">3 estrellas</option>
                    <option value="4">4 estrellas</option>
                    <option value="5">5 estrellas</option>
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
                    Limpiar Filtros
                </button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">
                            Nombre de usuario
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Producto
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Contenido
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Estrellas
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {comentarios.map((comentario) => (
                        <tr key={comentario.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white  text-center">
                                {comentario.user.name}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                {comentario.comentable.nombre}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {comentario.contenido}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {comentario.estrellas}/5
                            </td>
                            <td className="px-6 py-4 flex gap-2 justify-center items-center">
                                <DangerButton text="Borrar" onClick={() => delComentarios(comentario.id)}></DangerButton>
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
