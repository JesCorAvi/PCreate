import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Modal from './Modal';

export default function Comentario({ id, usuario, user, nota, fecha, comentario, avatar, delComentarios, com_user }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function formatearFecha(date) {
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };

        const formattedDate = new Date(date).toLocaleDateString('es-ES', dateOptions);
        const formattedTime = new Date(date).toLocaleTimeString('es-ES', timeOptions);

        // Convertir la primera letra de cada palabra a mayúsculas
        const formattedString = formattedDate.replace(/\b[a-z]/g, function (char) {
            return char.toUpperCase();
        });

        return `${formattedString}, ${formattedTime}`;
    }

    return (
        <div className="border-4 border-solid rounded-md h-42 py-3 flex flex-col">
            <div className='flex justify-between'>
                <div className='flex'>
                    <p className='px-6 text-xl font-semibold'>{usuario}.</p>
                    <div className='flex'>
                        <div className='flex'>
                            {[...Array(5)].map((star, index) => {
                                const starValue = index + 1;
                                return (
                                    <span key={starValue} className='text-purple-500'>
                                        {starValue <= nota ? <StarIcon /> : <StarBorderIcon className="text-gray-400" />}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <p className='font-semibold px-6'>{formatearFecha(fecha)}</p>
            </div>
            <div className="flex items-start">
                <img src={"/storage/uploads/avatar/" + avatar} className='hidden lg:block w-20 h-20 rounded-full p-2'></img>
                <p className='p-2 pr-6'>{comentario}</p>
            </div>

            {user.id === com_user && (
                <button onClick={() => setIsModalOpen(true)} className="self-end pr-10">
                    Borrar Comentario
                </button>
            )}

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Confirmar Borrado</h2>
                    <p>¿Estás seguro de que deseas borrar este comentario?</p>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded"
                            onClick={() => {
                                delComentarios(id, nota);
                                setIsModalOpen(false);
                            }}
                        >
                            Borrar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
