import { exit } from "node:process";
import { State } from "../state.js";

export async function commandExit(state: State) {
    console.log('Closing the Pokedex... Goodbye!');
    state.rl.close();
    exit(0);
};
