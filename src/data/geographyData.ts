import { GeographyExerciseData } from '../types/education';
import { SPAIN_CCAA_REGIONS, CDAARegion } from './maps/spainCCAA';
import { SPAIN_PROVINCE_BORDERS, SPAIN_PROVINCIAL_CAPITALS, ProvincialCapitalCity } from './maps/spainProvinces';
import { EUROPE_COUNTRIES, EUROPE_CAPITALS, EuropeCountryRegion, EuropeCapitalCity } from './maps/europeData';
import { WORLD_COUNTRIES, WORLD_CAPITALS, WorldCountryRegion } from './maps/worldData';

export interface MapRegion {
  id: string;
  name: string;
  flagEmoji: string;
  funFact: string;
  hint: string;
  pathD: string;
  labelX: number;
  labelY: number;
  color?: string;
}

export interface MapCity {
  id: string;
  name: string;
  countryOrRegion: string;
  flagEmoji: string;
  funFact: string;
  x: number;
  y: number;
}

export interface MapDefinition {
  id:
    | 'spain'
    | 'europe'
    | 'world'
    | 'spain_ccaa'
    | 'spain_provinces'
    | 'europe_countries'
    | 'europe_capitals'
    | 'world_countries'
    | 'world_capitals';
  title: string;
  categoryTitle: string;
  targetType: 'region' | 'city';
  viewBox: string;
  regions: MapRegion[];
  cities?: MapCity[];
  backgroundBorders?: Array<{ id: string; name?: string; pathD: string }>;
  canaryInsetBox?: { x: number; y: number; width: number; height: number };
}

// 1. Map Definitions
export const MAPS_DATA: Record<string, MapDefinition> = {
  // España - Comunidades Autónomas
  spain_ccaa: {
    id: 'spain_ccaa',
    title: 'Comunidades de España',
    categoryTitle: 'Comunidades Autónomas de España',
    targetType: 'region',
    viewBox: '0 0 840 600',
    regions: SPAIN_CCAA_REGIONS.map((r: CDAARegion) => ({
      id: r.id,
      name: r.name,
      flagEmoji: r.flagEmoji,
      funFact: r.funFact,
      hint: r.hint,
      pathD: r.pathD,
      labelX: r.labelX,
      labelY: r.labelY
    })),
    canaryInsetBox: { x: 10, y: 440, width: 230, height: 145 }
  },

  // España - Capitales de Provincia
  spain_provinces: {
    id: 'spain_provinces',
    title: 'Capitales de Provincia de España',
    categoryTitle: 'Capitales de Provincia',
    targetType: 'city',
    viewBox: '0 0 840 600',
    regions: [],
    cities: SPAIN_PROVINCIAL_CAPITALS.map((c: ProvincialCapitalCity) => ({
      id: c.id,
      name: c.name,
      countryOrRegion: c.ccaa,
      flagEmoji: c.flagEmoji,
      funFact: c.funFact,
      x: c.x,
      y: c.y
    })),
    backgroundBorders: SPAIN_PROVINCE_BORDERS,
    canaryInsetBox: { x: 10, y: 440, width: 230, height: 145 }
  },

  // Europa - Países
  europe_countries: {
    id: 'europe_countries',
    title: 'Países de Europa',
    categoryTitle: 'Países Europeos',
    targetType: 'region',
    viewBox: '120 70 560 520',
    regions: EUROPE_COUNTRIES.map((r: EuropeCountryRegion) => ({
      id: r.id,
      name: r.name,
      flagEmoji: r.flagEmoji,
      funFact: r.funFact,
      hint: `País europeo con capital o territorio en ${r.name}`,
      pathD: r.pathD,
      labelX: r.labelX,
      labelY: r.labelY
    }))
  },

  // Europa - Capitales de Países
  europe_capitals: {
    id: 'europe_capitals',
    title: 'Capitales de Europa',
    categoryTitle: 'Capitales de Países de Europa',
    targetType: 'city',
    viewBox: '120 70 560 520',
    regions: [],
    cities: EUROPE_CAPITALS.map((c: EuropeCapitalCity) => ({
      id: c.id,
      name: c.name,
      countryOrRegion: c.countryOrRegion,
      flagEmoji: c.flagEmoji,
      funFact: c.funFact,
      x: c.x,
      y: c.y
    })),
    backgroundBorders: EUROPE_COUNTRIES.map((c) => ({
      id: c.id,
      name: c.name,
      pathD: c.pathD
    }))
  },

  // Mundo - Grandes Países
  world_countries: {
    id: 'world_countries',
    title: 'Grandes Países del Mundo',
    categoryTitle: 'Países del Mundo',
    targetType: 'region',
    viewBox: '80 40 640 400',
    regions: WORLD_COUNTRIES.map((r: WorldCountryRegion) => ({
      id: r.id,
      name: r.name,
      flagEmoji: r.flagEmoji,
      funFact: r.funFact,
      hint: `Busca ${r.name} en el mapa del mundo`,
      pathD: r.pathD,
      labelX: r.labelX,
      labelY: r.labelY
    }))
  },

  // Mundo - Capitales
  world_capitals: {
    id: 'world_capitals',
    title: 'Grandes Capitales del Mundo',
    categoryTitle: 'Capitales del Mundo',
    targetType: 'city',
    viewBox: '80 40 640 400',
    regions: [],
    cities: WORLD_CAPITALS.map((c) => ({
      id: c.id,
      name: c.name,
      countryOrRegion: c.countryOrRegion,
      flagEmoji: c.flagEmoji,
      funFact: c.funFact,
      x: c.x,
      y: c.y
    })),
    backgroundBorders: WORLD_COUNTRIES.map((c) => ({
      id: c.id,
      name: c.name,
      pathD: c.pathD
    }))
  }
};

// Aliases for backwards compatibility
MAPS_DATA.spain = MAPS_DATA.spain_ccaa;
MAPS_DATA.europe = MAPS_DATA.europe_countries;
MAPS_DATA.world = MAPS_DATA.world_countries;

// 2. Exercises Definition
export const GEOGRAPHY_EXERCISES: GeographyExerciseData[] = [
  // A) España: Comunidades Autónomas (Superficie / Clic en el área)
  {
    id: 'geo_sp_madrid',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: 'Toca en el mapa la Comunidad de Madrid.',
    targetRegionId: 'madrid',
    targetRegionName: 'Comunidad de Madrid',
    flagEmoji: '🐻',
    funFact: '¡En Madrid está la Puerta del Sol con el kilómetro cero de las carreteras de España!',
    hint: 'Busca justo en el corazón y centro de la península.'
  },
  {
    id: 'geo_sp_andalucia',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: '¿Dónde está Andalucía?',
    targetRegionId: 'andalucia',
    targetRegionName: 'Andalucía',
    flagEmoji: '💃',
    funFact: '¡Andalucía es la tierra del flamenco, la Alhambra de Granada y el río Guadalquivir!',
    hint: 'Busca en la zona sur de la península, abajo del todo del mapa.'
  },
  {
    id: 'geo_sp_cataluna',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: 'Toca Cataluña en el mapa.',
    targetRegionId: 'cataluna',
    targetRegionName: 'Cataluña',
    flagEmoji: '🎨',
    funFact: '¡En Barcelona puedes ver la Sagrada Familia de Gaudí y la Costa Brava mediterránea!',
    hint: 'Arriba a la derecha (noreste), en la frontera con Francia.'
  },
  {
    id: 'geo_sp_galicia',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: '¿Dónde está Galicia?',
    targetRegionId: 'galicia',
    targetRegionName: 'Galicia',
    flagEmoji: '🐙',
    funFact: '¡Galicia tiene grandes faros, el Camino de Santiago y hermosas costas verdes!',
    hint: 'Busca arriba del todo a la izquierda (en el noroeste peninsular).'
  },
  {
    id: 'geo_sp_valencia',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: 'Encuentra la Comunitat Valenciana.',
    targetRegionId: 'valencia',
    targetRegionName: 'Comunitat Valenciana',
    flagEmoji: '🥘',
    funFact: '¡Cuna de la auténtica paella, las fiestas de las Fallas y dulces naranjas!',
    hint: 'En la costa este, bañada por las cálidas aguas del mar Mediterráneo.'
  },
  {
    id: 'geo_sp_pais_vasco',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: 'Toca el País Vasco en el mapa.',
    targetRegionId: 'pais_vasco',
    targetRegionName: 'País Vasco',
    flagEmoji: '🌊',
    funFact: '¡Tiene un idioma ancestral fascinante y el espectacular Museo Guggenheim de Bilbao!',
    hint: 'En la costa norte oriental, junto al mar Cantábrico.'
  },
  {
    id: 'geo_sp_castilla_leon',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: '¿Dónde está Castilla y León?',
    targetRegionId: 'castilla_leon',
    targetRegionName: 'Castilla y León',
    flagEmoji: '🏰',
    funFact: '¡Es la comunidad más extensa, con grandes catedrales y el acueducto de Segovia!',
    hint: 'Ocupa la gran meseta norte en el centro-norte de la península.'
  },
  {
    id: 'geo_sp_castilla_la_mancha',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: 'Encuentra Castilla-La Mancha.',
    targetRegionId: 'castilla_la_mancha',
    targetRegionName: 'Castilla-La Mancha',
    flagEmoji: '🌬️',
    funFact: '¡Tierra de Don Quijote, molinos de viento gigantes y las Casas Colgadas de Cuenca!',
    hint: 'En el centro-sur peninsular, rodeando a Madrid por el sur.'
  },
  {
    id: 'geo_sp_canarias',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: 'Toca las Islas Canarias en el mapa.',
    targetRegionId: 'canarias',
    targetRegionName: 'Canarias',
    flagEmoji: '🌋',
    funFact: '¡Allí está el Teide, el volcán y pico más alto de toda España con 3.715 metros!',
    hint: 'Busca en el recuadro abajo a la izquierda en el océano Atlántico.'
  },
  {
    id: 'geo_sp_baleares',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: '¿Dónde están las Islas Baleares?',
    targetRegionId: 'baleares',
    targetRegionName: 'Islas Baleares',
    flagEmoji: '🏝️',
    funFact: '¡Formadas por Mallorca, Menorca, Ibiza y Formentera en el mar Mediterráneo!',
    hint: 'Son las islas situadas al este de la costa peninsular.'
  },
  {
    id: 'geo_sp_aragon',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: 'Toca Aragón en el mapa.',
    targetRegionId: 'aragon',
    targetRegionName: 'Aragón',
    flagEmoji: '🏰',
    funFact: '¡En Zaragoza se alza la gran Basílica del Pilar sobre el río Ebro y los Pirineos!',
    hint: 'En el interior noreste, entre Cataluña, Valencia, Castilla y León y Navarra.'
  },
  {
    id: 'geo_sp_asturias',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: '¿Dónde está el Principado de Asturias?',
    targetRegionId: 'asturias',
    targetRegionName: 'Principado de Asturias',
    flagEmoji: '🍏',
    funFact: '¡Tierra de sidra, vacas en prados verdes y los increíbles Picos de Europa!',
    hint: 'En la costa norte de España (mar Cantábrico), junto a Galicia.'
  },
  {
    id: 'geo_sp_extremadura',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: 'Toca Extremadura en el mapa.',
    targetRegionId: 'extremadura',
    targetRegionName: 'Extremadura',
    flagEmoji: '🦅',
    funFact: '¡Tiene el majestuoso Teatro Romano de Mérida y parques naturales con cigüeñas!',
    hint: 'Al oeste de España, haciendo frontera directa con Portugal.'
  },
  {
    id: 'geo_sp_murcia',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: 'Encuentra la Región de Murcia.',
    targetRegionId: 'murcia',
    targetRegionName: 'Región de Murcia',
    flagEmoji: '🍋',
    funFact: '¡Famosa como la huerta de Europa por sus ricas hortalizas y el Mar Menor!',
    hint: 'En el sureste de la península, entre la Comunitat Valenciana y Andalucía.'
  },
  {
    id: 'geo_sp_cantabria',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: '¿Dónde está Cantabria?',
    targetRegionId: 'cantabria',
    targetRegionName: 'Cantabria',
    flagEmoji: '🐂',
    funFact: '¡Hogar de la cueva prehistórica de Altamira y de la hermosa bahía de Santander!',
    hint: 'En la costa norte (mar Cantábrico), entre Asturias y el País Vasco.'
  },
  {
    id: 'geo_sp_navarra',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: 'Toca la Comunidad Foral de Navarra.',
    targetRegionId: 'navarra',
    targetRegionName: 'Comunidad Foral de Navarra',
    flagEmoji: '🌲',
    funFact: '¡Con la inmensa Selva de Irati y los castillos de cuento de Olite!',
    hint: 'En el norte, entre el País Vasco, Aragón y la frontera con Francia.'
  },
  {
    id: 'geo_sp_la_rioja',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_ccaa',
    targetType: 'region',
    category: 'ccaa',
    title: 'Comunidades de España',
    instructions: '¿Dónde está La Rioja?',
    targetRegionId: 'la_rioja',
    targetRegionName: 'La Rioja',
    flagEmoji: '🍇',
    funFact: '¡Famosa por sus viñedos y donde nacieron las primeras palabras escritas en castellano!',
    hint: 'Pequeña comunidad en el norte, entre País Vasco, Navarra y Castilla y León.'
  },

  // B) España: Capitales de Provincia (Puntos / Clic en la ciudad)
  {
    id: 'geo_cap_madrid',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_provinces',
    targetType: 'city',
    category: 'provincial_capitals',
    title: 'Capitales de Provincia',
    instructions: 'Haz clic en el punto de la capital: Madrid.',
    targetRegionId: 'cap_madrid',
    targetRegionName: 'Madrid',
    flagEmoji: '🐻',
    funFact: '¡Madrid es la capital de España y de su provincia, famosa por la Gran Vía y la Puerta de Alcalá!',
    hint: 'Busca el punto justo en el centro de España.'
  },
  {
    id: 'geo_cap_barcelona',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_provinces',
    targetType: 'city',
    category: 'provincial_capitals',
    title: 'Capitales de Provincia',
    instructions: 'Toca en el mapa la capital de provincia: Barcelona.',
    targetRegionId: 'cap_barcelona',
    targetRegionName: 'Barcelona',
    flagEmoji: '🎨',
    funFact: '¡Barcelona tiene la Sagrada Familia de Gaudí y mira al mar Mediterráneo!',
    hint: 'En la costa del noreste peninsular (Cataluña).'
  },
  {
    id: 'geo_cap_sevilla',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_provinces',
    targetType: 'city',
    category: 'provincial_capitals',
    title: 'Capitales de Provincia',
    instructions: '¿Dónde está la capital de provincia: Sevilla?',
    targetRegionId: 'cap_sevilla',
    targetRegionName: 'Sevilla',
    flagEmoji: '💃',
    funFact: '¡Sevilla tiene la Giralda y la Torre del Oro junto al río Guadalquivir!',
    hint: 'En la zona suroeste de la península (Andalucía).'
  },
  {
    id: 'geo_cap_valencia',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_provinces',
    targetType: 'city',
    category: 'provincial_capitals',
    title: 'Capitales de Provincia',
    instructions: 'Encuentra en el mapa la ciudad de Valencia.',
    targetRegionId: 'cap_valencia',
    targetRegionName: 'Valencia',
    flagEmoji: '🥘',
    funFact: '¡Valencia tiene la Ciudad de las Artes y las Ciencias y las fiestas de las Fallas!',
    hint: 'En la costa este central de la península.'
  },
  {
    id: 'geo_cap_zaragoza',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_provinces',
    targetType: 'city',
    category: 'provincial_capitals',
    title: 'Capitales de Provincia',
    instructions: 'Haz clic en la capital de provincia: Zaragoza.',
    targetRegionId: 'cap_zaragoza',
    targetRegionName: 'Zaragoza',
    flagEmoji: '🏛️',
    funFact: '¡Zaragoza está atravesada por el río Ebro y tiene la imponente Basílica del Pilar!',
    hint: 'En el interior noreste de España, a mitad de camino entre Madrid y Barcelona.'
  },
  {
    id: 'geo_cap_bilbao',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_provinces',
    targetType: 'city',
    category: 'provincial_capitals',
    title: 'Capitales de Provincia',
    instructions: '¿Dónde está la ciudad de Bilbao?',
    targetRegionId: 'cap_bilbao',
    targetRegionName: 'Bilbao',
    flagEmoji: '🚢',
    funFact: '¡Bilbao es la gran capital vizcaína con el Museo Guggenheim revestido de titanio!',
    hint: 'En el norte peninsular, en la costa cantábrica del País Vasco.'
  },
  {
    id: 'geo_cap_malaga',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_provinces',
    targetType: 'city',
    category: 'provincial_capitals',
    title: 'Capitales de Provincia',
    instructions: 'Toca en el mapa la ciudad de Málaga.',
    targetRegionId: 'cap_malaga',
    targetRegionName: 'Málaga',
    flagEmoji: '☀️',
    funFact: '¡Málaga es la capital de la Costa del Sol y la ciudad donde nació el pintor Pablo Picasso!',
    hint: 'En la costa sur de Andalucía sobre el mar Mediterráneo.'
  },
  {
    id: 'geo_cap_palma',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_provinces',
    targetType: 'city',
    category: 'provincial_capitals',
    title: 'Capitales de Provincia',
    instructions: 'Encuentra Palma de Mallorca.',
    targetRegionId: 'cap_palma',
    targetRegionName: 'Palma de Mallorca',
    flagEmoji: '⛵',
    funFact: '¡Palma es la capital de las Islas Baleares con su gran catedral que se refleja en el mar!',
    hint: 'En la gran isla de Mallorca, al este de la península.'
  },
  {
    id: 'geo_cap_las_palmas',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_provinces',
    targetType: 'city',
    category: 'provincial_capitals',
    title: 'Capitales de Provincia',
    instructions: 'Haz clic en Las Palmas de Gran Canaria.',
    targetRegionId: 'cap_las_palmas',
    targetRegionName: 'Las Palmas de Gran Canaria',
    flagEmoji: '🌴',
    funFact: '¡Tiene la famosa playa urbana de Las Canteras con arrecifes naturales de coral!',
    hint: 'En las islas Canarias (recuadro inferior izquierdo).'
  },
  {
    id: 'geo_cap_santa_cruz',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_provinces',
    targetType: 'city',
    category: 'provincial_capitals',
    title: 'Capitales de Provincia',
    instructions: 'Toca Santa Cruz de Tenerife en el mapa.',
    targetRegionId: 'cap_santa_cruz',
    targetRegionName: 'Santa Cruz de Tenerife',
    flagEmoji: '🎭',
    funFact: '¡Famosa por su gran carnaval internacional y el moderno Auditorio de Tenerife!',
    hint: 'En la isla de Tenerife (recuadro de Canarias abajo a la izquierda).'
  },
  {
    id: 'geo_cap_santander',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_provinces',
    targetType: 'city',
    category: 'provincial_capitals',
    title: 'Capitales de Provincia',
    instructions: '¿Dónde está la capital: Santander?',
    targetRegionId: 'cap_santander',
    targetRegionName: 'Santander',
    flagEmoji: '⛵',
    funFact: '¡Santander tiene una bahía espectacular y el histórico Palacio de la Magdalena!',
    hint: 'En la costa norte de España (Cantabria).'
  },
  {
    id: 'geo_cap_oviedo',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_provinces',
    targetType: 'city',
    category: 'provincial_capitals',
    title: 'Capitales de Provincia',
    instructions: 'Toca en el mapa la ciudad de Oviedo.',
    targetRegionId: 'cap_oviedo',
    targetRegionName: 'Oviedo',
    flagEmoji: '👑',
    funFact: '¡Capital de Asturias, famosa por su catedral prerrománica y los Premios Princesa de Asturias!',
    hint: 'En el interior de Asturias, en el norte verde de España.'
  },
  {
    id: 'geo_cap_toledo',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_provinces',
    targetType: 'city',
    category: 'provincial_capitals',
    title: 'Capitales de Provincia',
    instructions: 'Encuentra la histórica ciudad de Toledo.',
    targetRegionId: 'cap_toledo',
    targetRegionName: 'Toledo',
    flagEmoji: '⚔️',
    funFact: '¡Toledo es la ciudad de las tres culturas, con su Alcázar protegido por el río Tajo!',
    hint: 'Justo al sur de Madrid, en Castilla-La Mancha.'
  },
  {
    id: 'geo_cap_valladolid',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_provinces',
    targetType: 'city',
    category: 'provincial_capitals',
    title: 'Capitales de Provincia',
    instructions: 'Haz clic en Valladolid.',
    targetRegionId: 'cap_valladolid',
    targetRegionName: 'Valladolid',
    flagEmoji: '📖',
    funFact: '¡En Valladolid vivió Miguel de Cervantes y fue antigua sede de las cortes del reino!',
    hint: 'En el centro de la meseta norte (Castilla y León).'
  },
  {
    id: 'geo_cap_cordoba',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_provinces',
    targetType: 'city',
    category: 'provincial_capitals',
    title: 'Capitales de Provincia',
    instructions: '¿Dónde está la ciudad de Córdoba?',
    targetRegionId: 'cap_cordoba',
    targetRegionName: 'Córdoba',
    flagEmoji: '🌺',
    funFact: '¡Famosa en todo el planeta por su Mezquita-Catedral de arcos bicolores y sus patios floridos!',
    hint: 'En Andalucía, al noreste de Sevilla.'
  },
  {
    id: 'geo_cap_granada',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain_provinces',
    targetType: 'city',
    category: 'provincial_capitals',
    title: 'Capitales de Provincia',
    instructions: 'Toca en el mapa la ciudad de Granada.',
    targetRegionId: 'cap_granada',
    targetRegionName: 'Granada',
    flagEmoji: '🏔️',
    funFact: '¡En Granada se alza la Alhambra a los pies de las cumbres de Sierra Nevada!',
    hint: 'En el este de Andalucía, al pie de las montañas nevadas.'
  },

  // C) Países de Europa (Superficie / Clic en el país)
  {
    id: 'geo_eu_francia',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'europe_countries',
    targetType: 'region',
    category: 'countries',
    title: 'Países de Europa',
    instructions: '¿Dónde está Francia en el mapa?',
    targetRegionId: 'france',
    targetRegionName: 'Francia',
    flagEmoji: '🇫🇷',
    funFact: '¡Francia es nuestro país vecino del norte y en París está la famosa Torre Eiffel!',
    hint: 'Está justo encima de España, separada por los montes Pirineos.'
  },
  {
    id: 'geo_eu_italia',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'europe_countries',
    targetType: 'region',
    category: 'countries',
    title: 'Países de Europa',
    instructions: 'Toca Italia en el mapa de Europa.',
    targetRegionId: 'italy',
    targetRegionName: 'Italia',
    flagEmoji: '🇮🇹',
    funFact: '¡Tiene forma inconfundible de bota y allí se inventaron la pizza y el Coliseo!',
    hint: 'Busca la gran península con forma de bota que entra en el mar Mediterráneo.'
  },
  {
    id: 'geo_eu_portugal',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'europe_countries',
    targetType: 'region',
    category: 'countries',
    title: 'Países de Europa',
    instructions: 'Encuentra a nuestro vecino Portugal.',
    targetRegionId: 'portugal',
    targetRegionName: 'Portugal',
    flagEmoji: '🇵🇹',
    funFact: '¡Portugal comparte la península ibérica con España y mira hacia el océano Atlántico!',
    hint: 'Está pegado al oeste de España.'
  },
  {
    id: 'geo_eu_alemania',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'europe_countries',
    targetType: 'region',
    category: 'countries',
    title: 'Países de Europa',
    instructions: 'Toca Alemania en el mapa.',
    targetRegionId: 'germany',
    targetRegionName: 'Alemania',
    flagEmoji: '🇩🇪',
    funFact: '¡En Alemania están los castillos que inspiraron los cuentos y la Selva Negra!',
    hint: 'En el centro de Europa, justo al este de Francia.'
  },
  {
    id: 'geo_eu_reino_unido',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'europe_countries',
    targetType: 'region',
    category: 'countries',
    title: 'Países de Europa',
    instructions: '¿Dónde está el Reino Unido?',
    targetRegionId: 'united_kingdom',
    targetRegionName: 'Reino Unido',
    flagEmoji: '🇬🇧',
    funFact: '¡Es una gran isla famosa por sus autobuses rojos de dos pisos y el Big Ben!',
    hint: 'Es la gran isla al norte de Francia cruzando el canal de la Mancha.'
  },

  // D) Capitales de Europa (Puntos / Clic en la capital nacional)
  {
    id: 'geo_cap_paris',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'europe_capitals',
    targetType: 'city',
    category: 'country_capitals',
    title: 'Capitales de Países',
    instructions: 'Haz clic en la capital de Francia: París.',
    targetRegionId: 'cap_paris',
    targetRegionName: 'París',
    flagEmoji: '🇫🇷',
    funFact: '¡París es conocida como la Ciudad de la Luz y allí está la Torre Eiffel junto al río Sena!',
    hint: 'Busca en el tercio norte del territorio de Francia.'
  },
  {
    id: 'geo_cap_roma',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'europe_capitals',
    targetType: 'city',
    category: 'country_capitals',
    title: 'Capitales de Países',
    instructions: 'Toca en el mapa la capital de Italia: Roma.',
    targetRegionId: 'cap_roma',
    targetRegionName: 'Roma',
    flagEmoji: '🇮🇹',
    funFact: '¡Roma tiene el Coliseo, la Fontana di Trevi y fue el corazón del Imperio Romano!',
    hint: 'En el centro de la bota italiana, cerca de la costa oeste.'
  },
  {
    id: 'geo_cap_londres',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'europe_capitals',
    targetType: 'city',
    category: 'country_capitals',
    title: 'Capitales de Países',
    instructions: '¿Dónde está la capital del Reino Unido: Londres?',
    targetRegionId: 'cap_londres',
    targetRegionName: 'Londres',
    flagEmoji: '🇬🇧',
    funFact: '¡Londres está cruzada por el río Támesis y tiene la gran torre del reloj Big Ben!',
    hint: 'En el sureste de la gran isla de Gran Bretaña.'
  },
  {
    id: 'geo_cap_berlin',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'europe_capitals',
    targetType: 'city',
    category: 'country_capitals',
    title: 'Capitales de Países',
    instructions: 'Haz clic en la capital de Alemania: Berlín.',
    targetRegionId: 'cap_berlin',
    targetRegionName: 'Berlín',
    flagEmoji: '🇩🇪',
    funFact: '¡En Berlín se encuentra la emblemática Puerta de Brandeburgo!',
    hint: 'En el noreste de Alemania.'
  },
  {
    id: 'geo_cap_lisboa',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'europe_capitals',
    targetType: 'city',
    category: 'country_capitals',
    title: 'Capitales de Países',
    instructions: 'Encuentra la capital de Portugal: Lisboa.',
    targetRegionId: 'cap_lisboa',
    targetRegionName: 'Lisboa',
    flagEmoji: '🇵🇹',
    funFact: '¡Lisboa tiene la Torre de Belém y tranvías amarillos que suben colinas históricas!',
    hint: 'En la costa oeste atlántica de Portugal, donde desemboca el río Tajo.'
  },

  // E) Mundo: Países y Grandes Capitales
  {
    id: 'geo_wd_japon',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'world_countries',
    targetType: 'region',
    category: 'countries',
    title: 'Grandes Países del Mundo',
    instructions: '¿Dónde está Japón en el mapa del mundo?',
    targetRegionId: 'japon',
    targetRegionName: 'Japón',
    flagEmoji: '🇯🇵',
    funFact: '¡Japón está formado por islas al este de Asia, famoso por sus robots y el Monte Fuji!',
    hint: 'Busca las islas alargadas en el extremo derecho del mapa (este de Asia).'
  },
  {
    id: 'geo_wd_australia',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'world_countries',
    targetType: 'region',
    category: 'countries',
    title: 'Grandes Países del Mundo',
    instructions: 'Encuentra Australia en el mapa.',
    targetRegionId: 'australia',
    targetRegionName: 'Australia',
    flagEmoji: '🇦🇺',
    funFact: '¡Australia es la gran isla continente donde viven los canguros y koalas!',
    hint: 'Es la gran masa de tierra solitaria abajo a la derecha del mapa.'
  },
  {
    id: 'geo_wd_brasil',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'world_countries',
    targetType: 'region',
    category: 'countries',
    title: 'Grandes Países del Mundo',
    instructions: 'Toca Brasil en América del Sur.',
    targetRegionId: 'brasil',
    targetRegionName: 'Brasil',
    flagEmoji: '🇧🇷',
    funFact: '¡En Brasil está la selva del Amazonas, el gran pulmón verde del planeta con monos y tucanes!',
    hint: 'Es el país más grande del continente sudamericano.'
  },
  {
    id: 'geo_wd_cap_tokio',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'world_capitals',
    targetType: 'city',
    category: 'country_capitals',
    title: 'Capitales del Mundo',
    instructions: 'Haz clic en la capital de Japón: Tokio.',
    targetRegionId: 'cap_tokio',
    targetRegionName: 'Tokio',
    flagEmoji: '🇯🇵',
    funFact: '¡Tokio es la capital de Japón con la Torre de Tokio y trenes bala súper veloces!',
    hint: 'En la costa este de las islas de Japón.'
  }
];
