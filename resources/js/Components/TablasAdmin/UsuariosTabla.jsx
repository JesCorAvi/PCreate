import { useState, useEffect } from 'react';
import axios from 'axios';
import DangerButton from '../DangerButton';
import SecondaryButton from '../SecondaryButton';

export default function UsuariosTabla() {
    const [usuarios, setUsuarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getUsuarios(currentPage, searchQuery);
    }, [currentPage]); // Se vuelve a cargar cuando cambia la página actual

    function getUsuarios(page, query) {
        axios.post(route('profile.getUsers', { page: page, search: query }))
            .then((response) => {
                setUsuarios(response.data.data);
                setTotalPages(response.data.last_page);
            })
            .catch((error) => {
                console.error('Error al obtener usuarios:', error);
            });
    }

    function handleSearch() {
        setCurrentPage(1);
        getUsuarios(1, searchQuery);
    }

    function changePage(page) {
        setCurrentPage(page);
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    function delUsuarios(id) {
        axios.post(route('profile.destroyId', {id: id}))
            .then((response) => {
                getUsuarios(currentPage, searchQuery);
            });
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 bg-white dark:bg-gray-800">
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar usuario..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded p-2 mr-2 w-full max-w-xs"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700"
                >
                    Buscar
                </button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre de usuario
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Rol
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {usuario.name}
                            </td>
                            <td className="px-6 py-4">
                                {usuario.email}
                            </td>
                            <td className="px-6 py-4">
                                {usuario.role}
                            </td>
                            <td className="px-6 py-4 flex gap-2">
                                {usuario.id !== 1 && <DangerButton text="Borrar" onClick={() => delUsuarios(usuario.id)}></DangerButton>}
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
