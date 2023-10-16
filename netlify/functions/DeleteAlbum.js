'use strict';

const {
    CrearRespuestaOptions,
    CrearRespuestaError,
    CrearRespuestaFAAS,
    Codigos,
    GetIdFromUrl
} = require('../../utils/Tools');

const {
    AlbumesBL
} = require('../../Bussisness/Albumes/AlbumesBL');

exports.handler = async (event, context) => {
    try {
        if (event.httpMethod == "OPTIONS") return CrearRespuestaOptions();
        const id = GetIdFromUrl(event);
        const respuesta = await AlbumesBL.DeleteAlbum(id);
        return CrearRespuestaFAAS(Codigos.OK, respuesta);
    } catch (error) {
        return CrearRespuestaError(Codigos.UnprocessableContent, error);
    }
}