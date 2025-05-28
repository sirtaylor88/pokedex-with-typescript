import { State } from "../state.js";

export async function commandCatch(state: State, pokemonName: string) {
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    const response_data = await state.api.fetchPokemon(pokemonName);
    if (state.xp > response_data.base_experience) {
        console.log(`${pokemonName} was caught!`);
        state.pokedex[pokemonName] = response_data;
        console.log('You may now inspect it with the inspect command.');
    } else {
        console.log(`${pokemonName} excaped!`);
        state.xp += Math.floor(Math.random() * 50);
    }
    state.rl.prompt();
};
