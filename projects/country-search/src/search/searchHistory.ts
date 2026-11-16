export interface StorageLike {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
}

export interface SearchHistoryOptions {
    key?: string;
    limit?: number;
}

export const DEFAULT_HISTORY_KEY = 'country-search:history';
export const DEFAULT_HISTORY_LIMIT = 10;

/**
 * Recent search queries, newest first, persisted to a Storage (localStorage in the app).
 * Storage problems (private mode, quota, corrupted data) never break the app:
 * the history just keeps working in memory.
 */
export class SearchHistory {
    private entries: string[];
    private readonly key: string;
    private readonly limit: number;

    constructor(
        private readonly storage: StorageLike | null,
        { key = DEFAULT_HISTORY_KEY, limit = DEFAULT_HISTORY_LIMIT }: SearchHistoryOptions = {},
    ) {
        this.key = key;
        this.limit = limit;
        this.entries = this.load();
    }

    getAll(): string[] {
        return [...this.entries];
    }

    add(query: string): void {
        const trimmed = query.trim();
        if (!trimmed) return;

        this.entries = [trimmed, ...this.without(trimmed)].slice(0, this.limit);
        this.save();
    }

    remove(query: string): void {
        this.entries = this.without(query.trim());
        this.save();
    }

    clear(): void {
        this.entries = [];
        this.save();
    }

    private without(query: string): string[] {
        const lower = query.toLowerCase();
        return this.entries.filter((entry) => entry.toLowerCase() !== lower);
    }

    private load(): string[] {
        try {
            const raw = this.storage?.getItem(this.key);
            if (!raw) return [];
            const parsed: unknown = JSON.parse(raw);
            if (!Array.isArray(parsed)) return [];
            return parsed
                .filter((item): item is string => typeof item === 'string')
                .slice(0, this.limit);
        } catch {
            return [];
        }
    }

    private save(): void {
        try {
            this.storage?.setItem(this.key, JSON.stringify(this.entries));
        } catch {
            // storage is unavailable or full: keep the in-memory history
        }
    }
}
