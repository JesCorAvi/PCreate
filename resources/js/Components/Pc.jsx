import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Boton from "./Boton";
import axios from "axios";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export default function Pc({ pc, estrellas, valoraciones, className = "", editable = false, onDelete }) {
    const [publicado, setPublicado] = useState(pc.publicado);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showInfoPotencial, setShowInfoPotencial] = useState(false);

    function imagenCaja() {
        let caja = pc.articulos.find(articulo => articulo.categoria.nombre === "Caja");
        return caja.fotos[0].imagen;
    }

    function publicar() {
        axios.post(route("pc.publicar", { id: pc.id })).then(response => {
            setPublicado(!publicado);
        }).catch(error => {
            console.log(error);
        });
    }
    function porcentaje() {
        return ((pc.puntuacion / 2450) * 100).toFixed(2);
    }
    function borrarPc() {
        axios.post(route("pc.destroy", { id: pc.id })).then(response => {
            onDelete(pc.id);
        }).catch(error => {
            console.log(error);
        });
    }
    function calidadPrecioTotal() {
        var calidad = pc.calidad_precio;
        if (calidad >= 0 && calidad < 0.7) {
            return <p className="text-red-700 font-semibold">Calidad/Precio Reducida</p>;
        } else if (calidad >= 0.7 && calidad < 1.2) {
            return <p className="text-yellow-400 font-semibold">Calidad/Precio Media</p>;
        } else if (calidad >= 1.2 && calidad < 2.5) {
            return <p className="text-green-500 font-semibold">Calidad/Precio Alta</p>;
        }
    }
    function cambioInfoPotencial() {
        setShowInfoPotencial(!showInfoPotencial);
    };
    return (
        <div className={"relative bg-white border-2 border-solid border-white shadow-2xl hover:border-purple-800 rounded-xl w-72 h-comp2 flex flex-col justify-between items-center " + className}>
            {editable &&
                <button
                    aria-label="delete"
                    className="absolute top-0 right-0 -mt-2 -mr-2 bg-purple-700 rounded-full"
                    onClick={() => setIsModalOpen(true)}
                >
                    <CloseIcon className="text-white p-1" />
                </button>
            }
            <Link href={route("pc.edit", { id: pc.id })}
                className={"flex flex-col justify-center items-center"}>
                <img className='pb- mt-5' width="200px" height="200px" src={"/storage/uploads/articulos/" + imagenCaja()}></img>
                <div className="mt-4 relative flex items-center">
                    <p className="font-semibold text-lg pt-5 pb-3">Potencial PCreate™</p>
                    <Tooltip title="Potencial PCreate™ indica cómo de cerca está su dispositivo de alcanzar el máximo posible de especificaciones establecido por nuestra empresa.">
                        <HelpOutlineIcon
                            className={`text-gray-400 h-5 w-5 cursor-pointer ml-1 ${showInfoPotencial ? 'text-gray-600' : ''}`}
                            onMouseEnter={cambioInfoPotencial}
                            onMouseLeave={cambioInfoPotencial}
                        />
                    </Tooltip>
                </div>
                <ProgressBar puntuacionTotal={pc.puntuacion}></ProgressBar>
                <p>{porcentaje(pc.puntuacionTotal)}%</p>
                <div>{calidadPrecioTotal()}</div>
                <div className="px-5 min-h-24">
                    <div className="flex">
                        {[...Array(5)].map((star, index) => {

                            const starValue = index + 1;
                            return (
                                <span key={starValue}
                                    className='text-purple-800'
                                >
                                    {starValue <= estrellas ? <StarIcon /> : <StarBorderIcon className="text-gray-400" />}
                                </span>
                            );
                        })}<p className='text-purple-800 font-semibold'>{valoraciones} valoraciones</p>
                    </div>
                    {!editable && <p className="text-lg">Creado por {pc.user.name}</p>}
                    <p className='font-semibold text-lg'>{pc.nombre}</p>
                    <p>{pc.socket.nombre}</p>
                </div>
                <p className="text-2xl font-bold pt-5">{pc.total_precio}€</p>
            </Link>

            {editable && (
                publicado ?
                    <Boton className="m-0" onClick={publicar} texto="Ocultar Configuración" ></Boton>
                    :
                    <Boton className="m-0" onClick={publicar} texto="Publicar Configuración" ></Boton>
            )}

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Confirmar Borrado</h2>
                    <p>¿Estás seguro de que deseas borrar este PC?</p>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded"
                            onClick={() => {
                                borrarPc();
                                setIsModalOpen(false);
                            }}
                        >
                            Borrar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
