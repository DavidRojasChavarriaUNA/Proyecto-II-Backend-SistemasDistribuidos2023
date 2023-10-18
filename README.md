# Universidad Nacional 
## Escuela de Informática 
### Sistemas Distribuidos.

#### Proyecto II - back end.

Estudiante: 
David Rojas Chavarría
Cédula
114310962
Profesor:
Armando Arce Orozco.

Ciclo II 2023

Repositorio \
    https://github.com/DavidRojasChavarriaUNA/Proyecto-II-Backend-SistemasDistribuidos2023 \

Para ejecutar el proyecto deberá ejecutar los siguientes pasos:

1. ingresar a la consola o terminal y ubicarse en la carpeta del backend \
	ejemplo (en windows)\
		 'cd "C:\Users\drojas\Desktop\Licenciatura UNA\Ciclo II 2023\Sistemas Distribuidos\Sesión 10\Proyecto-II-SistemasDistribuidos2023\Backend"'
	
2. instalar los paquetes de node.js en caso que no los haya instalado. \
	"npm install"

3. instalar el backend en Netlify con la siguiente configuración en el Build settings
   - Runtime: Not set
   - Base directory: /
   - Package directory: Not set
   - Build command: Not set
   - Publish directory: Not set
   - Functions directory: netlify/functions
   - Deploy log visibility: Logs are public
   - Build status: Active

4. Crear la variable de entorno MONGODB_URI con el string de conexión a la base de datos de MongoDB
5. Crear la variable de entorno CLOUDAMQP_URL con el string de conexión al RabbitMQ

URL en Netlify \
https://proy-ii-faas-drch-sist-dist-una-2023.netlify.app/.netlify/functions

Funciones disponibles
- DeleteAlbum : Elimina un álbum
- DeleteAlbumQueue : Elimina un álbum por medio de la cola
- DeleteComposer : Elimina un compositor
- DeleteComposerQueue : Elimina un compositor por medio de la cola
- DeleteMovie : Elimina una película
- DeleteMovieQueue : Elimina una película por medio de la cola
- GetAlbumById : Obtiene un álbum por Id
- GetComposerById : Obtiene un compositor por Id
- GetMovieById : Obtiene una película por Id
- GetAllAlbumes : Obtiene todos los álbumes
- GetAllComposers : Obtiene todos los compositores
- GetAllMovies : Obtiene todas las películas
- InsertAlbum : Inserta un álbum
- InsertAlbumQueue : Inserta un álbum por medio de la cola
- InsertComposer : Inserta un compositor
- InsertComposerQueue : Inserta un compositor por medio de la cola
- InsertMovie : Inserta una película
- InsertMovieQueue : Inserta una película por medio de la cola
- UpdateAlbum : Actualiza un álbum
- UpdateAlbumQueue : Actualiza un álbum por medio de la cola
- UpdateComposer : Actualiza un compositor
- UpdateComposerQueue : Actualiza un compositor por medio de la cola
- UpdateMovie : Actualiza una película
- UpdateMovieQueue : Actualiza una película por medio de la cola
- ProcessAlbumsQueueMQ : Procesa los álbumes en la cola
- ProcessComposersQueueMQ: Procesa los compositores en la cola
- ProcessMoviesQueueMQ: Procesa las peliculas en la cola