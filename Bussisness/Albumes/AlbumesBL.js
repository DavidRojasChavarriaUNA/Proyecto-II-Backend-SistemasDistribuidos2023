'use strict';

const {
    AlbumesDA
} = require('../../DataAccess/Albumes/AlbumesDA');

const {
    Codigos,
    CrearRespuesta
} = require('../../utils/Tools');

/**
 * Retorna todos los álbumes.
 *
 * returns List
 **/
const GetAllAlbumes = () => {
    return new Promise(async (resolve) =>{
        const albumes = await AlbumesDA.GetAllAlbumes();
        if (albumes.length > 0)
            resolve(CrearRespuesta(Codigos.CodeSuccess, "", albumes));
        resolve(CrearRespuesta(Codigos.CodeNotFound, "No hay álbumes registrados"));
    });
}

/**
 * Retorna un álbum por Id.
 *
 * albumId Integer 
 * returns Album
 **/
const GetAlbumById = (albumId) => {
    return new Promise(async (resolve) => {
        const album = await AlbumesDA.GetAlbumById(albumId)
        if (!album)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Álbum no encontrado"));
        else
            resolve(CrearRespuesta(Codigos.CodeSuccess, "", album));
    });
}

/**
 * Crea un nuevo álbum.
 *
 * body Album Datos álbume
 * no response value expected for this operation
 **/
const InsertAlbum = (body) =>{
    return new Promise(async (resolve, reject) => {
        const album = await AlbumesDA.GetAlbumByTitle(body.title);
        if (album)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Ya existe un álbum con el nombre indicado"));
        else {
            const response = await AlbumesDA.InsertAlbum(body);
            if (response.insertedId)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Álbum registrado con éxito", response.insertedId));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al registrar el álbum"));
        }
    });
}

/**
 * Actualiza la información de un álbum.
 *
 * body Album Datos álbum
 * albumId Integer 
 * no response value expected for this operation
 **/
const UpdateAlbum = (body, albumId) => {
    return new Promise(async (resolve, reject) => {
        const album = await AlbumesDA.GetAlbumById(albumId);
        if (!album)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Álbum no encontrado"));
        else {
            const response = await AlbumesDA.UpdateAlbum(body, albumId);
            if (response.modifiedCount || response.matchedCount)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Álbum actualizado con éxito"));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al actualizar el álbum"));
        }
    });
}

/**
 * Elimina un álbum por id.
 *
 * albumId Integer 
 * no response value expected for this operation
 **/
const DeleteAlbum = (albumId) => {
    return new Promise(async (resolve, reject) => {
        const album = await AlbumesDA.GetAlbumById(albumId);
        if (!album)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Álbum no encontrado"));
        else {
            const response = await AlbumesDA.DeleteAlbum(albumId);
            if (response.deletedCount)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Álbum eliminado con éxito"));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al eliminar el álbum"));
        }
    });
}

exports.AlbumesBL = {
    GetAllAlbumes,
    GetAlbumById,
    InsertAlbum,
    UpdateAlbum,
    DeleteAlbum
}