const {
    Actions
} = require('./ParametrosMQ');

exports.CreateNewMessageMQ = (action, id = undefined, data = undefined) => {
    let request = "";
    switch (action) {
        case Actions.Insert: {
            request = `{"method":"${Actions.Insert}","body":${data}}`;
            break;
        }
        case Actions.Update:
            request = `{"method":"${Actions.Update}","id":${id},"body":${data}}`;
            break;
        case Actions.Delete:
            request = `{"method":"${Actions.Delete}","id": ${id} }`;
            break;
        default:
            throw 'Acción no implementada';
    }
    return request;
}