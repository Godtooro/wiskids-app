const fs = require('fs');
const path = require('path');
const d3Geo = require('d3-geo');

const projWorld = d3Geo.geoEqualEarth().scale(130).translate([400, 240]);
const projEurope = d3Geo.geoMercator().center([12.0, 52.0]).scale(750).translate([400, 290]);

function ptWorld(lng, lat) {
  const p = projWorld([lng, lat]);
  return { x: Math.round(p[0]), y: Math.round(p[1]) };
}

function ptEurope(lng, lat) {
  const p = projEurope([lng, lat]);
  return { x: Math.round(p[0]), y: Math.round(p[1]) };
}

// 1. CONTINENTS
// We define the 7 continents with bounding/representative interactive SVG polygon paths and center labels on geoEqualEarth
// (World: 0 0 800 480)
const CONTINENTS = [
  {
    id: 'europa',
    name: 'Europa',
    flagEmoji: '🇪🇺',
    funFact: '¡Europa tiene castillos de caballeros medievales, la Torre Eiffel de París y el Coliseo de Roma!',
    hint: 'Busca al norte del mar Mediterráneo, al oeste de Asia.',
    // Representative polygon for Europe on geoEqualEarth
    pathD: 'M 350 80 L 480 80 L 480 160 L 420 170 L 350 160 Z',
    labelX: 410,
    labelY: 120,
    color: '#3b82f6'
  },
  {
    id: 'asia',
    name: 'Asia',
    flagEmoji: '⛩️',
    funFact: '¡Asia es el continente más grande y poblado del mundo! Allí están el Monte Everest y la Gran Muralla China.',
    hint: 'El continente más inmenso situado al este de Europa.',
    pathD: 'M 480 60 L 720 60 L 740 180 L 680 250 L 520 220 L 480 150 Z',
    labelX: 600,
    labelY: 130,
    color: '#eab308'
  },
  {
    id: 'africa',
    name: 'África',
    flagEmoji: '🦁',
    funFact: '¡África es el hogar de leones, jirafas y elefantes, del gran desierto del Sáhara y del río Nilo!',
    hint: 'Situado justo al sur de Europa y rodeado por el océano Atlántico e Índico.',
    pathD: 'M 360 170 L 480 170 L 490 280 L 450 330 L 420 330 L 360 230 Z',
    labelX: 425,
    labelY: 245,
    color: '#f97316'
  },
  {
    id: 'america_norte',
    name: 'América del Norte',
    flagEmoji: '🍁',
    funFact: '¡Tiene grandes bosques de arces, osos pardos, los rascacielos de Nueva York y las pirámides de México!',
    hint: 'Arriba a la izquierda en el planisferio, al norte de América del Sur.',
    pathD: 'M 140 60 L 320 60 L 290 150 L 220 200 L 180 160 L 140 100 Z',
    labelX: 230,
    labelY: 120,
    color: '#10b981'
  },
  {
    id: 'america_sur',
    name: 'América del Sur',
    flagEmoji: '🌴',
    funFact: '¡Allí está la gran selva amazónica con loros y tucanes, y la cordillera de los Andes!',
    hint: 'Abajo a la izquierda en el planisferio, conectada al sur de América del Norte.',
    pathD: 'M 250 200 L 320 220 L 320 300 L 290 380 L 270 380 L 250 260 Z',
    labelX: 285,
    labelY: 285,
    color: '#06b6d4'
  },
  {
    id: 'oceania',
    name: 'Oceanía',
    flagEmoji: '🦘',
    funFact: '¡Compuesta por Australia, Nueva Zelanda y miles de islas con simpáticos canguros y koalas!',
    hint: 'Abajo a la derecha en el planisferio, rodeada por el océano Pacífico e Índico.',
    pathD: 'M 640 250 L 760 260 L 760 360 L 650 360 Z',
    labelX: 695,
    labelY: 300,
    color: '#ec4899'
  },
  {
    id: 'antartida',
    name: 'Antártida',
    flagEmoji: '🧊',
    funFact: '¡El continente más frío, blanco y helado del planeta, habitado por millones de pingüinos!',
    hint: 'Completamente abajo en el polo sur del mapa.',
    pathD: 'M 150 420 L 680 420 L 680 470 L 150 470 Z',
    labelX: 400,
    labelY: 445,
    color: '#94a3b8'
  }
];

// 2. CAPITALS BY CONTINENT
const ASIA_CITIES_RAW = [
  { id: 'cap_tokio', name: 'Tokio', country: 'Japón', emoji: '🇯🇵', lng: 139.69, lat: 35.69, funFact: '¡Capital de Japón, con grandes robots, trenes bala súper veloces y la montaña sagrada Monte Fuji!' },
  { id: 'cap_pekin', name: 'Pekín (Beijing)', country: 'China', emoji: '🇨🇳', lng: 116.40, lat: 39.90, funFact: '¡Capital de China, cerca de la impresionante Gran Muralla y cuna de los osos panda!' },
  { id: 'cap_nueva_delhi', name: 'Nueva Delhi', country: 'India', emoji: '🇮🇳', lng: 77.20, lat: 28.61, funFact: '¡Capital de la India, país con elegantes tigres de Bengala y el palacio de mármol Taj Mahal!' },
  { id: 'cap_bangkok', name: 'Bangkok', country: 'Tailandia', emoji: '🇹🇭', lng: 100.50, lat: 13.75, funFact: '¡Famosa por sus templos budistas dorados, barcas en ríos y elefantes protegidos!' },
  { id: 'cap_seul', name: 'Seúl', country: 'Corea del Sur', emoji: '🇰🇷', lng: 126.97, lat: 37.56, funFact: '¡Una de las capitales tecnológicas más modernas del planeta, rodeada de montañas!' },
  { id: 'cap_riad', name: 'Riad', country: 'Arabia Saudí', emoji: '🇸🇦', lng: 46.72, lat: 24.68, funFact: '¡Gran capital en medio de oasis en el desierto con modernos rascacielos iluminados!' },
  { id: 'cap_yakarta', name: 'Yakarta', country: 'Indonesia', emoji: '🇮🇩', lng: 106.84, lat: -6.20, funFact: '¡Capital de Indonesia, un país formado por más de 17.000 islas tropicales con volcanes!' },
  { id: 'cap_manila', name: 'Manila', country: 'Filipinas', emoji: '🇵🇭', lng: 120.98, lat: 14.59, funFact: '¡Capital de Filipinas junto a hermosas playas de arena blanca y arrecifes de coral!' }
];

const AFRICA_CITIES_RAW = [
  { id: 'cap_el_cairo', name: 'El Cairo', country: 'Egipto', emoji: '🇪🇬', lng: 31.23, lat: 30.04, funFact: '¡Capital de Egipto a orillas del río Nilo, guardiana de las grandes Pirámides y la Esfinge!' },
  { id: 'cap_nairobi', name: 'Nairobi', country: 'Kenia', emoji: '🇰🇪', lng: 36.82, lat: -1.29, funFact: '¡Única capital del mundo que tiene un parque nacional con leones y jirafas junto a los edificios!' },
  { id: 'cap_rabat', name: 'Rabat', country: 'Marruecos', emoji: '🇲🇦', lng: -6.84, lat: 34.02, funFact: '¡Capital de Marruecos, con torres históricas, murallas rojas y frente al océano Atlántico!' },
  { id: 'cap_pretoria', name: 'Pretoria', country: 'Sudáfrica', emoji: '🇿🇦', lng: 28.18, lat: -25.74, funFact: '¡Conocida como la ciudad de las jacarandas porque en primavera miles de árboles se visten de color morado!' },
  { id: 'cap_dakar', name: 'Dakar', country: 'Senegal', emoji: '🇸🇳', lng: -17.44, lat: 14.69, funFact: '¡El punto más al oeste de todo el continente africano y meta del legendario rally!' },
  { id: 'cap_tunez', name: 'Túnez', country: 'Túnez', emoji: '🇹🇳', lng: 10.18, lat: 36.80, funFact: '¡Capital norteafricana a orillas del mar Mediterráneo, muy cerca de las antiguas ruinas de Cartago!' },
  { id: 'cap_adis_abeba', name: 'Adís Abeba', country: 'Etiopía', emoji: '🇪🇹', lng: 38.74, lat: 9.03, funFact: '¡Una de las capitales más altas del mundo, situada a 2.300 metros de altitud en las montañas!' },
  { id: 'cap_antananarivo', name: 'Antananarivo', country: 'Madagascar', emoji: '🇲🇬', lng: 47.53, lat: -18.91, funFact: '¡Capital de la gran isla de Madagascar, hogar exclusivo de los simpáticos lémures y gigantes baobabs!' }
];

const AMERICA_CITIES_RAW = [
  { id: 'cap_washington', name: 'Washington D.C.', country: 'Estados Unidos', emoji: '🇺🇸', lng: -77.03, lat: 38.90, funFact: '¡Capital de EE.UU. donde se encuentra la Casa Blanca y el Monumento a Washington!' },
  { id: 'cap_ottawa', name: 'Ottawa', country: 'Canadá', emoji: '🇨🇦', lng: -75.69, lat: 45.42, funFact: '¡Capital de Canadá, donde en invierno su gran canal Rideau se convierte en la pista de patinaje sobre hielo más larga del mundo!' },
  { id: 'cap_buenos_aires', name: 'Buenos Aires', country: 'Argentina', emoji: '🇦🇷', lng: -58.38, lat: -34.60, funFact: '¡Capital de Argentina a orillas del Río de la Plata, tierra del tango, del fútbol y del gran Obelisco!' },
  { id: 'cap_brasilia', name: 'Brasilia', country: 'Brasil', emoji: '🇧🇷', lng: -47.88, lat: -15.79, funFact: '¡Una de las ciudades más singulares del mundo, construida con forma de pájaro o avión vista desde el cielo!' },
  { id: 'cap_santiago', name: 'Santiago de Chile', country: 'Chile', emoji: '🇨🇱', lng: -70.66, lat: -33.44, funFact: '¡Capital de Chile abrazada por las gigantescas montañas nevadas de la cordillera de los Andes!' },
  { id: 'cap_bogota', name: 'Bogotá', country: 'Colombia', emoji: '🇨🇴', lng: -74.07, lat: 4.71, funFact: '¡Capital de Colombia en lo alto de la sabana andina, famosa por el verde café y el Museo del Oro!' },
  { id: 'cap_lima', name: 'Lima', country: 'Perú', emoji: '🇵🇪', lng: -77.04, lat: -12.04, funFact: '¡Capital del Perú junto al océano Pacífico, con deliciosa gastronomía y herencia de los incas!' },
  { id: 'cap_montevideo', name: 'Montevideo', country: 'Uruguay', emoji: '🇺🇾', lng: -56.16, lat: -34.90, funFact: '¡Capital tranquila y costera de Uruguay con hermosas playas a orillas del Río de la Plata!' }
];

const CENTROAMERICA_CITIES_RAW = [
  { id: 'cap_mexico', name: 'Ciudad de México', country: 'México', emoji: '🇲🇽', lng: -99.13, lat: 19.43, funFact: '¡Una de las ciudades más grandes del mundo, construida sobre la antigua Tenochtitlán con museos y pirámides cercanas!' },
  { id: 'cap_guatemala', name: 'Ciudad de Guatemala', country: 'Guatemala', emoji: '🇬🇹', lng: -90.50, lat: 14.63, funFact: '¡Capital de Guatemala en un valle rodeado por tres volcanes majestuosos!' },
  { id: 'cap_san_salvador', name: 'San Salvador', country: 'El Salvador', emoji: '🇸🇻', lng: -89.21, lat: 13.69, funFact: '¡Capital de El Salvador a los pies del imponente volcán de San Salvador!' },
  { id: 'cap_san_jose', name: 'San José', country: 'Costa Rica', emoji: '🇨🇷', lng: -84.09, lat: 9.92, funFact: '¡Capital de Costa Rica, paraíso mundial de la naturaleza verde, tucanes y ranitas de ojos rojos!' },
  { id: 'cap_panama', name: 'Ciudad de Panamá', country: 'Panamá', emoji: '🇵🇦', lng: -79.51, lat: 8.98, funFact: '¡Famosa por el Canal de Panamá que une el océano Atlántico con el océano Pacífico cruzando barcos gigantes!' },
  { id: 'cap_la_habana', name: 'La Habana', country: 'Cuba', emoji: '🇨🇺', lng: -82.36, lat: 23.11, funFact: '¡Capital de Cuba frente al mar Caribe, con autos clásicos de colores pastel y fortalezas antiguas!' },
  { id: 'cap_santo_domingo', name: 'Santo Domingo', country: 'República Dominicana', emoji: '🇩🇴', lng: -69.93, lat: 18.48, funFact: '¡La primera ciudad europea fundada en América, con su preciosa Zona Colonial en el Caribe!' },
  { id: 'cap_tegucigalpa', name: 'Tegucigalpa', country: 'Honduras', emoji: '🇭🇳', lng: -87.20, lat: 14.07, funFact: '¡Capital de Honduras rodeada de verdes colinas y bosques de pinos!' }
];

function projectCities(rawList) {
  return rawList.map(c => {
    const pt = ptWorld(c.lng, c.lat);
    return {
      id: c.id,
      name: c.name,
      countryOrRegion: c.country,
      flagEmoji: c.emoji,
      funFact: c.funFact,
      x: pt.x,
      y: pt.y
    };
  });
}

const outDir = path.join(__dirname, '..', 'src', 'data', 'maps');

// Write continentsData.ts
fs.writeFileSync(
  path.join(outDir, 'continentsData.ts'),
  `// Generated by scripts/build_full_geography.cjs\n` +
  `export interface ContinentRegion {\n` +
  `  id: string;\n` +
  `  name: string;\n` +
  `  flagEmoji: string;\n` +
  `  funFact: string;\n` +
  `  hint: string;\n` +
  `  pathD: string;\n` +
  `  labelX: number;\n` +
  `  labelY: number;\n` +
  `  color?: string;\n` +
  `}\n\n` +
  `export const CONTINENTS_DATA: ContinentRegion[] = ${JSON.stringify(CONTINENTS, null, 2)};\n`
);

// Write capitalsByContinent.ts
fs.writeFileSync(
  path.join(outDir, 'capitalsByContinent.ts'),
  `// Generated by scripts/build_full_geography.cjs\n` +
  `import { MapCity } from '../geographyData';\n\n` +
  `export const ASIA_CAPITALS: MapCity[] = ${JSON.stringify(projectCities(ASIA_CITIES_RAW), null, 2)};\n\n` +
  `export const AFRICA_CAPITALS: MapCity[] = ${JSON.stringify(projectCities(AFRICA_CITIES_RAW), null, 2)};\n\n` +
  `export const AMERICA_CAPITALS: MapCity[] = ${JSON.stringify(projectCities(AMERICA_CITIES_RAW), null, 2)};\n\n` +
  `export const CENTROAMERICA_CAPITALS: MapCity[] = ${JSON.stringify(projectCities(CENTROAMERICA_CITIES_RAW), null, 2)};\n`
);

console.log('Successfully wrote continentsData.ts and capitalsByContinent.ts!');
