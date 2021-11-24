## Sintexis /etc/resolv.conf:

```
Ese fichero de configuración que casi siempre nos olvidamos de él y que a penas dedicamos unos minutos de nuestro tiempo y puede ayudarnos mucho. Voy a explicar sus opciones.

nameserver IP
Una IP de un servidor de dominios o DNS donde se hacen las consultas de DNS, es decir, a que DNS se va a consultar cuando necesitemos traducir un nombre de dominio en una IP. Se pueden poner más de una directiva y se usaran una detrás cuando falle la anterior. También depende de que opciones se hayan puesto, ver más abajo.
search lista_de_dominios
Lista_de_dominios pueden ser hasta 6 dominios diferentes con un máximo de 256 en total y se utilizan para poder usar nombres cortos de dominio sin tener que añadir el dominio completo. Por ejemplo si trabajamos en una universidad y todos los dispositivos tienen 2 tipos de dominios dispositivo.campus.a.uni.edu o dispositivo.campus.b.uni.edu podrmos agregar una lista search campus.a.uni.edu campus.b.uni.edu y ahora podemos usar solo el nombre del dispositivo al cual se le añadirá el dominio automáticamente.
options lista_de_opciones
donde lista de opciones puede ser:
timeout:n
indica el numero de segundo que debe esperar por la respuesta y si no da un timeout. Por defecto son 5 segundos.
attempts:n
Número de intentos que debe hacer al DNS antes de dar error a la aplicación, por defecto 2.
rotate
lo que hace es un round robin con todos los servidores de nombre que se han indicado con nameserver en vez se siempre consultar el primero. Esto es útil para no cargar siempre a un mismo DNS y poder repartir la carga de las consultas.
ndots:n
Indica el número de puntos (.) que deben aparecer en el dominio a consultar antes de añadir un dominio indicado por search. Por defecto es 1 punto (.), lo que significa que cualquier dominio con al menos un punto se consulta al DNS antes de añadir un dominio indicado por search. Por ejemplo si queremos poder indicar dispositivo.campus_a y que añada siempre un dominio indicado por search deberemos poner ndots:2 para que al menos haya 2 puntos (.) para consultar al DNS.
Hay alguna opción más pero las más interesantes y útiles están aquí explicadas. Como siempre mira el manual de resolv.conf o en algún libro de Bind.
```