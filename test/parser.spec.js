const { expect } = require('chai');
const parse = require('../src');

describe('parser test', function() {
    before(function() {
        this.vars = {
            a: 1,
            b: 2,
            msg: 'my love',
            status: true,
            upper: i => i.toUpperCase(),
            double: i => i * 2,
            reverse: i =>
                i
                    .split('')
                    .reverse()
                    .join('')
        };
    });

    it('expect template to be parsed correctly', function() {
        const template = `heading line
        #if a < b
        \${a*2} equals <%a|double%>
            #if status
        "\${msg}" inversed and capitalized: <%msg|reverse|upper%>
            #else
        "\${msg}" reversed: <%msg|reverse%>
            #end
        #else
        "\${msg}" capitalized: <%msg|upper%>
        #end
        tail line`;

        const text = parse(template, this.vars);
        expect(text).to.eq(`heading line
        2 equals 2
        "my love" inversed and capitalized: EVOL YM
        tail line`);
    });
});
