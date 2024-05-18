import React from 'react';
import Socket from './Socket';
import Select from 'react-select';
import { useState } from 'react';


export default function Configurador({ sockets, articulos }) {
    const [selectedSocket, setSelectedSocket] = useState(null);

    const CustomOption = ({ data, innerProps }) => (
        <div className='flex hover:bg-slate-200 align-middle cursor-pointer items-center p-2' {...innerProps}>
            {data.imagen && <img className='w-20 h-20' src={"http://127.0.0.1:8000/storage/uploads/articulos/" + data.imagen} alt={data.label} />}
            <p className='ml-2'>{data.label}</p>
        </div>
    );

    const CustomSingleValue = ({ data }) => (
        <div className='flex align-middle items-center'>
            {data.imagen && <img className='w-20 h-20' src={"http://127.0.0.1:8000/storage/uploads/articulos/" + data.imagen} alt={data.label} />}
            <span className='ml-2'>{data.label}</span>
        </div>
    );

    const customStyles = {
        control: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
            padding: '0.25rem',
            minHeight: '2.5rem',
        }),
        singleValue: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
            padding: '0.25rem',
            margin: 0,
        }),
        valueContainer: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
            padding: '0',
        }),
        input: (provided) => ({
            ...provided,
            margin: 0,
            padding: 0,
        }),
    };
    const noOptionsMessage = () => 'No hay opciones disponibles';

    const handleSocketClick = (socketId) => {
        setSelectedSocket(socketId);
    };

    return (
        <div className="min-h-screen flex flex-col gap-7 mb-20">
            <div className='flex flex-col sm:flex-row justify-center pt-24 gap-4'>
                <h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center">Configurador de PC:</h2>
                <input className='w-56 h-10 self-center rounded-md' placeholder='Nombre para la configuración...'></input>
            </div>
            <div className="flex gap-12 justify-center flex-wrap mx-8">
                {sockets.map((socket) => (
                    <Socket
                        id={socket.id}
                        nombre={socket.nombre}
                        imagen={socket.imagen}
                        key={socket.id}
                        onClick={setSelectedSocket}
                        isSelected={selectedSocket === socket.id}
                    />
                ))}
            </div>
            <div className='flex flex-col lg:flex-row gap-14 max-w-all justify-center'>
                <div className='rounded-lg w-all lg:w-2/6'>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Placa base*</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={articulos.placas.map(placa => ({ value: placa.id, label: placa.nombre, imagen: placa.fotos[0]?.imagen }))}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona una placa base...'
                            noOptionsMessage={noOptionsMessage}
                        />
                    </div>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Procesador*</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={articulos.cpu.map(cpu => ({ value: cpu.id, label: cpu.nombre, imagen: cpu.fotos[0]?.imagen }))}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona un Procesador...'
                            noOptionsMessage={noOptionsMessage}
                        />
                    </div>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Disipador Cpu*</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={articulos.disipador.map(disipador => ({ value: disipador.id, label: disipador.nombre, imagen: disipador.fotos[0]?.imagen }))}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona un Disipador Cpu...'
                            noOptionsMessage={noOptionsMessage}
                        />
                    </div>
                    <div>
                        <p className='font-semibold text-2xl py-4'>RAM*</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={articulos.ram.map(ram => ({ value: ram.id, label: ram.nombre, imagen: ram.fotos[0]?.imagen }))}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona RAM...'
                            noOptionsMessage={noOptionsMessage}
                        />
                    </div>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Almacenamiento principal*</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={articulos.almacenamientos.map(almacenamiento => ({ value: almacenamiento.id, label: almacenamiento.nombre, imagen: almacenamiento.fotos[0]?.imagen }))}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona un Almacenamiento principal...'
                            noOptionsMessage={noOptionsMessage}
                        />
                    </div>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Almacenamiento secundario</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={articulos.almacenamientos.map(almacenamiento => ({ value: almacenamiento.id, label: almacenamiento.nombre, imagen: almacenamiento.fotos[0]?.imagen }))}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona un Almacenamiento secundario...'
                            noOptionsMessage={noOptionsMessage}
                        />
                    </div>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Tarjeta Gráfica</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={articulos.graficas.map(grafica => ({ value: grafica.id, label: grafica.nombre, imagen: grafica.fotos[0]?.imagen }))}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona una Tarjeta Gráfica...'
                            noOptionsMessage={noOptionsMessage}
                        />
                    </div>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Caja</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={articulos.cajas.map(caja => ({ value: caja.id, label: caja.nombre, imagen: caja.fotos[0]?.imagen }))}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona una Caja...'
                            noOptionsMessage={noOptionsMessage}
                        />
                    </div>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Ventilación</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={articulos.ventiladores.map(ventilador => ({ value: ventilador.id, label: ventilador.nombre, imagen: ventilador.fotos[0]?.imagen }))}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona una Ventilación...'
                            noOptionsMessage={noOptionsMessage}
                        />
                    </div>
                </div>
                <div className='border border-solid border-black rounded-lg my-5 p-5 w-all lg:w-2/6 '>
                    <h1 className='text-center font-semibold text-2xl'>Información de Configuración</h1>
                </div>
            </div>
        </div>
    );
}
