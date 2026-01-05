// Behaviour responses and pause plans

export interface Behaviour {
    id: string;
    name: string;
    category: 'fight' | 'flight' | 'freeze' | 'fawn';
    description: string;
    examples: string[];
}

export const behaviours: Behaviour[] = [
    // Fight responses
    {
        id: 'argue',
        name: 'Argue / Defend',
        category: 'fight',
        description: 'Pushing back, defending yourself, getting confrontational',
        examples: ['Raising voice', 'Getting defensive', 'Proving a point'],
    },
    {
        id: 'blame',
        name: 'Blame Others',
        category: 'fight',
        description: 'Pointing fingers, making it someone else\'s fault',
        examples: ['Accusing', 'Deflecting responsibility', 'Counter-attacking'],
    },
    {
        id: 'criticise',
        name: 'Criticise / Judge',
        category: 'fight',
        description: 'Finding fault in others or situations',
        examples: ['Nitpicking', 'Being harsh', 'Tearing down'],
    },
    {
        id: 'control',
        name: 'Try to Control',
        category: 'fight',
        description: 'Micromanaging, taking over, needing things your way',
        examples: ['Taking charge', 'Not delegating', 'Dictating'],
    },

    // Flight responses
    {
        id: 'avoid',
        name: 'Avoid / Escape',
        category: 'flight',
        description: 'Getting away from the situation or topic',
        examples: ['Leaving the room', 'Changing subject', 'Making excuses'],
    },
    {
        id: 'doomscroll',
        name: 'Doomscroll / Distract',
        category: 'flight',
        description: 'Escaping into phone, social media, or other distractions',
        examples: ['Phone for hours', 'Binge watching', 'Obsessive scrolling'],
    },
    {
        id: 'overwork',
        name: 'Overwork / Stay Busy',
        category: 'flight',
        description: 'Keeping so busy you don\'t have to feel',
        examples: ['Extra projects', 'Never resting', 'Constant productivity'],
    },
    {
        id: 'procrastinate',
        name: 'Procrastinate',
        category: 'flight',
        description: 'Putting things off to avoid discomfort',
        examples: ['Delaying decisions', 'Not starting', 'Waiting until last minute'],
    },

    // Freeze responses
    {
        id: 'shutdown',
        name: 'Shut Down',
        category: 'freeze',
        description: 'Going blank, disconnecting, spacing out',
        examples: ['Going quiet', 'Feeling numb', 'Brain fog'],
    },
    {
        id: 'isolate',
        name: 'Isolate / Withdraw',
        category: 'freeze',
        description: 'Pulling away from people and activities',
        examples: ['Cancelling plans', 'Not responding', 'Hiding away'],
    },
    {
        id: 'ruminate',
        name: 'Ruminate / Overthink',
        category: 'freeze',
        description: 'Going in circles in your head without action',
        examples: ['Replaying events', 'Analysis paralysis', 'What-ifs'],
    },
    {
        id: 'dissociate',
        name: 'Check Out / Dissociate',
        category: 'freeze',
        description: 'Feeling disconnected from yourself or reality',
        examples: ['Feeling unreal', 'Detached', 'On autopilot'],
    },

    // Fawn responses
    {
        id: 'people-please',
        name: 'People Please',
        category: 'fawn',
        description: 'Putting others\' needs first to keep peace',
        examples: ['Saying yes when you mean no', 'Over-accommodating', 'Self-sacrificing'],
    },
    {
        id: 'apologise',
        name: 'Over-Apologise',
        category: 'fawn',
        description: 'Saying sorry even when not at fault',
        examples: ['"Sorry" for existing', 'Taking all blame', 'Excessive guilt'],
    },
    {
        id: 'suppress',
        name: 'Suppress Feelings',
        category: 'fawn',
        description: 'Hiding how you really feel to not rock the boat',
        examples: ['Saying "I\'m fine"', 'Minimising needs', 'Stuffing emotions'],
    },
    {
        id: 'perform',
        name: 'Perform / Mask',
        category: 'fawn',
        description: 'Acting like everything is okay when it isn\'t',
        examples: ['Fake smile', 'Pretending', 'Being "on"'],
    },
];

// Pause plans - micro-actions to interrupt patterns
export interface PausePlan {
    id: string;
    name: string;
    duration: string;
    description: string;
    category: 'body' | 'mind' | 'environment';
}

export const pausePlans: PausePlan[] = [
    {
        id: 'breaths',
        name: '10 Deep Breaths',
        duration: '1 min',
        description: 'Slow, deep breaths to activate calm',
        category: 'body',
    },
    {
        id: 'water',
        name: 'Drink Water',
        duration: '30 sec',
        description: 'Hydrate and reset',
        category: 'body',
    },
    {
        id: 'move',
        name: 'Move Body 2 Mins',
        duration: '2 min',
        description: 'Stretch, walk, shake it out',
        category: 'body',
    },
    {
        id: 'count',
        name: 'Count to 10',
        duration: '30 sec',
        description: 'Give yourself space before responding',
        category: 'mind',
    },
    {
        id: 'ground',
        name: 'Name 5 Things You See',
        duration: '1 min',
        description: '5-4-3-2-1 grounding technique',
        category: 'mind',
    },
    {
        id: 'later',
        name: 'Message Later',
        duration: 'varies',
        description: 'Wait before sending that message',
        category: 'mind',
    },
    {
        id: 'outside',
        name: 'Step Outside',
        duration: '2 min',
        description: 'Fresh air and change of scene',
        category: 'environment',
    },
    {
        id: 'cold-water',
        name: 'Splash Cold Water',
        duration: '30 sec',
        description: 'Cold water on face to reset nervous system',
        category: 'body',
    },
];

// Get behaviour by ID
export function getBehaviourById(id: string): Behaviour | undefined {
    return behaviours.find((b) => b.id === id);
}

// Get behaviours by category
export function getBehavioursByCategory(category: Behaviour['category']): Behaviour[] {
    return behaviours.filter((b) => b.category === category);
}

// Category colors for UI
export const behaviourCategoryColors: Record<Behaviour['category'], string> = {
    fight: '#E74C3C', // Red
    flight: '#F39C12', // Orange
    freeze: '#85C1E9', // Blue
    fawn: '#9B59B6', // Purple
};

// Category descriptions
export const behaviourCategoryDescriptions: Record<Behaviour['category'], string> = {
    fight: 'Pushing back, defending, attacking',
    flight: 'Escaping, avoiding, distracting',
    freeze: 'Shutting down, going blank, stuck',
    fawn: 'Pleasing others, accommodating, hiding yourself',
};
