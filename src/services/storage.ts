// =============================================================================
// STORAGE SERVICE FOR SELF-AWARENESS APP
// =============================================================================

import type {
    CheckIn,
    UserPreferences,
    UserValues,
    Pattern,
    ModuleProgress,
    WeeklyInsight,
    BaselineSnapshot,
} from '../types';

// Storage keys
const STORAGE_KEYS = {
    CHECK_INS: 'awareness-check-ins',
    PREFERENCES: 'awareness-preferences',
    USER_VALUES: 'awareness-values',
    PATTERNS: 'awareness-patterns',
    MODULE_PROGRESS: 'awareness-progress',
    WEEKLY_INSIGHTS: 'awareness-weekly',
    ONBOARDING_COMPLETED: 'awareness-onboarding-completed',
    BASELINE_SNAPSHOT: 'awareness-baseline',
} as const;

// =============================================================================
// ID GENERATION
// =============================================================================

export function generateId(prefix: string = 'item'): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// =============================================================================
// CHECK-INS
// =============================================================================

export function saveCheckIn(checkIn: CheckIn): void {
    try {
        const existing = getCheckIns();
        const updated = [checkIn, ...existing];
        localStorage.setItem(STORAGE_KEYS.CHECK_INS, JSON.stringify(updated));
    } catch (error) {
        console.error('Failed to save check-in:', error);
    }
}

export function getCheckIns(): CheckIn[] {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.CHECK_INS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to load check-ins:', error);
        return [];
    }
}

export function getCheckInsForDateRange(startDate: Date, endDate: Date): CheckIn[] {
    const checkIns = getCheckIns();
    return checkIns.filter((ci) => {
        const date = new Date(ci.timestamp);
        return date >= startDate && date <= endDate;
    });
}

export function getCheckInsForLastDays(days: number): CheckIn[] {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    return getCheckInsForDateRange(startDate, endDate);
}

export function getTodaysCheckIn(): CheckIn | null {
    const checkIns = getCheckIns();
    const today = new Date().toDateString();
    return checkIns.find((ci) => new Date(ci.timestamp).toDateString() === today) ?? null;
}

export function deleteCheckIn(id: string): void {
    try {
        const checkIns = getCheckIns().filter((ci) => ci.id !== id);
        localStorage.setItem(STORAGE_KEYS.CHECK_INS, JSON.stringify(checkIns));
    } catch (error) {
        console.error('Failed to delete check-in:', error);
    }
}

// =============================================================================
// USER PREFERENCES
// =============================================================================

export function getDefaultPreferences(): UserPreferences {
    return {
        goal: 'understand-moods',
        reminderTime: '09:00',
        tone: 'gentle',
        depth: 'quick',
        privacy: 'local',
        reducedMotion: false,
    };
}

export function savePreferences(preferences: UserPreferences): void {
    try {
        localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
        console.error('Failed to save preferences:', error);
    }
}

export function getPreferences(): UserPreferences | null {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Failed to load preferences:', error);
        return null;
    }
}

// =============================================================================
// USER VALUES
// =============================================================================

export function saveUserValues(values: UserValues): void {
    try {
        localStorage.setItem(STORAGE_KEYS.USER_VALUES, JSON.stringify(values));
    } catch (error) {
        console.error('Failed to save values:', error);
    }
}

export function getUserValues(): UserValues | null {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.USER_VALUES);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Failed to load values:', error);
        return null;
    }
}

// =============================================================================
// PATTERNS
// =============================================================================

export function savePatterns(patterns: Pattern[]): void {
    try {
        localStorage.setItem(STORAGE_KEYS.PATTERNS, JSON.stringify(patterns));
    } catch (error) {
        console.error('Failed to save patterns:', error);
    }
}

export function getPatterns(): Pattern[] {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.PATTERNS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to load patterns:', error);
        return [];
    }
}

export function addPattern(pattern: Pattern): void {
    const patterns = getPatterns();
    patterns.push(pattern);
    savePatterns(patterns);
}

export function markPatternTested(patternId: string): void {
    const patterns = getPatterns().map((p) =>
        p.id === patternId ? { ...p, tested: true } : p
    );
    savePatterns(patterns);
}

// =============================================================================
// MODULE PROGRESS
// =============================================================================

export function getDefaultProgress(): ModuleProgress {
    return {
        emotion: { level: 1, lessonsCompleted: 0, practicesCompleted: 0 },
        thought: { level: 1, lessonsCompleted: 0, practicesCompleted: 0 },
        behaviour: { level: 1, lessonsCompleted: 0, practicesCompleted: 0 },
        values: { level: 1, lessonsCompleted: 0, practicesCompleted: 0 },
        blindSpots: { level: 1, lessonsCompleted: 0, practicesCompleted: 0 },
    };
}

export function saveModuleProgress(progress: ModuleProgress): void {
    try {
        localStorage.setItem(STORAGE_KEYS.MODULE_PROGRESS, JSON.stringify(progress));
    } catch (error) {
        console.error('Failed to save progress:', error);
    }
}

export function getModuleProgress(): ModuleProgress {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.MODULE_PROGRESS);
        return data ? JSON.parse(data) : getDefaultProgress();
    } catch (error) {
        console.error('Failed to load progress:', error);
        return getDefaultProgress();
    }
}

// =============================================================================
// WEEKLY INSIGHTS
// =============================================================================

export function saveWeeklyInsight(insight: WeeklyInsight): void {
    try {
        const existing = getWeeklyInsights();
        const updated = [insight, ...existing].slice(0, 12); // Keep last 12 weeks
        localStorage.setItem(STORAGE_KEYS.WEEKLY_INSIGHTS, JSON.stringify(updated));
    } catch (error) {
        console.error('Failed to save weekly insight:', error);
    }
}

export function getWeeklyInsights(): WeeklyInsight[] {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.WEEKLY_INSIGHTS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to load weekly insights:', error);
        return [];
    }
}

// =============================================================================
// ONBOARDING
// =============================================================================

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

// =============================================================================
// BASELINE SNAPSHOT
// =============================================================================

export function saveBaselineSnapshot(snapshot: BaselineSnapshot): void {
    try {
        localStorage.setItem(STORAGE_KEYS.BASELINE_SNAPSHOT, JSON.stringify(snapshot));
    } catch (error) {
        console.error('Failed to save baseline snapshot:', error);
    }
}

export function getBaselineSnapshot(): BaselineSnapshot | null {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.BASELINE_SNAPSHOT);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Failed to load baseline snapshot:', error);
        return null;
    }
}

// =============================================================================
// DATA CLEARANCE
// =============================================================================

export function clearAllData(): void {
    try {
        Object.values(STORAGE_KEYS).forEach((key) => {
            localStorage.removeItem(key);
        });
    } catch (error) {
        console.error('Failed to clear data:', error);
    }
}

// =============================================================================
// ANALYTICS HELPERS
// =============================================================================

interface FrequencyCount {
    item: string;
    count: number;
}

export function getEmotionFrequency(checkIns: CheckIn[]): FrequencyCount[] {
    const counts: Record<string, number> = {};
    checkIns.forEach((ci) => {
        const emotion = ci.emotion.primary;
        counts[emotion] = (counts[emotion] || 0) + 1;
    });
    return Object.entries(counts)
        .map(([item, count]) => ({ item, count }))
        .sort((a, b) => b.count - a.count);
}

export function getThoughtTagFrequency(checkIns: CheckIn[]): FrequencyCount[] {
    const counts: Record<string, number> = {};
    checkIns.forEach((ci) => {
        ci.thoughtTags.forEach((tag) => {
            counts[tag] = (counts[tag] || 0) + 1;
        });
    });
    return Object.entries(counts)
        .map(([item, count]) => ({ item, count }))
        .sort((a, b) => b.count - a.count);
}

export function getBehaviourFrequency(checkIns: CheckIn[]): FrequencyCount[] {
    const counts: Record<string, number> = {};
    checkIns.forEach((ci) => {
        if (ci.behaviourAction) {
            counts[ci.behaviourAction] = (counts[ci.behaviourAction] || 0) + 1;
        }
    });
    return Object.entries(counts)
        .map(([item, count]) => ({ item, count }))
        .sort((a, b) => b.count - a.count);
}

export function getValueAlignmentScore(checkIns: CheckIn[], userValues: UserValues | null): number {
    if (!userValues || userValues.topValues.length === 0 || checkIns.length === 0) {
        return 0;
    }

    const alignedCount = checkIns.filter((ci) =>
        userValues.topValues.includes(ci.value)
    ).length;

    return Math.round((alignedCount / checkIns.length) * 100);
}

// =============================================================================
// PATTERN DETECTION (Simple rule-based for MVP)
// =============================================================================

export function detectPatterns(checkIns: CheckIn[]): Pattern[] {
    const patterns: Pattern[] = [];
    if (checkIns.length < 3) return patterns;

    // Detect emotion-behaviour chains
    const emotionBehaviourMap: Record<string, Record<string, number>> = {};
    checkIns.forEach((ci) => {
        const emotion = ci.emotion.primary;
        const behaviour = ci.behaviourAction;
        if (!emotionBehaviourMap[emotion]) {
            emotionBehaviourMap[emotion] = {};
        }
        emotionBehaviourMap[emotion][behaviour] = (emotionBehaviourMap[emotion][behaviour] || 0) + 1;
    });

    Object.entries(emotionBehaviourMap).forEach(([emotion, behaviours]) => {
        Object.entries(behaviours).forEach(([behaviour, count]) => {
            if (count >= 2) {
                patterns.push({
                    id: generateId('pattern'),
                    type: 'emotion-chain',
                    description: `When you feel ${emotion}, you tend to ${behaviour}`,
                    hypothesis: `When you feel ${emotion} → you ${behaviour}`,
                    frequency: count,
                    lastSeen: new Date().toISOString(),
                    tested: false,
                });
            }
        });
    });

    // Detect thought-behaviour patterns
    const tagBehaviourMap: Record<string, Record<string, number>> = {};
    checkIns.forEach((ci) => {
        ci.thoughtTags.forEach((tag) => {
            const behaviour = ci.behaviourAction;
            if (!tagBehaviourMap[tag]) {
                tagBehaviourMap[tag] = {};
            }
            tagBehaviourMap[tag][behaviour] = (tagBehaviourMap[tag][behaviour] || 0) + 1;
        });
    });

    Object.entries(tagBehaviourMap).forEach(([tag, behaviours]) => {
        Object.entries(behaviours).forEach(([behaviour, count]) => {
            if (count >= 2) {
                patterns.push({
                    id: generateId('pattern'),
                    type: 'thought-behaviour',
                    description: `When you're ${tag}, you tend to ${behaviour}`,
                    hypothesis: `${tag} thinking → ${behaviour}`,
                    frequency: count,
                    lastSeen: new Date().toISOString(),
                    tested: false,
                });
            }
        });
    });

    return patterns;
}

// =============================================================================
// EXPORT DATA
// =============================================================================

export function exportAllData(): string {
    const data = {
        checkIns: getCheckIns(),
        preferences: getPreferences(),
        userValues: getUserValues(),
        patterns: getPatterns(),
        moduleProgress: getModuleProgress(),
        weeklyInsights: getWeeklyInsights(),
        baselineSnapshot: getBaselineSnapshot(),
        exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
}
