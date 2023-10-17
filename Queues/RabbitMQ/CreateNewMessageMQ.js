const {
    Actions
} = require('./ParametrosMQ');

exports.CreateNewMessageMQ = (action, id = undefined, data = undefined) => {
    let request = {};
    switch (action) {
        case Actions.Insert: {
            request.method = Actions.Insert;
            request.body = data;
            break;
        }
        case Actions.Update: {
            request.method = Actions.Update;
            request.id = id;
            request.body = data;
            break;
        }
        case Actions.Delete: {
            request.method = Actions.Delete;
            request.id = id;
            break;
        }
        default:
            throw 'Acción no implementada';
    }
    const requestJSON = JSON.parse(request);
    return requestJSON;
}