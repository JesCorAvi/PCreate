# PCreate

## Propuesta de Proyecto Integrado por Jesús Cordero Ávila - 2ºDAW

### Descripción General del Proyecto
PCreate es una web tienda de componentes para PC que permite a los usuarios crear configuraciones personalizadas o comprar componentes sueltos, ademas de ofrecer la opción de compartir configuraciones con otros usuarios. Las principales tecnologías a utilizar son Inertia.js para la comunicación entre Laravel y React, y Tailwind CSS como biblioteca CSS.
Tambien hago uso de Zustand para facilitar la comunicacion entre componentes.

### Objetivos Generales
- Comprar componentes por separado.
- Crear configuraciones personalizadas con asistencia avisando de podibles fallos.
- Listado de configuraciones con puntuaciones y precios.
- Valoraciones y comentarios en componentes y configuraciones de otros usuarios.
- Pago mediante Paypal.

### Requisitos
| Requisito | Prioridad | Tipo | Complejidad | Entrega |
|-----------|-----------|------|-------------|---------|
| Requisitos como incidencias (issues) | Mínimo | Técnico | Fácil | v1 |
| Código fuente | Mínimo | Técnico | Fácil | v1 |
| Estilo del código | Mínimo | Técnico | Fácil | v1 |
| Tres lanzamientos (v1, v2, v3) | Mínimo | Técnico | Fácil | v1 |
| README.md | Mínimo | Técnico | Fácil | v1 |
| Administración y resolución de incidencias | Mínimo | Técnico | Fácil | v1 |
| Uso de etiquetas e hitos | Mínimo | Técnico | Fácil | v1 |
| Reflejo estable de la app en la rama master | Mínimo | Técnico | Fácil | v1 |
| Uso de GitHub para la gestión del proyecto | Mínimo | Técnico | Fácil | v1 |
| Final de cada iteración del proyecto | Mínimo | Técnico | Fácil | v1 |
| Validación de formularios | Mínimo | Técnico | Fácil | v1 |
| Gestión de ventanas | Mínimo | Técnico | Fácil | v1 |
| Manejo de eventos | Mínimo | Técnico | Fácil | v1 |
| Uso del DOM | Mínimo | Técnico | Fácil | v1 |
| Uso de mecanismos de almacenamiento | Mínimo | Técnico | Fácil | v1 |
| Uso de AJAX | Mínimo | Técnico | Fácil | v1 |
| Uso de la librería REACT | Mínimo | Técnico | Fácil | v1 |
| Inclusión de un plugin no visto en clase | Mínimo | Técnico | Fácil | v1 |
| PHP 8.0 o superior | Mínimo | Técnico | Fácil | v1 |
| Laravel Framework 10.0 o superior | Mínimo | Técnico | Fácil | v1 |
| PostgreSQL 12 o superior | Mínimo | Técnico | Fácil | v1 |
| Despliegue en local o en cloud computing | Mínimo | Técnico | Fácil | v1 |
| Pruebas funcionales | Mínimo | Técnico | Fácil | v1 |
| Escalabilidad | Mínimo | Técnico | Fácil | v1 |
| Uso de tecnologías de comunicación asíncrona | Mínimo | Técnico | Fácil | v1 |
| Documentación del diseño usando FIGMA | Mínimo | Técnico | Fácil | v1 |
| Estructurar el contenido usando HTML5 | Mínimo | Técnico | Fácil | v1 |
| Presentación mediante CSS | Mínimo | Técnico | Fácil | v1 |
| Multimedia, transiciones, animaciones, transformaciones | Mínimo | Técnico | Fácil | v1 |
| Validación de código HTML5 y CSS | Mínimo | Técnico | Fácil | v1 |
| Implementación de soluciones de accesibilidad | Mínimo | Técnico | Fácil | v1 |
| Diseño responsive | Mínimo | Técnico | Fácil | v1 |
| Uso de seis leyes UX | Mínimo | Técnico | Fácil | v1 |
| Validación de accesibilidad en el código | Mínimo | Técnico | Fácil | v1 |
| Comprobación en distintos navegadores | Mínimo | Técnico | Fácil | v1 |
| Despliegue de la aplicación en servidor virtual | Mínimo | Técnico | Fácil | v1 |
| Acceso a la aplicación desde cliente virtual | Mínimo | Técnico | Fácil | v1 |

### Requisitos Detallados
| Requisito | Prioridad | Tipo | Complejidad | Entrega |
|-----------|-----------|------|-------------|---------|
| R0. Instalación de dependencias necesarias del proyecto | Importante | Técnico | Fácil | v1 |
| R1. Migraciones y Modelos | Importante | Técnico | Media | v1 |
| R2. CRUD de usuarios | Importante | Funcional | Fácil | v1 |
| R3. CRUD de componentes | Importante | Funcional | Media | v1 |
| R4. Validación de datos componentes | Mínimo | Técnico | Fácil | v1 |
| R5. Perfil de usuario logueado | Importante | Funcional | Fácil | v1 |
| R6. Poder añadir componentes a la cesta | Importante | Funcional | Media | v1 |
| R7. Crear carrito | Importante | Funcional | Media | v1 |
| R8. Añadir productos al carrito | Importante | Funcional | Media | v1 |
| R9. Incrementar, decrementar y borrar productos del carrito usando tecnología asíncrona | Mínimo | Funcional | Media | v1 |
| R10. Comprar elementos del carrito | Importante | Funcional | Media | v2 |
| R11. Mostrar facturas en perfil del usuario por orden de creación | Importante | Funcional | Media | v2 |
| R12. Poder ver los comentarios de un producto en la vista detallada de un producto | Importante | Funcional | Media | v2 |
| R13. Crear un comentario a un producto solo si lo he comprado con anterioridad | Importante | Funcional | Media | v2 |
| R14. Permitir que un comentario pueda responder a otro comentario en los componentes | Opcional | Funcional | Difícil | v2 |
| R15. Validación de datos comentarios | Mínimo | Técnico | Fácil | v2 |
| R16. Crear configuraciones de Ordenadores pudiendo elegir solo componentes que sean compatibles entre sí | Importante | Funcional | Media | v2 |
| R17. Poder elegir distintas finalidades para el ordenador | Opcional | Funcional | Media | v2 |
| R18. Obtener recomendaciones en el configurador en tiempo real dependiendo del uso que tendrá el ordenador | Importante | Funcional | Media | v3 |
| R19. Mostrar un puntaje de 0 a 100 dependiendo de lo bueno que es el ordenador para la finalidad buscada | Opcional | Funcional | Media | v3 |
| R21. Listado de configuraciones pudiendo ordenar por calidad-precio, máximo desempeño y últimos añadidos | Importante | Funcional | Media | v3 |
| R22. Comentarios a configuraciones de otros usuarios | Importante | Funcional | Media | v3 |
| R23. Permitir que un comentario pueda responder a otro comentario en las configuraciones | Opcional | Funcional | Difícil | v3 |
