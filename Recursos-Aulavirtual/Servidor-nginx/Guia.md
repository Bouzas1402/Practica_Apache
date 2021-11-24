### Descargar imagen nginx

    docker image pull nginx

### Generar imagen con PHP-FPM, extensiones mysql y Xdebug
Usaremos el siguiente `Dockerfile` que a la imagen oficial 8.0 variante procesador FastCGI (fpm) añade el editor nano, las librerías mysql el Xdebug y el gestor de paquetes composer:

```dockerfile
FROM php:8.0-fpm

# Update OS and install common dev tools
RUN apt-get update
RUN apt-get install -y nano

# Install PHP extensions needed
RUN docker-php-ext-install -j$(nproc) mysqli pdo_mysql

# Instala Xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Instala composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Set working directory to web files
WORKDIR /var/www/html
``` 

Se genera la imagen de la manera habitual:

    docker build -t php-mysqli-xdebug:8.0-fpm -f Dockerfile-php-mysqli-xdebug .

### Arrancar el entorno con `docker compose`

Nginx (:80) <== communica ==> Php-FPM (:9000) <== gestiona ==> proceso php hijo <== consulta ==> MySQL (:3306)

### Configurar nginx para que sea el contenedor php el que procese los arquivos php

Cambiar el fichero `/etc/nginx/conf.d/default.conf`

```nginx
location ~ \.php$ {
        fastcgi_pass   php:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  /var/www/html$fastcgi_script_name;
        include        fastcgi_params;
    }
```

### Páginas de índice

```
location /directorio/ {
    autoindex on;
}
```


### Bloques de servidor (= hosts virtuales en Apache)

```nginx
http {
  index index.html;

  server {
    server_name dominio1.com;
    root /var/www/dominio1.com;
  }

  server {
    server_name dominio.com;
    root /var/www/dominio.com;
  }
}
```

### Permisos para acceder a ciertas urls

Denegar a todos excepto a los de la red 192.168.1.1/24

```nginx
location /admin/ {
    allow 192.168.1.1/24;
    deny all;
}
```

### Autenticación

Autenticación básica. Hay que instalar el paquete apache2-utils que tiene el comando htpasswd

```nginx
location /admin/ {
    ...
    auth_basic "Restricted Access!";
    auth_basic_user_file /etc/nginx/conf.d/.htpasswd;
    ...
}
```

### Redirecciones

Redirección temporal (302)

    #rewrite_log on;
    rewrite ^/bienvenido\.html$ /info.php redirect

Redirección permanente (301)
rewrite ^/bienvenido\.html$ /info.php permanent

Reescritura de url
rewrite ^/bienvenido\.html$ /info.php last

Personalización páginas de error
error_page  404  /404.html;

### Proxy inverso

```
location /agencia/ {
    proxy_pass http://agencia.com/;
}
```