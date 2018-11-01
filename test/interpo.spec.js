const { expect } = require('chai');
const vm = require('vm');
const parse = require('../src/interpo');

describe('interpo test', function() {
    before(function() {
        this.sandbox = vm.createContext({ a: 1, b: 2, status: true });
    });

    it('expect basic interpo to be parsed correctly', function() {
        const template = '${a+b}';

        const text = parse(template, this.sandbox);
        expect(text).to.eq('3');
    });

    it('expect ternary interpo to be parsed correctly', function() {
        const template = '${ a > b? "yes" : "no"}\nstatus = ${status}';

        const text = parse(template, this.sandbox);
        expect(text).to.eq('no\nstatus = true');
    });

    it('expect invalid interpo to be catched', function() {
        const template = '${c + a}';

        expect(() => parse(template, this.sandbox)).to.throw('not defined');
    });

    it('expect silent interpo to be parsed correctly', function() {
        const template = '${a}${c}';

        const text = parse(template, this.sandbox, { silent: true });
        expect(text).to.eq('1${c}');
    });

    it('expect escaped interpo to be parsed correctly', function() {
        const template = '${a}${%b%}';

        const text = parse(template, this.sandbox);
        expect(text).to.eq('1${b}');
    });
});
