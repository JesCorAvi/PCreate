import { Link } from '@inertiajs/react';
import Comentario from './Comentario';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import SecondaryButton from './SecondaryButton';
import DangerButton from './DangerButton';

export default function Comentarios({ user, id }) {
    const [comentarios, setComentario] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [creatingComentario, setCreatingComentario] = useState(false);
    const [estrellasNuevaComentario, setEstrellasNuevaComentario] = useState('');
    const [contenidoNuevaComentario, setContenidoNuevaComentario] = useState('');

    useEffect(() => {
        getComentarios(currentPage);
    }, [currentPage]);

    function getComentarios(page) {
        axios.post(route('comentario.getComentarios', { page: page }))
            .then((response) => {
                setComentario(response.data.data);
                setTotalPages(response.data.last_page);
            })
            .catch((error) => {
                console.error('Error al obtener Comentarios:', error);
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
        axios.post(route('comentario.destroy', { id: id, id_articulo: id_articulo, contenido: contenido, nota: nota }))
            .then((response) => {
                getComentarios();
            });
    }

    function createComentario(e) {
        e.preventDefault();
        axios.post(route('comentario.store', { commentableType: 'Articulo', commentableId: id }), {
            estrellas: estrellasNuevaComentario,
            contenido: contenidoNuevaComentario
        })        .then((response) => {
                getComentarios();
                setCreatingComentario(false);
                setEstrellasNuevaComentario('');
                setCOntenidoNuevaComentario('');

            })
            .catch((error) => {
                console.error('Error al crear el Comentario:', error);
            });
    }

    return (
        <section className="flex-1 flex flex-col text-justify ">
            <div className='flex justify-between'>
                <h2 className="font-bold text-2xl pt-10 ">Comentarios</h2>
                <button onClick={() => setCreatingComentario(true)} className="font-semibold text-lg pt-10 xl:pr-10 underline">Añadir comentario</button>
                <Modal show={creatingComentario} onClose={() => setCreatingComentario(false)}>
                    <form onSubmit={(e) => createComentario(e)} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">Crear Comentario</h2>

                        <textarea
                            placeholder="Escribe tu comentario"
                            required
                            value={contenidoNuevaComentario}
                            onChange={(e) => setContenidoNuevaComentario(e.target.value)}
                            className="mt-2 p-2 border rounded-md w-full h-64"
                        >
                        </textarea>
                        <input
                            type="text"
                            placeholder="Numero de estrellas"
                            required
                            value={estrellasNuevaComentario}
                            onChange={(e) => setEstrellasNuevaComentario(e.target.value)}
                            className="mt-2 p-2 border rounded-md w-full "
                        />
                        <div className="mt-4 flex justify-end">
                            <SecondaryButton onClick={() => setCreatingComentario(false)}>Cancelar</SecondaryButton>
                            <button className='bg-blue-900 text-white rounded-md px-4 py-2 mx-6 font-semibold' type="submit" >Crear Comentario</button>
                        </div>
                    </form>
                </Modal>
            </div>
            {comentarios.length > 0 ? (
                comentarios.map((comentario) => (
                    <Comentario
                        usuario={user.name}
                        avatar={user.avatar}
                        nota={comentario.estrellas}
                        comentario={comentario.contenido}
                        fecha={comentario.created_at}
                    />
                ))
            ) : (
                <h2 className='text-2xl font-semibold text-center'>No hay comentarios, ¡Sé el primero!</h2>
            )}

        </section>
    );
}
