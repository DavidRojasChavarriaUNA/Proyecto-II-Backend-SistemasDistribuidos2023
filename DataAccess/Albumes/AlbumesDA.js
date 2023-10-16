'use strict';

const {
    Crud
} = require('../MongoDB/CrudBD');

const {
    dbName,
    dbCollections
} = require('../MongoDB/ParametrosBD');

/**
 * Retorna todos los álbumes.
 *
 * returns List
 **/
const GetAllAlbumes = async () => {
    const peliculas = await Crud.GetAll(dbName, dbCollections.Albumes, {});
    return peliculas;
}

/**
 * Retorna un álbum por Id.
 *
 * albumId Integer 
 * returns Album
 **/
const GetAlbumById = async (albumId) => {
    const pelicula = await Crud.GetOne(dbName, dbCollections.Albumes, {
        _id: albumId
    });
    return pelicula;
}

/**
 * Retorna un álbum por titulo.
 *
 * titulo String 
 * returns Album
 **/
const GetAlbumByTitle = async (titulo) => {
    const pelicula = await Crud.GetOne(dbName, dbCollections.Albumes, {
        title: titulo
    });
    return pelicula;
}

/**
 * Crea un nuevo álbum.
 *
 * body Album Datos álbume
 * no response value expected for this operation
 **/
const InsertAlbum = async (body) => {
    const response = await Crud.InsertOne(dbName, dbCollections.Albumes, body);
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
    const response = await Crud.UpdateOne(dbName, dbCollections.Albumes, {
        _id: albumId
    }, body);
    return response;
}

/**
 * Elimina un álbum por id.
 *
 * albumId Integer 
 * no response value expected for this operation
 **/
const DeleteAlbum = async (albumId) => {
    const response = await Crud.DeleteOne(dbName, dbCollections.Albumes, {
        _id: albumId
    });
    return response;
}

exports.AlbumesDA = {
    GetAllAlbumes,
    GetAlbumById,
    GetAlbumByTitle,
    InsertAlbum,
    UpdateAlbum,
    DeleteAlbum
}