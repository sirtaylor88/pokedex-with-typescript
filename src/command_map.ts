import { State } from "./state.js";

async function fetchLocations(state: State, pageURL?: string) {
    const response_data = await state.api.fetchLocations(pageURL);
    for (const location of response_data.results) {
        console.log(location.name);
    }
    state.prevLocationURL = response_data.prev;
    state.nextLocationURL = response_data.next;
    state.rl.prompt();
}

export async function commandMap(state: State) {
    if (state.nextLocationURL === null && state.prevLocationURL !== null) {
        console.log("You are on the last page!");
        state.rl.prompt();
    }

    let pageURL = undefined;
    if (state.nextLocationURL !== null) {
        pageURL = state.nextLocationURL;
    }

    fetchLocations(state, pageURL);
};

export async function commandMapBack(state: State) {
    if (state.prevLocationURL === null && state.nextLocationURL !== null) {
        console.log("You are on the first page!");
        state.rl.prompt();
    }

    let pageURL = undefined;
    if (state.prevLocationURL !== null) {
        pageURL = state.prevLocationURL;
    }

    fetchLocations(state, pageURL);
};
