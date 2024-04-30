
import { Head } from '@inertiajs/react';

export default function Linea({ auth }) {
    return (
        <div className="border-2 border-solid border-black rounded-md my-5 max-w-3xl">
            <div className='flex p-4 gap-4'>
                <img className='w-28 h-28 rounded-md' src="http://127.0.0.1:8000/assets/grafica.webp"></img>
                <div>
                    <a href="#" className="text-2xl  underline pt-3">Corsair Vengeance DDR5 6400MHz 64GB 2x32GB CL32</a>
                    <div className='flex pt-8 gap-4 justify-between'>
                        <p className='font-semibold text-xl'>29.99€</p>
                        <div className='flex gap-2' >
                            <button className=' bg-black text-white text-xl rounded-xl w-6 h-6 font-semibold hover:bg-gray-700'> - </button>
                            <p className=' font-semibold text-xl'> 25 </p>
                            <button className='bg-black text-xl rounded-xl text-white w-6 h-6 font-semibold  hover:bg-gray-700'> + </button>
                        </div>
                    </div>
                    <a className='underline'>Borrar</a>
                </div>
            </div>
        </div>
    );
}
