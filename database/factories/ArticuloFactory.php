<?php

namespace Database\Factories;

use App\Models\Articulo;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticuloFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Articulo::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $nombres = [
            'Corsair Vengeance RGB Pro DDR4 3200 PC4-25600 32GB 2x16GB CL16+',
            'WD BLACK SN770 1TB SSD PCIe Gen4 NVMe',
            'Aerocool LUXPRORGB750M Fuente Alimentación Semi-modular RGB 750W 80plus Bronze +88%',
            'Tempest Umbra RGB Torre ATX Negra',
            'Zotac Gaming GeForce RTX 4070 SUPER Twin Edge 12GB GDDR6X DLSS3',
            'AMD Ryzen 5 7600X 4.7 GHz Box sin Ventilador',
            'Intel Core i7-14700KF 3.4/5.6GHz Box',
            'MSI MAG B650 TOMAHAWK WIFI',
            'MSI PRO Z790-A MAX WIFI'
        ];

        $descripcion = [
            '
            VENTUS brinda una experiencia fundamentalmente sólida a los usuarios que buscan una tarjeta gráfica de alto rendimiento. Un diseño actualizado de aspecto nítido con TORX FAN 4.0 permite que VENTUS realice cualquier tarea.

            Juega, transmite, crea. La GeForce RTX™ 4060 te permite disfrutar de los últimos juegos y aplicaciones con la arquitectura ultraeficiente NVIDIA Ada Lovelace. Experimente juegos inmersivos acelerados por IA con ray tracing y DLSS 3, y potencie su proceso creativo y productividad con NVIDIA Studio.

            GeForce RTX Serie 40: La plataforma definitiva para jugadores y creadores

            Las GPU NVIDIA® GeForce RTX® serie 40 son más que rápidas para jugadores y creadores. Cuentan con la tecnología de la arquitectura ultra eficiente NVIDIA Ada Lovelace, que ofrece un salto espectacular tanto en rendimiento como en gráficos con tecnología de IA. Disfruta de mundos virtuales realistas con trazado de rayos y juegos con FPS ultra altos y la latencia más baja. Descubre nuevas y revolucionarias formas de crear contenido y una aceleración de flujo de trabajo sin precedentes.

            Trazado de rayos: Hiperrealista. Hiper rápido.

            La arquitectura Ada libera toda la gloria del trazado de rayos, que simula cómo se comporta la luz en el mundo real. Con la potencia de RTX serie 40 y núcleos RT de tercera generación, puedes disfrutar de mundos virtuales increíblemente detallados como nunca.

            NVIDIA DLSS 3: El multiplicador de rendimiento, con tecnología de IA.

            DLSS es un avance revolucionario en materia de gráficos con tecnología de IA que aumenta enormemente el rendimiento. Gracias a los nuevos Tensor Cores de cuarta generación y el acelerador de flujo óptico en las GPU GeForce RTX serie 40, DLSS 3 utiliza la IA para crear más fotogramas de alta calidad.

            NVIDIA Reflex: La victoria se mide en milisegundos.

            Las GPU NVIDIA Reflex y GeForce RTX serie 40 ofrecen la latencia más baja y la mejor capacidad de respuesta para obtener la máxima ventaja competitiva. Reflex, diseñada para optimizar y medir la latencia del sistema, ofrece una adquisición de objetivos más rápida, tiempos de reacción más rápidos y la mejor precisión de objetivo para los juegos competitivos.',
            'Los procesadores para juegos mejor valorados del mundo se llaman AMD Ryzen™ Serie 5000.

            Cuando cuentas con la arquitectura de procesadores de escritorio más avanzada del mundo para jugadores y creadores de contenido, las posibilidades son infinitas. Ya sea que juegues los juegos más recientes, diseñes el próximo rascacielos o proceses datos, necesitas un procesador poderoso que pueda dar respuesta a todas estas demandas, y más. Sin lugar a dudas, los procesadores para computadoras de escritorio AMD Ryzen™ serie 5000 elevan el nivel de expectativa para jugadores y artistas por igual.

            Características:
            Tecnología AMD StoreMI. Software que combina la velocidad de SSD con la capacidad de disco duro en una sola unidad rápida y fácil de administrar, gratuita con la placa madre AMD Serie 400.
            AMD "Zen 3" Core Architecture. Los núcleos más rápidos del mundo para los jugadores de PC
            AMD Ryzen™ VR-Ready Premium. Para los usuarios que exigen una experiencia premium de realidad virtual, AMD ofrece procesadores especiales Ryzen™ VR-Ready Premium de alto rendimiento.
            Especificaciones AMD Ryzen 5 5500:
            General
            Plataforma: Computadora de escritorio
            Familia de productos: AMD Ryzen™ Processors
            Línea de productos: AMD Ryzen™ 5 Desktop Processors
            # de núcleos de CPU: 6
            # de hilos: 12
            Reloj de aumento máx.: Hasta 4.2GHz',
            ];
        return [
            'categoria_id' => $this->faker->numberBetween(1, 9),
            'marca_id' => $this->faker->numberBetween(1, 20),
            'nombre' => $this->faker->randomElement($nombres),
            'precio' => $this->faker->randomFloat(2, 10, 1000),
            'descripcion' => $this->faker->randomElement($descripcion),
            'datos' => json_encode([
                'color' => $this->faker->colorName(),
                'peso' => $this->faker->randomFloat(2, 0.1, 10),
                'dimensiones' => $this->faker->randomFloat(2, 10, 1000),
            ]),
        ];
    }
}
