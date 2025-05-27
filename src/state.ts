import { createInterface, type Interface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { getCommands } from './commands/commands.js';
import { PokeAPI, Pokemon } from './api/pokeapi.js';

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    api: PokeAPI;
    nextLocationURL: string | null;
    prevLocationURL: string | null;
    pokedex: Record<string, Pokemon>;
    xp: number;
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
        prevLocationURL: null,
        pokedex: {},
        xp: 0
    }
};
