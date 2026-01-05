// Values for the card sort exercise

export interface ValueCard {
    id: string;
    name: string;
    description: string;
    category: 'connection' | 'growth' | 'meaning' | 'freedom' | 'stability';
}

export const valueCards: ValueCard[] = [
    // Connection values
    { id: 'love', name: 'Love', description: 'Deep affection and care for others', category: 'connection' },
    { id: 'family', name: 'Family', description: 'Closeness with family members', category: 'connection' },
    { id: 'friendship', name: 'Friendship', description: 'Close bonds with friends', category: 'connection' },
    { id: 'community', name: 'Community', description: 'Being part of something bigger', category: 'connection' },
    { id: 'loyalty', name: 'Loyalty', description: 'Standing by those you care about', category: 'connection' },
    { id: 'compassion', name: 'Compassion', description: 'Caring about others\' suffering', category: 'connection' },

    // Growth values
    { id: 'growth', name: 'Growth', description: 'Continuous learning and improvement', category: 'growth' },
    { id: 'wisdom', name: 'Wisdom', description: 'Deep understanding of life', category: 'growth' },
    { id: 'curiosity', name: 'Curiosity', description: 'Wanting to explore and learn', category: 'growth' },
    { id: 'creativity', name: 'Creativity', description: 'Making new things, expressing ideas', category: 'growth' },
    { id: 'excellence', name: 'Excellence', description: 'Doing your best work', category: 'growth' },
    { id: 'courage', name: 'Courage', description: 'Facing fears and challenges', category: 'growth' },

    // Meaning values
    { id: 'purpose', name: 'Purpose', description: 'Having a reason for what you do', category: 'meaning' },
    { id: 'contribution', name: 'Contribution', description: 'Making a positive difference', category: 'meaning' },
    { id: 'spirituality', name: 'Spirituality', description: 'Connection to something greater', category: 'meaning' },
    { id: 'justice', name: 'Justice', description: 'Fairness and equality for all', category: 'meaning' },
    { id: 'integrity', name: 'Integrity', description: 'Acting in line with your beliefs', category: 'meaning' },
    { id: 'authenticity', name: 'Authenticity', description: 'Being true to yourself', category: 'meaning' },

    // Freedom values
    { id: 'freedom', name: 'Freedom', description: 'Ability to make your own choices', category: 'freedom' },
    { id: 'independence', name: 'Independence', description: 'Not relying on others', category: 'freedom' },
    { id: 'adventure', name: 'Adventure', description: 'New experiences and excitement', category: 'freedom' },
    { id: 'spontaneity', name: 'Spontaneity', description: 'Acting on impulse, flexibility', category: 'freedom' },
    { id: 'autonomy', name: 'Autonomy', description: 'Control over your own life', category: 'freedom' },
    { id: 'fun', name: 'Fun', description: 'Enjoyment and playfulness', category: 'freedom' },

    // Stability values
    { id: 'safety', name: 'Safety', description: 'Feeling secure and protected', category: 'stability' },
    { id: 'peace', name: 'Peace', description: 'Inner calm and tranquility', category: 'stability' },
    { id: 'health', name: 'Health', description: 'Physical and mental wellbeing', category: 'stability' },
    { id: 'balance', name: 'Balance', description: 'Harmony between different areas', category: 'stability' },
    { id: 'respect', name: 'Respect', description: 'Being treated with dignity', category: 'stability' },
    { id: 'honesty', name: 'Honesty', description: 'Truth and transparency', category: 'stability' },
];

// Quick values for check-in (subset for fast selection)
export const quickValues = [
    'safety',
    'respect',
    'freedom',
    'love',
    'honesty',
    'peace',
    'connection',
    'growth',
    'authenticity',
    'balance',
] as const;

// Get value by ID
export function getValueById(id: string): ValueCard | undefined {
    return valueCards.find((v) => v.id === id);
}

// Get values by category
export function getValuesByCategory(category: ValueCard['category']): ValueCard[] {
    return valueCards.filter((v) => v.category === category);
}

// Get all categories
export const valueCategories: Array<{ id: ValueCard['category']; name: string; color: string }> = [
    { id: 'connection', name: 'Connection', color: 'var(--color-clay)' },
    { id: 'growth', name: 'Growth', color: 'var(--color-sage)' },
    { id: 'meaning', name: 'Meaning', color: 'var(--color-indigo-muted)' },
    { id: 'freedom', name: 'Freedom', color: 'var(--color-gold-muted)' },
    { id: 'stability', name: 'Stability', color: 'var(--color-sage-light)' },
];
