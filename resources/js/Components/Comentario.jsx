import { Link } from '@inertiajs/react';

export default function Comentario({ active = false, classNameName = '', children, ...props }) {
    return (
        <div className="border-4 border-solid rounded-md w-200 h-42 py-3 flex flex-col  ">
            <div className='flex'>
                <p className='px-6'>Jesus C.</p>
                <div className='flex'>
                    <img src='http://127.0.0.1:8000/assets/estrella.png' className='w-6 h-6'></img>
                    <img src='http://127.0.0.1:8000/assets/estrella.png' className='w-6 h-6'></img>
                    <img src='http://127.0.0.1:8000/assets/estrella.png' className='w-6 h-6'></img>
                    <img src='http://127.0.0.1:8000/assets/estrella.png' className='w-6 h-6'></img>
                </div>
            </div>
            <div className="flex">
                <img src='http://127.0.0.1:8000/assets/avatar.jpg' className='max-w-20 max-h-20 rounded-full p-2'></img>
                <p className='p-2'>Muy buena placa base, me la compré más que nada por e4stética, ya que las luces que tiene me gustan bastante, pero en términos de conectividad y rendimiento está genial. Tiene bastantes puertosa usb, compatibilidad con conectores tipo C que pueda tener tu caja y 2 puertos M.2 para las SSD. Muy contento con la compra.</p>
            </div>
        </div>
    );
}
