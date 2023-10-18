'use strict';

const {
    PeliculasDA
} = require('../../DataAccess/Peliculas/PeliculasDA');

const {
    PeliculasMQ
} = require('../../Queues/Peliculas/PeliculasMQ');

const {
    Actions
} = require('../../Queues/RabbitMQ/ParametrosMQ');

const {
    Codigos,
    CrearRespuesta
} = require('../../utils/Tools');

const urlBase = process.env.NETLIFY_URL;

console.log(urlBase);
/**
 * Crea una nueva película.
 *
 * body Movie Datos película
 * no response value expected for this operation
 **/
const InsertMovieMQ = (body) => {
    return new Promise(async (resolve, reject) => {
        const pelicula = await PeliculasDA.GetMovieByTitle(body.title);
        if (pelicula)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Ya existe una película con el título indicado"));
        else {
            const response = await PeliculasMQ.InsertMovie(body);
            if (response)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Película registrada con éxito en la cola"));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al registrar la película en la cola"));
        }
    });
}

/**
 * Actualiza la información de una película.
 *
 * body Movie Datos película
 * peliculaId String 
 * no response value expected for this operation
 **/
const UpdateMovieMQ = (body, peliculaId) => {
    return new Promise(async (resolve, reject) => {
        const pelicula = await PeliculasDA.GetMovieById(peliculaId);
        if (!pelicula)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Película no encontrada"));
        else {
            const response = await PeliculasMQ.UpdateMovie(body, peliculaId);
            if (response)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Película actualizada con éxito en la cola"));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al actualizar la película en la cola"));
        }
    });
}

/**
 * Elimina una película por id.
 *
 * peliculaId String 
 * no response value expected for this operation
 **/
const DeleteMovieMQ = (peliculaId) => {
    return new Promise(async (resolve, reject) => {
        const pelicula = await PeliculasDA.GetMovieById(peliculaId);
        if (!pelicula)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Película no encontrada"));
        else {
            const response = await PeliculasMQ.DeleteMovie(peliculaId);
            if (response)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Película eliminada con éxito en la cola"));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al eliminar la película en la cola"));
        }
    });
}

const InsertMovieUsingFAAS = async (pelicula) => {
    let respuestaServidor = undefined;
    try {
        const respuestaHttp = await fetch(`${urlBase}/InsertMovie`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pelicula)
        });
        respuestaServidor = await respuestaHttp.json();
    } catch (error) {
        respuestaServidor = CrearRespuesta(Codigos.CodeError, "Ocurrió un error al crear la película", error);
    }
    return respuestaServidor;
}

const UpdateMovieUsingFAAS = async (peliculaId, pelicula) => {
    let respuestaServidor = undefined;
    try {
        const respuestaHttp = await fetch(`${urlBase}/UpdateMovie/${peliculaId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pelicula)
        });
        respuestaServidor = await respuestaHttp.json();
    } catch (error) {
        respuestaServidor = CrearRespuesta(Codigos.CodeError, "Ocurrió un error al actualizar la película", error);
    }
    return respuestaServidor;
}

const DeleteMovieUsingFAAS = async (peliculaId) => {
    let respuestaServidor = undefined;
    try {
        console.log();
        const respuestaHttp = await fetch(`${urlBase}/DeleteMovie/${peliculaId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        respuestaServidor = await respuestaHttp.json();
    } catch (error) {
        respuestaServidor = CrearRespuesta(Codigos.CodeError, "Ocurrió un error al eliminar la película", error);
    }
    return respuestaServidor;
}

/**
 * Procesa las peliculas en la cola
 *
 * returns Movie
 **/
const ProcessMoviesQueueMQ = () => {
    return new Promise(async (resolve) => {
        const respuestas = [];
        let mensajePelicula = await PeliculasMQ.GetNextMovie();
        if (!mensajePelicula)
            return resolve(CrearRespuesta(Codigos.CodeSuccess, "No hay datos por procesar", respuestas));
        do {
            switch (mensajePelicula.method) {
                case Actions.Insert:
                    respuestas.push(await InsertMovieUsingFAAS(mensajePelicula.body));
                    break;
                case Actions.Update:
                    respuestas.push(await UpdateMovieUsingFAAS(mensajePelicula.id, mensajePelicula.body));
                    break;
                case Actions.Delete:
                    respuestas.push(await DeleteMovieUsingFAAS(mensajePelicula.id));
                    break;
                default:
                    respuestas.push(CrearRespuesta(Codigos.CodeError, `No hay implementación para la acción "${mensajePelicula.method}"`, mensajePelicula));
            }
            mensajePelicula = await PeliculasMQ.GetNextMovie();
        } while (mensajePelicula);

        resolve(CrearRespuesta(Codigos.CodeSuccess, "Películas en la cola procesadas.", respuestas));
    });
}

exports.PeliculasQueueBL = {
    ProcessMoviesQueueMQ,
    InsertMovieMQ,
    UpdateMovieMQ,
    DeleteMovieMQ
};