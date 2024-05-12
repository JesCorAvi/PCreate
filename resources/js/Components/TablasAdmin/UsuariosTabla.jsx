import { useState, useEffect } from 'react';
import axios from 'axios';
import DangerButton from '../DangerButton';
import SecondaryButton from '../SecondaryButton';

export default function UsuariosTabla() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        getUsuarios();
    }, []);

    function getUsuarios() {
        axios.post(route("profile.getUsers"))
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener usuarios:', error);
            });
    }

    function delUsuarios(id) {
        axios.post(route('profile.destroyId', {id: id}))
            .then((response) => {
                // Actualizar la lista de usuarios después de la eliminación
                setUsuarios(usuarios.filter(usuario => usuario.id !== id));
            })
            .catch((error) => {
                console.error('Error al eliminar usuario:', error);
            });
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
        </div>
    );
}
