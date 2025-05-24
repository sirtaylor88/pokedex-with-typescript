import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { getCommands } from './commands.js';

const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: 'Pokedex > '
});

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(" ").filter((word) => word != "");
}

export function startREPL(): void {
    const availableCommands = getCommands();
    rl.prompt();
    rl.on('line', (input) => {
        const words = cleanInput(input);
        if (!words.length) {
            rl.prompt();
        }
        const selectedCommand = words[0];
        if (selectedCommand in availableCommands) {
            availableCommands[selectedCommand].callback(availableCommands);
        } else {
            console.log('Unknown command');
        }
        rl.prompt();
    });
}
