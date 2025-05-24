import { CLICommand } from "./commands.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log('Welcome to the Pokedex!');
    console.log('Usage:\n');
    for (const command in commands) {
        console.log(`${commands[command].name}: ${commands[command].description}`);
    }
};
