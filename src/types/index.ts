// =============================================================================
// SELF-AWARENESS APP DATA TYPES
// =============================================================================

// -----------------------------------------------------------------------------
// Check-In (Daily Entry)
// -----------------------------------------------------------------------------

export interface Emotion {
    primary: string;
    secondary?: string;
    intensity: number; // 0-10
    bodyLocation?: string;
}

export interface CheckIn {
    id: string;
    timestamp: string;
    emotion: Emotion;
    thought: string;
    thoughtTags: string[]; // e.g., 'catastrophising', 'mind-reading'
    behaviourUrge: string;
    behaviourAction: string;
    value: string;
    context?: string;
}

// -----------------------------------------------------------------------------
// User Preferences (Set during onboarding)
// -----------------------------------------------------------------------------

export type UserGoal =
    | 'understand-moods'
    | 'stop-spiralling'
    | 'communicate-better'
    | 'decide-clearer';

export type TonePreference = 'gentle' | 'direct';
export type DepthPreference = 'quick' | 'deep';
export type PrivacyPreference = 'local' | 'sync';

export interface UserPreferences {
    goal: UserGoal;
    reminderTime: string; // e.g., "09:00"
    tone: TonePreference;
    depth: DepthPreference;
    privacy: PrivacyPreference;
    reducedMotion: boolean;
}

// -----------------------------------------------------------------------------
// Values (From Card Sort)
// -----------------------------------------------------------------------------

export interface UserValues {
    topValues: string[]; // Top 5-7 selected values
    sortedAt: string;
}

// -----------------------------------------------------------------------------
// Patterns (Detected over time)
// -----------------------------------------------------------------------------

export type PatternType =
    | 'trigger-emotion'
    | 'thought-behaviour'
    | 'value-mismatch'
    | 'emotion-chain';

export interface Pattern {
    id: string;
    type: PatternType;
    description: string;
    frequency: number;
    lastSeen: string;
    tested: boolean;
    hypothesis?: string; // "When you feel X → you predict Y → you do Z"
}

// -----------------------------------------------------------------------------
// Module Progress
// -----------------------------------------------------------------------------

export interface ModuleProgress {
    emotion: { level: number; lessonsCompleted: number; practicesCompleted: number };
    thought: { level: number; lessonsCompleted: number; practicesCompleted: number };
    behaviour: { level: number; lessonsCompleted: number; practicesCompleted: number };
    values: { level: number; lessonsCompleted: number; practicesCompleted: number };
    blindSpots: { level: number; lessonsCompleted: number; practicesCompleted: number };
}

// -----------------------------------------------------------------------------
// Weekly Insights
// -----------------------------------------------------------------------------

export interface WeeklyInsight {
    weekStarting: string;
    topEmotions: Array<{ emotion: string; count: number }>;
    topThoughtTags: Array<{ tag: string; count: number }>;
    topBehaviours: Array<{ behaviour: string; count: number }>;
    valueAlignmentScore: number; // 0-100
    blindSpotSuggestions: string[];
    checkInCount: number;
}

// -----------------------------------------------------------------------------
// App State
// -----------------------------------------------------------------------------

export interface AppState {
    checkIns: CheckIn[];
    preferences: UserPreferences | null;
    userValues: UserValues | null;
    patterns: Pattern[];
    moduleProgress: ModuleProgress;
    hasCompletedOnboarding: boolean;
    weeklyInsights: WeeklyInsight[];
}

// -----------------------------------------------------------------------------
// Navigation
// -----------------------------------------------------------------------------

export type TabType = 'check-in' | 'journey' | 'insights' | 'tools' | 'settings';
export type ViewType =
    | 'onboarding'
    | 'check-in'
    | 'journey'
    | 'insights'
    | 'tools'
    | 'settings'
    | 'module-emotion'
    | 'module-thought'
    | 'module-behaviour'
    | 'module-values'
    | 'module-blindspots'
    | 'values-sort'
    | 'breathing';

// -----------------------------------------------------------------------------
// Onboarding Baseline Snapshot
// -----------------------------------------------------------------------------

export interface BaselineSnapshot {
    currentMood: string;
    typicalStressResponse: string;
    biggestChallenge: string;
    whatMatters: string[];
    selfAwarenessLevel: number; // 1-5
    capturedAt: string;
}

// =============================================================================
// DATA CONSTANTS
// =============================================================================

export const CORE_EMOTIONS = ['happy', 'sad', 'angry', 'fearful', 'surprised', 'disgusted'] as const;

export const DETAILED_EMOTIONS: Record<string, readonly string[]> = {
    happy: ['joyful', 'content', 'proud', 'optimistic', 'peaceful', 'excited'],
    sad: ['grief', 'disappointment', 'loneliness', 'hopelessness', 'melancholy', 'hurt'],
    angry: ['frustrated', 'irritated', 'resentful', 'bitter', 'outraged', 'hostile'],
    fearful: ['anxious', 'insecure', 'overwhelmed', 'panicked', 'worried', 'scared'],
    surprised: ['shocked', 'amazed', 'confused', 'stunned', 'curious', 'startled'],
    disgusted: ['contempt', 'revulsion', 'disapproval', 'shame', 'self-loathing', 'embarrassed'],
};

export const THOUGHT_TAGS = [
    'catastrophising',
    'mind-reading',
    'all-or-nothing',
    'shame-spiral',
    'personalising',
    'should-statements',
    'fortune-telling',
    'filtering',
    'labelling',
    'overgeneralising',
] as const;

export const BODY_LOCATIONS = [
    'head',
    'jaw',
    'throat',
    'chest',
    'stomach',
    'gut',
    'shoulders',
    'hands',
    'whole-body',
] as const;

export const BEHAVIOUR_URGES = [
    'fight',
    'flight',
    'freeze',
    'fawn',
    'avoid',
    'doomscroll',
    'people-please',
    'isolate',
    'overwork',
    'numb-out',
    'vent',
    'shutdown',
] as const;

export const PAUSE_PLANS = [
    '10 deep breaths',
    'drink water',
    'message later',
    'move body 2 mins',
    'step outside',
    'count to 10',
    'name 5 things I see',
] as const;

export const VALUES_LIST = [
    'safety', 'honesty', 'freedom', 'love', 'respect', 'growth',
    'creativity', 'connection', 'adventure', 'peace', 'justice',
    'compassion', 'authenticity', 'loyalty', 'independence', 'family',
    'health', 'wisdom', 'humor', 'success', 'kindness', 'integrity',
    'courage', 'gratitude', 'balance', 'curiosity', 'spirituality',
    'community', 'contribution', 'excellence',
] as const;
