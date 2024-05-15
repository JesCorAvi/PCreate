import { Link } from '@inertiajs/react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function Comentario({id,usuario, nota, fecha, comentario, avatar, delComentarios, com_user, user }) {

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
        <div className="border-4 border-solid rounded-md h-42 py-3 flex flex-col  ">
            <div className='flex justify-between'>
                <div className='flex'>
                    <p className='px-6 text-xl font-semibold'>{usuario.name}.</p>
                    <div className='flex'>
                        <div className='flex'>
                            {[...Array(5)].map((star, index) => {
                                const starValue = index + 1;
                                return (
                                    <span key={starValue}
                                        className='text-purple-500'
                                    >
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
                <img src={"http://127.0.0.1:8000/storage/uploads/avatar/" + avatar} className='hidden lg:block w-20 h-20 rounded-full p-2'></img>
                <p className='p-2  pr-6'>{comentario}</p>
            </div>

            {usuario.id == com_user && <button onClick={()=>delComentarios(id)} className="self-end pr-10">Borrar Comentario</button>}
        </div>
    );
}
