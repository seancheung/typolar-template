const exec = require('./exec');

module.exports = function(template, sandbox, options) {
    return template.replace(/\$\{((?:[^{}\\]|\\.)+)\}/g, (_, code) => {
        try {
            if (options && options.safeInterpo) {
                code = code.trim();

                return code in sandbox ? sandbox[code] : _;
            }

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
