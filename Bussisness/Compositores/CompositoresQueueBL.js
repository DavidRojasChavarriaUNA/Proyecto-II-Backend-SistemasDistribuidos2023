'use strict';

const {
    CompositoresDA
} = require('../../DataAccess/Compositores/CompositoresDA');

const {
    CompositoresMQ
} = require('../../Queues/Compositores/CompositoresMQ');

const {
    Actions
} = require('../../Queues/RabbitMQ/ParametrosMQ');

const {
    Codigos,
    CrearRespuesta
} = require('../../utils/Tools');

/**
 * Crea un nuevo compositor en la cola.
 *
 * body Composer Datos compositor
 * no response value expected for this operation
 **/
const InsertComposerMQ = (body) => {
    return new Promise(async (resolve, reject) => {
        const compositor = await CompositoresDA.GetComposerByTitle(body.title);
        if (compositor)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Ya existe un compositor con el nombre indicado"));
        else {
            const response = await CompositoresMQ.InsertComposer(body);
            if (response)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Compositor registrado con éxito en la cola"));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al registrar el compositor en la cola"));
        }
    });
}

/**
 * Actualiza la información de un compositor.
 *
 * body Composer Datos compositor
 * compositorId Integer 
 * no response value expected for this operation
 **/
const UpdateComposerMQ = (body, compositorId) => {
    return new Promise(async (resolve, reject) => {
        const compositor = await CompositoresDA.GetComposerById(compositorId);
        if (!compositor)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Compositor no encontrado"));
        else {
            const response = await CompositoresMQ.UpdateComposer(body, compositorId);
            if (response)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Compositor actualizado con éxito en la cola"));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al actualizar el compositor en la cola"));
        }
    });
}

/**
 * Elimina un compositor por id.
 *
 * compositorId Integer 
 * no response value expected for this operation
 **/
const DeleteComposerMQ = (compositorId) => {
    return new Promise(async (resolve, reject) => {
        const compositor = await CompositoresDA.GetComposerById(compositorId);
        if (!compositor)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Compositor no encontrado"));
        else {
            const response = await CompositoresMQ.DeleteComposer(compositorId);
            if (response)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Compositor eliminado con éxito en la cola"));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al eliminar el compositor en la cola"));
        }
    });
}

/**
 * Procesa los compositores en la cola
 *
 * returns Composers
 **/
const ProcessComposersQueueMQ = () => {
    return new Promise(async (resolve) => {
        const respuestas = [];
        let mensajeComposer = await CompositoresMQ.GetNextComposer();
        if (!mensajeComposer)
            return resolve(CrearRespuesta(Codigos.CodeSuccess, "No hay datos por procesar", respuestas));
        do {
            switch (mensajeComposer.method) {
                case Actions.Insert:
                    break;
                case Actions.Update:
                    break;
                case Actions.Delete:
                    break;
                default:
                    respuestas.push(CrearRespuesta(Codigos.CodeError, `No hay implementación para la acción "${mensajeComposer.method}"`, mensajeComposer));
            }
            mensajeComposer = await CompositoresMQ.GetNextComposer();
        } while (mensajeComposer);

        resolve(CrearRespuesta(Codigos.CodeSuccess, "Compositores en la cola procesados.", respuestas));
    });
}

exports.CompositoresQueueBL = {
    ProcessComposersQueueMQ,
    InsertComposerMQ,
    UpdateComposerMQ,
    DeleteComposerMQ
};