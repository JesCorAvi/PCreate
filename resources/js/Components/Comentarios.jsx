import { Link } from '@inertiajs/react';
import Comentario from './Comentario';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import SecondaryButton from './SecondaryButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function Comentarios({ user, id }) {
    const [comentarios, setComentario] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [creatingComentario, setCreatingComentario] = useState(false);
    const [estrellasNuevaComentario, setEstrellasNuevaComentario] = useState(0);
    const [contenidoNuevaComentario, setContenidoNuevaComentario] = useState('');
    const [caracteres, setCaracteres] = useState(0);
    const [userHasArticle, setUserHasArticle] = useState(user ? user.facturas.some(factura =>
        factura.articulos.some(articulo => articulo.id === id)
    ) : false);
    const [userHasCommented, setUserHasCommented] = useState(user ? user.comentarios.some(comentario =>
        comentario.comentable_type === 'App\\Models\\Articulo' && comentario.comentable_id === id
    ) : false);

    console.log(user);
    useEffect(() => {
        getComentariosWhere(currentPage);
    }, [currentPage]);

    function getComentariosWhere(page) {
        axios.post(route('comentario.getComentariosWhere', { page: page, id: id, type: 'Articulo' , commentableId: id }))
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
        axios.post(route('comentario.destroy', { id: id }))
            .then((response) => {
                getComentariosWhere();
                setUserHasCommented(false);
            });
    }

    function createComentario(e) {
        e.preventDefault();
        axios.post(route('comentario.store', { commentableType: 'Articulo', commentableId: id }), {
            estrellas: estrellasNuevaComentario,
            contenido: contenidoNuevaComentario
        }).then((response) => {
            getComentariosWhere();
            setCreatingComentario(false);
            setEstrellasNuevaComentario(0);
            setContenidoNuevaComentario('');
            setUserHasCommented(true);

        })
            .catch((error) => {
                console.error('Error al crear el Comentario:', error);
            });
    }

    return (
        <section className="flex-1 flex flex-col text-justify ">
            <div className='flex justify-between'>
                <h2 className="font-bold text-2xl pt-10 ">Comentarios</h2>
                {userHasArticle && !userHasCommented && (
                    <button onClick={() => setCreatingComentario(true)}  className="font-semibold text-lg pt-10 xl:pr-10 underline">Añadir comentario</button>
                )}
                <Modal show={creatingComentario} onClose={() => setCreatingComentario(false)}>
                    <form onSubmit={(e) => createComentario(e)} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">Crear Comentario</h2>
                        <div className="mt-2 p-2 border rounded-md w-full flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setEstrellasNuevaComentario(star)}
                                    className={`cursor-pointer ${star <= estrellasNuevaComentario ? 'text-purple-500' : 'text-gray-400'}`}
                                >
                                    {star <= estrellasNuevaComentario ? <StarIcon /> : <StarBorderIcon />}
                                </span>
                            ))}
                        </div>
                        <textarea
                            placeholder="Escribe tu comentario"
                            required
                            value={contenidoNuevaComentario}
                            onChange={(e) => {
                                setContenidoNuevaComentario(e.target.value);
                                setCaracteres(e.target.value.length);
                            }}
                            className="mt-2 p-2 border rounded-md w-full h-64"
                        >
                        </textarea>
                        <div className="mt-4 flex justify-between">
                            <p className={`self-start font-semibold p-2 ${caracteres > 500 ? 'text-red-700' : ''}`}>{caracteres}/500</p>
                            <div>
                                <SecondaryButton onClick={() => setCreatingComentario(false)}>Cancelar</SecondaryButton>
                                <button
                                    className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-800  hover:to-purple-800  text-white rounded-md px-4 py-2 lg:mx-6 font-semibold'
                                    type="submit"
                                    disabled={caracteres > 500}
                                >
                                    Crear Comentario
                                </button>
                            </div>
                        </div>
                        {caracteres > 500 && (
                            <p className="font-semibold text-red-700 p-2 text-center">Has superado el límite de 500 caracteres.</p>
                        )}
                    </form>
                </Modal>
            </div>
            {comentarios.length > 0 ? (
                <>
                    {comentarios.map((comentario) => (
                        <Comentario
                            key={comentario.id}
                            id={comentario.id}
                            user={user}
                            usuario={comentario.user.name}
                            avatar={comentario.user.avatar}
                            nota={comentario.estrellas}
                            comentario={comentario.contenido}
                            fecha={comentario.created_at}
                            delComentarios={delComentarios}
                            com_user={comentario.user_id}
                        />
                    ))}
                    {totalPages > 1 && (
                        <div className='flex justify-center  p-5'>
                            <button className='h-8 w-20 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-800  hover:to-purple-800 text-white rounded-l-lg' onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                            {pageNumbers.map((pageNumber) => (
                                <button className={`border border-solid border-black h-8 w-8 ${pageNumber === currentPage ? 'text-black bg-slate-400' : ''}`} key={pageNumber} onClick={() => changePage(pageNumber)} disabled={pageNumber === currentPage}>
                                    {pageNumber}
                                </button>
                            ))}
                            <button className='h-8 w-20 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-800  hover:to-purple-800 text-white rounded-r-lg' onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
                        </div>
                    )}
                </>
            ) : (
                <h2 className='text-2xl px-5 py-10 font-semibold text-center'>No hay comentarios, ¡Sé el primero!</h2>
            )
            }

        </section >
    );
}
