export default function Boton({texto, tipo }) {
    return (
        <button type={tipo} className='m-4 min-h-10 text-lg mb-2 bg-black font-semibold text-white w-52 h-10 rounded-md hover:bg-gray-800'>{texto}</button>
    );
}
