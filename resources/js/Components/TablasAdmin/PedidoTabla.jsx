import { useState, useEffect } from 'react';
import axios from 'axios';
import DangerButton from '../DangerButton';
import SecondaryButton from '../SecondaryButton';
import { Link } from '@inertiajs/react';
import Modal from '../Modal';

export default function FacturaTabla() {
    const [facturas, setFacturas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [modifyingFactura, setModifyingFactura] = useState(false);
    const [facturaIdToModify, setFacturaIdToModify] = useState(null);
    const [fechaFacturaModificar, setFechaFacturaModificar] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isDateValid, setIsDateValid] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateFilterType, setDateFilterType] = useState('fecha_creacion');

    useEffect(() => {
        getFacturas(currentPage);
    }, [currentPage]);

    function handleSearch() {
        setCurrentPage(1);
        getFacturas(1, searchQuery);
    }

    function handleClearFilters() {
        setSearchQuery('');
        setStartDate('');
        setEndDate('');
        setDateFilterType('fecha_creacion');
        setCurrentPage(1);
        getFacturas(1, '');
    }

    function getFacturas(page, query) {
        axios.post(route('factura.getFacturas', { page: page, search: query, start_date: startDate, end_date: endDate, date_type: dateFilterType }))
            .then((response) => {
                setFacturas(response.data.data);
                setTotalPages(response.data.last_page);
            })
            .catch((error) => {
                console.error('Error al obtener Facturas:', error);
            });
    }

    function openModifyModal(id, entregaAproximada, fechaCreacion) {
        setFacturaIdToModify(id);
        setFechaFacturaModificar(entregaAproximada);
        setFechaCreacion(fechaCreacion);
        setModifyingFactura(true);
    }

    function closeModifyModal() {
        setModifyingFactura(false);
        setFacturaIdToModify(null);
        setFechaFacturaModificar('');
        setFechaCreacion('');
        setErrorMessage('');
        setIsDateValid(true);
    }

    function changePage(page) {
        setCurrentPage(page);
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    function modifyFactura(e) {
        e.preventDefault();
        if (new Date(fechaFacturaModificar) < new Date(fechaCreacion)) {
            setErrorMessage('La fecha de entrega no puede ser inferior a la fecha de creación.');
            setIsDateValid(false);
        } else {
            axios.post(route('factura.update', { id: facturaIdToModify }), {
                entrega_aproximada: fechaFacturaModificar
            }).then((response) => {
                getFacturas(currentPage);
                closeModifyModal();
            }).catch((error) => {
                console.error('Error al modificar Factura:', error);
            });
        }
    }

    function delFactura(id) {
        axios.post(route('factura.destroy', { id: id }))
            .then((response) => {
                getFacturas(currentPage);
            }).catch((error) => {
                console.error('Error al borrar Factura:', error);
            });
    }

    function costeTotal() {
        let total = 0;
        facturas.forEach((factura) => {
            factura.articulos.forEach((articulo) => {
                total += articulo.pivot.cantidad * articulo.precio;
            });
        });
        return total;
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

            <Modal show={modifyingFactura} onClose={closeModifyModal}>
                <form onSubmit={(e) => modifyFactura(e)} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Modificar fecha de entrega</h2>
                    <input
                        type="date"
                        placeholder="Nueva Fecha de envio"
                        required
                        value={fechaFacturaModificar}
                        onChange={(e) => {
                            setFechaFacturaModificar(e.target.value);
                            if (new Date(e.target.value) < new Date(fechaCreacion)) {
                                setErrorMessage('La fecha de entrega no puede ser inferior a la fecha de creación.');
                                setIsDateValid(false);
                            } else {
                                setErrorMessage('');
                                setIsDateValid(true);
                            }
                        }}
                        className="mt-2 p-2 border rounded-md w-full"
                    />
                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                    <div className="mt-4 flex justify-end">
                        <SecondaryButton onClick={closeModifyModal}>Cancelar</SecondaryButton>
                        <button
                            className="bg-blue-900 text-white rounded-md px-4 py-2 mx-6 font-semibold"
                            type="submit"
                            disabled={!isDateValid}
                        >
                            Modificar Factura
                        </button>
                    </div>
                </form>
            </Modal>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar usuario..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded p-2 mr-2 w-full max-w-xs"
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-gray-300 rounded p-2 mr-2"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-gray-300 rounded p-2 mr-2"
                />
                <select
                    value={dateFilterType}
                    onChange={(e) => setDateFilterType(e.target.value)}
                    className="border border-gray-300 rounded p-2 mr-2"
                >
                    <option value="fecha_creacion">Fecha de Creación</option>
                    <option value="entrega_aproximada">Fecha de Entrega</option>
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
                        <th scope="col" className="px-6 py-3">
                            <p className="text-center">Usuario</p>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <p className="text-center">Direccion</p>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <p className="text-center">Provincia</p>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <p className="text-center">Fecha de Factura</p>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <p className="text-center">Fecha de Entrega Aproximada</p>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <p className="text-center">Articulos</p>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <p className="text-center">Coste total</p>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <p className="text-center">Acciones</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {facturas.map((factura) => (
                        <tr key={factura.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <p className="text-center">{factura.user.name}</p>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <p className="text-center">{factura.domicilio.direccion}</p>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <p className="text-center">{factura.domicilio.provincia.nombre}</p>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <p className="text-center">{factura.fecha_creacion}</p>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <p className="text-center">{factura.entrega_aproximada}</p>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {factura.articulos.map((art) => (
                                <p key={art.id}>(x{art.pivot.cantidad}) {art.nombre}</p>
                            ))}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <p className="text-center">{costeTotal()}€</p>
                            </td>
                            <td className="px-6 py-4 flex gap-2 justify-center items-center">
                                <SecondaryButton onClick={() => openModifyModal(factura.id, factura.entrega_aproximada, factura.fecha_creacion)}>Editar</SecondaryButton>
                                <DangerButton text="Borrar" onClick={() => delFactura(factura.id)}></DangerButton>
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
