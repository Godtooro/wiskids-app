const fs = require('fs');
const path = require('path');
const https = require('https');
const topojson = require('topojson-client');
const d3Geo = require('d3-geo');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
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
  console.log('Loading datasets...');
  const tjSpainCCAA = await fetchJson('https://unpkg.com/es-atlas@0.6.0/es/autonomous_regions.json');
  const tjSpainProv = await fetchJson('https://unpkg.com/es-atlas@0.6.0/es/provinces.json');
  const tjWorld = await fetchJson('https://unpkg.com/world-atlas@2.0.2/countries-110m.json');

  const mapsDir = path.join(__dirname, '..', 'src', 'data', 'maps');
  if (!fs.existsSync(mapsDir)) {
    fs.mkdirSync(mapsDir, { recursive: true });
  }

  // 1. SPAIN PROJECTIONS
  // Mainland + Balearic Islands:
  const projSpainMainland = d3Geo.geoMercator()
    .center([-3.5, 40.0])
    .scale(2600)
    .translate([460, 290]);
  const pathSpainMainland = d3Geo.geoPath().projection(projSpainMainland);

  // Canary Islands Inset (bottom-left):
  const projCanaries = d3Geo.geoMercator()
    .center([-15.5, 28.3])
    .scale(2700)
    .translate([120, 510]);
  const pathCanaries = d3Geo.geoPath().projection(projCanaries);

  // 1A. Spain Autonomous Communities
  const geoCCAA = topojson.feature(tjSpainCCAA, tjSpainCCAA.objects.autonomous_regions);
  
  const ccaaMeta = {
    '01': { id: 'andalucia', name: 'Andalucía', emoji: '💃', funFact: '¡En Andalucía hace mucho sol, nació el flamenco y tienen la Alhambra de Granada!', hint: 'Busca en el sur de la península ibérica, junto al mar Mediterráneo y el océano Atlántico.' },
    '02': { id: 'aragon', name: 'Aragón', emoji: '🏰', funFact: '¡En Aragón se encuentra la gran Basílica del Pilar en Zaragoza y los imponentes Pirineos!', hint: 'En el noreste del interior, entre Cataluña y Navarra.' },
    '03': { id: 'asturias', name: 'Principado de Asturias', emoji: '🍏', funFact: '¡Tierra de sidra, vacas pastando en prados verdes y los increíbles Picos de Europa!', hint: 'En la costa norte de España (mar Cantábrico), junto a Galicia y Cantabria.' },
    '04': { id: 'baleares', name: 'Islas Baleares', emoji: '🏝️', funFact: '¡Formadas por Mallorca, Menorca, Ibiza y Formentera en el azul mar Mediterráneo!', hint: 'Son las islas al este de la península en el mar Mediterráneo.' },
    '05': { id: 'canarias', name: 'Canarias', emoji: '🌋', funFact: '¡Tienen el volcán Teide, la montaña más alta de España, y clima suave de primavera todo el año!', hint: 'En el recuadro abajo a la izquierda en el océano Atlántico.' },
    '06': { id: 'cantabria', name: 'Cantabria', emoji: '🐂', funFact: '¡Allí están las famosas cuevas de Altamira con pinturas rupestres prehistóricas!', hint: 'En la costa norte, entre Asturias y el País Vasco.' },
    '07': { id: 'castilla_leon', name: 'Castilla y León', emoji: '🏰', funFact: '¡La comunidad más extensa de España, con castillos medievales y el acueducto romano de Segovia!', hint: 'Ocupa la gran meseta norte del centro de la península.' },
    '08': { id: 'castilla_la_mancha', name: 'Castilla-La Mancha', emoji: '🌬️', funFact: '¡Tierra de Don Quijote, molinos de viento gigantes y las Casas Colgadas de Cuenca!', hint: 'En el centro-sur de la península, rodeando a Madrid por el sur y este.' },
    '09': { id: 'cataluna', name: 'Cataluña', emoji: '🎨', funFact: '¡En Barcelona está la Sagrada Familia de Gaudí y playas preciosas en la Costa Brava!', hint: 'Arriba a la derecha (noreste), en la frontera con Francia y el mar Mediterráneo.' },
    '10': { id: 'valencia', name: 'Comunitat Valenciana', emoji: '🥘', funFact: '¡Cuna de la auténtica paella, las fiestas de las Fallas y dulces naranjas!', hint: 'En la costa este de la península bañada por el mar Mediterráneo.' },
    '11': { id: 'extremadura', name: 'Extremadura', emoji: '🦅', funFact: '¡Famosa por el teatro romano de Mérida y dehesas verdes donde vuelan cigüeñas y águilas!', hint: 'Al oeste de España, haciendo frontera con Portugal.' },
    '12': { id: 'galicia', name: 'Galicia', emoji: '🐙', funFact: '¡Tierra mágica de bosques verdes, el Camino de Santiago y la Torre de Hércules romana!', hint: 'Arriba del todo a la izquierda (en el noroeste peninsular).' },
    '13': { id: 'madrid', name: 'Comunidad de Madrid', emoji: '🐻', funFact: '¡En Madrid está la Puerta del Sol con el kilómetro cero y el Parque del Retiro!', hint: 'Justo en el corazón y centro geográfico de la península ibérica.' },
    '14': { id: 'murcia', name: 'Región de Murcia', emoji: '🍋', funFact: '¡Conocida como la huerta de Europa por sus ricas frutas, y por la gran laguna del Mar Menor!', hint: 'En el sureste de la península, entre la C. Valenciana y Andalucía.' },
    '15': { id: 'navarra', name: 'Comunidad Foral de Navarra', emoji: '🌲', funFact: '¡Tiene la misteriosa Selva de Irati y los castillos de cuento de Olite!', hint: 'En el norte, entre el País Vasco, Aragón y la frontera con Francia.' },
    '16': { id: 'pais_vasco', name: 'País Vasco', emoji: '🌊', funFact: '¡Con un idioma milenario único y el espectacular museo Guggenheim en Bilbao!', hint: 'En la costa norte oriental, junto al mar Cantábrico y la frontera con Francia.' },
    '17': { id: 'la_rioja', name: 'La Rioja', emoji: '🍇', funFact: '¡Famosa en todo el mundo por sus viñedos y donde se escribieron las primeras palabras en castellano!', hint: 'Pequeña comunidad en el norte, entre el País Vasco, Navarra y Castilla y León.' },
    '18': { id: 'ceuta', name: 'Ceuta', emoji: '⛵', funFact: '¡Ciudad autónoma española situada junto al Estrecho de Gibraltar!', hint: 'En la costa del norte de África, justo frente al estrecho de Gibraltar.' },
    '19': { id: 'melilla', name: 'Melilla', emoji: '🏰', funFact: '¡Ciudad autónoma española famosa por su impresionante fortaleza sobre el mar Mediterráneo!', hint: 'En la costa del norte de África, más hacia el este frente a Andalucía.' }
  };

  const spainCCAAData = geoCCAA.features
    .filter(f => ccaaMeta[f.id])
    .map(f => {
      const meta = ccaaMeta[f.id];
      const isCanarias = f.id === '05';
      const pathRaw = isCanarias ? pathCanaries(f) : pathSpainMainland(f);
      const centroidRaw = isCanarias ? pathCanaries.centroid(f) : pathSpainMainland.centroid(f);
      return {
        id: meta.id,
        code: f.id,
        name: meta.name,
        flagEmoji: meta.emoji,
        funFact: meta.funFact,
        hint: meta.hint,
        pathD: roundPath(pathRaw),
        labelX: Math.round(centroidRaw[0]),
        labelY: Math.round(centroidRaw[1])
      };
    });

  // 1B. Spain Provinces outlines for background
  const geoProv = topojson.feature(tjSpainProv, tjSpainProv.objects.provinces);
  const spainProvBorders = geoProv.features.filter(f => f.id !== '20').map(f => {
    const isCanarias = ['35', '38'].includes(f.id);
    const pathRaw = isCanarias ? pathCanaries(f) : pathSpainMainland(f);
    return {
      id: 'prov_' + f.id,
      name: f.properties.name,
      pathD: roundPath(pathRaw)
    };
  });

  // 1C. Spain Provincial Capitals (City Points)
  const provincialCapitals = [
    { id: 'cap_madrid', name: 'Madrid', ccaa: 'Comunidad de Madrid', emoji: '🐻', coords: [-3.7038, 40.4168], funFact: '¡Madrid es la capital de España y de su provincia, famosa por la Gran Vía y el oso y el madroño!' },
    { id: 'cap_barcelona', name: 'Barcelona', ccaa: 'Cataluña', emoji: '🎨', coords: [2.1734, 41.3851], funFact: '¡Barcelona tiene la Sagrada Familia, el Parque Güell y hermosas playas en el mar Mediterráneo!' },
    { id: 'cap_valencia', name: 'Valencia', ccaa: 'Comunitat Valenciana', emoji: '🥘', coords: [-0.3763, 39.4699], funFact: '¡Valencia tiene la Ciudad de las Artes y las Ciencias y las famosas Fallas con fuegos artificiales!' },
    { id: 'cap_sevilla', name: 'Sevilla', ccaa: 'Andalucía', emoji: '💃', coords: [-5.9845, 37.3891], funFact: '¡Sevilla tiene la Torre del Oro junto al río Guadalquivir y la gran torre de la Giralda!' },
    { id: 'cap_zaragoza', name: 'Zaragoza', ccaa: 'Aragón', emoji: '🏛️', coords: [-0.8891, 41.6488], funFact: '¡Zaragoza es atravesada por el río Ebro y tiene la majestuosa Basílica del Pilar!' },
    { id: 'cap_malaga', name: 'Málaga', ccaa: 'Andalucía', emoji: '☀️', coords: [-4.4214, 36.7213], funFact: '¡Málaga es la capital de la Costa del Sol y la ciudad natal del pintor Pablo Picasso!' },
    { id: 'cap_murcia', name: 'Murcia', ccaa: 'Región de Murcia', emoji: '🍋', coords: [-1.1307, 37.9922], funFact: '¡Murcia tiene una impresionante catedral barroca y un clima soleado y cálido casi todo el año!' },
    { id: 'cap_palma', name: 'Palma de Mallorca', ccaa: 'Islas Baleares', emoji: '⛵', coords: [2.6502, 39.5696], funFact: '¡Palma es la capital de las Islas Baleares, con su catedral gótica que mira directamente al mar!' },
    { id: 'cap_las_palmas', name: 'Las Palmas de Gran Canaria', ccaa: 'Canarias', emoji: '🌴', isCanarias: true, coords: [-15.4363, 28.1248], funFact: '¡Las Palmas tiene la famosa playa urbana de Las Canteras con peces de colores!' },
    { id: 'cap_santa_cruz', name: 'Santa Cruz de Tenerife', ccaa: 'Canarias', emoji: '🎭', isCanarias: true, coords: [-16.2518, 28.4636], funFact: '¡Santa Cruz de Tenerife tiene el Auditorio con forma de ola y uno de los carnavales más alegres del mundo!' },
    { id: 'cap_bilbao', name: 'Bilbao', ccaa: 'País Vasco', emoji: '🚢', coords: [-2.9350, 43.2630], funFact: '¡Bilbao es la gran capital de Vizcaya, con el Museo Guggenheim revestido de titanio brillante!' },
    { id: 'cap_alicante', name: 'Alicante', ccaa: 'Comunitat Valenciana', emoji: '🏰', coords: [-0.4810, 38.3452], funFact: '¡Alicante tiene el Castillo de Santa Bárbara en lo alto del monte Benacantil vigilando el puerto!' },
    { id: 'cap_cordoba', name: 'Córdoba', ccaa: 'Andalucía', emoji: '🌺', coords: [-4.7794, 37.8882], funFact: '¡Córdoba es famosa mundialmente por su Mezquita-Catedral de arcos de herradura y sus patios de flores!' },
    { id: 'cap_valladolid', name: 'Valladolid', ccaa: 'Castilla y León', emoji: '📖', coords: [-4.7245, 41.6523], funFact: '¡En Valladolid vivió Miguel de Cervantes y fue capital histórica del Reino de España!' },
    { id: 'cap_coruna', name: 'A Coruña', ccaa: 'Galicia', emoji: '🌊', coords: [-8.4117, 43.3623], funFact: '¡A Coruña tiene la Torre de Hércules, el faro romano en funcionamiento más antiguo del mundo!' },
    { id: 'cap_santander', name: 'Santander', ccaa: 'Cantabria', emoji: '⛵', coords: [-3.8099, 43.4623], funFact: '¡Santander tiene una de las bahías más hermosas del mundo y el Palacio de la Magdalena!' },
    { id: 'cap_oviedo', name: 'Oviedo', ccaa: 'Principado de Asturias', emoji: '👑', coords: [-5.8494, 43.3619], funFact: '¡Oviedo es la capital del Principado de Asturias y sede de los Premios Princesa de Asturias!' },
    { id: 'cap_pamplona', name: 'Pamplona', ccaa: 'Comunidad Foral de Navarra', emoji: '🐂', coords: [-1.6443, 42.8125], funFact: '¡Pamplona tiene una histórica muralla medieval y las famosas fiestas de San Fermín!' },
    { id: 'cap_logrono', name: 'Logroño', ccaa: 'La Rioja', emoji: '🍇', coords: [-2.4450, 42.4627], funFact: '¡Logroño está a orillas del río Ebro y es un punto clave de paso del Camino de Santiago Francés!' },
    { id: 'cap_toledo', name: 'Toledo', ccaa: 'Castilla-La Mancha', emoji: '⚔️', coords: [-4.0273, 39.8628], funFact: '¡Toledo es la ciudad de las tres culturas, famosa por sus espadas y el Alcázar sobre el río Tajo!' },
    { id: 'cap_badajoz', name: 'Badajoz', ccaa: 'Extremadura', emoji: '🏰', coords: [-6.9706, 38.8794], funFact: '¡Badajoz tiene la mayor alcazaba árabe de España y hace frontera con el país vecino Portugal!' },
    { id: 'cap_granada', name: 'Granada', ccaa: 'Andalucía', emoji: '🏔️', coords: [-3.5986, 37.1773], funFact: '¡En Granada está el palacio de la Alhambra con las cumbres nevadas de Sierra Nevada de fondo!' },
    { id: 'cap_salamanca', name: 'Salamanca', ccaa: 'Castilla y León', emoji: '🐸', coords: [-5.6635, 40.9701], funFact: '¡Salamanca tiene la universidad más antigua de España y una famosa rana escondida en su fachada!' },
    { id: 'cap_burgos', name: 'Burgos', ccaa: 'Castilla y León', emoji: '⛪', coords: [-3.7038, 42.3440], funFact: '¡Burgos tiene una catedral gótica espectacular Patrimonio de la Humanidad y tierra del Cid Campeador!' },
    { id: 'cap_cadiz', name: 'Cádiz', ccaa: 'Andalucía', emoji: '⚓', coords: [-6.2886, 36.5271], funFact: '¡Conocida como la Tacita de Plata, Cádiz es una de las ciudades habitadas más antiguas de Europa occidental!' },
    { id: 'cap_san_sebastian', name: 'San Sebastián / Donostia', ccaa: 'País Vasco', emoji: '🏖️', coords: [-1.9812, 43.3183], funFact: '¡San Sebastián es famosa por su playa de la Concha con forma de semicírculo perfecto!' },
    { id: 'cap_toledo', name: 'Toledo', ccaa: 'Castilla-La Mancha', emoji: '🏰', coords: [-4.0273, 39.8628], funFact: '¡Toledo es la capital de Castilla-La Mancha con su imponente Alcázar sobre el río Tajo!' },
    { id: 'cap_leon', name: 'León', ccaa: 'Castilla y León', emoji: '🦁', coords: [-5.5671, 42.5987], funFact: '¡León tiene una catedral con las vidrieras de colores medievales más impresionantes de Europa!' },
    { id: 'cap_caceres', name: 'Cáceres', ccaa: 'Extremadura', emoji: '🦅', coords: [-6.3722, 39.4753], funFact: '¡Cáceres tiene una ciudad monumental medieval y renacentista protegida por murallas históricas!' },
    { id: 'cap_albacete', name: 'Albacete', ccaa: 'Castilla-La Mancha', emoji: '🔪', coords: [-1.8585, 38.9943], funFact: '¡Albacete es la mayor ciudad de Castilla-La Mancha, famosa por su artesanía de cuchillería y el Pasaje Lodares!' },
    { id: 'cap_tarragona', name: 'Tarragona', ccaa: 'Cataluña', emoji: '🏛️', coords: [1.2445, 41.1189], funFact: '¡Tarragona fue la antigua Tarraco romana y conserva un anfiteatro romano a orillas del Mediterráneo!' },
    { id: 'cap_almeria', name: 'Almería', ccaa: 'Andalucía', emoji: '☀️', coords: [-2.4637, 36.8340], funFact: '¡Almería tiene la gran Alcazaba musulmana y el desierto de Tabernas donde se rodaron muchas películas de aventuras!' }
  ];

  // De-duplicate if needed
  const uniqueCapitalsMap = new Map();
  provincialCapitals.forEach(c => {
    if (!uniqueCapitalsMap.has(c.id)) {
      uniqueCapitalsMap.set(c.id, c);
    }
  });

  const spainCapitalsData = Array.from(uniqueCapitalsMap.values()).map(c => {
    const pt = c.isCanarias ? projCanaries(c.coords) : projSpainMainland(c.coords);
    return {
      id: c.id,
      name: c.name,
      ccaa: c.ccaa,
      flagEmoji: c.emoji,
      funFact: c.funFact,
      x: Math.round(pt[0]),
      y: Math.round(pt[1])
    };
  });

  // 2. EUROPE PROJECTIONS & DATA
  const projEurope = d3Geo.geoMercator()
    .center([11, 52])
    .scale(680)
    .translate([400, 310]);
  const pathEurope = d3Geo.geoPath().projection(projEurope);

  const geoWorld = topojson.feature(tjWorld, tjWorld.objects.countries);

  const europeCountriesMap = {
    'Spain': { id: 'spain_eu', name: 'España', emoji: '🇪🇸', funFact: '¡España está situada en la península ibérica al suroeste de Europa, con su sol y gastronomía!' },
    'Portugal': { id: 'portugal', name: 'Portugal', emoji: '🇵🇹', funFact: '¡Portugal es el país vecino de España en el océano Atlántico, famoso por sus tranvías y azulejos!' },
    'France': { id: 'france', name: 'Francia', emoji: '🇫🇷', funFact: '¡Francia es nuestro vecino del norte y en París se alza la Torre Eiffel de más de 300 metros!' },
    'Italy': { id: 'italy', name: 'Italia', emoji: '🇮🇹', funFact: '¡Tiene forma de bota que entra en el mar Mediterráneo, donde nació el Coliseo Romano y la pizza!' },
    'Germany': { id: 'germany', name: 'Alemania', emoji: '🇩🇪', funFact: '¡En Alemania están los castillos de Neuschwanstein que inspiraron los cuentos de Disney!' },
    'United Kingdom': { id: 'united_kingdom', name: 'Reino Unido', emoji: '🇬🇧', funFact: '¡Tienen los icónicos autobuses rojos de dos pisos, el Big Ben y la guardia real!' },
    'Ireland': { id: 'ireland', name: 'Irlanda', emoji: '🇮🇪', funFact: '¡La Isla Esmeralda, famosa por sus verdes praderas, tréboles de la suerte y castillos!' },
    'Belgium': { id: 'belgium', name: 'Bélgica', emoji: '🇧🇪', funFact: '¡Famosa por su riquísimo chocolate, gofres crujientes y el Atomium de Bruselas!' },
    'Netherlands': { id: 'netherlands', name: 'Países Bajos', emoji: '🇳🇱', funFact: '¡Tierra de molinos de viento tradicionales, millones de bicicletas y coloridos campos de tulipanes!' },
    'Switzerland': { id: 'switzerland', name: 'Suiza', emoji: '🇨🇭', funFact: '¡En los Alpes nevados suizos hacen el chocolate con leche más suave y relojes de gran precisión!' },
    'Austria': { id: 'austria', name: 'Austria', emoji: '🇦🇹', funFact: '¡Tierra de grandes compositores como Mozart y majestuosos palacios imperiales en Viena!' },
    'Poland': { id: 'poland', name: 'Polonia', emoji: '🇵🇱', funFact: '¡En el centro de Europa, con ciudades históricas como Cracovia y grandes bosques de bisontes!' },
    'Greece': { id: 'greece', name: 'Grecia', emoji: '🇬🇷', funFact: '¡Cuna de los Juegos Olímpicos de la Antigüedad y la Acrópolis de Atenas sobre el mar Egeo!' },
    'Norway': { id: 'norway', name: 'Noruega', emoji: '🇳🇴', funFact: '¡Tierra de los vikingos, fiordos impresionantes y mágicas auroras boreales en el cielo!' },
    'Sweden': { id: 'sweden', name: 'Suecia', emoji: '🇸🇪', funFact: '¡País nórdico de bosques infinitos, renos y donde se entregan los prestigiosos Premios Nobel!' },
    'Denmark': { id: 'denmark', name: 'Dinamarca', emoji: '🇩🇰', funFact: '¡Aquí se inventaron los bloques de LEGO y la famosa estatua de la Sirenita de Copenhague!' },
    'Finland': { id: 'finland', name: 'Finlandia', emoji: '🇫🇮', funFact: '¡En Laponia vive Papá Noel con sus renos entre la nieve y miles de lagos cristalinos!' }
  };

  function filterEuropeCoords(geometry) {
    if (!geometry) return null;
    if (geometry.type === 'Polygon') {
      const [lon, lat] = geometry.coordinates[0][0];
      if (lon >= -12 && lon <= 35 && lat >= 34 && lat <= 71) {
        return geometry;
      }
      return null;
    }
    if (geometry.type === 'MultiPolygon') {
      const valid = geometry.coordinates.filter(poly => {
        const [lon, lat] = poly[0][0];
        return lon >= -12 && lon <= 35 && lat >= 34 && lat <= 71;
      });
      if (valid.length === 0) return null;
      return { type: 'MultiPolygon', coordinates: valid };
    }
    return geometry;
  }

  const europeRegions = [];
  geoWorld.features.forEach(f => {
    const cName = f.properties && f.properties.name;
    if (europeCountriesMap[cName]) {
      const meta = europeCountriesMap[cName];
      const filteredGeom = filterEuropeCoords(f.geometry);
      if (!filteredGeom) return;
      const filteredFeature = { ...f, geometry: filteredGeom };
      const p = pathEurope(filteredFeature);
      const c = pathEurope.centroid(filteredFeature);
      if (p) {
        europeRegions.push({
          id: meta.id,
          name: meta.name,
          flagEmoji: meta.emoji,
          funFact: meta.funFact,
          pathD: roundPath(p),
          labelX: Math.round(c[0]),
          labelY: Math.round(c[1])
        });
      }
    }
  });

  // European Capitals (National Capitals)
  const europeCapitals = [
    { id: 'cap_paris', name: 'París', country: 'Francia', emoji: '🇫🇷', coords: [2.3522, 48.8566], funFact: '¡París es la capital de Francia, con la Torre Eiffel y el Museo del Louvre!' },
    { id: 'cap_roma', name: 'Roma', country: 'Italia', emoji: '🇮🇹', coords: [12.4964, 41.9028], funFact: '¡Roma es la Ciudad Eterna, con el Coliseo y la Fontana di Trevi!' },
    { id: 'cap_berlin', name: 'Berlín', country: 'Alemania', emoji: '🇩🇪', coords: [13.4050, 52.5200], funFact: '¡Berlín tiene la histórica Puerta de Brandeburgo y la Isla de los Museos!' },
    { id: 'cap_londres', name: 'Londres', country: 'Reino Unido', emoji: '🇬🇧', coords: [-0.1278, 51.5074], funFact: '¡Londres tiene el gran reloj Big Ben, el Puente de la Torre y el Palacio de Buckingham!' },
    { id: 'cap_madrid_eu', name: 'Madrid', country: 'España', emoji: '🇪🇸', coords: [-3.7038, 40.4168], funFact: '¡Madrid es la capital de España, en el centro geográfico de la península ibérica!' },
    { id: 'cap_lisboa', name: 'Lisboa', country: 'Portugal', emoji: '🇵🇹', coords: [-9.1393, 38.7223], funFact: '¡Lisboa es la capital de Portugal sobre siete colinas junto a la desembocadura del río Tajo!' },
    { id: 'cap_bruselas', name: 'Bruselas', country: 'Bélgica', emoji: '🇧🇪', coords: [4.3517, 50.8503], funFact: '¡Bruselas es la capital de Bélgica y sede de las instituciones de la Unión Europea!' },
    { id: 'cap_amsterdam', name: 'Ámsterdam', country: 'Países Bajos', emoji: '🇳🇱', coords: [4.9041, 52.3676], funFact: '¡Ámsterdam es famosa por sus canales de agua, puentes románticos y bicicletas!' },
    { id: 'cap_berna', name: 'Berna', country: 'Suiza', emoji: '🇨🇭', coords: [7.4474, 46.9480], funFact: '¡Berna es la tranquila capital suiza rodeada por las aguas cristalinas del río Aar!' },
    { id: 'cap_viena', name: 'Viena', country: 'Austria', emoji: '🇦🇹', coords: [16.3738, 48.2082], funFact: '¡Viena es la capital de la música clásica y los palacios imperiales junto al río Danubio!' },
    { id: 'cap_dublin', name: 'Dublín', country: 'Irlanda', emoji: '🇮🇪', coords: [-6.2603, 53.3498], funFact: '¡Dublín es la capital de Irlanda, famosa por sus leyendas celtas y el río Liffey!' },
    { id: 'cap_varsovia', name: 'Varsovia', country: 'Polonia', emoji: '🇵🇱', coords: [21.0122, 52.2297], funFact: '¡Varsovia tiene una Ciudad Vieja reconstruida con edificios de colores brillantes!' },
    { id: 'cap_atenas', name: 'Atenas', country: 'Grecia', emoji: '🇬🇷', coords: [23.7275, 37.9838], funFact: '¡Atenas tiene el Partenón en la roca de la Acrópolis, con más de 2500 años de historia!' },
    { id: 'cap_oslo', name: 'Oslo', country: 'Noruega', emoji: '🇳🇴', coords: [10.7522, 59.9139], funFact: '¡Oslo está ubicada al final de un gran fiordo azul rodeada de verdes colinas y bosques!' },
    { id: 'cap_estocolmo', name: 'Estocolmo', country: 'Suecia', emoji: '🇸🇪', coords: [18.0686, 59.3293], funFact: '¡Estocolmo está construida sobre 14 islas unidas por más de 50 puentes!' },
    { id: 'cap_copenhague', name: 'Copenhague', country: 'Dinamarca', emoji: '🇩🇰', coords: [12.5683, 55.6761], funFact: '¡Copenhague tiene el famoso puerto de Nyhavn con casitas de colores y el parque Tívoli!' }
  ].map(c => {
    const pt = projEurope(c.coords);
    return {
      id: c.id,
      name: c.name,
      countryOrRegion: c.country,
      flagEmoji: c.emoji,
      funFact: c.funFact,
      x: Math.round(pt[0]),
      y: Math.round(pt[1])
    };
  });

  // 3. WORLD PROJECTIONS & DATA
  const projWorld = d3Geo.geoEqualEarth()
    .scale(130)
    .translate([400, 240]);
  const pathWorld = d3Geo.geoPath().projection(projWorld);

  const worldCountriesMap = {
    'Spain': { id: 'spain_w', name: 'España', emoji: '🇪🇸', funFact: '¡España conecta Europa con el mar Mediterráneo y el océano Atlántico!' },
    'United States of America': { id: 'usa', name: 'Estados Unidos', emoji: '🇺🇸', funFact: '¡Allí está el Gran Cañón del Colorado, la Estatua de la Libertad y la NASA!' },
    'Brazil': { id: 'brasil', name: 'Brasil', emoji: '🇧🇷', funFact: '¡En Brasil está la selva del Amazonas, el río más caudaloso y el carnaval de Río!' },
    'Japan': { id: 'japon', name: 'Japón', emoji: '🇯🇵', funFact: '¡El país del sol naciente, trenes bala súper veloces y la montaña sagrada Monte Fuji!' },
    'Australia': { id: 'australia', name: 'Australia', emoji: '🇦🇺', funFact: '¡Gran isla continente donde viven los simpáticos canguros, koalas y la Gran Barrera de Coral!' },
    'Egypt': { id: 'egipto', name: 'Egipto', emoji: '🇪🇬', funFact: '¡Tierra de las grandes Pirámides de Guiza, la Esfinge y el río Nilo!' },
    'Canada': { id: 'canada', name: 'Canadá', emoji: '🇨🇦', funFact: '¡El segundo país más grande del mundo, con lagos gigantes, osos polares y bosques de arces!' },
    'Mexico': { id: 'mexico', name: 'México', emoji: '🇲🇽', funFact: '¡Famoso por las pirámides mayas de Chichén Itzá, los mariachis y deliciosos tacos!' },
    'Argentina': { id: 'argentina', name: 'Argentina', emoji: '🇦🇷', funFact: '¡Tierra del tango, las cataratas de Iguazú, los glaciares de la Patagonia y el fútbol!' },
    'China': { id: 'china', name: 'China', emoji: '🇨🇳', funFact: '¡Hogar de la Gran Muralla China visible desde las colinas y de los tiernos osos panda!' },
    'India': { id: 'india', name: 'India', emoji: '🇮🇳', funFact: '¡Con el bellísimo palacio blanco del Taj Mahal, elefantes sagrados y tigres de Bengala!' },
    'South Africa': { id: 'sudafrica', name: 'Sudáfrica', emoji: '🇿🇦', funFact: '¡Famosa por sus safaris con leones y jirafas en el Parque Kruger y la Montaña de la Mesa!' }
  };

  const worldRegions = [];
  geoWorld.features.forEach(f => {
    const cName = f.properties && f.properties.name;
    if (worldCountriesMap[cName]) {
      const meta = worldCountriesMap[cName];
      const p = pathWorld(f);
      const c = pathWorld.centroid(f);
      if (p) {
        worldRegions.push({
          id: meta.id,
          name: meta.name,
          flagEmoji: meta.emoji,
          funFact: meta.funFact,
          pathD: roundPath(p),
          labelX: Math.round(c[0]),
          labelY: Math.round(c[1])
        });
      }
    }
  });

  // World Capitals (National Capitals)
  const worldCapitals = [
    { id: 'cap_tokio', name: 'Tokio', country: 'Japón', emoji: '🇯🇵', coords: [139.6917, 35.6895], funFact: '¡Tokio es la capital de Japón, con luces de neón gigantes, robots y templos antiguos!' },
    { id: 'cap_washington', name: 'Washington D.C.', country: 'Estados Unidos', emoji: '🇺🇸', coords: [-77.0369, 38.9072], funFact: '¡Washington D.C. es la capital estadounidense donde se encuentra la Casa Blanca!' },
    { id: 'cap_brasilia', name: 'Brasilia', country: 'Brasil', emoji: '🇧🇷', coords: [-47.8825, -15.7942], funFact: '¡Brasilia es una capital futurista diseñada con forma de avión desde el aire!' },
    { id: 'cap_el_cairo', name: 'El Cairo', country: 'Egipto', emoji: '🇪🇬', coords: [31.2357, 30.0444], funFact: '¡El Cairo es la capital de Egipto, a las puertas de las Pirámides de Guiza!' },
    { id: 'cap_canberra', name: 'Camberra', country: 'Australia', emoji: '🇦🇺', coords: [149.1300, -35.2809], funFact: '¡Camberra es la capital planificada de Australia, rodeada de parques naturales y canguros!' },
    { id: 'cap_pekin', name: 'Pekín / Beijing', country: 'China', emoji: '🇨🇳', coords: [116.4074, 39.9042], funFact: '¡Pekín tiene la Ciudad Prohibida imperial con sus techos dorados y dragones!' },
    { id: 'cap_nueva_delhi', name: 'Nueva Delhi', country: 'India', emoji: '🇮🇳', coords: [77.2090, 28.6139], funFact: '¡Nueva Delhi es la vibrante capital de la India, con la gran Puerta de la India!' },
    { id: 'cap_buenos_aires', name: 'Buenos Aires', country: 'Argentina', emoji: '🇦🇷', coords: [-58.3816, -34.6037], funFact: '¡Buenos Aires es la capital argentina, famosa por el Obelisco y el barrio de Caminito!' },
    { id: 'cap_mexico', name: 'Ciudad de México', country: 'México', emoji: '🇲🇽', coords: [-99.1332, 19.4326], funFact: '¡Construida sobre el antiguo lago de Tenochtitlan, tiene el enorme Zócalo y el bosque de Chapultepec!' },
    { id: 'cap_ottawa', name: 'Ottawa', country: 'Canadá', emoji: '🇨🇦', coords: [-75.6972, 45.4215], funFact: '¡Ottawa es la capital de Canadá, famosa por la Colina del Parlamento y el canal Rideau que se hiela en invierno!' }
  ].map(c => {
    const pt = projWorld(c.coords);
    return {
      id: c.id,
      name: c.name,
      countryOrRegion: c.country,
      flagEmoji: c.emoji,
      funFact: c.funFact,
      x: Math.round(pt[0]),
      y: Math.round(pt[1])
    };
  });

  // Write TS files
  console.log('Writing TypeScript files...');

  // spainCCAA.ts
  fs.writeFileSync(
    path.join(mapsDir, 'spainCCAA.ts'),
    `// Generated by scripts/generate_geo_data.cjs\n` +
    `export interface CDAARegion {\n` +
    `  id: string;\n` +
    `  code: string;\n` +
    `  name: string;\n` +
    `  flagEmoji: string;\n` +
    `  funFact: string;\n` +
    `  hint: string;\n` +
    `  pathD: string;\n` +
    `  labelX: number;\n` +
    `  labelY: number;\n` +
    `}\n\n` +
    `export const SPAIN_CCAA_REGIONS: CDAARegion[] = ${JSON.stringify(spainCCAAData, null, 2)};\n`
  );

  // spainProvinces.ts
  fs.writeFileSync(
    path.join(mapsDir, 'spainProvinces.ts'),
    `// Generated by scripts/generate_geo_data.cjs\n` +
    `export interface ProvinceBorder {\n` +
    `  id: string;\n` +
    `  name: string;\n` +
    `  pathD: string;\n` +
    `}\n\n` +
    `export interface ProvincialCapitalCity {\n` +
    `  id: string;\n` +
    `  name: string;\n` +
    `  ccaa: string;\n` +
    `  flagEmoji: string;\n` +
    `  funFact: string;\n` +
    `  x: number;\n` +
    `  y: number;\n` +
    `}\n\n` +
    `export const SPAIN_PROVINCE_BORDERS: ProvinceBorder[] = ${JSON.stringify(spainProvBorders, null, 2)};\n\n` +
    `export const SPAIN_PROVINCIAL_CAPITALS: ProvincialCapitalCity[] = ${JSON.stringify(spainCapitalsData, null, 2)};\n`
  );

  // europeData.ts
  fs.writeFileSync(
    path.join(mapsDir, 'europeData.ts'),
    `// Generated by scripts/generate_geo_data.cjs\n` +
    `export interface EuropeCountryRegion {\n` +
    `  id: string;\n` +
    `  name: string;\n` +
    `  flagEmoji: string;\n` +
    `  funFact: string;\n` +
    `  pathD: string;\n` +
    `  labelX: number;\n` +
    `  labelY: number;\n` +
    `}\n\n` +
    `export interface EuropeCapitalCity {\n` +
    `  id: string;\n` +
    `  name: string;\n` +
    `  countryOrRegion: string;\n` +
    `  flagEmoji: string;\n` +
    `  funFact: string;\n` +
    `  x: number;\n` +
    `  y: number;\n` +
    `}\n\n` +
    `export const EUROPE_COUNTRIES: EuropeCountryRegion[] = ${JSON.stringify(europeRegions, null, 2)};\n\n` +
    `export const EUROPE_CAPITALS: EuropeCapitalCity[] = ${JSON.stringify(europeCapitals, null, 2)};\n`
  );

  // worldData.ts
  fs.writeFileSync(
    path.join(mapsDir, 'worldData.ts'),
    `// Generated by scripts/generate_geo_data.cjs\n` +
    `export interface WorldCountryRegion {\n` +
    `  id: string;\n` +
    `  name: string;\n` +
    `  flagEmoji: string;\n` +
    `  funFact: string;\n` +
    `  pathD: string;\n` +
    `  labelX: number;\n` +
    `  labelY: number;\n` +
    `}\n\n` +
    `export const WORLD_COUNTRIES: WorldCountryRegion[] = ${JSON.stringify(worldRegions, null, 2)};\n\n` +
    `export const WORLD_CAPITALS = ${JSON.stringify(worldCapitals, null, 2)};\n`
  );

  console.log('Finished writing map datasets successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
