import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import { Head, Link } from '@inertiajs/react';

export default function Info({ auth, categorias }) {
    return (
        <>
            <LayoutLogueado
                user={auth.user}
                categorias={categorias}
                header={<h2 className="font-semibold text-4xl text-gray-800 leading-tight text-center">Sobre Nosotros</h2>}
            >
            </LayoutLogueado>
            <Head title="Sobre Nosotros" />
            <article className="mx-auto max-w-4xl p-4">
                <section className="mb-8">
                    <h2 id="sobreNosotros" className='text-center font-semibold text-3xl mb-4'>¿Quiénes somos?</h2>
                    <div className="flex flex-wrap items-center mb-4">
                        <img src="/assets/info1.jpg" alt="Motherboard" className="w-1/2 lg:w-1/3 rounded-lg shadow-lg mb-4 lg:mb-0" />
                        <div className="w-full lg:w-2/3 px-4">
                            <p className="text-lg leading-relaxed">PCreate se fundó en 2022 con la misión de proporcionar a los entusiastas de la tecnología las herramientas necesarias para construir y optimizar sus propios PCs. Desde nuestro inicio, hemos ayudado a miles de clientes a diseñar configuraciones personalizadas que se ajustan a sus necesidades y presupuestos.</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center mb-4">
                        <div className="w-full lg:w-2/3 px-4">
                            <p className="text-lg leading-relaxed">En 2023, lanzamos nuestra innovadora herramienta de tasación que evalúa la calidad-precio de las configuraciones y el Potencial PCreate™. Este potencial indica cuán cerca está su dispositivo de alcanzar el máximo rendimiento según nuestros estándares.</p>
                        </div>
                        <img src="/assets/info2.jpg" alt="CPU" className="w-1/2 lg:w-1/3 rounded-lg shadow-lg mb-4 lg:mb-0" />
                    </div>
                    <div className="flex flex-wrap items-center mb-4">
                        <img src="/assets/info3.jpg" alt="RAM" className="w-1/2 lg:w-1/3 rounded-lg shadow-lg mb-4 lg:mb-0" />
                        <div className="w-full lg:w-2/3 px-4">
                            <p className="text-lg leading-relaxed">En 2024, nos expandimos para ofrecer servicios de configuración compartida, permitiendo a los usuarios compartir sus configuraciones únicas con la comunidad global, inspirando y asistiendo a otros en sus proyectos.</p>
                        </div>
                    </div>
                </section>
                <section className="mb-8">
                    <h2 id="cookies" className='text-center font-semibold text-3xl mb-4'>Políticas de Cookies</h2>
                    <div className="w-full  px-4">
                            <p className="text-lg leading-relaxed">En PCreate, utilizamos cookies para mejorar su experiencia en nuestro sitio web. Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Nos permiten recordar sus preferencias y personalizar su experiencia en función de sus visitas anteriores.</p>
                            <p className="text-lg leading-relaxed">Utilizamos diferentes tipos de cookies en nuestro sitio web:</p>
                            <ul className="list-disc list-inside text-lg leading-relaxed">
                                <li><strong>Cookies esenciales:</strong> Estas cookies son necesarias para que el sitio web funcione y no se pueden desactivar en nuestros sistemas. Sin ellas, algunos servicios o funciones podrían no estar disponibles.</li>
                                <li><strong>Cookies de rendimiento:</strong> Estas cookies recopilan información sobre cómo los visitantes usan nuestro sitio web, por ejemplo, qué páginas visitan con más frecuencia. Esta información nos ayuda a mejorar el funcionamiento del sitio.</li>
                                <li><strong>Cookies de funcionalidad:</strong> Estas cookies permiten que el sitio web recuerde las elecciones que hace (como su nombre de usuario, idioma o región) y proporcionan características mejoradas y más personales.</li>
                                <li><strong>Cookies de publicidad:</strong> Estas cookies se utilizan para entregar anuncios más relevantes para usted y sus intereses. También se utilizan para limitar la cantidad de veces que ve un anuncio y para ayudar a medir la eficacia de las campañas publicitarias.</li>
                            </ul>
                            <p className="text-lg leading-relaxed">Puede controlar y gestionar las cookies de varias maneras. La mayoría de los navegadores web están configurados para aceptar cookies de forma predeterminada, pero puede cambiar la configuración para bloquear las cookies o alertarle cuando se envíen cookies a su dispositivo. Consulte las instrucciones de su navegador para aprender más sobre cómo ajustar o modificar la configuración de cookies.</p>
                        </div>

                </section>
                <section className="mb-8">
                    <h2 id="datos" className='text-center font-semibold text-3xl mb-4'>Tratamiento de Datos</h2>
                        <div className="w-full px-4">
                            <p className="text-lg leading-relaxed">En PCreate, nos tomamos muy en serio la privacidad y la protección de sus datos personales. La recopilación y el tratamiento de sus datos se llevan a cabo conforme a la normativa vigente en materia de protección de datos.</p>
                            <p className="text-lg leading-relaxed">Recopilamos datos personales cuando utiliza nuestros servicios, se registra en nuestro sitio web, realiza una compra o se pone en contacto con nuestro equipo de atención al cliente. Estos datos pueden incluir su nombre, dirección, correo electrónico, número de teléfono y detalles de pago.</p>
                            <p className="text-lg leading-relaxed">Utilizamos sus datos personales para los siguientes fines:</p>
                            <ul className="list-disc list-inside text-lg leading-relaxed">
                                <li>Procesar y gestionar sus pedidos.</li>
                                <li>Proporcionarle asistencia al cliente.</li>
                                <li>Enviar comunicaciones relacionadas con su cuenta o transacciones.</li>
                                <li>Mejorar nuestro sitio web y servicios.</li>
                                <li>Realizar análisis y estudios de mercado.</li>
                                <li>Personalizar su experiencia en nuestro sitio web.</li>
                            </ul>
                            <p className="text-lg leading-relaxed">Nos comprometemos a proteger sus datos personales contra el acceso no autorizado, la alteración, divulgación o destrucción de la información que almacenamos. Implementamos medidas de seguridad adecuadas para garantizar la protección de sus datos.</p>
                            <p className="text-lg leading-relaxed">Puede ejercer sus derechos de acceso, rectificación, cancelación y oposición al tratamiento de sus datos personales en cualquier momento. Para ello, póngase en contacto con nuestro equipo de soporte y haremos todo lo posible para atender su solicitud a la mayor brevedad.</p>
                            <p className="text-lg leading-relaxed">Si tiene alguna pregunta o inquietud sobre nuestra política de privacidad o el tratamiento de sus datos, no dude en ponerse en contacto con nosotros.</p>
                        </div>

                </section>
            </article>
            <Footer />
        </>
    );
}
