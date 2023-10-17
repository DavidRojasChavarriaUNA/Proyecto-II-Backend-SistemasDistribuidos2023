'use strict';

const {
    Queue
} = require('../RabbitMQ/QueueMQ');

const {
    mqQueues,
    Actions
} = require('../RabbitMQ/ParametrosMQ');

/**
 * Retorna el siguiente compositor en la cola.
 *
 * returns Composer
 **/
const GetNextComposer = async () => {
    const mensaje = await Queue.GetNextMessageMQ(mqQueues.Compositores);
    let mensajeCompositor = undefined;
    if (mensaje)
        mensajeCompositor = JSON.parse(mensaje.content.toString());
    return mensajeCompositor;
}

/**
 * Crea un nuevo compositor.
 *
 * body Composer Datos compositor
 * no response value expected for this operation
 **/
const InsertComposer = async (body) => {
    if (!body)
        throw 'El parametro body es requerido';
    let mensajeCompositor = Queue.CreateNewMessageMQ(Actions.Insert, _, body);
    const response = await Queue.SentMessageMQ(mqQueues.Compositores, mensajeCompositor);
    return response;
}

/**
 * Actualiza la información de un compositor.
 *
 * body Composer Datos compositor
 * compositorId Integer 
 * no response value expected for this operation
 **/
const UpdateComposer = async (body, compositorId) => {
    if (!body)
        throw 'El parametro body es requerido';
    let mensajeCompositor = Queue.CreateNewMessageMQ(Actions.Update, compositorId, body);
    const response = await Queue.SentMessageMQ(mqQueues.Compositores, mensajeCompositor);
    return response;
}

/**
 * Elimina un compositor por id.
 *
 * compositorId Integer 
 * no response value expected for this operation
 **/
const DeleteComposer = async (compositorId) => {
    if (!compositorId)
        throw 'El id es requerido';
    let mensajeCompositor = Queue.CreateNewMessageMQ(Actions.Delete, compositorId);
    const response = await Queue.SentMessageMQ(mqQueues.Compositores, mensajeCompositor);
    return response;
}

exports.CompositoresMQ = {
    GetNextComposer,
    InsertComposer,
    UpdateComposer,
    DeleteComposer
}