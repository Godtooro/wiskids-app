import { GeographyExerciseData } from '../types/education';

export interface MapRegion {
  id: string;
  name: string;
  flagEmoji: string;
  funFact: string;
  pathD: string;
  labelX: number;
  labelY: number;
  color?: string;
}

export interface MapDefinition {
  id: 'spain' | 'europe' | 'world';
  title: string;
  viewBox: string;
  regions: MapRegion[];
}

export const MAPS_DATA: Record<'spain' | 'europe' | 'world', MapDefinition> = {
  spain: {
    id: 'spain',
    title: 'Comunidades de España',
    viewBox: '0 0 600 480',
    regions: [
      {
        id: 'madrid',
        name: 'Madrid',
        flagEmoji: '🇪🇸',
        funFact: '¡En Madrid está la Puerta del Sol, el kilómetro cero de todas las carreteras de España!',
        pathD: 'M 270,230 L 310,225 L 320,250 L 290,270 L 265,245 Z',
        labelX: 290,
        labelY: 245
      },
      {
        id: 'andalucia',
        name: 'Andalucía',
        flagEmoji: '💃',
        funFact: '¡En Andalucía hace mucho sol y tienen la Alhambra de Granada y campos de olivos!',
        pathD: 'M 160,330 L 390,320 L 410,380 L 340,430 L 190,430 L 150,380 Z',
        labelX: 280,
        labelY: 375
      },
      {
        id: 'cataluna',
        name: 'Cataluña',
        flagEmoji: '🏰',
        funFact: '¡En Cataluña está la Sagrada Familia de Gaudí y preciosas playas en la Costa Brava!',
        pathD: 'M 440,110 L 530,120 L 510,210 L 440,210 L 420,160 Z',
        labelX: 470,
        labelY: 160
      },
      {
        id: 'galicia',
        name: 'Galicia',
        flagEmoji: '🐙',
        funFact: '¡En Galicia hay bosques verdes mágicos y la Torre de Hércules, el faro romano más antiguo!',
        pathD: 'M 80,70 L 170,60 L 160,140 L 90,150 Z',
        labelX: 125,
        labelY: 105
      },
      {
        id: 'pais_vasco',
        name: 'País Vasco',
        flagEmoji: '🌊',
        funFact: '¡En el País Vasco tienen un idioma único muy antiguo y el museo Guggenheim con forma de barco!',
        pathD: 'M 290,60 L 350,60 L 345,100 L 295,95 Z',
        labelX: 320,
        labelY: 78
      },
      {
        id: 'valencia',
        name: 'Comunidad Valenciana',
        flagEmoji: '🥘',
        funFact: '¡De aquí es originaria la deliciosa paella y crecen las naranjas más dulces!',
        pathD: 'M 380,210 L 435,210 L 415,320 L 375,310 Z',
        labelX: 405,
        labelY: 260
      },
      {
        id: 'castilla_leon',
        name: 'Castilla y León',
        flagEmoji: '🏰',
        funFact: '¡Es la tierra de los grandes castillos medievales y el impresionante acueducto de Segovia!',
        pathD: 'M 175,70 L 300,90 L 330,170 L 260,225 L 170,190 Z',
        labelX: 240,
        labelY: 145
      },
      {
        id: 'canarias',
        name: 'Islas Canarias',
        flagEmoji: '🌋',
        funFact: '¡Tienen el volcán Teide, la montaña más alta de España, y un clima de primavera todo el año!',
        pathD: 'M 50,420 A 25,25 0 1 0 100,420 A 25,25 0 1 0 50,420 Z M 110,430 A 20,20 0 1 0 150,430 A 20,20 0 1 0 110,430 Z',
        labelX: 100,
        labelY: 425
      }
    ]
  },
  europe: {
    id: 'europe',
    title: 'Países de Europa',
    viewBox: '0 0 650 500',
    regions: [
      {
        id: 'francia',
        name: 'Francia',
        flagEmoji: '🇫🇷',
        funFact: '¡En París está la famosa Torre Eiffel que mide más de 300 metros de altura!',
        pathD: 'M 190,260 L 290,230 L 330,300 L 260,370 L 180,330 Z',
        labelX: 250,
        labelY: 300
      },
      {
        id: 'espana_eu',
        name: 'España',
        flagEmoji: '🇪🇸',
        funFact: '¡Es el país del lince ibérico, el sol, la tortilla de patatas y el flamenco!',
        pathD: 'M 100,350 L 190,340 L 210,430 L 110,445 Z',
        labelX: 155,
        labelY: 395
      },
      {
        id: 'italia',
        name: 'Italia',
        flagEmoji: '🇮🇹',
        funFact: '¡Tiene forma de bota, allí inventaron la pizza y el Coliseo Romano!',
        pathD: 'M 310,330 L 360,320 L 400,420 L 450,440 L 390,470 L 340,380 Z',
        labelX: 370,
        labelY: 390
      },
      {
        id: 'alemania',
        name: 'Alemania',
        flagEmoji: '🇩🇪',
        funFact: '¡Allí están los castillos que inspiraron los cuentos de Disney y el coche!',
        pathD: 'M 290,190 L 370,180 L 380,270 L 300,270 Z',
        labelX: 335,
        labelY: 230
      },
      {
        id: 'reino_unido',
        name: 'Reino Unido',
        flagEmoji: '🇬🇧',
        funFact: '¡Tienen los autobuses rojos de dos pisos y la gran torre del reloj Big Ben!',
        pathD: 'M 170,160 L 230,140 L 220,230 L 180,240 Z',
        labelX: 200,
        labelY: 190
      },
      {
        id: 'portugal',
        name: 'Portugal',
        flagEmoji: '🇵🇹',
        funFact: '¡Es el vecino más cercano de España en el océano Atlántico, famoso por sus tranvías amarillos!',
        pathD: 'M 70,360 L 110,355 L 110,430 L 75,430 Z',
        labelX: 90,
        labelY: 395
      }
    ]
  },
  world: {
    id: 'world',
    title: 'Continentes y Grandes Países',
    viewBox: '0 0 700 450',
    regions: [
      {
        id: 'espana_w',
        name: 'España',
        flagEmoji: '🇪🇸',
        funFact: '¡España está en el suroeste de Europa y conecta con el mar Mediterráneo!',
        pathD: 'M 290,150 L 330,150 L 330,190 L 290,190 Z',
        labelX: 310,
        labelY: 170
      },
      {
        id: 'brasil',
        name: 'Brasil',
        flagEmoji: '🇧🇷',
        funFact: '¡En Brasil está la selva del Amazonas, el gran pulmón verde del planeta con monos y tucanes!',
        pathD: 'M 190,260 L 270,270 L 260,360 L 180,340 Z',
        labelX: 225,
        labelY: 310
      },
      {
        id: 'japon',
        name: 'Japón',
        flagEmoji: '🇯🇵',
        funFact: '¡Es el país del sol naciente, los trenes bala que vuelan y los cerezos en flor!',
        pathD: 'M 580,140 L 630,130 L 610,190 L 570,180 Z',
        labelX: 595,
        labelY: 160
      },
      {
        id: 'eeuu',
        name: 'Estados Unidos',
        flagEmoji: '🇺🇸',
        funFact: '¡Allí está el Gran Cañón del Colorado y la Estatua de la Libertad!',
        pathD: 'M 90,110 L 210,105 L 200,190 L 90,180 Z',
        labelX: 150,
        labelY: 145
      },
      {
        id: 'egipto',
        name: 'Egipto',
        flagEmoji: '🇪🇬',
        funFact: '¡En Egipto están las famosas Pirámides y el río Nilo lleno de leyendas!',
        pathD: 'M 360,180 L 420,180 L 415,240 L 365,240 Z',
        labelX: 390,
        labelY: 210
      },
      {
        id: 'australia',
        name: 'Australia',
        flagEmoji: '🇦🇺',
        funFact: '¡En Australia viven los canguros que dan grandes saltos y los simpáticos koalas!',
        pathD: 'M 540,290 L 640,280 L 630,370 L 530,360 Z',
        labelX: 585,
        labelY: 325
      }
    ]
  }
};

export const GEOGRAPHY_EXERCISES: GeographyExerciseData[] = [
  // España
  {
    id: 'geo_sp_1',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain',
    title: 'Comunidades de España',
    instructions: 'Toca en el mapa la comunidad indicada.',
    targetRegionId: 'madrid',
    targetRegionName: 'Madrid',
    flagEmoji: '🇪🇸',
    funFact: '¡En Madrid está la Puerta del Sol, el centro de los caminos de España!',
    hint: 'Busca justo en el centro de la península ibérica.'
  },
  {
    id: 'geo_sp_2',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain',
    title: 'Comunidades de España',
    instructions: '¿Dónde está Andalucía?',
    targetRegionId: 'andalucia',
    targetRegionName: 'Andalucía',
    flagEmoji: '💃',
    funFact: '¡En Andalucía hace mucho sol y tienen playas increíbles y olivares!',
    hint: 'Busca en la zona sur, abajo del todo del mapa de la península.'
  },
  {
    id: 'geo_sp_3',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain',
    title: 'Comunidades de España',
    instructions: '¿Dónde está Galicia?',
    targetRegionId: 'galicia',
    targetRegionName: 'Galicia',
    flagEmoji: '🐙',
    funFact: '¡Galicia tiene grandes faros y costas verdes bañadas por el océano Atlántico!',
    hint: 'Busca arriba a la izquierda del mapa (en el noroeste).'
  },
  {
    id: 'geo_sp_4',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'spain',
    title: 'Comunidades de España',
    instructions: 'Toca Cataluña en el mapa.',
    targetRegionId: 'cataluna',
    targetRegionName: 'Cataluña',
    flagEmoji: '🏰',
    funFact: '¡En Barcelona puedes ver la Sagrada Familia y el mar Mediterráneo!',
    hint: 'Busca arriba a la derecha, cerca de la frontera con Francia.'
  },
  // Europa
  {
    id: 'geo_eu_1',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'europe',
    title: 'Países de Europa',
    instructions: '¿Dónde está Francia?',
    targetRegionId: 'francia',
    targetRegionName: 'Francia',
    flagEmoji: '🇫🇷',
    funFact: '¡Francia es nuestro país vecino del norte y allí está la Torre Eiffel!',
    hint: 'Está justo encima de España.'
  },
  {
    id: 'geo_eu_2',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'europe',
    title: 'Países de Europa',
    instructions: 'Toca Italia en el mapa.',
    targetRegionId: 'italia',
    targetRegionName: 'Italia',
    flagEmoji: '🇮🇹',
    funFact: '¡Italia tiene forma de bota y allí se preparan deliciosas pastas y pizzas!',
    hint: 'Busca el país largo con forma de bota que entra en el mar.'
  },
  // Mundo
  {
    id: 'geo_wd_1',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'world',
    title: 'Grandes Países del Mundo',
    instructions: '¿Dónde está Japón en el mapa del mundo?',
    targetRegionId: 'japon',
    targetRegionName: 'Japón',
    flagEmoji: '🇯🇵',
    funFact: '¡Japón está formado por islas al este de Asia y es famoso por sus robots y cerezos!',
    hint: 'Busca en el lado derecho del mapa, cerca del océano Pacífico.'
  },
  {
    id: 'geo_wd_2',
    subject: 'geografia',
    level: 1,
    type: 'map_pin',
    mapType: 'world',
    title: 'Grandes Países del Mundo',
    instructions: 'Encuentra Australia.',
    targetRegionId: 'australia',
    targetRegionName: 'Australia',
    flagEmoji: '🇦🇺',
    funFact: '¡En Australia viven los canguros y koalas!',
    hint: 'Es la gran isla continente abajo a la derecha del mapa.'
  }
];
