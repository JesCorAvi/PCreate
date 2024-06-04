import { Link} from '@inertiajs/react';

export default function Footer() {

    return (
        <div className="min-h-16 bg-black text-center p-5 z-20 " >
            <h2 className="text-white text-2xl pb-4 font-semibold">PCreate</h2>
            <div className="min-h-16 bg-black flex justify-around">
                <ul className="text-left">
                    <li className="text-white font-semibold p-2">
                        Política de privacidad
                    </li>
                    <li className="text-white pl-3 underline">
                        <Link href="sobre-nosotros#cookies">Política de cookies.</Link>
                    </li>
                    <li className="text-white pl-3 underline">
                        <Link href="sobre-nosotros#datos">Tratamiento de datos.</Link>
                    </li>
                </ul>
                <ul className="text-left">
                    <li className="text-white font-semibold p-2">Información de contacto</li>
                    <li className="text-white pl-3 underline">
                        <Link href="sobre-nosotros#quienesSomos">¿Quiénes somos?</Link>
                    </li>
                    <li className="text-white pl-3">soporte@pcreate.net</li>
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
