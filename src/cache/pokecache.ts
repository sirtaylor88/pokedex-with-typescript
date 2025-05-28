/* eslint-disable  @typescript-eslint/no-explicit-any */
export type CacheEntry<T> = {
    createAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(number: number) {
        this.#interval = number;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T): void {
        this.#cache.set(key, { createAt: Date.now(), val: val });
    };
    get<T>(key: string): T | undefined {
        const data = this.#cache.get(key);
        if (data !== undefined) {
            return data.val;
        }
        return undefined;
    };
    #reap(): void {
        for (const [k, v] of this.#cache) {
            if (v.createAt < Date.now() - this.#interval) {
                this.#cache.delete(k);
            }
        }
    };
    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    };
    stopReapLoop(): void {
        clearInterval( this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    };

}
