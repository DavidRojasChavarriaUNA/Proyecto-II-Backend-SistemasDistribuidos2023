'use strict';

const {
    CrearRespuestaOptions,
    CrearRespuestaError,
    CrearRespuestaFAAS,
    Codigos,
    GetIdFromUrl
} = require('../../utils/Tools');

const {
    CompositoresBL
} = require('../../Bussisness/Compositores/CompositoresBL');

exports.handler = async (event, context) => {
    try {
        if (event.httpMethod == "OPTIONS") return CrearRespuestaOptions();
        const id = GetIdFromUrl(event);
        const respuesta = await CompositoresBL.DeleteComposer(id);
        return CrearRespuestaFAAS(Codigos.OK, respuesta);
    } catch (error) {
        return CrearRespuestaError(Codigos.UnprocessableContent, error);
    }
}