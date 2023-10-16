'use strict';

const {
    CompositoresDA
} = require('../../DataAccess/Compositores/CompositoresDA');

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

exports.CompositoresBL = {
    GetAllComposers,
    GetComposerById,
    InsertComposer,
    UpdateComposer,
    DeleteComposer
}