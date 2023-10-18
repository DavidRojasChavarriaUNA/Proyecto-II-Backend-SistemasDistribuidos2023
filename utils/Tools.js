'use strict';

const None = -1;
const CodeSuccess = 0;
const CodeUnautorized = 401;
const CodeExpired = 440;
const CodeNotFound = 404;
const CodeError = 99;
const BadRequest = 400;
const UnprocessableContent = 422;
const OK = 200;

exports.Codigos = {
    None,
    CodeSuccess,
    CodeUnautorized,
    CodeExpired,
    CodeNotFound,
    CodeError,
    BadRequest,
    UnprocessableContent,
    OK
};

exports.CrearRespuesta = (Code, message, data = undefined) => {
    return {
        Code,
        message,
        data
    };
}

exports.CrearRespuestaOptions = () => {
    const {
        CorsConfig
    } = require('./headersCORS'); //paquete para facilitar el acceso y restricciones causadas por el cors
    return {
        statusCode: OK,
        headers: CorsConfig,
        body: "OK"
    };
}

exports.CrearRespuestaError = (statusCode, error) => {
    console.log(error);
    const {
        CorsConfig
    } = require('./headersCORS'); //paquete para facilitar el acceso y restricciones causadas por el cors
    return {
        statusCode,
        headers: CorsConfig,
        body: JSON.stringify(error)
    };
}

exports.CrearRespuestaFAAS = (statusCode, body) => {
    const {
        CorsConfig
    } = require('./headersCORS'); //paquete para facilitar el acceso y restricciones causadas por el cors
    return {
        statusCode,
        headers: CorsConfig,
        body: JSON.stringify(body)
    };
}

const GenerateId = () => {
    const id = Math.floor(Math.random() * 100000000);
    return id;
}

exports.GetIdFromUrl = (event) => {
    const id = parseInt(event.path.split("/").reverse()[0]);
    return id;
}

exports.GetDataToInsert = (event) => {
    const data = JSON.parse(event.body);
    data._id = parseInt(data._id);
    if (data._id <= 0)
        data._id = GenerateId();
    return data;
}

exports.GetDataToUpdate = (event) => {
    const data = JSON.parse(event.body);
    return data;
}

exports.GetURLNetlify = () => {
    return process.env.NETLIFY_URL;
}