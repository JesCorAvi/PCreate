import { useState } from 'react';

export default function Boton({texto, tipo, onClick = () => {}, className = ""}) {
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
            className={`transform transition-transform duration-500 ease-in-out ${isClicked ? 'scale-110' : 'scale-100'} border border-purple-800 border-solid m-4 min-h-10 text-lg mb-2 bg-white font-semibold text-purple-800 w-52 h-10 rounded-md hover:bg-gradient-to-r from-blue-500 via-purple-500 to-purple-800 hover:text-white ` + className}
        >

            {texto}
        </button>
    );
}
