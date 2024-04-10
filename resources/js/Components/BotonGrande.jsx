export default function BotonGrande({texto, tipo }) {
    return (
        <button type={tipo} className='text-lg mb-2 bg-black font-semibold text-white w-full h-10 rounded-md hover:bg-gray-800 my-10'>{texto}</button>
    );
}
