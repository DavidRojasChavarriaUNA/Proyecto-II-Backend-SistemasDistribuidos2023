'use strict';

const {
    AlbumesDA
} = require('../../DataAccess/Albumes/AlbumesDA');

const {
    AlbumesMQ
} = require('../../Queues/Albumes/AlbumesMQ');

const {
    Actions
} = require('../../Queues/RabbitMQ/ParametrosMQ');

const {
    Codigos,
    CrearRespuesta
} = require('../../utils/Tools');

/**
 * Crea un nuevo álbum en la cola.
 *
 * body Album Datos álbume
 * no response value expected for this operation
 **/
const InsertAlbumMQ = (body) => {
    return new Promise(async (resolve, reject) => {
        const album = await AlbumesDA.GetAlbumByTitle(body.title);
        if (album)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Ya existe un álbum con el nombre indicado"));
        else {
            const response = await AlbumesMQ.InsertAlbum(body);
            if (response)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Álbum registrado con éxito en la cola"));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al registrar el álbum en la cola"));
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
const UpdateAlbumMQ = (body, albumId) => {
    return new Promise(async (resolve, reject) => {
        const album = await AlbumesDA.GetAlbumById(albumId);
        if (!album)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Álbum no encontrado"));
        else {
            const response = await AlbumesMQ.UpdateAlbum(body, albumId);
            if (response)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Álbum actualizado con éxito en la cola"));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al actualizar el álbum en la cola"));
        }
    });
}

/**
 * Elimina un álbum por id.
 *
 * albumId Integer 
 * no response value expected for this operation
 **/
const DeleteAlbumMQ = (albumId) => {
    return new Promise(async (resolve, reject) => {
        const album = await AlbumesDA.GetAlbumById(albumId);
        if (!album)
            return resolve(CrearRespuesta(Codigos.CodeNotFound, "Álbum no encontrado"));
        else {
            const response = await AlbumesMQ.DeleteAlbum(albumId);
            if (response)
                resolve(CrearRespuesta(Codigos.CodeSuccess, "Álbum eliminado con éxito en la cola"));
            else
                reject(CrearRespuesta(Codigos.CodeError, "Ocurrió un error al eliminar el álbum en la cola"));
        }
    });
}

const InsertAlbumUsingFAAS = async (album) => {
    let respuestaServidor = undefined;
    try {
        const urlBase = process.env.NETLIFY_URL;
        const respuestaHttp = await fetch(`${urlBase}/InsertAlbum`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(album)
        });
        respuestaServidor = await respuestaHttp.json();
    } catch (error) {
        respuestaServidor = CrearRespuesta(Codigos.CodeError, "Ocurrió un error al crear el álbum", error);
    }
    return respuestaServidor;
}

const UpdateAlbumUsingFAAS = async (albumId, album) => {
    let respuestaServidor = undefined;
    try {
        const urlBase = process.env.NETLIFY_URL;
        const respuestaHttp = await fetch(`${urlBase}/UpdateAlbum/${albumId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(album)
        });
        respuestaServidor = await respuestaHttp.json();
    } catch (error) {
        respuestaServidor = CrearRespuesta(Codigos.CodeError, "Ocurrió un error al actualizar el álbum", error);
    }
    return respuestaServidor;
}

const DeleteAlbumUsingFAAS = async (albumId) => {
    let respuestaServidor = undefined;
    try {
        const urlBase = process.env.NETLIFY_URL;
        console.log({urlBase: urlBase});
        const respuestaHttp = await fetch(`${urlBase}/DeleteAlbum/${albumId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        respuestaServidor = await respuestaHttp.json();
    } catch (error) {
        respuestaServidor = CrearRespuesta(Codigos.CodeError, "Ocurrió un error al eliminar el álbum", error);
    }
    return respuestaServidor;
}

/**
 * Procesa los álbumes en la cola.
 *
 * returns Albums
 **/
const ProcessAlbumsQueueMQ = () => {
    return new Promise(async (resolve) => {
        const respuestas = [];
        let mensajeAlbum = await AlbumesMQ.GetNextAlbum();
        if (!mensajeAlbum)
            return resolve(CrearRespuesta(Codigos.CodeSuccess, "No hay datos por procesar", respuestas));
        do {
            switch (mensajeAlbum.method) {
                case Actions.Insert:
                    respuestas.push(await InsertAlbumUsingFAAS(mensajeAlbum.body));
                    break;
                case Actions.Update:
                    respuestas.push(await UpdateAlbumUsingFAAS(mensajeAlbum.id, mensajeAlbum.body));
                    break;
                case Actions.Delete:
                    respuestas.push(await DeleteAlbumUsingFAAS(mensajeAlbum.id));
                    break;
                default:
                    respuestas.push(CrearRespuesta(Codigos.CodeError, `No hay implementación para la acción "${mensajeAlbum.method}"`, mensajeAlbum));
            }
            mensajeAlbum = await AlbumesMQ.GetNextAlbum();
        } while (mensajeAlbum);

        resolve(CrearRespuesta(Codigos.CodeSuccess, "Álbumes en la cola procesados.", respuestas));
    });
}

exports.AlbumesQueueBL = {
    ProcessAlbumsQueueMQ,
    InsertAlbumMQ,
    UpdateAlbumMQ,
    DeleteAlbumMQ
};