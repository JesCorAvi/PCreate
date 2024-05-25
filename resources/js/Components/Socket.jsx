import DoneIcon from '@mui/icons-material/Done';

function Socket({ id, nombre, imagen, onClick, isSelected }) {
    return (
        <div
            className={`relative flex flex-col rounded-lg h-42 w-72 justify-center cursor-pointer ${isSelected ? 'border-blue-700 border-4 border-solid' : "shadow-xl"}`}
            onClick={() => onClick(id)}
        >
            {isSelected && <DoneIcon style={{ color: 'blue', position: 'absolute', top: 0, right: 0 }} />}
            <img className="w-all p-3" src={"http://127.0.0.1:8000/storage/uploads/sockets/" + imagen} alt="imagen" />
            <h1 className="font-semibold text-center p-3"> {nombre}</h1>
        </div>
    );
}
export default Socket;
