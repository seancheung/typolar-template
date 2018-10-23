const exec = require('./exec');

module.exports = function(template, sandbox) {
    return template.replace(/<%(.+?)%>/g, (_, code) => {
        const [arg, ...funcs] = code.split('|');

        try {
            return exec(
                `[${funcs.join(',')}].reduce((p, func) => func(p), ${arg})`,
                sandbox
            );
        } catch (error) {
            throw new Error(
                `error occured when executing: "${_}": ${error.message}`
            );
        }
    });
};
