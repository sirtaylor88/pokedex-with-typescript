import { State } from './state.js';

export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(" ").filter((word) => word != "");
}

export function startREPL(state: State): void {
    state.rl.prompt();
    state.rl.on('line', (input) => {
        const words = cleanInput(input);
        if (!words.length) {
            state.rl.prompt();
        }
        const selectedCommand = words[0];
        let args: string[] = [];
        if (words.length > 1) {
            args = words.slice(1);
        }
        if (selectedCommand in state.commands) {
            state.commands[selectedCommand].callback(state, ...args);
        } else {
            console.log('Unknown command');
        }
        state.rl.prompt();
    });
}
