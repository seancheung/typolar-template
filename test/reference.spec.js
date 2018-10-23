const { expect } = require('chai');
const parse = require('../src/reference');

describe('reference test', function() {
    it('expect reference to be parsed correctly', function() {
        const template =
            '@set(ref1)\nNisi vitae dignissimos ipsa eius cumque.\nDucimus nisi ipsam et.\n@end\n@ref(ref1)\n@ref(ref1)';

        const text = parse(template);
        expect(text).to.eq(
            'Nisi vitae dignissimos ipsa eius cumque.\nDucimus nisi ipsam et.\nNisi vitae dignissimos ipsa eius cumque.\nDucimus nisi ipsam et.'
        );
    });

    it('expect nested ref to be rejected', function() {
        const template = '@set(ref1)\nMinima porro illo rerum iure esse.\n@set(ref2)\nSint voluptatem nemo fugiat harum\ndolorem culpa quia consequuntur.\n@end\n@end';

        expect(() => parse(template, this.sandbox)).to.throw('expecting @end');
    });

    it('expect invalid ref to be catched', function() {
        const template = '@ref(ref1)';

        expect(() => parse(template, this.sandbox)).to.throw('not found');
    });
});
