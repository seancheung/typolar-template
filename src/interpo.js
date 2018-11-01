const exec = require('./exec');

module.exports = function(template, sandbox, options) {
    return template.replace(/\$\{((?:[^{}\\]|\\.)+)\}/g, (_, code) => {
        const match = /^\s*%(.+?)%\s*$/.exec(code);
        if (match != null) {
            return '${' + match[1] + '}';
        }
        try {
            return exec(code, sandbox);
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
