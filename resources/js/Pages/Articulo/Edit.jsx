import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import FormularioPlaca from '@/Components/Formularios/Editar/FormularioPlaca';
import FormularioCpu from '@/Components/Formularios/Editar/FormularioCpu';
import FormularioRam from '@/Components/Formularios/Editar/FormularioRam';
import FormularioGrafica from '@/Components/Formularios/Editar/FormularioGrafica';
import FormularioDisipador from '@/Components/Formularios/Editar/FormularioDisipador';
import FormularioAlmacenamiento from '@/Components/Formularios/Editar/FormularioAlmacenamiento';
import FormularioFuente from '@/Components/Formularios/Editar/FormularioFuente';
import FormularioCaja from '@/Components/Formularios/Editar/FormularioCaja';
import FormularioVentilador from '@/Components/Formularios/Editar/FormularioVentilador';
import Alertas from '@/Components/Alertas';
import { Head, Link } from '@inertiajs/react';


export default function Show({ auth, categorias, articulo, marcas, sockets }) {
    <Alertas></Alertas>

    let Formulario;
    switch (articulo.categoria.nombre) {
        case "Placa base":
            Formulario = FormularioPlaca;
            break;
        case "Tarjeta gráfica":
            Formulario = FormularioGrafica;
            break;
        case "RAM":
            Formulario = FormularioRam;
            break;
        case "Fuente de alimentación":
            Formulario = FormularioFuente;
            break;
        case "CPU":
            Formulario = FormularioCpu;
            break;
        case "Disipador de CPU":
            Formulario = FormularioDisipador;
            break;
        case "Caja":
            Formulario = FormularioCaja;
            break;
        case "Ventilador":
            Formulario = FormularioVentilador;
            break;
        case "Almacenamiento":
            Formulario = FormularioAlmacenamiento;
            break;

    }

    return (
        <>
            <Head title="Editar Artículo" />
            <LayoutLogueado
                user={auth.user}
                header={<h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center"></h2>}
                categorias={categorias}
            />
                        <Link href={"/perfil?tabla=Articulos"} className="underline px-10">Volver al dashboard</Link>

            <Formulario
                articulo={articulo}
                marcas={marcas}
                sockets={sockets}

            ></Formulario>
            <Footer></Footer>
        </>
    );
}
