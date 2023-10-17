'use strict';

const {
    Queue
} = require('../RabbitMQ/QueueMQ');

const {
    mqQueues,
    Actions
} = require('../RabbitMQ/ParametrosMQ');

/**
 * Retorna la siguiente película en la cola.
 *
 * returns Movie
 **/
const GetNextMovie = async () => {
    const mensaje = await Queue.GetNextMessageMQ(mqQueues.Peliculas);
    let mensajePelicula = undefined;
    if (mensaje)
        mensajePelicula = JSON.parse(mensaje.content.toString());
    return mensajePelicula;
}

/**
 * Crea una nueva película.
 *
 * body Movie Datos película
 * no response value expected for this operation
 **/
const InsertMovie = async (body) => {
    if (!body)
        throw 'El parametro body es requerido';
    let mensajePelicula = Queue.CreateNewMessageMQ(Actions.Insert, _, body);
    const response = await Queue.SentMessageMQ(mqQueues.Peliculas, mensajePelicula);
    return response;
}

/**
 * Actualiza la información de una película.
 *
 * body Movie Datos película
 * peliculaId String 
 * no response value expected for this operation
 **/
const UpdateMovie = async (body, peliculaId) => {
    if (!body)
        throw 'El parametro body es requerido';
    let mensajePelicula = Queue.CreateNewMessageMQ(Actions.Update, peliculaId, body);
    const response = await Queue.SentMessageMQ(mqQueues.Peliculas, mensajePelicula);
    return response;
}

/**
 * Elimina una película por id.
 *
 * peliculaId String 
 * no response value expected for this operation
 **/
const DeleteMovie = async (peliculaId) => {
    if (!peliculaId)
        throw 'El id es requerido';
    let mensajePelicula = Queue.CreateNewMessageMQ(Actions.Delete, peliculaId);
    const response = await Queue.SentMessageMQ(mqQueues.Peliculas, mensajePelicula);
    return response;
}

exports.PeliculasMQ = {
    GetNextMovie,
    InsertMovie,
    UpdateMovie,
    DeleteMovie
}