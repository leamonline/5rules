import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import {
    archiveJourney,
    createEmptyResponses,
    createNewJourney,
    identifyThemes
} from '../src/services/storage';
import type { Journey } from '../src/types';

const STORAGE_KEYS = {
    CURRENT_JOURNEY: 'five-rules-current-journey',
    JOURNEY_HISTORY: 'five-rules-journey-history'
} as const;

describe('storage service', () => {
    const fixedDate = new Date('2024-01-01T00:00:00.000Z');
    let mockStore: Record<string, string>;

    beforeEach(() => {
        mockStore = {};
        globalThis.localStorage = {
            getItem: (key: string) => (key in mockStore ? mockStore[key] : null),
            setItem: (key: string, value: string) => {
                mockStore[key] = value;
            },
            removeItem: (key: string) => {
                delete mockStore[key];
            },
            clear: () => {
                mockStore = {};
            },
            key: (index: number) => Object.keys(mockStore)[index] ?? null,
            get length() {
                return Object.keys(mockStore).length;
            }
        } as unknown as Storage;

        vi.useFakeTimers();
        vi.setSystemTime(fixedDate);
        vi.spyOn(Math, 'random').mockReturnValue(0.123456789);
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('creates a new journey with expected defaults', () => {
        const journey = createNewJourney();

        expect(journey.id).toBe('journey-1704067200000-4fzzzxj');
        expect(journey.version).toBe(1);
        expect(journey.startedAt).toBe(fixedDate.toISOString());
        expect(journey.lastUpdatedAt).toBe(fixedDate.toISOString());
        expect(journey.completedAt).toBeNull();
        expect(journey.completedRules).toEqual([]);
        expect(journey.responses.rule1.trigger).toBe('');
        expect(journey.responses.rule4.values).toHaveLength(5);
    });

    it('archives journey, trims history to 10, and clears current journey', () => {
        const history: Journey[] = Array.from({ length: 10 }, (_, index) => ({
            id: `journey-${index}`,
            version: 1,
            responses: createEmptyResponses(),
            completedRules: [],
            startedAt: fixedDate.toISOString(),
            lastUpdatedAt: fixedDate.toISOString(),
            completedAt: fixedDate.toISOString()
        }));
        mockStore[STORAGE_KEYS.JOURNEY_HISTORY] = JSON.stringify(history);

        const currentJourney = createNewJourney();
        mockStore[STORAGE_KEYS.CURRENT_JOURNEY] = JSON.stringify(currentJourney);

        archiveJourney(currentJourney);

        const updatedHistory = JSON.parse(mockStore[STORAGE_KEYS.JOURNEY_HISTORY]) as Journey[];

        expect(updatedHistory).toHaveLength(10);
        expect(updatedHistory[0].id).toBe(currentJourney.id);
        expect(updatedHistory[0].completedAt).not.toBeNull();
        expect(updatedHistory.at(-1)?.id).toBe('journey-1');
        expect(mockStore[STORAGE_KEYS.CURRENT_JOURNEY]).toBeUndefined();
    });

    it('returns default theme when no keywords match', () => {
        const journey = createNewJourney();
        const themes = identifyThemes(journey);

        expect(themes).toEqual(['Personal Growth']);
    });
});
