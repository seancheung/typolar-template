/**
 * Parse template
 *
 * @param {string} template Template
 * @param {any} vars Variables
 * @returns {string}
 */
function parse(template, vars) {
    const vm = require('vm');
    template = require('./reference')(template);
    const sandbox = vm.createContext(vars);
    template = require('./condition')(template, sandbox);
    template = require('./interpo')(template, sandbox);
    template = require('./piping')(template, sandbox);

    return template;
}

module.exports = parse;
