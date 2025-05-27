import { State } from "./state.js";

export async function commandExplore(state: State, locationName: string) {
    const response_data = await state.api.fetchLocation(locationName);
    console.log(`Explore ${response_data.name}...`);
    console.log('Found Pokemon:');
    for (const pokemonEncounter of response_data.pokemon_encounters) {
        console.log(`- ${pokemonEncounter.pokemon.name}`);
    }
    state.rl.prompt();
};
