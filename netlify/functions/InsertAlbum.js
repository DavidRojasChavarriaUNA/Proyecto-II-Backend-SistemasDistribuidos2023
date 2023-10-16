'use strict';

const {
    CrearRespuestaOptions,
    CrearRespuestaError,
    CrearRespuestaFAAS,
    Codigos,
    GetDataToInsert
} = require('../../utils/Tools');

const {
    AlbumesBL
} = require('../../Bussisness/Albumes/AlbumesBL');

exports.handler = async (event, context) => {
    try {
        if (event.httpMethod == "OPTIONS") return CrearRespuestaOptions();
        const data = GetDataToInsert(event);
        const respuesta = await AlbumesBL.InsertAlbum(data);
        return CrearRespuestaFAAS(Codigos.OK, respuesta);
    } catch (error) {
        return CrearRespuestaError(Codigos.UnprocessableContent, error);
    }
}