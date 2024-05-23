import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Socket from './Socket';
import Select from 'react-select';
import { useForm } from '@inertiajs/react';
import BotonGrande from './BotonGrande';
import Boton from './Boton';

export default function Configurador({ user, sockets, articulos }) {
    console.log(articulos)
    const [showCoolingWarning, setShowCoolingWarning] = useState(false);
    const [showAlmacenamientoPrincipalWarning, setShowAlmacenamientoPrincipalWarning] = useState(false);

    const [ventiladorCount, setVentiladorCount] = useState(1);
    const [maxVentiladores, setMaxVentiladores] = useState(0);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [puntuacionTotal, setPuntuacionTotal] = useState(0);

    const [filteredArticulos, setFilteredArticulos] = useState({
        placas: [],
        cpu: [],
        disipador: [],
        ram: [],
        cajas: [],
    });
    const { data, setData, post, errors, reset } = useForm({
        nombre: "PC de " + user.name + " Nº" + new Date().getTime().toString().slice(-4), socket: null,
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

    const limpiarSelect = (opcion) => setData(opcion, null);

    const calcularPrecioTotal = () => {
        let total = 0;
        const componentes = ['placa', 'cpu', 'disipador', 'ram', 'almacenamientoPrincipal', 'almacenamientoSecundario', 'grafica', 'caja', 'ventilacion'];
        componentes.forEach(componente => {
            if (data[componente]) {
                const precio = parseFloat(getArticuloInfo(articulos, data[componente], "precio"));
                total += (componente === 'ventilacion') ? precio * ventiladorCount : precio;
            }
        });
        return total.toFixed(2);
    };

    const calcularPuntuacionTotal = () => {
        let total = 0;
        const componentes = ['placa', 'cpu', 'disipador', 'ram', 'almacenamientoPrincipal', 'almacenamientoSecundario', 'grafica', 'caja', 'ventilacion'];
        componentes.forEach(componente => {
            if (data[componente]) {
                const puntuacion = parseFloat(getArticuloInfo(articulos, data[componente], "puntuacion"));
                total += (componente === 'ventilacion') ? puntuacion * ventiladorCount : puntuacion;
            }
        });
        return total;
    };

    useEffect(() => [setPrecioTotal(calcularPrecioTotal()), setPuntuacionTotal(calcularPuntuacionTotal())][data, ventiladorCount]);

    useEffect(() => {
        if (data.cpu && data.disipador) {
            const cpuSeleccionado = filteredArticulos.cpu.find(cpu => cpu.id === data.cpu);
            const disipadorSeleccionado = filteredArticulos.disipador.find(disipador => disipador.id === data.disipador);
            if (cpuSeleccionado && disipadorSeleccionado && parseInt(cpuSeleccionado.datos.consumo) >= 140 && disipadorSeleccionado.datos.liquida === false) {
                setShowCoolingWarning(true);
            } else {
                setShowCoolingWarning(false);
            }
        }
    }, [data.cpu, data.disipador]);
    useEffect(() => {
        if (data.almacenamientoPrincipal) {
            const almacenamientoPrSeleccionado = articulos.almacenamientos.find(almacenamiento => almacenamiento.id === data.almacenamientoPrincipal);
            if (almacenamientoPrSeleccionado.datos.clase === "Mecánico") {
                setShowAlmacenamientoPrincipalWarning(true);
            } else {
                setShowAlmacenamientoPrincipalWarning(false);
            }
        }
    }, [data.almacenamientoPrincipal]);

    useEffect(() => {
        if (data.socket) {
            const { placas = [], cpu = [], disipador = [] } = articulos;
            setFilteredArticulos({
                placas: placas[data.socket] || [],
                cpu: cpu[data.socket] || [],
                disipador: disipador[data.socket] || [],
                ram: [],
                cajas: [],
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

    useEffect(() => {
        if (data.placa) {
            const placaSeleccionada = filteredArticulos.placas.find(placa => placa.id === data.placa);
            if (placaSeleccionada) {
                const { ddrmax, clase } = placaSeleccionada.datos;
                setFilteredArticulos(prevState => ({
                    ...prevState,
                    ram: (ddrmax === "5" ? [...(articulos.ram.ddr4 || []), ...(articulos.ram.ddr5 || [])] : articulos.ram.ddr4) || [],
                    cajas: (clase === 'Micro-ATX' ? [...(articulos.cajas.atx || []), ...(articulos.cajas.micro_atx || [])] : articulos.cajas.atx) || [],
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

    const CustomOption = ({ data, innerProps }) => (
        <div className='flex justify-between hover:bg-slate-200 align-middle cursor-pointer items-center p-2' {...innerProps}>
            <div className='flex items-center'>
                {data.imagen && <img className='w-20 h-20' src={"http://127.0.0.1:8000/storage/uploads/articulos/" + data.imagen} alt={data.label} />}
                <p className='ml-2'>{data.label}</p>
            </div>
            <div className='flex items-center'>
                <p className='ml-2 text-right'>{data.puntuacion} Ptos({data.puntuacionPrecio} Ptos/€)</p>
                <p className='ml-2 text-right font-semibold'>{data.precio}€</p>

            </div>
        </div>
    );

    const CustomSingleValue = ({ data }) => (
        <div className='flex align-middle items-center'>
            {data.imagen && <img className='w-20 h-20' src={"http://127.0.0.1:8000/storage/uploads/articulos/" + data.imagen} alt={data.label} />}
            <span className='ml-2'>{data.label}</span>
        </div>
    );

    const customStyles = {
        control: (provided) => ({ ...provided, display: 'flex', alignItems: 'center', padding: '0.25rem', minHeight: '2.5rem' }),
        singleValue: (provided) => ({ ...provided, display: 'flex', alignItems: 'center', padding: '0.25rem', margin: 0 }),
        valueContainer: (provided) => ({ ...provided, display: 'flex', alignItems: 'center', padding: '0' }),
        input: (provided) => ({ ...provided, margin: 0, padding: 0 }),
    };

    useEffect(() => {
        if (data.caja) {
            const cajaSeleccionada = articulos.cajas.atx.find(caja => caja.id === data.caja) || articulos.cajas.micro_atx.find(caja => caja.id === data.caja);
            if (cajaSeleccionada) setMaxVentiladores(parseInt(cajaSeleccionada.datos.ventiladores));
        } else {
            setMaxVentiladores(0);
        }
    }, [data.caja]);

    const handleIncrement = () => {
        if (ventiladorCount < maxVentiladores) setVentiladorCount(prevCount => prevCount + 1);
    };

    const handleDecrement = () => {
        if (ventiladorCount > 1) {
            setVentiladorCount(prevCount => prevCount - 1);
        } else {
            setVentiladorCount(0);
            setData('ventilacion', null);
        }
    };

    useEffect(() => {
        if (ventiladorCount === 0) setData('ventilacion', null);
    }, [ventiladorCount]);

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

    const areEssentialComponentsSelected = () => {
        const essentialComponents = ['placa', 'cpu', 'disipador', 'ram', 'almacenamientoPrincipal', 'caja'];
        return essentialComponents.every(componente => data[componente] !== null);
    };
    const noOptionsMessage = () => 'No hay opciones disponibles';


    return (
        <div className="min-h-screen flex flex-col gap-7 mb-20">
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
                                className='w-full rounded-md text-black'
                                options={filteredArticulos.placas?.map(placa => ({ value: placa.id, precio: placa.precio, puntuacion: placa.puntuacion, puntuacionPrecio: placa.puntuacionPrecio, label: placa.nombre, imagen: placa.fotos[0]?.imagen })) || []}
                                components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                styles={customStyles}
                                placeholder='Selecciona una placa base...'
                                noOptionsMessage={noOptionsMessage}
                                value={data.placa ? { value: data.placa, label: filteredArticulos.placas.find(placa => placa.id === data.placa)?.nombre, imagen: filteredArticulos.placas.find(placa => placa.id === data.placa)?.fotos[0]?.imagen } : null}
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
                                className='w-full rounded-md text-black'
                                options={filteredArticulos.cpu?.map(cpu => ({ value: cpu.id, label: cpu.nombre, imagen: cpu.fotos[0]?.imagen })) || []}
                                components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                styles={customStyles}
                                placeholder='Selecciona un Procesador...'
                                noOptionsMessage={noOptionsMessage}
                                value={data.cpu ? { value: data.cpu, label: filteredArticulos.cpu.find(cpu => cpu.id === data.cpu)?.nombre, imagen: filteredArticulos.cpu.find(cpu => cpu.id === data.cpu)?.fotos[0]?.imagen } : null}
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
                                value={data.disipador ? { value: data.disipador, label: filteredArticulos.disipador.find(disipador => disipador.id === data.disipador)?.nombre, imagen: filteredArticulos.disipador.find(disipador => disipador.id === data.disipador)?.fotos[0]?.imagen } : null}
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
                                value={data.ram ? { value: data.ram, label: filteredArticulos.ram.find(ram => ram.id === data.ram)?.nombre, imagen: filteredArticulos.ram.find(ram => ram.id === data.ram)?.fotos[0]?.imagen } : null}
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
                                value={data.almacenamientoPrincipal ? { value: data.almacenamientoPrincipal, label: articulos.almacenamientos.find(almacenamiento => almacenamiento.id === data.almacenamientoPrincipal)?.nombre, imagen: articulos.almacenamientos.find(almacenamiento => almacenamiento.id === data.almacenamientoPrincipal)?.fotos[0]?.imagen } : null}
                                onChange={(selectedOption) => setData('almacenamientoPrincipal', selectedOption.value)}
                            />
                        </div>
                        <div>
                            <p className='font-semibold text-2xl py-4'>Almacenamiento secundario</p>
                            <div className='flex'>

                                <Select
                                    className='w-full rounded-md text-black'
                                    options={articulos.almacenamientos?.map(almacenamiento => ({ value: almacenamiento.id, label: almacenamiento.nombre, imagen: almacenamiento.fotos[0]?.imagen })) || []}
                                    components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                    styles={customStyles}
                                    placeholder='Selecciona un Almacenamiento secundario...'
                                    noOptionsMessage={noOptionsMessage}
                                    value={data.almacenamientoSecundario ? { value: data.almacenamientoSecundario, label: articulos.almacenamientos.find(almacenamiento => almacenamiento.id === data.almacenamientoSecundario)?.nombre, imagen: articulos.almacenamientos.find(almacenamiento => almacenamiento.id === data.almacenamientoSecundario)?.fotos[0]?.imagen } : null}
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
                                    className='w-full rounded-md text-black'
                                    options={articulos.graficas?.map(grafica => ({ value: grafica.id, label: grafica.nombre, imagen: grafica.fotos[0]?.imagen })) || []}
                                    components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                    styles={customStyles}
                                    placeholder='Selecciona una Tarjeta gráfica...'
                                    noOptionsMessage={noOptionsMessage}
                                    value={data.grafica ? { value: data.grafica, label: articulos.graficas.find(grafica => grafica.id === data.grafica)?.nombre, imagen: articulos.graficas.find(grafica => grafica.id === data.grafica)?.fotos[0]?.imagen } : null}
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
                                className='w-full rounded-md text-black'
                                options={filteredArticulos.cajas?.map(caja => ({ value: caja.id, label: caja.nombre, imagen: caja.fotos[0]?.imagen })) || []}
                                components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                styles={customStyles}
                                placeholder='Selecciona una Caja...'
                                noOptionsMessage={noOptionsMessage}
                                value={data.caja ? { value: data.caja, label: filteredArticulos.cajas.find(caja => caja.id === data.caja)?.nombre, imagen: filteredArticulos.cajas.find(caja => caja.id === data.caja)?.fotos[0]?.imagen } : null}
                                onChange={(selectedOption) => setData('caja', selectedOption.value)}
                            />
                        </div>
                        {data.caja && (
                            <div>
                                <p className='font-semibold text-2xl py-4'>Ventilación</p>
                                <div className='flex items-center'>
                                    <div className='w-full pr-5'>
                                        <Select
                                            className='w-full rounded-md text-black'
                                            options={articulos.ventiladores?.map(ventilacion => ({ value: ventilacion.id, label: ventilacion.nombre, imagen: ventilacion.fotos[0]?.imagen })) || []}
                                            components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                            styles={customStyles}
                                            placeholder='Selecciona un Sistema de ventilación...'
                                            noOptionsMessage={noOptionsMessage}
                                            value={data.ventilacion ? { value: data.ventilacion, label: articulos.ventiladores.find(ventilacion => ventilacion.id === data.ventilacion)?.nombre, imagen: articulos.ventiladores.find(ventilacion => ventilacion.id === data.ventilacion)?.fotos[0]?.imagen } : null}
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
                    <div className='rounded-lg w-full lg:w-2/6 border shadow-md p-5 flex flex-col gap-4 h-auto'>
                        <div className=" text-center">
                            <p className="font-semibold text-2xl p-5">Potencial PCreate™ </p>
                            <ProgressBar puntuacionTotal={areEssentialComponentsSelected() ? puntuacionTotal : 0} />

                            {areEssentialComponentsSelected() ? (
                                <p className='text-xl py-5'>{puntuacionTotal}Ptos ({(puntuacionTotal / precioTotal).toFixed(2)} Ptos/€)</p>
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
                                    <div className="bg-orange-500 text-white p-2 rounded">
                                        Advertencia: Debería elegir un modelo de refrigeración líquida para el procesador seleccionado debido a su alto consumo.
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
                                    <div className="bg-orange-500 text-white p-2 rounded">
                                        Advertencia: Debería considerar elegir un modelo SSD para agilizar su navegación con el equipo.
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
                                    <p>x{ventiladorCount} {getArticuloInfo(articulos, data.ventilacion, "nombre")}</p>
                                    <p>{getArticuloInfo(articulos, data.ventilacion, "puntuacion") * ventiladorCount}Ptos ({getArticuloInfo(articulos, data.ventilacion, "puntuacionPrecio")}Ptos/€) <strong>{getArticuloInfo(articulos, data.ventilacion, "precio") * ventiladorCount}€</strong></p>
                                </div>
                            </div>
                        )}

                        <div className="mt-auto text-center">
                            <p className="font-semibold text-2xl">Total</p>
                            <p className='text-xl'>{precioTotal}€</p>
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
