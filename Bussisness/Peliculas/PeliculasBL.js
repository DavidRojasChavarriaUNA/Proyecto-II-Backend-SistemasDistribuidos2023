'use strict';

const {
    PeliculasDA
} = require('../../DataAccess/Peliculas/PeliculasDA');

const {
    PeliculasMQ
} = require('../../Queues/Peliculas/PeliculasMQ')

const {
    Codigos,
    CrearRespuesta
} = require('../../utils/Tools');

/**
 * Retorna todas las peliculas.
 *
 * returns List
 **/
const GetAllMovies = () => {
    return new Promise(async (resolve) => {
        const peliculas = await PeliculasDA.GetAllMovies();
        if (peliculas.length > 0)
            resolve(CrearRespuesta(Codigos.CodeSuccess, "", peliculas));
        resolve(CrearRespuesta(Codigos.CodeNotFound, "No hay películas registradas"));
    });
}

/**
 * Retorna una pelicula por Id.
 *
 * peliculaId Integer 
 * returns Movie
 **/
const GetMovieById = (peliculaId) => {
    return new Promise(async (resolve) => {
        const pelicula = await PeliculasDA.GetMovieById(peliculaId)
        if (!pelicula)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Película no encontrada"));
        else
            resolve(CrearRespuesta(Codigos.CodeSuccess, "", pelicula));
    });
}

/**
 * Crea una nueva película.
 *
 * body Movie Datos película
 * no response value expected for this operation
 **/
const InsertMovie = (body) => {
    return new Promise(async (resolve, reject) => {
        const pelicula = await PeliculasDA.GetMovieByTitle(body.title);
        if (pelicula)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Ya existe una película con el título indicado"));
        else {
            const response = await PeliculasDA.InsertMovie(body);
            if (response.insertedId)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Película registrada con éxito", response.insertedId));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al registrar la película"));
        }
    });
}

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
const UpdateMovie = (body, peliculaId) => {
    return new Promise(async (resolve, reject) => {
        const pelicula = await PeliculasDA.GetMovieById(peliculaId);
        if (!pelicula)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Película no encontrada"));
        else {
            const response = await PeliculasDA.UpdateMovie(body, peliculaId);
            if (response.modifiedCount || response.matchedCount)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Película actualizada con éxito"));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al actualizar la película"));
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
const DeleteMovie = (peliculaId) => {
    return new Promise(async (resolve, reject) => {
        const pelicula = await PeliculasDA.GetMovieById(peliculaId);
        if (!pelicula)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Película no encontrada"));
        else {
            const response = await PeliculasDA.DeleteMovie(peliculaId);
            if (response.deletedCount)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Película eliminada con éxito"));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al eliminar la película"));
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

exports.PeliculasBL = {
    GetAllMovies,
    GetMovieById,
    InsertMovie,
    InsertMovieMQ,
    UpdateMovie,
    UpdateMovieMQ,
    DeleteMovie,
    DeleteMovieMQ
}