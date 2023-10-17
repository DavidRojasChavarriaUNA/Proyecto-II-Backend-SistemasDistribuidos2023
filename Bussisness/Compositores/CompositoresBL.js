'use strict';

const {
    CompositoresDA
} = require('../../DataAccess/Compositores/CompositoresDA');

const {
    CompositoresMQ
} = require('../../Queues/Compositores/CompositoresMQ')

const {
    Codigos,
    CrearRespuesta
} = require('../../utils/Tools');

/**
 * Retorna todos los compositores.
 *
 * returns List
 **/
const GetAllComposers = () => {
    return new Promise(async (resolve) => {
        const compositores = await CompositoresDA.GetAllComposers();
        if (compositores.length > 0)
            resolve(CrearRespuesta(Codigos.CodeSuccess, "", compositores));
        resolve(CrearRespuesta(Codigos.CodeNotFound, "No hay compositores registrados"));
    });
}

/**
 * Retorna un compositor por Id.
 *
 * compositorId Integer 
 * returns Composer
 **/
const GetComposerById = (compositorId) => {
    return new Promise(async (resolve) => {
        const compositor = await CompositoresDA.GetComposerById(compositorId)
        if (!compositor)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Compositor no encontrado"));
        else
            resolve(CrearRespuesta(Codigos.CodeSuccess, "", compositor));
    });
}

/**
 * Crea un nuevo compositor.
 *
 * body Composer Datos compositor
 * no response value expected for this operation
 **/
const InsertComposer = (body) => {
    return new Promise(async (resolve, reject) => {
        const compositor = await CompositoresDA.GetComposerByTitle(body.title);
        if (compositor)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Ya existe un compositor con el nombre indicado"));
        else {
            const response = await CompositoresDA.InsertComposer(body);
            if (response.insertedId)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Compositor registrado con éxito", response.insertedId));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al registrar el compositor"));
        }
    });
}

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
const UpdateComposer = (body, compositorId) => {
    return new Promise(async (resolve, reject) => {
        const compositor = await CompositoresDA.GetComposerById(compositorId);
        if (!compositor)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Compositor no encontrado"));
        else {
            const response = await CompositoresDA.UpdateComposer(body, compositorId);
            if (response.modifiedCount || response.matchedCount)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Compositor actualizado con éxito"));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al actualizar el compositor"));
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
const DeleteComposer = (compositorId) => {
    return new Promise(async (resolve, reject) => {
        const compositor = await CompositoresDA.GetComposerById(compositorId);
        if (!compositor)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Compositor no encontrado"));
        else {
            const response = await CompositoresDA.DeleteComposer(compositorId);
            if (response.deletedCount)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Compositor eliminado con éxito"));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al eliminar el compositor"));
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

exports.CompositoresBL = {
    GetAllComposers,
    GetComposerById,
    InsertComposer,
    InsertComposerMQ,
    UpdateComposer,
    UpdateComposerMQ,
    DeleteComposer,
    DeleteComposerMQ
}