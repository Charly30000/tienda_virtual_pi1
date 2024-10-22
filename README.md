# Levantar la app
Se levantará todo el entorno de desarrollo, tanto el backend, frontend y BBDD

```bash
docker-compose up --build
```

# Limpiar docker
Elimina los contenedores y las imagenes de docker que haya

```bash
docker-compose down --rmi all
docker system prune -f
```
