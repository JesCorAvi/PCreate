import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated() {

    return (
        <div className="min-h-16 bg-black text-center p-5" >
            <h2 className="text-white text-2xl pb-4 font-semibold">PCreate</h2>
            <div className="min-h-16 bg-black flex justify-around">
                <ul className="text-left">
                    <li className="text-white font-semibold p-2">Política de privacidad</li>
                    <li className="text-white pl-3">Política de cookies.</li>
                    <li className="text-white pl-3">Tratamiento de datos.</li>
                </ul>
                <ul className="text-left">
                    <li className="text-white font-semibold p-2">Información de contacto</li>
                    <li className="text-white pl-3">Ejemplo@pcreate.es</li>
                    <li className="text-white pl-3">644557734</li>
                </ul>
                <ul className="text-left">
                    <li className="text-white font-semibold p-2">Redes sociales</li>
                    <li className="text-white underline pl-3"><a href="">Facebook</a></li>
                    <li className="text-white underline pl-3"><a href="">Instagram</a></li>
                    <li className="text-white underline pl-3"><a href="">Twitter</a></li>

                </ul>
            </div>
        </div>
    );
}