'use strict';

const {
    CrearRespuestaOptions,
    CrearRespuestaError,
    CrearRespuestaFAAS,
    Codigos
} = require('../../utils/Tools');

const {
    PeliculasBL
} = require('../../Bussisness/Peliculas/PeliculasBL');

exports.handler = async (event, context) => {
    try {
        if (event.httpMethod == "OPTIONS") return CrearRespuestaOptions();
        const respuesta = await PeliculasBL.GetAllMovies();
        return CrearRespuestaFAAS(Codigos.OK, respuesta);
    } catch (error) {
        return CrearRespuestaError(Codigos.BadRequest, error);
    }
}