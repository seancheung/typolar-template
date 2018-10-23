const exec = require('./exec');

module.exports = function(template, sandbox, options) {
    return template.replace(/<%(.+?)%>/g, (_, code) => {
        const [arg, ...funcs] = code.split('|');

        try {
            return exec(
                `[${funcs.join(',')}].reduce((p, func) => func(p), ${arg})`,
                sandbox
            );
        } catch (error) {
            if (options && options.silent) {
                return _;
            }
            throw new Error(
                `error occured when executing: "${_}": ${error.message}`
            );
        }
    });
};
