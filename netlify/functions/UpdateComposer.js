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
    CompositoresBL
} = require('../../Bussisness/Compositores/CompositoresBL');

exports.handler = async (event, context) => {
    try {
        if (event.httpMethod == "OPTIONS") return CrearRespuestaOptions();
        const id = GetIdFromUrl(event);
        const data = GetDataToUpdate(event);
        const respuesta = await CompositoresBL.UpdateComposer(data, id);
        return CrearRespuestaFAAS(Codigos.OK, respuesta);
    } catch (error) {
        return CrearRespuestaError(Codigos.UnprocessableContent, error);
    }
}