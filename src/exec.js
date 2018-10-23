module.exports = function(code, sandbox) {
    const vm = require('vm');

    return vm.runInContext(code, sandbox);
};
