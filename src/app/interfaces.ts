export interface User {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string; // Токен истекает через ** секунд
  email: string;
  refreshToken: string;
}

export interface Characters {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: any[];
  vehicles: string[];
  starships: string[];
  url: string;
}

export interface Planets {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  url: string;
}

export interface Starships {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: any[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}

export function isCharacters(
  pet: (Characters | Planets | Starships)[]
): pet is Characters[] {
  return (pet[0] as Characters).hair_color !== undefined;
}

export function isStarships(
  pet: (Characters | Planets | Starships)[]
): pet is Starships[] {
  return (pet[0] as Starships).MGLT !== undefined;
}

export function isPlanets(
  pet: (Characters | Planets | Starships)[]
): pet is Planets[] {
  return (pet[0] as Planets).climate !== undefined;
}

