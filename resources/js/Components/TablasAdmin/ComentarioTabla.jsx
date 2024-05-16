import { useState, useEffect } from 'react';
import axios from 'axios';
import DangerButton from '../DangerButton';
import SecondaryButton from '../SecondaryButton';

export default function ComentarioTabla() {
    const [comentarios, setComentarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    console.log(comentarios);
    useEffect(() => {
        getComentarios(currentPage);
    }, [currentPage]); // Se vuelve a cargar cuando cambia la página actual
    function getComentarios(page) {
        axios.post(route('comentario.getComentarios', { page: page }))
            .then((response) => {
                setComentarios(response.data.data);
                setTotalPages(response.data.last_page);
            })
            .catch((error) => {
                console.error('Error al obtener usuarios:', error);
            });
    }

    function changePage(page) {
        setCurrentPage(page);
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    function delComentarios(id) {
        axios.post(route('comentario.destroy', {id: id}))
            .then((response) => {
                getComentarios() });
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre de usuario
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Contenido
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Estrellas
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {comentarios.map((comentario) => (
                        <tr key={comentario} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {comentario.user.name}
                            </td>
                            <td className="px-6 py-4">
                                {comentario.contenido}
                            </td>
                            <td className="px-6 py-4">
                                {comentario.estrellas}/5
                            </td>
                            <td className="px-6 py-4 flex gap-2">
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
