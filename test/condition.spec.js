const { expect } = require('chai');
const vm = require('vm');
const parse = require('../src/condition');

describe('condition test', function() {
    before(function() {
        this.sandbox = vm.createContext({ a: 1, b: 2, status: true });
    });

    it('expect basic if/else to be parsed correctly', function() {
        const template = `line 1
        #if a > b
        line 2
        #else
        line 3
        #end
        line 4`;

        const text = parse(template, this.sandbox);
        expect(text).to.eq(`line 1
        line 3
        line 4`);
    });

    it('expect nested if/else to be parsed correctly', function() {
        const template = `line 1
        #if a > b
        line 2
        #else
        line 3
            #if status
        line 4
            #end
        #end
        line 5`;

        const text = parse(template, this.sandbox);
        expect(text).to.eq(`line 1
        line 3
        line 4
        line 5`);
    });

    it('expect invalid if/else to be catched', function() {
        const template = `line 1
        #if a > b
        #end
        #else`;

        expect(() => parse(template, this.sandbox)).to.throw('invalid');
    });
});
