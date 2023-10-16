'use strict';

const {
    CrearRespuestaOptions,
    CrearRespuestaError,
    CrearRespuestaFAAS,
    Codigos,
    GetDataToUpdate,
    GetIdFromUrl
} = require('../../utils/Tools');

const {
    PeliculasBL
} = require('../../Bussisness/Peliculas/PeliculasBL');

exports.handler = async (event, context) => {
    try {
        if (event.httpMethod == "OPTIONS") return CrearRespuestaOptions();
        const id = GetIdFromUrl(event);
        const data = GetDataToUpdate(event);
        const respuesta = await PeliculasBL.UpdateMovie(data, id);
        return CrearRespuestaFAAS(Codigos.OK, respuesta);
    } catch (error) {
        return CrearRespuestaError(Codigos.UnprocessableContent, error);
    }
}