import { Link } from "@inertiajs/react";

export default function Pc({ pc }) {
    function Total() {
        let total = 0;
        pc.articulos.forEach(articulo => {
            total += articulo.precio * articulo.pivot.cantidad;
        });
        return total.toFixed(2);
    }

    const componentes = [
        ["Placa base", "placa"],
        ["Procesador", "cpu"],
        ["Disipador", "disipador"],
        ["Memoria RAM", "ram"],
        ["Fuente de alimentación", "fuente"],
        ["Caja", "caja"],
        ["Almacenamiento Principal", "almacenamientoPrincipal"],
        ["Almacenamiento Secundario", "almacenamientoSecundario"],
        ["Tarjeta gráfica", "grafica"],
        ["Ventiladores", "ventilacion"],
    ];

    // Agrupar los artículos por parte
    const articulosPorParte = pc.articulos.reduce((acc, articulo) => {
        const parte = articulo.pivot.parte;
        if (!acc[parte]) {
            acc[parte] = [];
        }
        acc[parte].push(articulo);
        return acc;
    }, {});

    return (
        <>
            <div className="border-2 rounded-md my-5 xl:my-10 overflow-hidden shadow-2xl">
                <div className="px-2 py-1 border-solid border-black flex gap-5 bg-slate-200">
                    <Link href={route("pc.edit", { id: pc.id })} className="text-center w-full font-semibold text-xl underline">
                        {pc.nombre}
                    </Link>
                </div>
                <div className='px-2 py-1'>
                    <div className='flex flex-col gap-4'>
                        {componentes.map(([titulo, parte]) => (
                            <div key={parte}>
                                <div className="px-2 py-1 border-solid border-black flex gap-5 bg-slate-100 rounded-md">
                                    <p className="font-semibold">{titulo}</p>
                                </div>
                                {articulosPorParte[parte] && articulosPorParte[parte].length > 0 ? (
                                    articulosPorParte[parte].map((articulo, index) => (
                                        <div key={index} className="flex items-center mt-2">
                                            <img className='w-20 h-20 rounded-md' src={"http://127.0.0.1:8000/storage/uploads/articulos/" + articulo.fotos[0].imagen} alt={articulo.nombre} />
                                            <div className='flex-1 ml-2'>
                                                <div className='flex justify-between'>
                                                    <Link href={route("articulos.show", { id: articulo.id })} className="text-md underline">
                                                        {articulo.nombre}
                                                    </Link>
                                                    <p className='font-semibold px-10 text-lg'>{articulo.precio}€</p>
                                                </div>
                                                {parte === "ventilacion" && (
                                                    <div className='flex justify-between'>
                                                        <span>Cantidad: {articulo.pivot.cantidad}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex items-center mt-2">
                                        <p className="text-gray-500 italic pl-5 pt-2">No instalado</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-2 py-1 border-solid border-black flex justify-between bg-slate-200">
                    <p className='font-bold text-2xl px-5'>Total:</p>
                    <p className='text-2xl px-10 font-semibold'>{Total()}€</p>
                </div>
            </div>
        </>
    );
}
