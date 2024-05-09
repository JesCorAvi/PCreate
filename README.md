PASOS PARA EJECUTAR EL PROYECTO

1.Usar composer install npm install tras descargar el proyecto para recomponer las dependencias.

2.Crear una base de datos.

3.hacer cp .env.example .env para regenerar el archivo .env. Tras esto rellenarlo con los datos de la base de datos.

4. Regenerar la clave de la aplicacion con php artisan key:generate

5.Ejecutar php artisan migrate para migrar las tablas de la base de datos.

6.Para abrir el proyecto es necesario tener en ejecución:
    -php artisan serve 
    -npm run dev
 
7.Para poblar la base de datos recordar usar php artisan db:seed

Por ahora hay que mover a mano la imagen default.png de public/assets a public/storage/uploads/avatar y public/storage/uploads/articulos pàra que las imagenes del factory no salgan rotas, aunque no es obligatorio

