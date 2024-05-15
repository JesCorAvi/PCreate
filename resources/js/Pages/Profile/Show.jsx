import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';

import { Head, Link } from '@inertiajs/react';
import Edit from '../../Components/Edit';
import { useState } from 'react';
import Datos from '@/Components/Datos';
import Pedidos from '@/Components/Pedidos';
import Direcciones from '@/Components/Direcciones';
import Alertas from '@/Components/Alertas';
import ShowUsuario from '@/Components/ShowUsuario';
import AdminDashboard from '@/Components/AdminDashboard';


export default function Show({ auth, mustVerifyEmail, status, categorias, avatar, pedidos, domicilios, provincias, facturas }) {
    return (
        <div>
            <LayoutLogueado
                user={auth.user}
                header={<h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center">Mi cuenta</h2>}
                categorias={categorias}
            >
                <Head title="Tienda" />
            </LayoutLogueado>
            <Alertas></Alertas>
            {(auth.user.role === "user" && auth.user.id != 1 ) ? (
                <ShowUsuario
                    avatar={avatar}
                    pedidos={pedidos}
                    domicilios={domicilios}
                    provincias={provincias}
                    mustVerifyEmail={mustVerifyEmail}
                    facturas = {facturas}
                ></ShowUsuario>
            )
            : (
                <AdminDashboard/>
            )
        }
            <Footer />
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </div>
    );
}


