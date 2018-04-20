try {
  const numSites = parseInt(readline(), 10);
  for (let i = 0; i < numSites; i += 1) {
    const inputs = readline().split(' ');
    const siteId = parseInt(inputs[0], 10);
    const x = parseInt(inputs[1], 10);
    const y = parseInt(inputs[2], 10);
    const radius = parseInt(inputs[3], 10);
  }

  // game loop
  while (true) { // eslint-disable-line
    const inputs = readline().split(' ');
    const gold = parseInt(inputs[0], 10);
    const touchedSite = parseInt(inputs[1], 10); // -1 if none
    const sites = [];
    for (let i = 0; i < numSites; i += 1) {
      const inputsSite = readline().split(' ');
      const siteId = parseInt(inputsSite[0], 10);
      const ignore1 = parseInt(inputsSite[1], 10); // used in future leagues
      const ignore2 = parseInt(inputsSite[2], 10); // used in future leagues
      const structureType = parseInt(inputsSite[3], 10); // -1 = No structure, 2 = Barracks
      const owner = parseInt(inputsSite[4], 10); // -1 = No structure, 0 = Friendly, 1 = Enemy
      const param1 = parseInt(inputsSite[5], 10);
      const param2 = parseInt(inputsSite[6], 10);
      sites.push({
        siteId,
        ignore1,
        ignore2,
        structureType,
        owner,
        param1,
        param2
      });
    }
    const numUnits = parseInt(readline(), 10);
    const units = [];
    for (let i = 0; i < numUnits; i += 1) {
      const inputsUnits = readline().split(' ');
      const x = parseInt(inputsUnits[0], 10);
      const y = parseInt(inputsUnits[1], 10);
      const owner = parseInt(inputsUnits[2], 10);
      const unitType = parseInt(inputsUnits[3], 10); // -1 = QUEEN, 0 = KNIGHT, 1 = ARCHER
      const health = parseInt(inputsUnits[4], 10);
      units.push({
        x,
        y,
        owner,
        unitType,
        health
      });
    }

    // Write an action using print()
    // To debug: printErr('Debug messages...');

    printErr('Queen', JSON.stringify(findMyQueen(units)));
    // First line: A valid queen action
    // Second line: A set of training instructions
    print('WAIT');
    print('TRAIN');
  }
} catch (e) {
  // console.log(e);
  module.exports = {
    findMyQueen
  };
}

function findMyQueen(units) {
  return units
    .find(u => u.owner === 0 && u.unitType === -1);
}
