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

export class PokeAPI {
    private static readonly baseURL = 'https://pokeapi.co/api/v2';

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (pageURL === undefined) {
            pageURL = `${PokeAPI.baseURL}/location-area`;
        }
        const response = await fetch(pageURL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    }
}
