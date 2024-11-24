# Tienda virtual
Tienda virtual realizada por el grupo de trabajo formado por (...) para la asignatura Proyecto de Informática I.

# Cómo funciona la aplicacion
La aplicacion esta montada sobre 3 imagenes de Docker que componen el backend, frontend y la base de datos.
Toda la aplicacion esta montada en una misma Red de datos, es decir, ha sido configurado el entorno de Docker creando una red entre ellos para que sean capaz de comunicarse entre sí.

La idea de esto es poder levantar todo el entorno de desarrollo utilizando un unico comando, asegurandonos que todo el entorno es capaz de funcionar correctamente.

## ¿Que conseguimos utilizando Docker?
Al utilizar Docker nos aseguramos de que el entorno de desarrollo tenga unas caracteristicas identicas o lo mayormente aproximado posible al entorno de ejecucion en los servidores de produccion, evitando errores tipicos de "En mi máquina funciona", además de obtener un entorno de trabajo facil de mantener y utilizar en todo momento.

Nos aseguramos de que todos utilizamos exactamente las mismas bases, es decir, al utilizar Docker, no solo nos estamos asegurando de que sea un entorno igual que en el de produccion, sino que tambien nos aseguramos de que todas las configuraciones existentes sean iguales para todos.

Nos aseguramos tambien de que los programas, versiones, etc, sean los mismos para todos (desarrolladores, servidores, etc), por lo que todos trabajaremos sobre el mismo contexto, asegurandonos del correcto funcionamiento de la aplicacion.

Otra de las ventajas de utilizar Docker es que no importa en que sistema operativo estemos ejecutando la aplicación. Docker de base utilizará linux para ejecutar todo lo necesario, por lo que no importará si estamos desarrollando en Windows, MacOs, Linux o cualquier otro sistema operativo, esto nos asegura de que funcionará siempre exactamente de la misma manera.

Otra de las ventajas de utilizar Docker es que seremos capaces de monitorear todo el entorno de manera mucho más sencilla, conociendo asi con mayor facilidad el consumo de la memoria, cuanto ocupa la aplicacion, etc.
Docker además funciona como una maquina virtual, sin embargo, trabaja a nivel de sistema operativo, por lo que es más rapido, eficiente y ligero que si hubiesemos creado una maquina virtual para crear todo el entorno de desarrollo y ejecucion.

Nos lo podemos llevar a cualquier parte. Docker nos permitirá tener una configuracion base de todo el entorno de desarrollo y ejecucion en un mismo archivo (_docker-compose.yml_), lo cual hara mucho más sencillo el integrar a futuro a nuevos desarrolladores, mantener el codigo, conocer que puertos y configuraciones utiliza, etc.

Docker no interferirá con programas que tengamos pre-instalados en el equipo, por lo que si en el equipo tenemos versiones instaladas distintas a la que se requieren en el entorno de la aplicacion, estas no afectaran a Docker (por ejemplo, si en el equipo tenemos instalado Java 8, no interferirá con Java 21 que requiere nuestra aplicación).

## Caracteristicas de docker-compose
Para montar el docker-compose hemos agregado el backend, frontend y BBDD, de base, al montar estas imagenes en un docker, impide que se puedan comunicar los entornos entre si, por lo que ha sido necesario crear una red de comunicacion entre los 3 entornos para que puedan comunicarse entre ellos.

- El entorno del backend utilizará el archivo **_Dockerfile-backend_** para hacer las configuraciones iniciales y ejecuciones del entorno.
- El entorno del frontend utilizará el archivo **_Dockerfile-frontend_** para hacer las configuraciones iniciales y ejecuciones del entorno.
- El entorno de la base de datos esta configurado en el propio _docker-compose.yml_ debido a que no necesita de las mismas inicializaciones que los dos anteriores

### Backend
El backend es una imagen de Java 21, donde la aplicacion esta montada en Springboot framework.
La utilización de esta versión de Java es debido a que actualmente es la versión mas estable para ejecutar Springboot.
Este contenedor esta asociado directamente a la base de datos para que pueda conectarse directamente a esta.

Estaremos utilizando JPA para el tema de la comunicacion con la Base de datos, esto quiere decir que será el propio backend el responsable del mantenimiento de la base de datos, eliminando asi la necesidad de la creacion de complejas querys y asegurandonos de que los datos solicitados a la BBDD siempre esten optimizados, logrando asi trabajar directamente con objetos en las querys en vez de con complejos datos que puedan llegar a alargarse y complicar su comprendimiento.

Los archivos que se suban al frontal (tales como las imagenes del usuario), se almacenarán en la carpeta "_uploads_" del host, lo que asegurará que aunque se eliminen los contenedores y volumenes de docker, todos estos datos sigan persistiendo.

- El backend está configurado para funcionar en el puerto 8080

### Frontend
El frontend es una imagen de node 20.18.0, donde la aplicacion esta montada en React, utilizando Vite para su creacion y desarrollo.
Este contenedor esta asociado directamente al backend para que pueda conectarse directamente a este

- El frontend está configurado para funcionar en el puerto 3000

### Base de datos
La base de datos es una imagen de mysql 8.0.40 en una distribucion de debian
Existe persistencia de datos, por lo que si se llegasen a eliminar los contenedores y volumenes de Docker, los datos de la BBDD se mantendrían intactos, siendo esta almacenada en el directorio mysql_data de la raiz del proyecto _(Al mismo nivel que este archivo)_. 
Con esto conseguimos que el desarrollador pueda mantener todos los datos de prueba que esté utilizando de manera intacta. En el caso en el que se utilizase la misma configuración para el entorno de produccion, lograriamos que los datos de la aplicacion no se eliminasen nunca al apagarse el entorno de docker o borrar sus respectivos contenedores y volumenes.

- La base de datos está configurada para funcionar en el puerto 3306

# Levantar entorno de desarrollo
Se levantará todo el entorno de desarrollo, tanto el backend, frontend y BBDD

```bash
docker-compose up --build
```

# Limpiar docker
Elimina los contenedores y las imagenes de docker que existan

```bash
docker-compose down --rmi all
docker system prune -f
docker volume rm $(docker volume ls -q)
```

# Levantar entorno de produccion
Se levantará todo el entorno de produccion, tanto el backend, frontend y BBDD

```bash
docker-compose -f docker-compose.prod.yml up --build
```

Test push branch