import React, { useState, useEffect } from 'react';
import Socket from './Socket';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';

export default function Configurador({ sockets, articulos }) {
    console.log(articulos);
    const { data, setData, post, errors } = useForm({
        socket: null,
        placa: null,
        cpu: null,
        disipador: null,
        ram: null,
        almacenamientoPrincipal: null,
        almacenamientoSecundario: null,
        grafica: null,
        caja: null,
        ventilacion: null,
    });

    const [filteredArticulos, setFilteredArticulos] = useState({
        placas: [],
        cpu: [],
        disipador: [],
        ram: [],
        cajas: [],
    });

    useEffect(() => {
        if (data.socket) {
            const placasFiltradas = articulos.placas[data.socket] || [];
            const cpuFiltradas = articulos.cpu[data.socket] || [];
            const disipadorFiltradas = articulos.disipador[data.socket] || [];

            setFilteredArticulos({
                placas: placasFiltradas,
                cpu: cpuFiltradas,
                disipador: disipadorFiltradas,
                ram: [],
                cajas: [],
            });
        }
    }, [data.socket]);

    useEffect(() => {
        if (data.placa) {
            const placaSeleccionada = filteredArticulos.placas.find(placa => placa.id === data.placa);
            console.log(placaSeleccionada.datos.ddrmax);

            if (placaSeleccionada) {
                const ddrmax = placaSeleccionada.datos.ddrmax;
                const clase = placaSeleccionada.datos.clase;

                const ramOptions = ddrmax === "5"
                ? [...(articulos.ram.ddr4 || []), ...(articulos.ram.ddr5 || [])]
                : (articulos.ram.ddr5 ? [articulos.ram.ddr5] : []);


                    const cajaOptions = clase === 'micro_atx'
                    ? [...(articulos.cajas.atx || []), ...(articulos.cajas.micro_atx || [])]
                    : (articulos.cajas.atx ? [articulos.cajas.atx] : []);

                setFilteredArticulos(prevState => ({
                    ...prevState,
                    ram: ramOptions,
                    cajas: cajaOptions,
                }),
                console.log(ramOptions)

                );
            }
        }
    }, [data.placa]);

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
                        onClick={(id) => setData('socket', id)}
                        isSelected={data.socket === socket.id}
                    />
                ))}
            </div>
            <div className='flex flex-col lg:flex-row gap-14 max-w-all justify-center'>
                <div className='rounded-lg w-all lg:w-2/6'>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Placa base*</p>
                        <Select
                            className='w-full rounded-md text-black'

                            options={filteredArticulos.placas?.map(placa => ({ value: placa.id, label: placa.nombre, imagen: placa.fotos[0]?.imagen })) || []}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona una placa base...'
                            noOptionsMessage={noOptionsMessage}
                            onChange={(selectedOption) => setData('placa', selectedOption.value)}
                        />
                    </div>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Procesador*</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={filteredArticulos.cpu?.map(cpu => ({ value: cpu.id, label: cpu.nombre, imagen: cpu.fotos[0]?.imagen })) || []}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona un Procesador...'
                            noOptionsMessage={noOptionsMessage}
                            onChange={(selectedOption) => setData('cpu', selectedOption.value)}
                        />
                    </div>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Disipador Cpu*</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={filteredArticulos.disipador?.map(disipador => ({ value: disipador.id, label: disipador.nombre, imagen: disipador.fotos[0]?.imagen })) || []}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona un Disipador Cpu...'
                            noOptionsMessage={noOptionsMessage}
                            onChange={(selectedOption) => setData('disipador', selectedOption.value)}
                        />
                    </div>
                    <div>
                        <p className='font-semibold text-2xl py-4'>RAM*</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={filteredArticulos.ram?.map(ram => ({ value: ram.id, label: ram.nombre, imagen: ram.fotos[0]?.imagen })) || []}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona RAM...'
                            noOptionsMessage={noOptionsMessage}
                            onChange={(selectedOption) => setData('ram', selectedOption.value)}
                        />
                    </div>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Almacenamiento principal*</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={articulos.almacenamientos?.map(almacenamiento => ({ value: almacenamiento.id, label: almacenamiento.nombre, imagen: almacenamiento.fotos[0]?.imagen })) || []}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona un Almacenamiento principal...'
                            noOptionsMessage={noOptionsMessage}
                            onChange={(selectedOption) => setData('almacenamientoPrincipal', selectedOption.value)}
                        />
                    </div>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Almacenamiento secundario</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={articulos.almacenamientos?.map(almacenamiento => ({ value: almacenamiento.id, label: almacenamiento.nombre, imagen: almacenamiento.fotos[0]?.imagen })) || []}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona un Almacenamiento secundario...'
                            noOptionsMessage={noOptionsMessage}
                            onChange={(selectedOption) => setData('almacenamientoSecundario', selectedOption.value)}
                        />
                    </div>
                </div>
                <div className='w-all lg:w-2/6'>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Tarjeta Gráfica</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={articulos.graficas?.map(grafica => ({ value: grafica.id, label: grafica.nombre, imagen: grafica.fotos[0]?.imagen })) || []}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona una Tarjeta Gráfica...'
                            noOptionsMessage={noOptionsMessage}
                            onChange={(selectedOption) => setData('grafica', selectedOption.value)}
                        />
                    </div>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Caja</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={filteredArticulos.cajas?.map(caja => ({ value: caja.id, label: caja.nombre, imagen: caja.fotos[0]?.imagen })) || []}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona una Caja...'
                            noOptionsMessage={noOptionsMessage}
                            onChange={(selectedOption) => setData('caja', selectedOption.value)}
                        />
                    </div>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Ventiladores</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={articulos.ventiladores?.map(ventilador => ({ value: ventilador.id, label: ventilador.nombre, imagen: ventilador.fotos[0]?.imagen })) || []}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona Ventiladores...'
                            noOptionsMessage={noOptionsMessage}
                            onChange={(selectedOption) => setData('ventilacion', selectedOption.value)}
                        />
                    </div>
                    <div>
                        <p className='font-semibold text-2xl py-4'>Fuente de alimentación</p>
                        <Select
                            className='w-full rounded-md text-black'
                            options={articulos.fuentes?.map(fuente => ({ value: fuente.id, label: fuente.nombre, imagen: fuente.fotos[0]?.imagen })) || []}
                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                            styles={customStyles}
                            placeholder='Selecciona una Fuente de alimentación...'
                            noOptionsMessage={noOptionsMessage}
                            onChange={(selectedOption) => setData('fuente', selectedOption.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
