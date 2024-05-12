import { useState, useEffect } from 'react';
import axios from 'axios';
import DangerButton from '../DangerButton';
import SecondaryButton from '../SecondaryButton';
import { Link } from '@inertiajs/react';
import Modal from '../Modal';

export default function MarcasTabla() {
    const [Marcas, setMarcas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [creatingMarca, setCreatingMarca] = useState(false); // Nuevo estado para controlar la apertura del modal
    const [nombreMarca, setNombreMarca] = useState('');

    useEffect(() => {
        getMarcas(currentPage);
    }, [currentPage]); // Se vuelve a cargar cuando cambia la página actual
    function getMarcas(page) {
        axios.post(`http://127.0.0.1:8000/marcas/getMarca?page=${page}`)
            .then((response) => {
                setMarcas(response.data.data);
                setTotalPages(response.data.last_page);
            })
            .catch((error) => {
                console.error('Error al obtener Marcas:', error);
            });
    }

    function changePage(page) {
        setCurrentPage(page);
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    function delMarcas(id) {
        axios.post(route('marca.destroy', id ))
            .then((response) => {
                getMarcas()
            });
    }
    function modMarcas(id) {
        axios.post(route('marca.edit', { id: id }))
            .then((response) => {
                getMarcas()
            });
    }
    function createMarca(e) {
        e.preventDefault();
        axios.post(route('marca.store',nombreMarca))
            .then((response) => {
                getMarcas();
                setCreatingMarca(false); // Cerrar el modal después de crear la marca
                setNombreMarca(''); // Limpiar el campo del nombre de la marca
            })
            .catch((error) => {
                console.error('Error al crear la marca:', error);
            });
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <button className='bg-blue-900 text-white rounded-md px-4 py-2 mx-6 font-semibold' onClick={() => setCreatingMarca(true)}> Crear Marca </button>

        {/* Modal para crear marca */}
        <Modal show={creatingMarca} onClose={() => setCreatingMarca(false)}>
        <form onSubmit={(e) => createMarca(e)} className="p-6">

                <h2 className="text-lg font-medium text-gray-900">Crear Marca</h2>
                <input
                    type="text"
                    placeholder="Nombre de la marca"
                    value={nombreMarca}
                    onChange={(e) => setNombreMarca(e.target.value)}
                    className="mt-2 p-2 border rounded-md w-full"
                />
                <div className="mt-4 flex justify-end">
                    <SecondaryButton onClick={() => setCreatingMarca(false)}>Cancelar</SecondaryButton>
                    <button className='bg-blue-900 text-white rounded-md px-4 py-2 mx-6 font-semibold' type="submit" >Crear Marca</button>
                </div>
            </form>
        </Modal>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <p className="text-center">Nombre de la marca</p>
                        </th>

                        <th scope="col" className="px-6 py-3">
                            <p className="text-center">Acciones</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Marcas.map((marca) => (
                        <tr key={marca.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <p className="text-center">{marca.nombre}</p>
                            </td>
                            <td className="px-6 py-4 flex gap-2 justify-center items-center">
                                    <SecondaryButton onClick={() => modMarcas(marca.id)}>Editar</SecondaryButton>
                                    <DangerButton text="Borrar" onClick={() => delMarcas(marca.id)}></DangerButton>
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
