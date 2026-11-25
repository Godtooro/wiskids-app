const fs = require('fs');
const path = require('path');
const https = require('https');
const topojson = require('topojson-client');
const d3Geo = require('d3-geo');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function roundPath(d) {
  if (!d) return '';
  return d.replace(/([0-9]+\.[0-9]{2,})/g, (m) => Number(m).toFixed(1));
}

async function main() {
  console.log('Fetching world atlas dataset...');
  const tj = await fetchJson('https://unpkg.com/world-atlas@2.0.2/countries-110m.json');

  const projWorld = d3Geo.geoEqualEarth().scale(130).translate([400, 240]);
  const pathGen = d3Geo.geoPath().projection(projWorld);

  // 1. ALL COUNTRIES POLITICAL BORDERS
  const geoCountries = topojson.feature(tj, tj.objects.countries);
  const allWorldCountries = [];
  geoCountries.features.forEach((f) => {
    const name = f.properties && f.properties.name;
    const p = pathGen(f);
    if (name && p) {
      allWorldCountries.push({
        id: String(f.id || name.toLowerCase().replace(/[^a-z0-9]/g, '_')),
        name: name,
        pathD: roundPath(p)
      });
    }
  });

  // 2. REAL MERGED CONTINENT OUTLINES (No crude boxes!)
  const continentGroups = {
    europa: {
      name: 'Europa',
      emoji: '🇪🇺',
      funFact: '¡Europa tiene castillos medievales, la Torre Eiffel de París, el Coliseo de Roma y los canales de Venecia!',
      hint: 'Situada al norte del mar Mediterráneo, al oeste de Asia.',
      color: '#3b82f6',
      countries: [
        'Albania', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herz.', 'Bulgaria',
        'Croatia', 'Cyprus', 'Czechia', 'Denmark', 'Estonia', 'Finland', 'France',
        'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kosovo',
        'Latvia', 'Lithuania', 'Luxembourg', 'Macedonia', 'Moldova', 'Montenegro',
        'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Serbia',
        'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Ukraine',
        'United Kingdom'
      ]
    },
    asia: {
      name: 'Asia',
      emoji: '⛩️',
      funFact: '¡Asia es el continente más grande y poblado del planeta! Allí se alzan el Monte Everest y la Gran Muralla China.',
      hint: 'El continente más inmenso, extendido al este de Europa.',
      color: '#eab308',
      countries: [
        'Afghanistan', 'Armenia', 'Azerbaijan', 'Bangladesh', 'Bhutan', 'Brunei',
        'Cambodia', 'China', 'Georgia', 'India', 'Indonesia', 'Iran', 'Iraq',
        'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos',
        'Lebanon', 'Malaysia', 'Mongolia', 'Myanmar', 'N. Cyprus', 'Nepal',
        'North Korea', 'Oman', 'Pakistan', 'Palestine', 'Philippines', 'Qatar',
        'Russia', 'Saudi Arabia', 'South Korea', 'Sri Lanka', 'Syria', 'Taiwan',
        'Tajikistan', 'Thailand', 'Timor-Leste', 'Turkey', 'Turkmenistan',
        'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen'
      ]
    },
    africa: {
      name: 'África',
      emoji: '🦁',
      funFact: '¡África es la cuna de los safaris con leones, cebras y elefantes, del gran desierto del Sáhara y del río Nilo!',
      hint: 'Situado justo al sur de Europa, bañado por el océano Atlántico e Índico.',
      color: '#f97316',
      countries: [
        'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi',
        'Cameroon', 'Central African Rep.', 'Chad', 'Congo', 'Côte d\'Ivoire',
        'Dem. Rep. Congo', 'Djibouti', 'Egypt', 'Eq. Guinea', 'Eritrea', 'Ethiopia',
        'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho',
        'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania',
        'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda',
        'S. Sudan', 'Senegal', 'Sierra Leone', 'Somalia', 'Somaliland',
        'South Africa', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda',
        'W. Sahara', 'Zambia', 'Zimbabwe', 'eSwatini'
      ]
    },
    america_norte: {
      name: 'América del Norte',
      emoji: '🍁',
      funFact: '¡Tiene bosques gigantes de secuoyas, osos polares en Alaska, las cataratas del Niágara y la Estatua de la Libertad!',
      hint: 'En la parte superior izquierda del mapa del mundo.',
      color: '#10b981',
      countries: ['Canada', 'United States of America', 'Greenland', 'Mexico']
    },
    america_sur: {
      name: 'América del Sur',
      emoji: '🌴',
      funFact: '¡Allí está la gran selva amazónica, las impresionantes cataratas de Iguazú y la cordillera de los Andes!',
      hint: 'En la parte inferior izquierda del mapa del mundo.',
      color: '#06b6d4',
      countries: [
        'Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador',
        'Falkland Is.', 'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay',
        'Venezuela'
      ]
    },
    oceania: {
      name: 'Oceanía',
      emoji: '🦘',
      funFact: '¡Compuesta por Australia, Nueva Zelanda e islas paradisíacas con simpáticos canguros, koalas y arrecifes de coral!',
      hint: 'Abajo a la derecha en el planisferio, rodeada por el océano Pacífico.',
      color: '#ec4899',
      countries: [
        'Australia', 'Fiji', 'New Caledonia', 'New Zealand', 'Papua New Guinea',
        'Solomon Is.', 'Vanuatu'
      ]
    },
    antartida: {
      name: 'Antártida',
      emoji: '🧊',
      funFact: '¡El continente más frío y blanco del planeta, cubierto de enormes glaciares y millones de pingüinos emperador!',
      hint: 'Completamente abajo en el polo sur del mapa.',
      color: '#94a3b8',
      countries: ['Antarctica', 'Fr. S. Antarctic Lands']
    }
  };

  const realContinents = [];
  for (const [key, cfg] of Object.entries(continentGroups)) {
    const geoms = tj.objects.countries.geometries.filter(
      (g) => g.properties && cfg.countries.includes(g.properties.name)
    );
    const merged = topojson.merge(tj, geoms);
    const d = pathGen(merged);
    const c = pathGen.centroid(merged);
    realContinents.push({
      id: key,
      name: cfg.name,
      flagEmoji: cfg.emoji,
      funFact: cfg.funFact,
      hint: cfg.hint,
      pathD: roundPath(d),
      labelX: Math.round(c[0]),
      labelY: Math.round(c[1]),
      color: cfg.color
    });
  }

  // Write continentsData.ts
  const mapsDir = path.join(__dirname, '..', 'src', 'data', 'maps');
  fs.writeFileSync(
    path.join(mapsDir, 'continentsData.ts'),
    `// Generated by scripts/build_real_political_maps.cjs\n` +
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
    `export const CONTINENTS_DATA: ContinentRegion[] = ${JSON.stringify(realContinents, null, 2)};\n`
  );

  // Write all countries political borders into worldPoliticalData.ts
  fs.writeFileSync(
    path.join(mapsDir, 'worldPoliticalData.ts'),
    `// Generated by scripts/build_real_political_maps.cjs\n` +
    `export interface CountryBorderPath {\n` +
    `  id: string;\n` +
    `  name: string;\n` +
    `  pathD: string;\n` +
    `}\n\n` +
    `export const ALL_WORLD_POLITICAL_BORDERS: CountryBorderPath[] = ${JSON.stringify(allWorldCountries, null, 2)};\n`
  );

  console.log('Successfully generated real political continents and world political borders!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
