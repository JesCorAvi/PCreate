import { useState } from 'react';
import { router } from '@inertiajs/react'
import Boton from '@/Components/Boton';
import validation from '@/validation.json';
import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import Alertas from '@/Components/Alertas';
import { Link } from '@inertiajs/react';

export default function FormularioSocket({ user, categorias}) {
    const [imagenPrincipal, setImagenPrincipal] = useState(null);
    const [socket, setSocket] = useState('');
    const [errors, setErrors] = useState({});

    const handleImagenPrincipalChange = (event) => {
        const file = event.target.files[0];
        setImagenPrincipal(URL.createObjectURL(file));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('socket', socket);

        router.post('/socket/creado', formData)
    };

    function validar(target) {
        if (target.validity.valid) {
            target.classList.remove('border-red-500');
            setErrors(prevErrors => ({ ...prevErrors, [target.name]: null }));
        } else {
            target.classList.add('border-red-500');
            let errorMessage = '';
            if (target.validity.valueMissing) {
                errorMessage = 'Este campo es requerido';
            } else if (target.validity.patternMismatch) {
                errorMessage = 'Formato incorrecto';
            } else if (target.validity.tooLong) {
                errorMessage = `Máximo ${target.maxLength} caracteres`;
            }
            setErrors(prevErrors => ({ ...prevErrors, [target.name]: errorMessage }));
        }
    };

    return (
        <div name="socket" className="min-h-screen">
            <LayoutLogueado
                user={user}
                categorias = {categorias}
                header={<h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center">Crear Socket</h2>}

            />
                        <Link href={"/perfil?tabla=Sockets"} className="underline px-10">Volver al dashboard</Link>

        <Alertas></Alertas>
            <form className="max-w-2xl mx-auto pt-10" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Socket</label>
                    <input
                        type="text"
                        name="nombre"
                        maxLength="120"
                        pattern={validation.nombre}
                        value={socket}
                        onChange={(e) => setSocket(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        onBlur={(e) => validar(e.target)}
                    />
                    {errors.nombre && <p className="text-red-800 py-2">{errors.nombre}</p>}
                </div>
                <div name="imagen" className="flex justify-center items-center p-10">
                    <div className="mr-2 w-96 h-96">
                        <input type="hidden" name="tipo" value="socket" />
                        <label htmlFor="imagen" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen principal</label>
                        <input type="file" name="imagen" id="imagen" onChange={handleImagenPrincipalChange} className="hidden" required />
                        <label htmlFor="imagen" className="cursor-pointer block bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {imagenPrincipal ? <img src={imagenPrincipal} alt="Imagen Principal" className="w-full h-auto" /> : "Seleccionar imagen"}
                        </label>
                    </div>
                </div>
                <Boton tipo="submit" texto="Crear Artículo"></Boton>
            </form>
            <Footer />
        </div>
    );
}
