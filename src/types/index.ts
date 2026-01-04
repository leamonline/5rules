export interface Rule {
    id: number;
    title: string;
    icon: string;
    color: string;
    description: string;
    introduction: string[];
    explanation?: string;
}

export interface Rule1Responses {
    trigger: string;
    trait: string;
    mirror: string;
    instance: string;
}

export interface Rule2Responses {
    event: string;
    why1: string;
    why2: string;
    why3: string;
    conclusion: string;
}

export interface Rule3Responses {
    label: string;
    fear: string;
    integration: string;
}

export interface Rule4Responses {
    values: string[];
    sources: string[];
    decisions: string[];
}

export interface Rule5Responses {
    event: string;
    judgment: string;
    neutral: string;
    acceptance: string;
}

export interface JourneyResponses {
    rule1: Rule1Responses;
    rule2: Rule2Responses;
    rule3: Rule3Responses;
    rule4: Rule4Responses;
    rule5: Rule5Responses;
}

export interface Journey {
    id: string;
    version: number;
    responses: JourneyResponses;
    completedRules: number[];
    startedAt: string;
    lastUpdatedAt: string;
    completedAt: string | null;
}

export interface AppState {
    currentJourney: Journey | null;
    journeyHistory: Journey[];
    hasCompletedOnboarding: boolean;
    preferences: {
        reducedMotion: boolean;
    };
}

export type ViewType = 'onboarding' | 'home' | 'rule-intro' | 'rule' | 'summary' | 'journey-complete';
