import { useState, useEffect, useCallback, useRef } from 'react';
import type { Journey, JourneyResponses } from '../types';
import {
    loadCurrentJourney,
    saveCurrentJourney,
    createNewJourney,
    createEmptyResponses,
    archiveJourney as archiveJourneyToStorage,
    getJourneyHistory as getHistoryFromStorage
} from '../services/storage';

export function useJourney() {
    // Use lazy initialization to load journey synchronously on first render
    const [journey, setJourney] = useState<Journey | null>(() => loadCurrentJourney());
    const [isLoading] = useState(false); // No async loading needed with lazy init
    const saveTimeoutRef = useRef<number | null>(null);

    // Debounced save
    const debouncedSave = useCallback((journeyToSave: Journey) => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        saveTimeoutRef.current = window.setTimeout(() => {
            saveCurrentJourney(journeyToSave);
        }, 300);
    }, []);

    // Save journey whenever it changes
    useEffect(() => {
        if (journey && !isLoading) {
            debouncedSave(journey);
        }
    }, [journey, isLoading, debouncedSave]);

    const startNewJourney = useCallback(() => {
        const newJourney = createNewJourney();
        setJourney(newJourney);
        saveCurrentJourney(newJourney);
        return newJourney;
    }, []);

    const updateResponses = useCallback((
        rule: keyof JourneyResponses,
        field: string,
        value: string,
        index: number | null = null
    ) => {
        setJourney(prev => {
            if (!prev) return prev;

            const ruleResponses = prev.responses[rule];
            let updatedRuleResponses;

            if (index !== null) {
                const ruleData = ruleResponses as unknown as Record<string, unknown>;
                if (Array.isArray(ruleData[field])) {
                    const arr = [...(ruleData[field] as string[])];
                    arr[index] = value;
                    updatedRuleResponses = { ...ruleResponses, [field]: arr };
                } else {
                    updatedRuleResponses = { ...ruleResponses, [field]: value };
                }
            } else {
                updatedRuleResponses = { ...ruleResponses, [field]: value };
            }

            return {
                ...prev,
                responses: {
                    ...prev.responses,
                    [rule]: updatedRuleResponses
                },
                lastUpdatedAt: new Date().toISOString()
            };
        });
    }, []);

    const markRuleComplete = useCallback((ruleNum: number) => {
        setJourney(prev => {
            if (!prev) return prev;
            if (prev.completedRules.includes(ruleNum)) return prev;

            const newCompleted = [...prev.completedRules, ruleNum];
            const isFullyComplete = newCompleted.length === 5;

            return {
                ...prev,
                completedRules: newCompleted,
                completedAt: isFullyComplete ? new Date().toISOString() : null
            };
        });
    }, []);

    const resetJourney = useCallback(() => {
        setJourney(prev => {
            if (!prev) return createNewJourney();
            return {
                ...prev,
                responses: createEmptyResponses(),
                completedRules: [],
                startedAt: new Date().toISOString(),
                lastUpdatedAt: new Date().toISOString(),
                completedAt: null
            };
        });
    }, []);

    const archiveAndStartNew = useCallback(() => {
        if (journey) {
            archiveJourneyToStorage(journey);
        }
        return startNewJourney();
    }, [journey, startNewJourney]);

    const getJourneyHistory = useCallback(() => {
        return getHistoryFromStorage();
    }, []);

    const isJourneyComplete = journey?.completedRules.length === 5;

    return {
        journey,
        isLoading,
        isJourneyComplete,
        startNewJourney,
        updateResponses,
        markRuleComplete,
        resetJourney,
        archiveAndStartNew,
        getJourneyHistory
    };
}
