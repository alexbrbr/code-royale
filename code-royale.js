try {
  const numSites = parseInt(readline(), 10);
  const sitePositions = [];
  for (let i = 0; i < numSites; i += 1) {
    const inputs = readline().split(' ');
    const siteId = parseInt(inputs[0], 10);
    const x = parseInt(inputs[1], 10);
    const y = parseInt(inputs[2], 10);
    const radius = parseInt(inputs[3], 10);
    sitePositions.push({
      siteId,
      x,
      y,
      radius
    });
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
    const myQueen = findMyQueen(units);
    const emptySites = findEmptySites(
      sites.map(s =>
        Object.assign(s, sitePositions.find(sP => sP.siteId === s.siteId))
      )
    );
    const mySites = findMySites(sites);

    const closestEmptySite = findClosestEmptySite(myQueen, emptySites);
    if (touchedSite === -1 || mySites.find(s => s.siteId === touchedSite)) {
      print(`MOVE ${closestEmptySite.x} ${closestEmptySite.y}`);
    } else if (closestEmptySite) {
      const building = decideWhichBuildingToBuild(sites);
      print(`BUILD ${touchedSite} ${building}`);
    } else {
      // escape when all spots are built
      print(`MOVE ${mySites[0].x} ${mySites[0].y}`);
    }
    const siteIdList = mySites.length > 0 ?
      ` ${mySites.map(s => s.siteId).pop()}` :
      '';

    print(`TRAIN${siteIdList}`);
  }
} catch (e) {
  module.exports = {
    findMyQueen,
    findMySites,
    findEmptySites,
    distanceBetween,
    findClosestEmptySite,
    decideWhichBuildingToBuild
  };
}

function findMyQueen(units) {
  return units
    .find(u => u.owner === 0 && u.unitType === -1);
}

function findMySites(sites) {
  return sites
    .filter(u => u.owner === 0);
}

function findEmptySites(sites) {
  return sites
    .filter(u => u.owner === -1);
}

function distanceBetween(A, B) {
  return Math.sqrt((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y));
}

function findClosestEmptySite(myQueen, emptySites) {
  const distanceFromEmptySites = emptySites.map(s => ({
    distanceFromQueen: distanceBetween(myQueen, s),
    siteId: s.siteId
  }));

  const closestEmptySite = distanceFromEmptySites.sort((a, b) => a.distanceFromQueen - b.distanceFromQueen)[0];

  return emptySites.find(s => s.siteId === closestEmptySite.siteId);
}

function decideWhichBuildingToBuild(sites) {
  const mySites = findMySites(sites);
  const hasKnight = mySites.some(s => s.param2 === 0);
  const hasArcher = mySites.some(s => s.param2 === 1);
  const hasGiant = mySites.some(s => s.param2 === 2);
  return hasGiant ? 'TOWER' :
    hasArcher ? 'BARRACKS-GIANT' :
    hasKnight ? 'BARRACKS-ARCHER' :
    'BARRACKS-KNIGHT';
}
