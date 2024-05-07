import { useState } from 'react';

export default function Boton({texto, tipo, onClick }) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 500); // reset after the duration of the animation
        onClick();
    };

    return (
        <button
            onClick={handleClick}
            type={tipo}
            className={`transform transition-transform duration-500 ease-in-out ${isClicked ? 'scale-110' : 'scale-100'} border border-solid border-white m-4 min-h-10 text-lg mb-2 bg-black font-semibold text-white w-52 h-10 rounded-md hover:bg-gray-800`}
        >
            {texto}
        </button>
    );
}
