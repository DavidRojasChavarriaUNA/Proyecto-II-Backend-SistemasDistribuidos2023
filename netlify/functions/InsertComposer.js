'use strict';

const {
    CrearRespuestaOptions,
    CrearRespuestaError,
    CrearRespuestaFAAS,
    Codigos,
    GetDataToInsert
} = require('../../utils/Tools');

const {
    CompositoresBL
} = require('../../Bussisness/Compositores/CompositoresBL');

exports.handler = async (event, context) => {
    try {
        if (event.httpMethod == "OPTIONS") return CrearRespuestaOptions();
        const data = GetDataToInsert(event);
        const respuesta = await CompositoresBL.InsertComposer(data);
        return CrearRespuestaFAAS(Codigos.OK, respuesta);
    } catch (error) {
        return CrearRespuestaError(Codigos.UnprocessableContent, error);
    }
}