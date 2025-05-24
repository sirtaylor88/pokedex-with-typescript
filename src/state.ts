import { createInterface, type Interface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { getCommands } from './commands.js';

export type State = {
    rl: Interface,
    commands: Record<string, CLICommand>
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};

export function initState(): State {
    return {
        rl: createInterface({
            input: stdin,
            output: stdout,
            prompt: 'Pokedex > '
        }),
        commands: getCommands()
    }
};
