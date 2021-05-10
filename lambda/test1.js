const mocha = require('mocha');

const { describe } = mocha;
const { it } = mocha;
const { assert } = require('chai');

describe('#indexOf()', () => {
    it('should return -1 when not present', () => {
        assert.equal([1, 2, 3].indexOf(4), -1);
    });
});
