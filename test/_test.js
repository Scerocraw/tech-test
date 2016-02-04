// This test tests the testing test
// Or: Check if mocha runs correctly.
var assert = require('assert');

describe('Basic Test for checking mocha itself', function() {
  describe('Array#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});
