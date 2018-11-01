const { expect } = require('chai');
const vm = require('vm');
const parse = require('../src/piping');

describe('piping test', function() {
    before(function() {
        this.sandbox = vm.createContext({
            a: 1,
            b: 'my love',
            upper: i => i.toUpperCase(),
            double: i => i * 2,
            reverse: i =>
                i
                    .split('')
                    .reverse()
                    .join(''),
            multi: (i, j) => i * j,
            div: (i, j) => i / j
        });
    });

    it('expect basic piping to be parsed correctly', function() {
        const template = '<%a|double%>\n<%b|upper%>';

        const text = parse(template, this.sandbox);
        expect(text).to.eq('2\nMY LOVE');
    });

    it('expect chained piping to be parsed correctly', function() {
        const template = '<%b|upper|reverse%>';

        const text = parse(template, this.sandbox);
        expect(text).to.eq('EVOL YM');
    });

    it('expect invalid interpo to be catched', function() {
        const template = '<%a|upper%>';

        expect(() => parse(template, this.sandbox)).to.throw('not a function');
    });

    it('expect bind/arrow piping to be parsed correctly', function() {
        const template = '<%a|multi.bind(null,4)|i=>div(i,2)%>';

        const text = parse(template, this.sandbox);
        expect(text).to.eq('2');
    });
});
