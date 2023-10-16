'use strict';

const {
    CrearRespuestaOptions,
    CrearRespuestaError,
    CrearRespuestaFAAS,
    Codigos
} = require('../../utils/Tools');

const {
    AlbumesBL
} = require('../../Bussisness/Albumes/AlbumesBL');

exports.handler = async (event, context) => {
    try {
        if (event.httpMethod == "OPTIONS") return CrearRespuestaOptions();
        const respuesta = await AlbumesBL.GetAllAlbumes();
        return CrearRespuestaFAAS(Codigos.OK, respuesta);
    } catch (error) {
        return CrearRespuestaError(Codigos.BadRequest, error);
    }
}