import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';

const rl = createInterface({
  input: stdin,
  output: stdout,
  prompt: 'Pokedex > '
});

export function cleanInput(input: string): string[] {
  return input.toLowerCase().trim().split(" ").filter((word) => word != "");
}

export function startREPL(): void {
    rl.prompt();
    rl.on('line', (input) => {
        const words = cleanInput(input);
        if (!words.length) {
            rl.prompt();
        }
        console.log(`Your command was: ${words[0]}`);
        rl.prompt();
    });
}
