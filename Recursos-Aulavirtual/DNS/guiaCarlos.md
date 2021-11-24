### Instalación y configuración de un servidor DNS con docker

1. Descargar la imagen oficial de BIND9 que está basada en un ubuntu 20.04
```
docker pull image internetsystemsconsortium/bind9:9.16
```
2. Ejecutar un contenedor basado en la imagen descargada
```
docker run -dit \
        --name=dns:bind9-9.16 \
        --publish 53:53/udp \
        --publish 53:53/tcp \
        --publish 127.0.0.1:953:953/tcp \
        internetsystemsconsortium/bind9:9.16
```

3. Acceder al contenedor e instalar utilidades necesarias:
   apt install dnsutils

4. Editar los ficheros de configuración:
```
/etc/resolv.conv
/etc/bind/
    named.conf.local
    named.conf.options
    zones/db.carlosgs.es
    zones/db.172.21
``` 

5. Comprobar que los ficheros están correctos en cuanto a sintaxis:
```
named-checkconf

named-checkzone carlosgs.es /etc/bind/zones/db.carlosgs.es

named-checkzone 21.172.in-addr.arpa /etc/bind/zones/db.172.21
```

6. Recargar la configuración del servicio DNS
   service named reload

7. Probar el funcionamiento en directa y en inversa
```
dig nginx1.carlosgs.es +short
dig -x 172.21.0.3 +short
```

8. Para limpiar la cache de DNS se pueden usar estos comandos:
```
rndc reload zone
rndc flush
rndc flushname carlosgs.es
```

9. Crear imagen a partir de contenedor configurado
```
docker ps
docker commit <container_id> <nombre_nueva_imagen>
```
Comprobar que no funciona porque no conserva parte de las configuraciones añadidas.

10. Probar la ejecución de un servidor web configurado para usar el DNS recién creado.
```
docker network ls
docker network inspect dns_mi_red
docker network create --driver=bridge --subnet=172.21.0.0/16 dns_mi_red
docker run -d --rm --name=prueba-dns --net=dns_mi_red --ip=172.21.0.2 dns:bind9
docker run -d --rm --name=prueba-dns-nginx --net=dns_mi_red --ip=172.21.0.3 --dns=172.21.0.2 nginx
```

11. Actividad docker:
* Generar un fichero `Dockerfile` que cree una imagen según lo especificado en los pasos 1 al 4.
* Generar un fichero `docker-compose.yml` que comprenda el paso 10.

12. Dockerfile propuesto

```
TODO: Dockerfile-bind9
```

Crear imagen
```
docker build -t dns:bind9-9.16 -f Dockerfile-bind9 .
```

13.  Prueba con docker compose

```
TODO: docker-compose.yml
```