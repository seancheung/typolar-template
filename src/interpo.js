const exec = require('./exec');

module.exports = function(template, sandbox) {
    return template.replace(/\$\{((?:[^{}\\]|\\.)+)\}/g, (_, code) => {
        try {
            return exec(code, sandbox);
        } catch (error) {
            throw new Error(
                `error occured when executing: "${_}": ${error.message}`
            );
        }
    });
};
