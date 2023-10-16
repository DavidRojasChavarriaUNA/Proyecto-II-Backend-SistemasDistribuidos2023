'use strict';

const {
    Crud
} = require('../MongoDB/CrudBD');

const {
    dbName,
    dbCollections
} = require('../MongoDB/ParametrosBD');

/**
 * Retorna todas las peliculas.
 *
 * returns List
 **/
const GetAllMovies = async () => {
    const peliculas = await Crud.GetAll(dbName, dbCollections.Peliculas, {});
    return peliculas;
}

/**
 * Retorna una pelicula por Id.
 *
 * peliculaId Integer 
 * returns Movie
 **/
const GetMovieById = async (peliculaId) => {
    const pelicula = await Crud.GetOne(dbName, dbCollections.Peliculas, {
        _id: peliculaId
    });
    return pelicula;
}

/**
 * Retorna una pelicula por titulo.
 *
 * titulo String 
 * returns Movie
 **/
const GetMovieByTitle = async (titulo) => {
    const pelicula = await Crud.GetOne(dbName, dbCollections.Peliculas, {
        title: titulo
    });
    return pelicula;
}

/**
 * Crea una nueva película.
 *
 * body Movie Datos película
 * no response value expected for this operation
 **/
const InsertMovie = async (body) => {
    const response = await Crud.InsertOne(dbName, dbCollections.Peliculas, body);
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
    const response = await Crud.UpdateOne(dbName, dbCollections.Peliculas, {
        _id: peliculaId
    }, body);
    return response;
}

/**
 * Elimina una película por id.
 *
 * peliculaId String 
 * no response value expected for this operation
 **/
const DeleteMovie = async (peliculaId) => {
    const response = await Crud.DeleteOne(dbName, dbCollections.Peliculas, {
        _id: peliculaId
    });
    return response;
}

exports.PeliculasDA = {
    GetAllMovies,
    GetMovieById,
    GetMovieByTitle,
    InsertMovie,
    UpdateMovie,
    DeleteMovie
}