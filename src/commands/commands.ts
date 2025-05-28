import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapBack } from "./command_map.js";
import { CLICommand } from "../state.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: 'exit',
            description: 'Exit the Pokedex',
            callback: commandExit,
        },
        help: {
            name: 'help',
            description: 'Displays a help message',
            callback: commandHelp,
        },
        map: {
            name: 'map',
            description: 'Displays next 20 locations',
            callback: commandMap,
        },
        mapb: {
            name: 'mapb',
            description: 'Displays previous 20 locations',
            callback: commandMapBack,
        },
        explore: {
            name: 'explore',
            description: 'Explore a location area',
            callback: commandExplore,
        },
        catch: {
            name: 'catch',
            description: 'Try to catch a pokemon',
            callback: commandCatch,
        },
        inspect: {
            name: 'inspect',
            description: 'Inspect a pokemon',
            callback: commandInspect,
        }
    };
}
