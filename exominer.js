// program to figure out the total requirements for each item in exominer
// create 3 objects, ores/refined/components
// everything equals it's constituent parts and works it's way down to base components
// then displays (onto text file?) full list in order of complexity
const fs = require('fs');

const args = process.argv.slice(2);
let componentOutput = {};
let refinedOutput = {};
let oresOutput = {};

const ores = [
  "Carbon",
  "Tin",
  "Cobalt",
  "Bismuth",
  "Cerussite",
  "Manganese",
  "Einherjer",
  "Dark Matter",
  "Kryptonite",
  "Coreium",
  "Cerythium",
  "Etherium",
  "Cosmium",
  "Galaxium",
  "Mythril",
  "Xenon",
  "Wrayth",
  "Aurorium",
  "Tungsten",
  "Zyther"

];

const refined = {
  refinedCarbon: {
    Carbon: 800
  },
  refinedTin: {
    Tin: 800
  },
  refinedCobalt: {
    Cobalt: 800
  },
  refinedBismtuh: {
    Bismtuh: 800
  },
  refinedCerussite: {
    Cerussite: 800
  },
  refinedManganese: {
    Manganese: 800
  },
  refinedEinherjer: {
    Einherjer: 800
  },
  manganeseAlloy: {
    refinedManganese: 1,
    refinedCarbon: 8
  },
  cobaltAlloy: {
    refinedCobalt: 12,
    refinedTin: 24
  },
  kriptoniteAlloy: {
    refinedEinherjer: 1,
    Kriptonite: 800
  },
  coreiumAlloy: {
    manganeseAlloy: 1,
    Coreium: 800
  },
  cerythiumAlloy: {
    cobaltAlloy: 1,
    Cerythium: 800
  },
  etheriumAlloy: {
    kriptoniteAlloy: 1,
    Etherium: 800
  },
  cosmiumAlloy: {
    coreiumAlloy: 1,
    Cosmium: 800
  },
  galaxiumAlloy: {
    cerythiumAlloy: 1,
    Galaxium: 800
  },
  mythrilAlloy: {
    etheriumAlloy: 1,
    Mythril: 800
  },
  xenonAlloy: {
    cosmiumAlloy: 1,
    Xenon: 800
  },
  wraythAlloy: {
    galaxiumAlloy: 1,
    Wrayth: 800
  },
  auroriumAlloy: {
    mythrilAlloy: 1,
    Aurorium: 800
  },
  tungstenAlloy: {
    xenonAlloy: 1,
    Tungsten: 800
  },
  zytherAlloy: {
    xenonAlloy: 1,
    Zyther: 800
  }
};

const components = {
  cables: {
    refinedCarbon: 4
  },
  fuse: {
    refinedTin: 4
  },
  heatSensor: {
    cables: 1,
    refinedCarbon: 8
  },
  ballBearing: {
    fuse: 1,
    refinedCobalt: 4
  },
  glass: {
    refinedBismuth: 8
  },
  circuit: {
    refinedCerussite: 4,
    refinedBismuth: 4,
    cables: 8
  },
  lense: {
    glass: 1,
    refinedManganese: 8
  },
  laserOptic: {
    refinedEinherjer: 4,
    refinedTin: 8,
    lense: 1
  },
  miniRover: {
    refinedManganese: 4,
    circuit: 4,
    ballBearing:3
  },
  solarPanel: {
    circuit: 4,
    glass: 8
  },
  laserBlaster: {
    manganeseAlloy: 4,
    laserOptic: 1,
    lense: 4
  },
  advancedSensor: {
    cobaltAlloy: 16,
    heatSensor: 24
  },
  surfaceScanner: {
    kriptoniteAlloy: 4,
    laserOptic: 1,
    glass: 4
  },
  planetExplorer: {
    coreiumAlloy: 4,
    miniRover: 4
  },
  planetDustCollector: {
    laserBlaster: 1,
    surfaceScanner: 1,
    manganeseAlloy: 8
  },
  plasmaCannon: {
    cerythiumAlloy: 12,
    laserBlaster: 4
  },
  ionRocketEngine: {
    kriptoniteAlloy: 48,
    refinedCerussite: 120,
    coreiumAlloy: 32
  },
  mobileTelescope: {
    lense: 16,
    miniRover: 1
  },
  advancedAntenna: {
    cobaltAlloy: 120,
    etheriumAlloy: 16
  },
  xenonEngine: {
    manganeseAlloy: 320,
    ballBearing: 160
  },
  planetRadar: {
    etheriumAlloy: 16,
    advancedSensor: 1
  },
  infraredHomingTurret: {
    galaxiumAlloy: 4,
    plasmaCannon: 1
  },
  gravityReactor: {
    refinedCerussite: 120,
    xenonEngine: 1
  },
  exospaceProbe: {
    advancedAntenna: 1,
    mobileTelescope: 1,
    solarPanel: 20
  },
  spaceProtector: {
    cerythiumAlloy: 240,
    infraredHomingTurret: 1
  },
  supercombustionFuel: {
    mythrilAlloy: 400,
    xenonAlloy: 80
  },
  spaceFleetStation: {
    mobileTelescope: 48,
    exospaceProbe: 1
  },
  superWraythLense: {
    wraythAlloy: 8,
    advancedSensor: 80,
    advancedSensor: 1
  },
  hyperspeedThrusters: {
    supercombustionFuel: 1,
    ionRocketEngine: 8
  },
  auroraAlternator: {
    auroriumAlloy: 8,
    superWraythLense: 1,
    solarPanel: 40
  },
  spaceElevator: {
    cobaltAlloy: 1200,
    cerythiumAlloy: 800
  },
  spaceParticleEngine: {
    tungstenAlloy: 8,
    xenonAlloy: 80,
    hyperspeedThrusters: 1
  },
  galacticPortal: {
    auroriumAlloy: 16,
    galaxiumAlloy: 400,
    spaceParticleEngine: 1
  },
  timeTravelingMachine: {
    wraythAlloy: 80,
    galacticPortal: 1
  },
  dysonSphere: {
    tungstenAlloy: 80,
    solarPanel: 800
  },
  blackHoleGenerator: {
    zytherAlloy: 8,
    tungstenAlloy: 8,
    gravityReactor: 80,
    timeTravelingMachine: 1
  },
};


// so what I really need here is:
/* I could tier refinery/constructor items to look like:
* to craft 10 constructor item you need: 80 constructor item and 10 refinery item.
* you will need 1000 constructor items...
*/
// problem is constructor has like 10 tiers
// 

const build = (item, num ) => {
  let output = '';

  console.log("Item requested:", item);
  console.log("Number requested:", num);
  let production;

  // console.log(refined[item]);
  // console.log(refined.refinedCarbon);
  if (components[item]) {
    // console.log("this is a component");
    production = components[item];
  };
  if (refined[item]) {
    // console.log("this is a refined ore");
    production = refined[item];
  };

  if (!components[item] && !refined[item]) { 
    return output += `${num} ${item}'s`
  };

  // I think this is the wrong approach, one item becomes many required and this doesn't account for that
  console.log(production);
  output += `to create ${num} ${item}'s, you need: ${ JSON.stringify(production, null, 2) }`;
  for (const [key, value] of Object.entries(production)) {
    // console.log(`to make ${value} ${key}'s you need`);
    if (!components[key] && !refined[key]) {
      continue;
    };
    build(key, value);
  };

  return output;
};

fs.writeFileSync('./output/output.txt', build(args[0], args[1]));