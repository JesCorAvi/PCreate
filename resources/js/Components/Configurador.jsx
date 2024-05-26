import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import DeleteIcon from '@mui/icons-material/Delete';
import Socket from './Socket';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import BotonGrande from './BotonGrande';
import Boton from './Boton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';

export default function Configurador({ user, sockets, articulos }) {
    console.log(articulos);
    // Estado para mostrar advertencias
    const [showCoolingWarning, setShowCoolingWarning] = useState(false);
    const [showAlmacenamientoPrincipalWarning, setShowAlmacenamientoPrincipalWarning] = useState(false);
    const [showInfoPotencial, setShowInfoPotencial] = useState(false);

    // Estado para la cantidad de ventiladores y su límite
    const [ventiladorCount, setVentiladorCount] = useState(1);
    const [maxVentiladores, setMaxVentiladores] = useState(0);

    // Estado para el precio y puntuación total
    const [precioTotal, setPrecioTotal] = useState(0);
    const [puntuacionTotal, setPuntuacionTotal] = useState(0);

    // Estado para los artículos filtrados según el socket seleccionado
    const [filteredArticulos, setFilteredArticulos] = useState({
        placas: [],
        cpu: [],
        disipador: [],
        ram: [],
        cajas: [],
    });

    // Inicialización del formulario
    const { data, setData, post, errors, reset } = useForm({
        nombre: `PC de ${user.name} Nº${new Date().getTime().toString().slice(-4)}`,
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

    // Función para calcular el porcentaje de la puntuación total
    function porcentaje() {
        return ((puntuacionTotal / 2500) * 100).toFixed(2);
    }

    // Función para determinar la relación calidad/precio
    function calidadPrecio(calidadPrecio) {
        if (calidadPrecio >= 0 && calidadPrecio < 0.7) {
            return <p className="text-red-700 font-semibold">Calidad/Precio Reducida</p>;
        } else if (calidadPrecio >= 0.7 && calidadPrecio < 1.5) {
            return <p className="text-yellow-400 font-semibold">Calidad/Precio Media</p>;
        } else if (calidadPrecio >= 1.5) {
            return <p className="text-green-500 font-semibold">Calidad/Precio Alta</p>;
        }
    }

    function calidadPrecioTotal() {
        var calidad = puntuacionTotal / precioTotal;
        if (calidad >= 0 && calidad < 0.7) {
            return <p className="text-red-700 font-semibold">Calidad/Precio Reducida</p>;
        } else if (calidad >= 0.7 && calidad < 1.5) {
            return <p className="text-yellow-400 font-semibold">Calidad/Precio Media</p>;
        } else if (calidad >= 1.5 && calidad < 2.5) {
            return <p className="text-green-500 font-semibold">Calidad/Precio Alta</p>;
        }
    }

    // Funcion para alterar mostrar y ocultar la información del potencial

    function cambioInfoPotencial() {
        setShowInfoPotencial(!showInfoPotencial);
    };
    // Función para limpiar la selección de un componente
    function limpiarSelect(opcion) {
        setData(opcion, null);
    }

    // Función para calcular el precio total de los componentes seleccionados
    function calcularPrecioTotal() {
        let total = 0;
        const componentes = [
            'placa',
            'cpu',
            'disipador',
            'ram',
            'almacenamientoPrincipal',
            'almacenamientoSecundario',
            'grafica',
            'caja',
            'ventilacion'
        ];
        componentes.forEach(componente => {
            if (data[componente]) {
                const precio = parseFloat(getArticuloInfo(articulos, data[componente], "precio"));
                total += (componente === 'ventilacion') ? precio * ventiladorCount : precio;
            }
        });
        return total.toFixed(2);
    };

    // Función para calcular la puntuación total de los componentes seleccionados
    function calcularPuntuacionTotal() {
        let total = 0;
        const componentes = [
            'placa',
            'cpu',
            'disipador',
            'ram',
            'almacenamientoPrincipal',
            'almacenamientoSecundario',
            'grafica',
            'caja',
            'ventilacion'
        ];
        componentes.forEach(componente => {
            if (data[componente]) {
                const puntuacion = parseFloat(getArticuloInfo(articulos, data[componente], "puntuacion"));
                total += (componente === 'ventilacion') ? puntuacion * ventiladorCount : puntuacion;
            }
        });
        return total;
    };

    // Actualización del precio y puntuación total al cambiar los datos o la cantidad de ventiladores
    useEffect(() => [
        setPrecioTotal(calcularPrecioTotal()),
        setPuntuacionTotal(calcularPuntuacionTotal())
    ]
    [data, ventiladorCount]);

    // Comprobación de compatibilidad entre el CPU y el disipador seleccionado
    useEffect(() => {
        if (data.cpu && data.disipador) {
            const cpuSeleccionado = filteredArticulos.cpu.find(cpu => cpu.id === data.cpu);
            const disipadorSeleccionado = filteredArticulos.disipador.find(disipador => disipador.id === data.disipador);
            if (cpuSeleccionado &&
                disipadorSeleccionado &&
                parseInt(cpuSeleccionado.datos.consumo) >= 140 &&
                disipadorSeleccionado.datos.liquida === false) {
                setShowCoolingWarning(true);
            } else {
                setShowCoolingWarning(false);
            }
        }
    }, [data.cpu, data.disipador]);

    // Advertencia si el almacenamiento principal es mecánico
    useEffect(() => {
        if (data.almacenamientoPrincipal) {
            const almacenamientoPrSeleccionado = filteredArticulos.almacenamientos.find(
                almacenamiento => almacenamiento.id === data.almacenamientoPrincipal
            );
            if (almacenamientoPrSeleccionado.datos.clase === "Mecánico") {
                setShowAlmacenamientoPrincipalWarning(true);
            } else {
                setShowAlmacenamientoPrincipalWarning(false);
            }
        }
    }, [data.almacenamientoPrincipal]);

    // Filtrado de artículos según el socket seleccionado
    useEffect(() => {
        if (data.socket) {
            const { placas = [], cpu = [], disipador = [] } = articulos;
            setFilteredArticulos({
                placas: placas[data.socket] || [],
                cpu: cpu[data.socket] || [],
                disipador: disipador[data.socket] || [],
                ram: [],
                cajas: [],
                almacenamientos: [],

            });
            setData(prevData => ({
                ...prevData,
                placa: null,
                cpu: null,
                disipador: null,
                ram: null,
                almacenamientoPrincipal: null,
                almacenamientoSecundario: null,
                grafica: null,
                caja: null,
                ventilacion: null,
            }));
        }
    }, [data.socket]);

    // Filtrado de RAM, cajas y almacenamiento según la placa seleccionada
    useEffect(() => {
        if (data.placa) {
            const placaSeleccionada = filteredArticulos.placas.find(placa => placa.id === data.placa);
            if (placaSeleccionada) {
                const { ddrmax, clase, slotsm2, slotsram } = placaSeleccionada.datos;
                setFilteredArticulos(prevState => ({
                    ...prevState,
                    ram: (ddrmax == 5 ?
                        [...(articulos.ram.ddr4 || []), ...(articulos.ram.ddr5 || [])] :
                        articulos.ram.ddr4).filter(ram => ram.datos.cantidad <= slotsram) || [],
                    almacenamientos: (slotsm2 != 0 ?
                        [...(articulos.almacenamientos.m2 || []), ...(articulos.almacenamientos.sata || [])] :
                        articulos.almacenamientos.sata) || [],
                    cajas: (clase === 'Micro-ATX' ?
                        [...(articulos.cajas.atx || []), ...(articulos.cajas.micro_atx || [])] :
                        articulos.cajas.atx) || [],
                }));
                setData(prevData => ({
                    ...prevData,
                    cpu: null,
                    disipador: null,
                    ram: null,
                    almacenamientoPrincipal: null,
                    almacenamientoSecundario: null,
                    grafica: null,
                    caja: null,
                    ventilacion: null,
                }));
            }
        }
    }, [data.placa]);
    useEffect(() => {
        const placaSeleccionada = filteredArticulos.placas.find(placa => placa.id === data.placa);
        if (data.almacenamientoPrincipal || data.almacenamientoSecundario) {
            const almacenamientoPrincipalSeleccionado = getArticuloInfo(
                articulos.almacenamientos, data.almacenamientoPrincipal, "datos"
            );
            const almacenamientoSecundarioSeleccionado = getArticuloInfo(
                articulos.almacenamientos, data.almacenamientoSecundario, "datos"
            );

            let m2Count = 0;
            if (almacenamientoPrincipalSeleccionado?.clase === 'SSD M.2') m2Count++;
            if (almacenamientoSecundarioSeleccionado?.clase === 'SSD M.2') m2Count++;

            if (m2Count >= placaSeleccionada.datos.slotsm2) {
                setFilteredArticulos(prevState => ({
                    ...prevState,
                    almacenamientos: articulos.almacenamientos.sata || [],
                }));
            } else {
                setFilteredArticulos(prevState => ({
                    ...prevState,
                    almacenamientos: [...(articulos.almacenamientos.m2 || []), ...(articulos.almacenamientos.sata || [])]
                }));

            }
        }
    }, [data.almacenamientoPrincipal, data.almacenamientoSecundario]);

    // Componente de opción personalizada para Select
    const CustomOption = ({ data, innerProps }) => (
        <div className='flex justify-between hover:bg-slate-200 align-middle cursor-pointer items-center p-2' {...innerProps}>
            <div className='flex items-center'>
                {data.imagen &&
                    <img
                        className='w-20 h-20'
                        src={"http://127.0.0.1:8000/storage/uploads/articulos/" + data.imagen}
                        alt={data.label} />}
                <p className='ml-2'>{data.label}</p>
            </div>
            <div className='flex items-center'>
                <p className='ml-2 text-right'>{calidadPrecio(data.puntuacionPrecio)}</p>
                <p className='ml-2 text-right font-semibold'>{data.precio}€</p>
            </div>
        </div>
    );

    // Componente de valor seleccionado personalizado para Select
    const CustomSingleValue = ({ data }) => (
        <div className='flex align-middle items-center'>
            {data.imagen &&
                <img
                    className='w-20 h-20'
                    src={"http://127.0.0.1:8000/storage/uploads/articulos/" + data.imagen}
                    alt={data.label}
                />}
            <span className='ml-2'>{data.label}</span>
        </div>
    );

    // Estilos personalizados para Select
    const customStyles = {
        control: (provided) => ({ ...provided, display: 'flex', alignItems: 'center', padding: '0.25rem', minHeight: '2.5rem' }),
        singleValue: (provided) => ({ ...provided, display: 'flex', alignItems: 'center', padding: '0.25rem', margin: 0 }),
        valueContainer: (provided) => ({ ...provided, display: 'flex', alignItems: 'center', padding: '0' }),
        input: (provided) => ({ ...provided, margin: 0, padding: 0 }),
    };

    // Actualización del máximo de ventiladores según la caja seleccionada
    useEffect(() => {
        if (data.caja) {
            const cajaSeleccionada = articulos.cajas.atx.find(
                caja => caja.id === data.caja) || articulos.cajas.micro_atx.find(caja => caja.id === data.caja
                );
            if (cajaSeleccionada) setMaxVentiladores(parseInt(cajaSeleccionada.datos.ventiladores));
        } else {
            setMaxVentiladores(0);
        }
    }, [data.caja]);

    // Incremento y decremento de la cantidad de ventiladores
    const handleIncrement = () => {
        if (ventiladorCount < maxVentiladores) setVentiladorCount(prevCount => prevCount + 1);
    };

    const handleDecrement = () => {
        if (ventiladorCount > 1) {
            setVentiladorCount(prevCount => prevCount - 1);
        } else {
            setVentiladorCount(0);
            setData('ventilacion', null);
            setVentiladorCount(1);
        }
    };

    // Actualización del estado cuando la cantidad de ventiladores es cero
    useEffect(() => {
        if (ventiladorCount === 0) setData('ventilacion', null);
    }, [ventiladorCount]);

    // Función para obtener información de un artículo
    function getArticuloInfo(collection, id, infoType) {
        if (Array.isArray(collection)) {
            return collection.find(item => item.id === id)?.[infoType] || null;
        }
        for (const categoria in collection) {
            const subCategoria = collection[categoria];
            if (Array.isArray(subCategoria)) {
                const item = subCategoria.find(item => item.id === id);
                if (item) return item[infoType];
            } else if (typeof subCategoria === 'object') {
                for (const subSubCategoria in subCategoria) {
                    const item = subCategoria[subSubCategoria].find(item => item.id === id);
                    if (item) return item[infoType];
                }
            }
        }
        return null;
    }

    // Componente de barra de progreso
    const ProgressBar = ({ puntuacionTotal }) => {
        const maxScore = 2500;
        const percentage = (puntuacionTotal / maxScore) * 100;

        let progressBarClass = '';
        if (percentage <= 20) {
            progressBarClass = 'bg-red-500';
        } else if (percentage <= 40) {
            progressBarClass = 'bg-yellow-500';
        } else if (percentage <= 70) {
            progressBarClass = 'bg-amber-400';
        } else {
            progressBarClass = 'bg-green-500';
        }

        return (
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div className={`${progressBarClass} h-full rounded-full`} style={{ width: `${percentage}%` }}></div>
            </div>
        );
    };

    // Verificación de selección de componentes esenciales
    const areEssentialComponentsSelected = () => {
        const essentialComponents = ['placa', 'cpu', 'disipador', 'ram', 'almacenamientoPrincipal', 'caja'];
        return essentialComponents.every(componente => data[componente] !== null);
    };

    // Mensaje cuando no hay opciones disponibles
    const noOptionsMessage = () => 'No hay opciones disponibles';

    return (
        <div className="min-h-screen flex flex-col gap-7 mb-20">
            <Head title="Configurador" />
            <div className='flex flex-col sm:flex-row justify-center pt-24 gap-4'>
                <h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center">Configurador de PC:</h2>
                <input
                    className='w-56 h-10 self-center rounded-md'
                    value={data.nombre}
                    placeholder='Nombre para la configuración...'
                    onChange={(e) => setData('nombre', e.target.value)}
                />
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
            {data.socket && (
                <div className='flex justify-center mt-8'>
                    <div className="w-9/12">
                        <div>
                            <p className='font-semibold text-2xl py-4'>Placa base*</p>
                            <Select
                                className='w-full rounded-md text-black border shadow-lg'
                                options={filteredArticulos.placas?.map(
                                    placa => ({
                                        value: placa.id,
                                        precio: placa.precio,
                                        puntuacion: placa.puntuacion,
                                        puntuacionPrecio: placa.puntuacionPrecio,
                                        label: placa.nombre,
                                        imagen: placa.fotos[0]?.imagen
                                    }))
                                    || []}
                                components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                styles={customStyles}
                                placeholder='Selecciona una placa base...'
                                noOptionsMessage={noOptionsMessage}
                                value={data.placa ?
                                    {
                                        value: data.placa,
                                        label: getArticuloInfo(articulos.placas, data.placa, "nombre"),
                                        imagen: getArticuloInfo(articulos.placas, data.placa, "fotos")[0]?.imagen
                                    }
                                    : null}
                                onChange={(selectedOption) => setData('placa', selectedOption.value)}
                            />
                        </div>
                    </div>
                </div>
            )}
            {data.placa && (
                <div className='flex flex-col lg:flex-row gap-14 max-w-all justify-center mt-8'>
                    <div className='rounded-lg w-all lg:w-2/6'>
                        <div>
                            <p className='font-semibold text-2xl py-4'>Procesador*</p>
                            <Select
                                className='w-full rounded-md text-black shadow-lg'
                                options={filteredArticulos.cpu?.map(cpu => ({ value: cpu.id, precio: cpu.precio, puntuacion: cpu.puntuacion, puntuacionPrecio: cpu.puntuacionPrecio, label: cpu.nombre, imagen: cpu.fotos[0]?.imagen })) || []}
                                components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                styles={customStyles}
                                placeholder='Selecciona un Procesador...'
                                noOptionsMessage={noOptionsMessage}
                                value={data.cpu ? { value: data.cpu, label: getArticuloInfo(articulos.cpu, data.cpu, "nombre"), imagen: getArticuloInfo(articulos.cpu, data.cpu, "fotos")[0]?.imagen } : null}
                                onChange={(selectedOption) => setData('cpu', selectedOption.value)}
                            />
                        </div>
                        <div>
                            <p className='font-semibold text-2xl py-4'>Disipador Cpu*</p>
                            <Select
                                className='w-full rounded-md text-black shadow-lg'
                                options={filteredArticulos.disipador?.map(disipador => ({ value: disipador.id, precio: disipador.precio, puntuacion: disipador.puntuacion, puntuacionPrecio: disipador.puntuacionPrecio, label: disipador.nombre, imagen: disipador.fotos[0]?.imagen })) || []}
                                components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                styles={customStyles}
                                placeholder='Selecciona un Disipador Cpu...'
                                noOptionsMessage={noOptionsMessage}
                                value={data.disipador ? { value: data.disipador, label: getArticuloInfo(articulos.disipador, data.disipador, "nombre"), imagen: getArticuloInfo(articulos.disipador, data.disipador, "fotos")[0]?.imagen } : null}
                                onChange={(selectedOption) => setData('disipador', selectedOption.value)}
                            />
                        </div>
                        <div>
                            <p className='font-semibold text-2xl py-4'>RAM*</p>
                            <Select
                                className='w-full rounded-md text-black shadow-lg'
                                options={filteredArticulos.ram?.map(ram => ({ value: ram.id, precio: ram.precio, puntuacion: ram.puntuacion, puntuacionPrecio: ram.puntuacionPrecio, label: ram.nombre, imagen: ram.fotos[0]?.imagen })) || []}
                                components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                styles={customStyles}
                                placeholder='Selecciona RAM...'
                                noOptionsMessage={noOptionsMessage}
                                value={data.ram ? { value: data.ram, label: getArticuloInfo(articulos.ram, data.ram, "nombre"), imagen: getArticuloInfo(articulos.ram, data.ram, "fotos")[0]?.imagen } : null}
                                onChange={(selectedOption) => setData('ram', selectedOption.value)}
                            />
                        </div>
                        <div>
                            <p className='font-semibold text-2xl py-4'>Almacenamiento principal*</p>
                            <Select
                                className='w-full rounded-md text-black shadow-lg'
                                options={filteredArticulos.almacenamientos?.map(almacenamiento => ({ value: almacenamiento.id, precio: almacenamiento.precio, puntuacion: almacenamiento.puntuacion, puntuacionPrecio: almacenamiento.puntuacionPrecio, label: almacenamiento.nombre, imagen: almacenamiento.fotos[0]?.imagen })) || []}
                                components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                styles={customStyles}
                                placeholder='Selecciona un Almacenamiento principal...'
                                noOptionsMessage={noOptionsMessage}
                                value={data.almacenamientoPrincipal ? { value: data.almacenamientoPrincipal, label: getArticuloInfo(articulos.almacenamientos, data.almacenamientoPrincipal, "nombre"), imagen: getArticuloInfo(articulos.almacenamientos, data.almacenamientoPrincipal, "fotos")[0]?.imagen } : null}
                                onChange={(selectedOption) => setData('almacenamientoPrincipal', selectedOption.value)}
                            />
                        </div>
                        <div>
                            <p className='font-semibold text-2xl py-4'>Almacenamiento secundario</p>
                            <div className='flex'>

                                <Select
                                    className='w-full rounded-md text-black shadow-lg'
                                    options={filteredArticulos.almacenamientos?.map(almacenamiento => ({ value: almacenamiento.id, precio: almacenamiento.precio, puntuacion: almacenamiento.puntuacion, puntuacionPrecio: almacenamiento.puntuacionPrecio, label: almacenamiento.nombre, imagen: almacenamiento.fotos[0]?.imagen })) || []}
                                    components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                    styles={customStyles}
                                    placeholder='Selecciona un Almacenamiento secundario...'
                                    noOptionsMessage={noOptionsMessage}
                                    value={data.almacenamientoSecundario ? { value: data.almacenamientoSecundario, label: getArticuloInfo(articulos.almacenamientos, data.almacenamientoSecundario, "nombre"), imagen: getArticuloInfo(articulos.almacenamientos, data.almacenamientoSecundario, "fotos")[0]?.imagen } : null}
                                    onChange={(selectedOption) => setData('almacenamientoSecundario', selectedOption.value)}
                                />
                                {data.almacenamientoSecundario && (
                                    <button onClick={() => limpiarSelect("almacenamientoSecundario")} className='p-2 bg-red-500 text-white rounded'><DeleteIcon /></button>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className='font-semibold text-2xl py-4'>Tarjeta gráfica</p>
                            <div className='flex'>
                                <Select
                                    className='w-full rounded-md text-black shadow-lg'
                                    options={articulos.graficas?.map(grafica => ({ value: grafica.id, precio: grafica.precio, puntuacion: grafica.puntuacion, puntuacionPrecio: grafica.puntuacionPrecio, label: grafica.nombre, imagen: grafica.fotos[0]?.imagen })) || []}
                                    components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                    styles={customStyles}
                                    placeholder='Selecciona una Tarjeta gráfica...'
                                    noOptionsMessage={noOptionsMessage}
                                    value={data.grafica ? { value: data.grafica, label: getArticuloInfo(articulos.graficas, data.grafica, "nombre"), imagen: getArticuloInfo(articulos.graficas, data.grafica, "fotos")[0]?.imagen } : null}
                                    onChange={(selectedOption) => setData('grafica', selectedOption.value)}
                                />
                                {data.grafica && (
                                    <button onClick={() => limpiarSelect("grafica")} className='p-2 bg-red-500 text-white rounded'><DeleteIcon /></button>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className='font-semibold text-2xl py-4'>Caja*</p>
                            <Select
                                className='w-full rounded-md text-black shadow-lg'
                                options={filteredArticulos.cajas?.map(caja => ({ value: caja.id, precio: caja.precio, puntuacion: caja.puntuacion, puntuacionPrecio: caja.puntuacionPrecio, label: caja.nombre, imagen: caja.fotos[0]?.imagen })) || []}
                                components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                styles={customStyles}
                                placeholder='Selecciona una Caja...'
                                noOptionsMessage={noOptionsMessage}
                                value={data.caja ? { value: data.caja, label: getArticuloInfo(articulos.cajas, data.caja, "nombre"), imagen: getArticuloInfo(articulos.cajas, data.caja, "fotos")[0]?.imagen } : null}
                                onChange={(selectedOption) => setData('caja', selectedOption.value)}
                            />
                        </div>
                        {data.caja && (
                            <div>
                                <p className='font-semibold text-2xl py-4'>Ventilación</p>
                                <div className='flex items-center'>
                                    <div className='w-full pr-5'>
                                        <Select
                                            className='w-full rounded-md text-black shadow-lg'
                                            options={articulos.ventiladores?.map(ventilador => ({ value: ventilador.id, precio: ventilador.precio, puntuacion: ventilador.puntuacion, puntuacionPrecio: ventilador.puntuacionPrecio, label: ventilador.nombre, imagen: ventilador.fotos[0]?.imagen })) || []}
                                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                            styles={customStyles}
                                            placeholder='Selecciona un Sistema de ventilación...'
                                            noOptionsMessage={noOptionsMessage}
                                            value={data.ventilacion ? { value: data.ventilacion, label: getArticuloInfo(articulos.ventiladores, data.ventilacion, "nombre"), imagen: getArticuloInfo(articulos.ventiladores, data.ventilacion, "fotos")[0]?.imagen } : null}
                                            onChange={(selectedOption) => setData('ventilacion', selectedOption.value)}
                                        />
                                    </div>
                                    {data.ventilacion && (
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={handleDecrement}
                                                disabled={ventiladorCount === 0}
                                                className={`px-3 py-1 ${ventiladorCount === 0 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold rounded`}
                                            >
                                                -
                                            </button>
                                            <span>{ventiladorCount}</span>
                                            <button
                                                onClick={handleIncrement}
                                                disabled={ventiladorCount === maxVentiladores}
                                                className={`px-3 py-1 ${ventiladorCount === maxVentiladores ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold rounded`}
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {areEssentialComponentsSelected() ? (
                            <Boton texto="Guardar Configuración" className="w-full"></Boton>
                        ) : (
                            <p className='text-xl py-5'>Configure los elementos obligatorios para poder guardar su configuración.</p>
                        )}
                    </div>
                    <div className='rounded-lg w-full lg:w-2/6 border shadow-xl p-5 flex flex-col gap-4 h-auto'>
                        <div className="flex flex-col justify-center items-center">
                            <div className="mt-4 relative flex items-center">
                                <p className="font-semibold text-2xl pt-5 pb-3">Potencial PCreate™</p>
                                <Tooltip title="Potencial PCreate™ indica cómo de cerca está su dispositivo de alcanzar el máximo posible de especificaciones establecido por nuestra empresa.">
                                    <HelpOutlineIcon
                                        className={`text-gray-400 h-5 w-5 cursor-pointer ml-1 ${showInfoPotencial ? 'text-gray-600' : ''}`}
                                        onMouseEnter={cambioInfoPotencial}
                                        onMouseLeave={cambioInfoPotencial}
                                    />
                                </Tooltip>
                            </div>
                            {areEssentialComponentsSelected() ? (
                                <p className='text-xl'>{porcentaje()}%</p>
                            ) : (
                                ""
                            )}
                            <ProgressBar puntuacionTotal={areEssentialComponentsSelected() ? puntuacionTotal : 0} />

                            {areEssentialComponentsSelected() ? (
                                <p className='text-xl py-5'>{calidadPrecioTotal()}</p>
                            ) : (
                                <p className='text-xl py-5'>Configure los elementos obligatorios para ver su Potencial.</p>
                            )}
                        </div>
                        <h2 className="text-center font-semibold text-3xl p-5">Resumen</h2>
                        <div>
                            <h3 className="font-semibold text-xl">Socket</h3>
                            <p className='px-5'>{getArticuloInfo(sockets, data.socket, "nombre")}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl">Placa base</h3>
                            <div className="flex justify-between px-5">
                                <p>{getArticuloInfo(articulos, data.placa, "nombre")}</p>
                                <p>{getArticuloInfo(articulos, data.placa, "puntuacion")}Ptos ({getArticuloInfo(articulos, data.placa, "puntuacionPrecio")}Ptos/€) <strong>{getArticuloInfo(articulos, data.placa, "precio")}€</strong></p>
                            </div>
                        </div>
                        {data.cpu && (
                            <div>
                                <h3 className="font-semibold text-xl">CPU</h3>
                                <div className="flex justify-between px-5">
                                    <p>{getArticuloInfo(articulos, data.cpu, "nombre")}</p>
                                    <p>{getArticuloInfo(articulos, data.cpu, "puntuacion")}Ptos ({getArticuloInfo(articulos, data.cpu, "puntuacionPrecio")}Ptos/€) <strong>{getArticuloInfo(articulos, data.cpu, "precio")}€</strong></p>
                                </div>
                            </div>
                        )}
                        {data.disipador && (
                            <div>
                                <h3 className="font-semibold text-xl">Disipador CPU</h3>
                                <div className="flex justify-between px-5">
                                    <p>{getArticuloInfo(articulos, data.disipador, "nombre")}</p>
                                    <p>{getArticuloInfo(articulos, data.disipador, "puntuacion")}Ptos ({getArticuloInfo(articulos, data.disipador, "puntuacionPrecio")}Ptos/€) <strong>{getArticuloInfo(articulos, data.disipador, "precio")}€</strong></p>
                                </div>
                                {showCoolingWarning &&
                                    <div className="bg-orange-500 text-white p-2 rounded font-bold">
                                        <p className='justify-center text-center'>Advertencia: Debería elegir un modelo de refrigeración líquida para el procesador seleccionado debido a su alto consumo.</p>
                                    </div>
                                }
                            </div>
                        )}
                        {data.ram && (
                            <div>
                                <h3 className="font-semibold text-xl">Modulos de RAM</h3>
                                <div className="flex justify-between px-5">
                                    <p>{getArticuloInfo(articulos, data.ram, "nombre")}</p>
                                    <p>{getArticuloInfo(articulos, data.ram, "puntuacion")}Ptos ({getArticuloInfo(articulos, data.ram, "puntuacionPrecio")}Ptos/€) <strong>{getArticuloInfo(articulos, data.ram, "precio")}€</strong></p>
                                </div>
                                {filteredArticulos.ram.find(ram => ram.id === data.ram)?.datos.ddr < filteredArticulos.placas.find(placa => placa.id === data.placa)?.datos.ddrmax && (
                                    <div className="bg-orange-500 text-white p-2 rounded font-bold">
                                        <p className='justify-center text-center'>Advertencia: El tipo de RAM es inferior a la máxima soportada por su placa. Considere cambiar su placa a un modelo de inferior caracteristicas o su RAM a una superior.</p>
                                    </div>
                                )}
                            </div>
                        )}
                        {data.almacenamientoPrincipal && (
                            <div>
                                <h3 className="font-semibold text-xl">Almacenamiento Principal</h3>
                                <div className="flex justify-between px-5">
                                    <p>{getArticuloInfo(articulos, data.almacenamientoPrincipal, "nombre")}</p>
                                    <p>{getArticuloInfo(articulos, data.almacenamientoPrincipal, "puntuacion")}Ptos ({getArticuloInfo(articulos, data.almacenamientoPrincipal, "puntuacionPrecio")}Ptos/€) <strong>{getArticuloInfo(articulos, data.almacenamientoPrincipal, "precio")}€</strong></p>
                                </div>
                                {showAlmacenamientoPrincipalWarning &&
                                    <div className="bg-orange-500 text-white p-2 rounded font-semibold justify-normal px-5 ">
                                        <p className='justify-center text-center'>Advertencia: Debería considerar elegir un modelo SSD para agilizar su navegación con el equipo.</p>
                                    </div>
                                }
                            </div>
                        )}
                        {data.almacenamientoSecundario && (
                            <div>
                                <h3 className="font-semibold text-xl">Almacenamiento Secundario</h3>
                                <div className="flex justify-between px-5">
                                    <p>{getArticuloInfo(articulos, data.almacenamientoSecundario, "nombre")}</p>
                                    <p>{getArticuloInfo(articulos, data.almacenamientoSecundario, "puntuacion")}Ptos ({getArticuloInfo(articulos, data.almacenamientoSecundario, "puntuacionPrecio")}Ptos/€) <strong>{getArticuloInfo(articulos, data.almacenamientoSecundario, "precio")}€</strong></p>
                                </div>
                            </div>
                        )}
                        {data.grafica && (
                            <div>
                                <h3 className="font-semibold text-xl">Tarjeta Gráfica</h3>
                                <div className="flex justify-between px-5">
                                    <p>{getArticuloInfo(articulos, data.grafica, "nombre")}</p>
                                    <p>{getArticuloInfo(articulos, data.grafica, "puntuacion")}Ptos ({getArticuloInfo(articulos, data.grafica, "puntuacionPrecio")}Ptos/€) <strong>{getArticuloInfo(articulos, data.grafica, "precio")}€</strong></p>
                                </div>
                            </div>
                        )}
                        {data.caja && (
                            <div>
                                <h3 className="font-semibold text-xl">Caja</h3>
                                <div className="flex justify-between px-5">
                                    <p>{getArticuloInfo(articulos, data.caja, "nombre")}</p>
                                    <p>{getArticuloInfo(articulos, data.caja, "puntuacion")}Ptos ({getArticuloInfo(articulos, data.caja, "puntuacionPrecio")}Ptos/€) <strong>{getArticuloInfo(articulos, data.caja, "precio")}€</strong></p>
                                </div>
                            </div>
                        )}
                        {data.ventilacion && (
                            <div>
                                <h3 className="font-semibold text-xl">Ventilacion</h3>
                                <div className="flex justify-between px-5">
                                    <p>{getArticuloInfo(articulos, data.ventilacion, "nombre")} <strong>x{ventiladorCount}</strong></p>
                                    <p>{getArticuloInfo(articulos, data.ventilacion, "puntuacion") * ventiladorCount}Ptos ({getArticuloInfo(articulos, data.ventilacion, "puntuacionPrecio")}Ptos/€) <strong>{getArticuloInfo(articulos, data.ventilacion, "precio") * ventiladorCount}€</strong></p>
                                </div>
                            </div>
                        )}

                        <div className="mt-auto text-center">
                            <p className="font-semibold text-2xl">Total</p>
                            <p className='text-3xl pt-5'>{precioTotal}€</p>
                        </div>
                        {areEssentialComponentsSelected() ? (
                            <BotonGrande texto="Añadir al carrito"></BotonGrande>
                        ) : (
                            <p className='text-xl py-5 text-center'>Configure los elementos obligatorios para poder añadir al carrito.</p>
                        )}
                    </div>

                </div>
            )}
        </div>
    )
}
