import { State } from "../state.js";

export async function commandInspect(state: State, pokemonName: string) {
    if (pokemonName in state.pokedex) {
        console.log('you have not caught that pokemon');

    } else {
        const response_data = await state.api.fetchPokemon(pokemonName);

        console.log(`Name: ${pokemonName}`);
        console.log(`Height: ${response_data.height}`);
        console.log(`Weight: ${response_data.weight}`);
        console.log('Stats:');
        for (const stat of response_data.stats) {
            console.log(`-${stat.stat.name}: ${stat.base_stat}`);
        }
        console.log('Types:');
        for (const type of response_data.types) {
            console.log(`- ${type.type.name}`);
        }
    }
    state.rl.prompt();
};
