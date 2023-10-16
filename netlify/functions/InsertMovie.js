'use strict';

const {
    CrearRespuestaOptions,
    CrearRespuestaError,
    CrearRespuestaFAAS,
    Codigos,
    GetDataToInsert
} = require('../../utils/Tools');

const {
    PeliculasBL
} = require('../../Bussisness/Peliculas/PeliculasBL');

exports.handler = async (event, context) => {
    try {
        if (event.httpMethod == "OPTIONS") return CrearRespuestaOptions();
        const data = GetDataToInsert(event);
        const respuesta = await PeliculasBL.InsertMovie(data);
        return CrearRespuestaFAAS(Codigos.OK, respuesta);
    } catch (error) {
        return CrearRespuestaError(Codigos.UnprocessableContent, error);
    }
}