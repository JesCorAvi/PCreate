import { Link } from '@inertiajs/react';

export default function Footer() {
    function abrirVentana(url) {
        window.open(url, '_blank', 'width=800,height=600');
    }
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
                    <li className="text-white underline pl-3 flex items-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook Logo" className="mr-2 w-4 h-4" />
                        <a href='' onClick={() => abrirVentana('https://www.facebook.com/pccomponentes/?locale=es_ES')}>Facebook</a>
                    </li>
                    <li className="text-white underline pl-3 flex items-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo" className="mr-2 w-4 h-4" />
                        <a href="" onClick={() => abrirVentana('https://www.instagram.com/pccomponentes/?hl=es')}>Instagram</a>
                    </li>
                    <li className="text-white underline pl-3 flex items-center">
                        <img src="https://www.debate.com.mx/__export/1693690209431/sites/debate/img/2023/07/24/twitter-x.jpg_346753400.jpg" alt="Twitter Logo" className="mr-2 w-4 h-4" />
                        <a href="" onClick={() => abrirVentana('https://x.com/pccomponentes?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor&mx=2')}>X</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
