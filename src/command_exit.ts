import { exit } from "node:process";

export function commandExit() {
    console.log('Closing the Pokedex... Goodbye!');
    exit(0);
};
