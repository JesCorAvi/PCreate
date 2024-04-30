export default function Boton({texto, tipo, onClick }) {
    return (
        <button onClick={onClick} type={tipo} className='border border-solid border-white m-4 min-h-10 text-lg mb-2 bg-black font-semibold text-white w-52 h-10 rounded-md hover:bg-gray-800'>{texto}</button>
    );
}
