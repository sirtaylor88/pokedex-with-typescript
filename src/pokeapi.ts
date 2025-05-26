import { Cache } from "./pokecache.js";

export type ShallowLocations = {
    count: number;
    prev: string | null;
    next: string | null;
    results : Location[];
};

export type Location = {
    name: string;
    url: string;
};

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
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    }
}
