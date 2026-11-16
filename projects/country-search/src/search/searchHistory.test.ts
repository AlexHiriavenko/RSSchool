import { describe, expect, it } from 'vitest';
import { SearchHistory, type StorageLike } from './searchHistory';

class MemoryStorage implements StorageLike {
    readonly data = new Map<string, string>();

    getItem(key: string): string | null {
        return this.data.get(key) ?? null;
    }

    setItem(key: string, value: string): void {
        this.data.set(key, value);
    }
}

class BrokenStorage implements StorageLike {
    getItem(): string | null {
        throw new Error('storage is not available');
    }

    setItem(): void {
        throw new Error('storage is not available');
    }
}

describe('SearchHistory', () => {
    it('is empty by default', () => {
        expect(new SearchHistory(new MemoryStorage()).getAll()).toEqual([]);
    });

    it('returns the most recent query first', () => {
        const history = new SearchHistory(new MemoryStorage());

        history.add('ger');
        history.add('fra');

        expect(history.getAll()).toEqual(['fra', 'ger']);
    });

    it('trims queries and ignores empty ones', () => {
        const history = new SearchHistory(new MemoryStorage());

        history.add('  ger  ');
        history.add('');
        history.add('   ');

        expect(history.getAll()).toEqual(['ger']);
    });

    it('does not duplicate: a repeated query (any case) moves to the top', () => {
        const history = new SearchHistory(new MemoryStorage());

        history.add('ger');
        history.add('fra');
        history.add('GER');

        expect(history.getAll()).toEqual(['GER', 'fra']);
    });

    it('keeps at most `limit` entries and drops the oldest', () => {
        const history = new SearchHistory(new MemoryStorage(), { limit: 3 });

        ['a', 'b', 'c', 'd'].forEach((query) => history.add(query));

        expect(history.getAll()).toEqual(['d', 'c', 'b']);
    });

    it('persists to storage and restores in a new instance', () => {
        const storage = new MemoryStorage();

        new SearchHistory(storage).add('ger');

        expect(new SearchHistory(storage).getAll()).toEqual(['ger']);
    });

    it('uses the given storage key', () => {
        const storage = new MemoryStorage();

        new SearchHistory(storage, { key: 'my-key' }).add('ger');

        expect([...storage.data.keys()]).toEqual(['my-key']);
    });

    it('ignores corrupted JSON in storage', () => {
        const storage = new MemoryStorage();
        storage.setItem('country-search:history', '{not json');

        expect(new SearchHistory(storage).getAll()).toEqual([]);
    });

    it('ignores stored data of the wrong shape and drops non-string items', () => {
        const wrongShape = new MemoryStorage();
        wrongShape.setItem('country-search:history', JSON.stringify({ a: 1 }));
        const mixed = new MemoryStorage();
        mixed.setItem('country-search:history', JSON.stringify(['ger', 42, null, 'fra']));

        expect(new SearchHistory(wrongShape).getAll()).toEqual([]);
        expect(new SearchHistory(mixed).getAll()).toEqual(['ger', 'fra']);
    });

    it('keeps working in memory when storage throws (e.g. private mode)', () => {
        const history = new SearchHistory(new BrokenStorage());

        expect(() => history.add('ger')).not.toThrow();
        expect(history.getAll()).toEqual(['ger']);
    });

    it('works without any storage (null)', () => {
        const history = new SearchHistory(null);

        history.add('ger');

        expect(history.getAll()).toEqual(['ger']);
    });

    it('returns a copy, so callers cannot mutate the history', () => {
        const history = new SearchHistory(new MemoryStorage());
        history.add('ger');

        history.getAll().push('hack');

        expect(history.getAll()).toEqual(['ger']);
    });

    it('remove() deletes one entry (case-insensitive)', () => {
        const history = new SearchHistory(new MemoryStorage());
        history.add('ger');
        history.add('fra');

        history.remove('GER');

        expect(history.getAll()).toEqual(['fra']);
    });

    it('clear() empties the history and storage', () => {
        const storage = new MemoryStorage();
        const history = new SearchHistory(storage);
        history.add('ger');

        history.clear();

        expect(history.getAll()).toEqual([]);
        expect(new SearchHistory(storage).getAll()).toEqual([]);
    });
});
