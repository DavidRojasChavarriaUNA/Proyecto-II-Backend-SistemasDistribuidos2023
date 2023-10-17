'use strict';

const {
    Queue
} = require('../RabbitMQ/QueueMQ');

const {
    mqQueues,
    Actions
} = require('../RabbitMQ/ParametrosMQ');

/**
 * Retorna el siguiente álbum en la cola.
 *
 * returns Album
 **/
const GetNextAlbum = async () => {
    const mensaje = await Queue.GetNextMessageMQ(mqQueues.Albumes);
    let mensajeAlbum = undefined;
    if (mensaje)
        mensajeAlbum = JSON.parse(mensaje.content.toString());
    return mensajeAlbum;
}

/**
 * Crea un nuevo álbum.
 *
 * body Album Datos álbume
 * no response value expected for this operation
 **/
const InsertAlbum = async (body) => {
    if (!body)
        throw 'El parametro body es requerido';
    let mensajeAlbum = Queue.CreateNewMessageMQ(Actions.Insert, _, body);
    const response = await Queue.SentMessageMQ(mqQueues.Albumes, mensajeAlbum);
    return response;
}

/**
 * Actualiza la información de un álbum.
 *
 * body Album Datos álbum
 * albumId Integer 
 * no response value expected for this operation
 **/
const UpdateAlbum = async (body, albumId) => {
    if (!body)
        throw 'El parametro body es requerido';
    let mensajeAlbum = Queue.CreateNewMessageMQ(Actions.Update, albumId, body);
    const response = await Queue.SentMessageMQ(mqQueues.Albumes, mensajeAlbum);
    return response;
}

/**
 * Elimina un álbum por id.
 *
 * albumId Integer 
 * no response value expected for this operation
 **/
const DeleteAlbum = async (albumId) => {
    if (!body)
        throw 'El parametro body es requerido';
    let mensajeAlbum = Queue.CreateNewMessageMQ(Actions.Delete, albumId);
    const response = await Queue.SentMessageMQ(mqQueues.Albumes, mensajeAlbum);
    return response;
}

exports.AlbumesMQ = {
    GetNextAlbum,
    InsertAlbum,
    UpdateAlbum,
    DeleteAlbum
}