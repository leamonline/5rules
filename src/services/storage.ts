import type { Journey, JourneyResponses } from '../types';

const STORAGE_KEYS = {
    CURRENT_JOURNEY: 'five-rules-current-journey',
    JOURNEY_HISTORY: 'five-rules-journey-history',
    ONBOARDING_COMPLETED: 'five-rules-onboarding-completed',
    PREFERENCES: 'five-rules-preferences'
} as const;

const SCHEMA_VERSION = 1;

function generateId(): string {
    return `journey-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function sortJourneysByRecency(journeys: Journey[]): Journey[] {
    const getComparableDate = (journey: Journey) =>
        new Date(journey.completedAt ?? journey.lastUpdatedAt ?? journey.startedAt).getTime();

    const getNumericId = (id: string): number | null => {
        const numericPart = id.match(/journey-(\d+)/)?.[1];
        return numericPart ? Number.parseInt(numericPart, 10) : null;
    };

    return [...journeys].sort((a, b) => {
        const dateDiff = getComparableDate(b) - getComparableDate(a);
        if (dateDiff !== 0) {
            return dateDiff;
        }

        const idA = getNumericId(a.id);
        const idB = getNumericId(b.id);

        if (idA !== null && idB !== null && idA !== idB) {
            return idB - idA;
        }

        return b.id.localeCompare(a.id);
    });
}

export function createEmptyResponses(): JourneyResponses {
    return {
        rule1: { trigger: '', trait: '', mirror: '', instance: '' },
        rule2: { event: '', why1: '', why2: '', why3: '', conclusion: '' },
        rule3: { label: '', fear: '', integration: '' },
        rule4: { values: ['', '', '', '', ''], sources: ['', '', '', '', ''], decisions: ['', '', '', '', ''] },
        rule5: { event: '', judgment: '', neutral: '', acceptance: '' }
    };
}

export function createNewJourney(): Journey {
    return {
        id: generateId(),
        version: SCHEMA_VERSION,
        responses: createEmptyResponses(),
        completedRules: [],
        startedAt: new Date().toISOString(),
        lastUpdatedAt: new Date().toISOString(),
        completedAt: null
    };
}

export function saveCurrentJourney(journey: Journey): void {
    try {
        const updatedJourney = {
            ...journey,
            lastUpdatedAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEYS.CURRENT_JOURNEY, JSON.stringify(updatedJourney));
    } catch (error) {
        console.error('Failed to save journey:', error);
    }
}

export function loadCurrentJourney(): Journey | null {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.CURRENT_JOURNEY);
        if (!data) return null;
        return JSON.parse(data) as Journey;
    } catch (error) {
        console.error('Failed to load journey:', error);
        return null;
    }
}

export function archiveJourney(journey: Journey): void {
    try {
        const completedJourney = {
            ...journey,
            completedAt: new Date().toISOString()
        };

        const history = sortJourneysByRecency(getJourneyHistory());
        const updatedHistory = [completedJourney, ...history].slice(0, 10);

        // Keep only last 10 journeys
        localStorage.setItem(STORAGE_KEYS.JOURNEY_HISTORY, JSON.stringify(updatedHistory));

        // Clear current journey
        localStorage.removeItem(STORAGE_KEYS.CURRENT_JOURNEY);
    } catch (error) {
        console.error('Failed to archive journey:', error);
    }
}

export function getJourneyHistory(): Journey[] {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.JOURNEY_HISTORY);
        if (!data) return [];
        return JSON.parse(data) as Journey[];
    } catch (error) {
        console.error('Failed to load journey history:', error);
        return [];
    }
}

export function hasCompletedOnboarding(): boolean {
    try {
        return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED) === 'true';
    } catch {
        return false;
    }
}

export function setOnboardingCompleted(completed: boolean): void {
    try {
        localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, completed ? 'true' : 'false');
    } catch (error) {
        console.error('Failed to save onboarding status:', error);
    }
}

export function clearAllData(): void {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    } catch (error) {
        console.error('Failed to clear data:', error);
    }
}

export function exportJourneyAsText(journey: Journey): string {
    const { responses } = journey;
    const date = new Date(journey.startedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    let text = `THE 5 RULES - MY REFLECTIONS\n`;
    text += `Journey started: ${date}\n`;
    text += `${'='.repeat(40)}\n\n`;

    if (responses.rule1.trigger) {
        text += `RULE 1: CONFRONT YOUR SHADOW\n`;
        text += `-`.repeat(30) + `\n`;
        text += `Trigger: ${responses.rule1.trigger}\n`;
        text += `Trait that bothers me: ${responses.rule1.trait}\n`;
        text += `Mirror insight: ${responses.rule1.mirror}\n`;
        text += `When I show this: ${responses.rule1.instance}\n\n`;
    }

    if (responses.rule2.event) {
        text += `RULE 2: MAKE THE UNCONSCIOUS CONSCIOUS\n`;
        text += `-`.repeat(30) + `\n`;
        text += `Event: ${responses.rule2.event}\n`;
        text += `→ ${responses.rule2.why1}\n`;
        text += `→ ${responses.rule2.why2}\n`;
        text += `→ ${responses.rule2.why3}\n`;
        text += `Insight: ${responses.rule2.conclusion}\n\n`;
    }

    if (responses.rule3.label) {
        text += `RULE 3: INTEGRATE YOUR OPPOSITES\n`;
        text += `-`.repeat(30) + `\n`;
        text += `Identity: ${responses.rule3.label}\n`;
        text += `Fear: ${responses.rule3.fear}\n`;
        text += `Integration: ${responses.rule3.integration}\n\n`;
    }

    if (responses.rule4.values.some(v => v)) {
        text += `RULE 4: FOLLOW YOUR OWN PATTERN\n`;
        text += `-`.repeat(30) + `\n`;
        responses.rule4.values.forEach((value, i) => {
            if (value) {
                text += `• ${value}\n`;
                text += `  Source: ${responses.rule4.sources[i] || 'Unknown'}\n`;
                text += `  Decision: ${responses.rule4.decisions[i] || 'Undecided'}\n`;
            }
        });
        text += `\n`;
    }

    if (responses.rule5.event) {
        text += `RULE 5: ACCEPT THE WHOLENESS OF LIFE\n`;
        text += `-`.repeat(30) + `\n`;
        text += `Event: ${responses.rule5.event}\n`;
        text += `Story I told: ${responses.rule5.judgment}\n`;
        text += `Neutral fact: ${responses.rule5.neutral}\n`;
        text += `Acceptance: ${responses.rule5.acceptance}\n\n`;
    }

    text += `${'='.repeat(40)}\n`;
    text += `Generated by The 5 Rules Workbook\n`;

    return text;
}

export function identifyThemes(journey: Journey): string[] {
    const { responses } = journey;
    const themes: string[] = [];

    // Analyze responses to identify recurring themes
    const allText = [
        responses.rule1.mirror,
        responses.rule2.why2,
        responses.rule2.why3,
        responses.rule2.conclusion,
        responses.rule3.fear,
    ].join(' ').toLowerCase();

    if (allText.includes('control') || allText.includes('safety') || allText.includes('chaos')) {
        themes.push('Control & Safety');
    }
    if (allText.includes('belong') || allText.includes('reject') || allText.includes('abandon')) {
        themes.push('Belonging & Connection');
    }
    if (allText.includes('worth') || allText.includes('enough') || allText.includes('perfect')) {
        themes.push('Self-Worth & Validation');
    }
    if (allText.includes('seen') || allText.includes('invisible') || allText.includes('matter')) {
        themes.push('Being Seen & Mattering');
    }
    if (allText.includes('weak') || allText.includes('strong') || allText.includes('vulnerable')) {
        themes.push('Strength & Vulnerability');
    }

    return themes.length > 0 ? themes : ['Personal Growth'];
}
