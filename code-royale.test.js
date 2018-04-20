const lib = require('./code-royale');

test('should find my queen amongst units', () => {
  const units = [{
    owner: 1,
    unitType: -1
  }, {
    owner: 0,
    unitType: -1
  }];
  expect(lib.findMyQueen(units)).toEqual({
    owner: 0,
    unitType: -1
  });
});
