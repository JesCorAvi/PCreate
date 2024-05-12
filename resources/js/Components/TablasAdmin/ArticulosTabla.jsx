import { useState, useEffect } from 'react';
import axios from 'axios';
import DangerButton from '../DangerButton';
import SecondaryButton from '../SecondaryButton';
import { Link } from '@inertiajs/react';

export default function ArticulosTabla() {
    const [articulos, setArticulos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getArticulos(currentPage);
    }, [currentPage]); // Se vuelve a cargar cuando cambia la página actual
    function getArticulos(page) {
        axios.post(`http://127.0.0.1:8000/articulos/getArticulos?page=${page}`)
            .then((response) => {
                setArticulos(response.data.data);
                setTotalPages(response.data.last_page);
            })
            .catch((error) => {
                console.error('Error al obtener articulos:', error);
            });
    }

    function changePage(page) {
        setCurrentPage(page);
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    function delArticulos(id) {
        axios.post(route('articulo.destroy', { id: id }))
            .then((response) => {
                getArticulos()
            });
    }


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Link className='bg-blue-900 text-white rounded-md px-4 py-2 mx-6 font-semibold' href={route('articulo.create')} method="get" as="button"> Crear artículo </Link>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre del aritculo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Categoria
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Marca
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {articulos.map((articulo) => (
                        <tr key={articulo.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {articulo.nombre}
                            </td>
                            <td className="px-6 py-4">
                                {articulo.categoria.nombre}
                            </td>
                            <td className="px-6 py-4">
                                {articulo.marca.nombre}
                            </td>
                            <td className="px-6 py-4 flex gap-2">
                                <Link className='inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150' href={route('articulo.edit', articulo.id)} method="get" as="button"> Editar </Link>
                                <DangerButton text="Borrar" onClick={() => delArticulos(articulo.id)}></DangerButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center  pt-10'>
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
