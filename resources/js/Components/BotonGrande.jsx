import { useState } from 'react';

export default function BotonGrande({texto, tipo, onClick }) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        onClick();
        setTimeout(() => setIsClicked(false), 500); // reset after the duration of the animation
    };

    return (
        <button
            onClick={handleClick}
            type={tipo}
            className={`transform transition-transform duration-500 ease-in-out ${isClicked ? 'scale-110' : 'scale-100'} text-lg mb-2 bg-black font-semibold text-white w-full h-10 rounded-md hover:bg-gray-800 my-10`}
        >
            {texto}
        </button>
    );
}
