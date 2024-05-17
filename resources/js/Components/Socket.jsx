export default function Socket({nombre, imagen,}) {
    return (

            <div className="flex flex-col border border-solid border-black rounded-lg h-42 w-72 justify-center">
                <img className="w-all p-3" src={"http://127.0.0.1:8000/storage/uploads/sockets/" + imagen} alt="imagen" />
                <h1 className="font-samibold text-center p-3"> {nombre}</h1>
            </div>
    );
}
