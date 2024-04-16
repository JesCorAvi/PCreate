import { Link } from '@inertiajs/react';

export default function Comentario({usuario,nota,fecha,comentario, avatar}) {
    return (
        <div className="border-4 border-solid rounded-md w-200 h-42 py-3 flex flex-col  ">
            <div className='flex justify-between'>
                <div className='flex'>
                    <p className='px-6 text-xl font-semibold'>{usuario}.</p>
                    <div className='flex'>
                        <p className='font-semibold bg-black text-white px-1 rounded-md'>{nota} / 5</p>
                    </div>
                </div>
                <p className='font-semibold px-6'>{fecha}</p>
            </div>
            <div className="flex items-center">
                <img src={avatar} className='hidden lg:block w-20 h-20 rounded-full p-2'></img>
                <p className='p-2  pr-6'>{comentario}</p>
            </div>
        </div>
    );
}
