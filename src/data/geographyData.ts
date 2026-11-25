import { GeographyExerciseData, GeographyCategory } from '../types/education';
import { SPAIN_CCAA_REGIONS, CDAARegion } from './maps/spainCCAA';
import { SPAIN_PROVINCE_BORDERS, SPAIN_PROVINCIAL_CAPITALS, ProvincialCapitalCity } from './maps/spainProvinces';
import { EUROPE_COUNTRIES, EUROPE_CAPITALS, EuropeCountryRegion, EuropeCapitalCity } from './maps/europeData';
import { WORLD_COUNTRIES, WORLD_CAPITALS, WorldCountryRegion } from './maps/worldData';
import { CONTINENTS_DATA, ContinentRegion } from './maps/continentsData';
import {
  ASIA_CAPITALS,
  AFRICA_CAPITALS,
  AMERICA_CAPITALS,
  CENTROAMERICA_CAPITALS
} from './maps/capitalsByContinent';

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
  id: string;
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

  // Continentes del Mundo
  continentes: {
    id: 'continentes',
    title: 'Continentes del Mundo',
    categoryTitle: 'Continentes',
    targetType: 'region',
    viewBox: '0 0 800 480',
    regions: CONTINENTS_DATA.map((c: ContinentRegion) => ({
      id: c.id,
      name: c.name,
      flagEmoji: c.flagEmoji,
      funFact: c.funFact,
      hint: c.hint,
      pathD: c.pathD,
      labelX: c.labelX,
      labelY: c.labelY,
      color: c.color
    })),
    backgroundBorders: WORLD_COUNTRIES.map((c) => ({
      id: c.id,
      name: c.name,
      pathD: c.pathD
    }))
  },

  // Capitales de Europa
  capitales_europa: {
    id: 'capitales_europa',
    title: 'Capitales de Europa',
    categoryTitle: 'Capitales Europeas',
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

  // Capitales de Asia
  capitales_asia: {
    id: 'capitales_asia',
    title: 'Capitales de Asia',
    categoryTitle: 'Capitales Asiáticas',
    targetType: 'city',
    viewBox: '430 50 350 330',
    regions: [],
    cities: ASIA_CAPITALS,
    backgroundBorders: WORLD_COUNTRIES.map((c) => ({
      id: c.id,
      name: c.name,
      pathD: c.pathD
    }))
  },

  // Capitales de África
  capitales_africa: {
    id: 'capitales_africa',
    title: 'Capitales de África',
    categoryTitle: 'Capitales Africanas',
    targetType: 'city',
    viewBox: '320 100 270 270',
    regions: [],
    cities: AFRICA_CAPITALS,
    backgroundBorders: WORLD_COUNTRIES.map((c) => ({
      id: c.id,
      name: c.name,
      pathD: c.pathD
    }))
  },

  // Capitales de América (Norte y Sur)
  capitales_america: {
    id: 'capitales_america',
    title: 'Capitales de América (Norte y Sur)',
    categoryTitle: 'Capitales de América',
    targetType: 'city',
    viewBox: '110 50 310 370',
    regions: [],
    cities: AMERICA_CAPITALS,
    backgroundBorders: WORLD_COUNTRIES.map((c) => ({
      id: c.id,
      name: c.name,
      pathD: c.pathD
    }))
  },

  // Capitales de Centroamérica y Caribe
  capitales_centroamerica: {
    id: 'capitales_centroamerica',
    title: 'Capitales de Centroamérica y Caribe',
    categoryTitle: 'Capitales Centroamericanas',
    targetType: 'city',
    viewBox: '170 140 160 120',
    regions: [],
    cities: CENTROAMERICA_CAPITALS,
    backgroundBorders: WORLD_COUNTRIES.map((c) => ({
      id: c.id,
      name: c.name,
      pathD: c.pathD
    }))
  },

  // Europa Países
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

  // Mundo Países
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
  }
};

// Aliases
MAPS_DATA.spain = MAPS_DATA.spain_ccaa;
MAPS_DATA.espana_ccaa = MAPS_DATA.spain_ccaa;
MAPS_DATA.espana_provincias = MAPS_DATA.spain_provinces;
MAPS_DATA.europe = MAPS_DATA.europe_countries;
MAPS_DATA.world = MAPS_DATA.world_countries;
MAPS_DATA.europe_capitals = MAPS_DATA.capitales_europa;
MAPS_DATA.world_capitals = MAPS_DATA.capitales_america;

// 2. Metadata for the 8 Geography Categories
export interface GeographyCategoryCardInfo {
  id: GeographyCategory;
  title: string;
  subtitle: string;
  emoji: string;
  group: 'espana' | 'mundo' | 'capitales';
  groupTitle: string;
  itemCountText: string;
  description: string;
}

export const GEOGRAPHY_CATEGORIES_INFO: GeographyCategoryCardInfo[] = [
  // España
  {
    id: 'espana_ccaa',
    title: 'Comunidades Autónomas',
    subtitle: '17 comunidades + Ceuta y Melilla',
    emoji: '💃',
    group: 'espana',
    groupTitle: 'España',
    itemCountText: '19 regiones',
    description: 'Toca sobre la superficie de las comunidades en el mapa mudo de España.'
  },
  {
    id: 'espana_provincias',
    title: 'Capitales de Provincia',
    subtitle: 'Madrid, Zaragoza, Sevilla, Valencia...',
    emoji: '📍',
    group: 'espana',
    groupTitle: 'España',
    itemCountText: '50 ciudades',
    description: 'Encuentra y pulsa el punto exacto de las capitales provinciales españolas.'
  },
  // Mundo & Continentes
  {
    id: 'continentes',
    title: 'Continentes del Mundo',
    subtitle: 'Europa, Asia, África, América, Oceanía...',
    emoji: '🌍',
    group: 'mundo',
    groupTitle: 'El Planisferio',
    itemCountText: '7 continentes',
    description: 'Identifica los grandes bloques de tierra del planeta en el planisferio mudo.'
  },
  // Capitales por Continente
  {
    id: 'capitales_europa',
    title: 'Capitales de Europa',
    subtitle: 'París, Berlín, Roma, Londres, Lisboa...',
    emoji: '🇪🇺',
    group: 'capitales',
    groupTitle: 'Capitales del Mundo',
    itemCountText: '14 capitales',
    description: 'Explora el mapa europeo señalando las principales capitales de sus países.'
  },
  {
    id: 'capitales_asia',
    title: 'Capitales de Asia',
    subtitle: 'Tokio, Pekín, Nueva Delhi, Bangkok...',
    emoji: '⛩️',
    group: 'capitales',
    groupTitle: 'Capitales del Mundo',
    itemCountText: '8 capitales',
    description: 'Viaja al lejano oriente encontrando las grandes capitales asiáticas.'
  },
  {
    id: 'capitales_africa',
    title: 'Capitales de África',
    subtitle: 'El Cairo, Nairobi, Rabat, Pretoria...',
    emoji: '🦁',
    group: 'capitales',
    groupTitle: 'Capitales del Mundo',
    itemCountText: '8 capitales',
    description: 'Recorre el continente africano desde el Nilo hasta el cabo de Buena Esperanza.'
  },
  {
    id: 'capitales_america',
    title: 'Capitales de América (Norte y Sur)',
    subtitle: 'Washington, Ottawa, Buenos Aires, Brasilia...',
    emoji: '🌎',
    group: 'capitales',
    groupTitle: 'Capitales del Mundo',
    itemCountText: '8 capitales',
    description: 'Descubre las grandes capitales del continente americano de norte a sur.'
  },
  {
    id: 'capitales_centroamerica',
    title: 'Capitales de Centroamérica y Caribe',
    subtitle: 'México, Guatemala, San José, La Habana...',
    emoji: '🏝️',
    group: 'capitales',
    groupTitle: 'Capitales del Mundo',
    itemCountText: '8 capitales',
    description: 'Navega por las costas caribeñas y los volcanes de América Central.'
  }
];

// 3. Exercises pools per Category

// A) España: CCAA
export const SPAIN_CCAA_EXERCISES: GeographyExerciseData[] = SPAIN_CCAA_REGIONS.map((r) => ({
  id: `geo_ccaa_${r.id}`,
  subject: 'geografia',
  level: 1,
  type: 'map_pin',
  mapType: 'spain_ccaa',
  targetType: 'region',
  category: 'espana_ccaa',
  title: 'Comunidades de España',
  instructions: `Toca en el mapa: ${r.name}`,
  targetRegionId: r.id,
  targetRegionName: r.name,
  flagEmoji: r.flagEmoji,
  funFact: r.funFact,
  hint: r.hint
}));

// B) España: Provincias
export const SPAIN_PROVINCE_EXERCISES: GeographyExerciseData[] = SPAIN_PROVINCIAL_CAPITALS.map((c) => ({
  id: `geo_prov_${c.id}`,
  subject: 'geografia',
  level: 1,
  type: 'map_pin',
  mapType: 'spain_provinces',
  targetType: 'city',
  category: 'espana_provincias',
  title: 'Capitales de Provincia',
  instructions: `Haz clic en el punto de ${c.name} (${c.ccaa})`,
  targetRegionId: c.id,
  targetRegionName: c.name,
  flagEmoji: c.flagEmoji,
  funFact: c.funFact,
  hint: `Está situada en la comunidad de ${c.ccaa}.`
}));

// C) Continentes
export const CONTINENTS_EXERCISES: GeographyExerciseData[] = CONTINENTS_DATA.map((c) => ({
  id: `geo_cont_${c.id}`,
  subject: 'geografia',
  level: 1,
  type: 'map_pin',
  mapType: 'continentes',
  targetType: 'region',
  category: 'continentes',
  title: 'Continentes del Mundo',
  instructions: `Toca sobre el continente: ${c.name}`,
  targetRegionId: c.id,
  targetRegionName: c.name,
  flagEmoji: c.flagEmoji,
  funFact: c.funFact,
  hint: c.hint
}));

// D) Capitales de Europa
export const EUROPE_CAPITAL_EXERCISES: GeographyExerciseData[] = EUROPE_CAPITALS.map((c) => ({
  id: `geo_capeu_${c.id}`,
  subject: 'geografia',
  level: 1,
  type: 'map_pin',
  mapType: 'capitales_europa',
  targetType: 'city',
  category: 'capitales_europa',
  title: 'Capitales de Europa',
  instructions: `¿Dónde está ${c.name}, capital de ${c.countryOrRegion}?`,
  targetRegionId: c.id,
  targetRegionName: c.name,
  flagEmoji: c.flagEmoji,
  funFact: c.funFact,
  hint: `Es la capital de ${c.countryOrRegion}.`
}));

// E) Capitales de Asia
export const ASIA_CAPITAL_EXERCISES: GeographyExerciseData[] = ASIA_CAPITALS.map((c) => ({
  id: `geo_capas_${c.id}`,
  subject: 'geografia',
  level: 1,
  type: 'map_pin',
  mapType: 'capitales_asia',
  targetType: 'city',
  category: 'capitales_asia',
  title: 'Capitales de Asia',
  instructions: `Toca el punto de ${c.name}, capital de ${c.countryOrRegion}`,
  targetRegionId: c.id,
  targetRegionName: c.name,
  flagEmoji: c.flagEmoji,
  funFact: c.funFact,
  hint: `Capital asiática de ${c.countryOrRegion}.`
}));

// F) Capitales de África
export const AFRICA_CAPITAL_EXERCISES: GeographyExerciseData[] = AFRICA_CAPITALS.map((c) => ({
  id: `geo_capaf_${c.id}`,
  subject: 'geografia',
  level: 1,
  type: 'map_pin',
  mapType: 'capitales_africa',
  targetType: 'city',
  category: 'capitales_africa',
  title: 'Capitales de África',
  instructions: `Encuentra ${c.name}, capital de ${c.countryOrRegion}`,
  targetRegionId: c.id,
  targetRegionName: c.name,
  flagEmoji: c.flagEmoji,
  funFact: c.funFact,
  hint: `Capital de ${c.countryOrRegion}.`
}));

// G) Capitales de América (Norte y Sur)
export const AMERICA_CAPITAL_EXERCISES: GeographyExerciseData[] = AMERICA_CAPITALS.map((c) => ({
  id: `geo_capam_${c.id}`,
  subject: 'geografia',
  level: 1,
  type: 'map_pin',
  mapType: 'capitales_america',
  targetType: 'city',
  category: 'capitales_america',
  title: 'Capitales de América',
  instructions: `Toca ${c.name}, capital de ${c.countryOrRegion}`,
  targetRegionId: c.id,
  targetRegionName: c.name,
  flagEmoji: c.flagEmoji,
  funFact: c.funFact,
  hint: `Capital de ${c.countryOrRegion}.`
}));

// H) Capitales de Centroamérica y Caribe
export const CENTROAMERICA_CAPITAL_EXERCISES: GeographyExerciseData[] = CENTROAMERICA_CAPITALS.map((c) => ({
  id: `geo_capca_${c.id}`,
  subject: 'geografia',
  level: 1,
  type: 'map_pin',
  mapType: 'capitales_centroamerica',
  targetType: 'city',
  category: 'capitales_centroamerica',
  title: 'Capitales de Centroamérica y Caribe',
  instructions: `Encuentra ${c.name}, capital de ${c.countryOrRegion}`,
  targetRegionId: c.id,
  targetRegionName: c.name,
  flagEmoji: c.flagEmoji,
  funFact: c.funFact,
  hint: `Capital en Centroamérica/Caribe de ${c.countryOrRegion}.`
}));

// All exercises combined
export const GEOGRAPHY_EXERCISES: GeographyExerciseData[] = [
  ...SPAIN_CCAA_EXERCISES,
  ...SPAIN_PROVINCE_EXERCISES,
  ...CONTINENTS_EXERCISES,
  ...EUROPE_CAPITAL_EXERCISES,
  ...ASIA_CAPITAL_EXERCISES,
  ...AFRICA_CAPITAL_EXERCISES,
  ...AMERICA_CAPITAL_EXERCISES,
  ...CENTROAMERICA_CAPITAL_EXERCISES
];

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate session specifically for the selected Geography Category
export function generateGeographyCategorySession(
  category: GeographyCategory,
  count = 6
): GeographyExerciseData[] {
  switch (category) {
    case 'espana_ccaa':
      return shuffle(SPAIN_CCAA_EXERCISES).slice(0, count);
    case 'espana_provincias':
      return shuffle(SPAIN_PROVINCE_EXERCISES).slice(0, count);
    case 'continentes':
      return shuffle(CONTINENTS_EXERCISES).slice(0, count);
    case 'capitales_europa':
      return shuffle(EUROPE_CAPITAL_EXERCISES).slice(0, count);
    case 'capitales_asia':
      return shuffle(ASIA_CAPITAL_EXERCISES).slice(0, count);
    case 'capitales_africa':
      return shuffle(AFRICA_CAPITAL_EXERCISES).slice(0, count);
    case 'capitales_america':
      return shuffle(AMERICA_CAPITAL_EXERCISES).slice(0, count);
    case 'capitales_centroamerica':
      return shuffle(CENTROAMERICA_CAPITAL_EXERCISES).slice(0, count);
    default:
      return shuffle(GEOGRAPHY_EXERCISES).slice(0, count);
  }
}
