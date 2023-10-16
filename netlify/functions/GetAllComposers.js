'use strict';

const {
    CrearRespuestaOptions,
    CrearRespuestaError,
    CrearRespuestaFAAS,
    Codigos
} = require('../../utils/Tools');

const {
    CompositoresBL
} = require('../../Bussisness/Compositores/CompositoresBL');

exports.handler = async (event, context) => {
    try {
        if (event.httpMethod == "OPTIONS") return CrearRespuestaOptions();
        const respuesta = await CompositoresBL.GetAllComposers();
        return CrearRespuestaFAAS(Codigos.OK, respuesta);
    } catch (error) {
        return CrearRespuestaError(Codigos.BadRequest, error);
    }
}