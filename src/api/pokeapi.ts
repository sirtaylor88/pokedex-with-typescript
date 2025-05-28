import { Cache } from "../cache/pokecache.js";

export type ShallowLocations = {
    count: number;
    prev: string | null;
    next: string | null;
    results : Location[];
};

export type Location = {
    name: string;
    pokemon_encounters: PokemonEncounter[];
};

export type PokemonEncounter = {
    pokemon: {
        name: string;
        url: string;
    };
};

export type Pokemon = {
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    stats: Stat[];
    types: Type[];
};

export type Stat = {
    base_stat: number;
    stat: {
        name: string;
    }
}

export type Type = {
    type: {
        name: string;
    }
}

const cache = new Cache(1000);
export class PokeAPI {
    private static readonly baseURL = 'https://pokeapi.co/api/v2';

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (pageURL === undefined) {
            pageURL = `${PokeAPI.baseURL}/location-area`;
        }
        const cached: ShallowLocations | undefined = cache.get(pageURL);
        if (cached) {
            return cached;
        }

        const response = await fetch(pageURL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const response_json = await response.json();
        cache.add(pageURL, response_json);
        return response_json;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);
        const cached: Location | undefined = cache.get(locationName);
        if (cached) {
            return cached;
        }

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const response_json = await response.json();
        cache.add(locationName, response_json);
        return response_json;
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const response = await fetch(`${PokeAPI.baseURL}/pokemon/${pokemonName}`);
        const cached: Pokemon | undefined = cache.get(pokemonName);
        if (cached) {
            return cached;
        }

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const response_json = await response.json();
        cache.add(pokemonName, response_json);
        return response_json;
    }
}
