'use strict';

const {
    Crud
} = require('../MongoDB/CrudBD');

const {
    dbName,
    dbCollections
} = require('../MongoDB/ParametrosBD');

/**
 * Retorna todos los compositores.
 *
 * returns List
 **/
const GetAllComposers = async () => {
    const peliculas = await Crud.GetAll(dbName, dbCollections.Compositores, {});
    return peliculas;
}

/**
 * Retorna un compositor por Id.
 *
 * compositorId Integer 
 * returns Composer
 **/
const GetComposerById = async (compositorId) => {
    const pelicula = await Crud.GetOne(dbName, dbCollections.Compositores, {
        _id: compositorId
    });
    return pelicula;
}

/**
 * Retorna un compositor por titulo.
 *
 * titulo String 
 * returns Composer
 **/
const GetComposerByTitle = async (titulo) => {
    const pelicula = await Crud.GetOne(dbName, dbCollections.Compositores, {
        title: titulo
    });
    return pelicula;
}

/**
 * Crea un nuevo compositor.
 *
 * body Composer Datos compositor
 * no response value expected for this operation
 **/
const InsertComposer = async (body) => {
    const response = await Crud.InsertOne(dbName, dbCollections.Compositores, body);
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
    const response = await Crud.UpdateOne(dbName, dbCollections.Compositores, {
        _id: compositorId
    }, body);
    return response;
}

/**
 * Elimina un compositor por id.
 *
 * compositorId Integer 
 * no response value expected for this operation
 **/
const DeleteComposer = async (compositorId) => {
    const response = await Crud.DeleteOne(dbName, dbCollections.Compositores, {
        _id: compositorId
    });
    return response;
}

exports.CompositoresDA = {
    GetAllComposers,
    GetComposerById,
    GetComposerByTitle,
    InsertComposer,
    UpdateComposer,
    DeleteComposer
}