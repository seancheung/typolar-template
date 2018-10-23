/**
 * Parse template
 *
 * @param {string} template Template
 * @param {any} vars Variables
 * @param {any} [options] Options
 * @returns {string}
 */
function parse(template, vars, options) {
    const vm = require('vm');
    template = require('./reference')(template, options);
    const sandbox = vm.createContext(vars);
    template = require('./condition')(template, sandbox, options);
    template = require('./interpo')(template, sandbox, options);
    template = require('./piping')(template, sandbox, options);

    return template;
}

module.exports = parse;
