import { createInterface, type Interface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { getCommands } from './commands.js';
import { PokeAPI } from './pokeapi.js';

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    api: PokeAPI;
    nextLocationURL: string | null;
    prevLocationURL: string | null;
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(): State {
    return {
        rl: createInterface({
            input: stdin,
            output: stdout,
            prompt: 'Pokedex > '
        }),
        commands: getCommands(),
        api: new PokeAPI(),
        nextLocationURL: null,
        prevLocationURL: null
    }
};
