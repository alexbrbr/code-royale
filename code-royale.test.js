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

test('should find my site amongst sites', () => {
  const sites = [{
    owner: 1,
    structureType: 2
  }, {
    owner: 0,
    structureType: 2
  }];
  expect(lib.findMySites(sites)).toEqual([{
    owner: 0,
    structureType: 2
  }]);
});

test('should find empty site amongst sites', () => {
  const sites = [{
    owner: -1,
    structureType: 2
  }, {
    owner: 0,
    structureType: 2
  }];
  expect(lib.findEmptySites(sites)).toEqual([{
    owner: -1,
    structureType: 2
  }]);
});


test('should compute distance between 2 points', () => {
  const A = {x: -7, y: -2};
  const B = {x: 5, y: 3};
  expect(lib.distanceBetween(A, B)).toBe(13);
});
