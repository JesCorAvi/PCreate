import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import DangerButton from './DangerButton';
import SecondaryButton from './SecondaryButton';
import { Link } from '@inertiajs/react';

export default function Direccion({ auth, direccion, ciudad, cpostal, provincia_id, provincias, id, telefono, initialIsEditing, nombre, favorito, allDirecciones, setAllDirecciones }) {
    const [isEditing, setIsEditing] = useState(!!id);
    const [lightboxVisible, setLightboxVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const handleCloseModal = () => {
        setIsDeleteModalVisible(false);
    };

    const handleDeleteClick = () => {
        setIsDeleteModalVisible(true);
    };

    const { data, setData, reset, post, put, errors } = useForm({
        id: id || '',
        direccion: direccion || '',
        ciudad: ciudad || '',
        cpostal: cpostal || '',
        provincia_id: provincia_id || '',
        telefono: telefono || '',
        nombre: nombre || '',
        favorito: favorito || false
    });

    const syncFavoriteState = (updatedDireccion) => {
        const updatedDirecciones = allDirecciones.map(direccion =>
            direccion.id === updatedDireccion.id ? updatedDireccion : { ...direccion, favorito: false }
        );
        setAllDirecciones(updatedDirecciones);
    };

    function crearDireccion(e) {
        e.preventDefault();
        if (isEditing) {
            put(route('domicilio.update', id), {
                ...data,
                onSuccess: () => {
                    const updatedDireccion = { ...data, id };
                    syncFavoriteState(updatedDireccion);
                }
            });
        } else {
            post(route('domicilio.store'), {
                ...data,
                onSuccess: (response) => {
                    const newDireccion = response.data;
                    syncFavoriteState(newDireccion);
                }
            });
        }
    }

    function eliminarDireccion(e) {
        e.preventDefault();
        post(route('domicilio.destroy'), {
            id,
            onSuccess: () => {
                const remainingDirecciones = allDirecciones.filter(direccion => direccion.id !== id);
                setAllDirecciones(remainingDirecciones);
                handleCloseModal();
            }
        });
    }
    function setFavorito(e) {
        e.preventDefault();
        post(route('domicilio.setFavorito'), {
            id,
        });
    }
    return (
        <form method='post' onSubmit={crearDireccion}>
            <Modal className="p-6" show={isDeleteModalVisible} onClose={handleCloseModal}>
                <h2 className="text-lg font-medium text-gray-900 font-semibold p-10">
                    ¿Estás seguro de que quieres borrar esta dirección?
                </h2>
                <p className="mt-1 text-lg px-10 text-gray-600">
                    Esta acción no puede ser revertida.
                </p>
                <div className="mt-6 flex justify-end p-6 gap-3">
                    <DangerButton className="ms-3 p-1" type='button' onClick={eliminarDireccion} text="Borrar Direccion"></DangerButton>
                    <SecondaryButton type='button' onClick={handleCloseModal}>Cancelar</SecondaryButton>
                </div>
            </Modal>
            <div className="rounded-md my-5 relative">
                <div className="border-2 border-solid border-black rounded-md my-5 relative">
                    {isEditing && (
                        <button type='button' className="bg-black rounded-xl w-6 h-6 absolute top-0 right-0 -mt-2 -mr-2" onClick={handleDeleteClick}>
                            <p className="text-white">X</p>
                        </button>
                    )}

                    <div className="border-b-2 border-solid border-black">
                        <div className="flex flex-col sm:flex-row items-center">
                            <input
                                className='w-1/3 sm:w-1/4'
                                name='nombre'
                                placeholder='Nombre'
                                value={data.nombre}
                                required
                                onChange={(e) => setData('nombre', e.target.value)}
                            />
                            <input
                                className='w-full sm:w-3/4'
                                name='direccion'
                                placeholder='Direccion'
                                value={data.direccion}
                                required
                                onChange={(e) => setData('direccion', e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col sm:flex-row items-center justify-between'>
                            <input className='w-full'
                                name='ciudad'
                                required
                                placeholder='Ciudad'
                                value={data.ciudad}
                                onChange={(e) => setData('ciudad', e.target.value)}
                            />
                            <input className='w-full'
                                type="number"
                                maxLength={5}
                                minLength={5}
                                name='cpostal'
                                required
                                placeholder='Código Postal'
                                value={data.cpostal}
                                onChange={(e) => setData('cpostal', e.target.value)}
                            />
                            <input className='w-full'
                                maxLength={11}
                                minLength={9}
                                name='telefono'
                                required
                                placeholder='Numero de telefono'
                                value={data.telefono}
                                onChange={(e) => setData('telefono', e.target.value)}
                            />
                            <select className='w-full'
                                name='provincia_id'
                                onChange={(e) => setData('provincia_id', e.target.value)}
                                value={data.provincia_id}
                                required
                            >
                                <option disabled>Provincias...</option>
                                {provincias.map((provincia) => (
                                    <option key={provincia.id} value={provincia.id}>
                                        {provincia.nombre}
                                    </option>
                                ))}
                            </select>

                            <div className="flex xs:flex-col md:flex-col">
                                <button className="w-full h-10  hover:bg-slate-600  bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-800  hover:to-purple-800  font-semibold text-white">Guardar</button>
                            </div>
                        </div>
                        <div className="flex items-center mt-2">
                            {favorito ? (
                                <p className="text-blue-700 font-semibold ml-2 text-center w-full">Direccion Predeterminada</p>
                            ) : (
                                <a className="underline ml-2 text-center w-full cursor-pointer" onClick={setFavorito}>Establecer como Direccion predeterminada</a>                            )}
                        </div>
                    </div>
                </div>
                <p className="text-red-800 py-2">{errors.direccion && <div>{errors.direccion}</div>}</p>
                <p className="text-red-800 py-2">{errors.ciudad && <div>{errors.ciudad}</div>}</p>
                <p className="text-red-800 py-2">{errors.cpostal && <div>{errors.cpostal}</div>}</p>
            </div>
        </form>
    );
}
