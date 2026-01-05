// Common thought patterns (cognitive distortions) with plain-language explanations

export interface ThoughtPattern {
    id: string;
    name: string;
    shortName: string; // For compact display
    description: string;
    example: string;
    question: string; // Question to help identify this pattern
}

export const thoughtPatterns: ThoughtPattern[] = [
    {
        id: 'catastrophising',
        name: 'Catastrophising',
        shortName: 'Worst case',
        description: 'Jumping to the worst possible outcome as if it\'s certain to happen',
        example: '"I made one mistake, my career is over"',
        question: 'Am I assuming the absolute worst will happen?',
    },
    {
        id: 'mind-reading',
        name: 'Mind Reading',
        shortName: 'Mind reading',
        description: 'Assuming you know what others are thinking without evidence',
        example: '"They didn\'t text back, they must hate me"',
        question: 'Am I assuming I know what someone thinks?',
    },
    {
        id: 'all-or-nothing',
        name: 'All-or-Nothing Thinking',
        shortName: 'Black & white',
        description: 'Seeing things in extremes with no middle ground',
        example: '"If I can\'t do it perfectly, there\'s no point"',
        question: 'Am I thinking in extremes?',
    },
    {
        id: 'shame-spiral',
        name: 'Shame Spiral',
        shortName: 'Shame spiral',
        description: 'One mistake leads to feeling fundamentally broken',
        example: '"I snapped at them. I\'m a terrible person"',
        question: 'Am I making this about who I am as a person?',
    },
    {
        id: 'personalising',
        name: 'Personalising',
        shortName: 'It\'s about me',
        description: 'Assuming everything is about you or your fault',
        example: '"They\'re in a bad mood because of something I did"',
        question: 'Am I taking responsibility for something that isn\'t mine?',
    },
    {
        id: 'should-statements',
        name: 'Should Statements',
        shortName: 'Shoulds',
        description: 'Rigid rules about how things "should" be',
        example: '"I should always be productive. I shouldn\'t feel this way"',
        question: 'Am I using "should" or "must" a lot?',
    },
    {
        id: 'fortune-telling',
        name: 'Fortune Telling',
        shortName: 'Predicting',
        description: 'Predicting the future negatively as if it\'s fact',
        example: '"This will definitely go wrong"',
        question: 'Am I predicting something bad without evidence?',
    },
    {
        id: 'filtering',
        name: 'Mental Filtering',
        shortName: 'Only negatives',
        description: 'Focusing only on negatives while ignoring positives',
        example: '"The one critical comment ruins all the praise"',
        question: 'Am I ignoring the good parts?',
    },
    {
        id: 'labelling',
        name: 'Labelling',
        shortName: 'Labelling',
        description: 'Reducing yourself or others to one-word labels',
        example: '"I\'m an idiot. They\'re a jerk"',
        question: 'Am I boiling someone down to one label?',
    },
    {
        id: 'overgeneralising',
        name: 'Overgeneralising',
        shortName: 'Always/Never',
        description: 'Using "always" or "never" based on one or few events',
        example: '"This always happens to me. I never get it right"',
        question: 'Am I using "always" or "never"?',
    },
];

// Get pattern by ID
export function getPatternById(id: string): ThoughtPattern | undefined {
    return thoughtPatterns.find((p) => p.id === id);
}

// Questions to help classify a thought
export const classifyThoughtQuestions = [
    {
        type: 'fact' as const,
        question: 'Could this be proven in court with evidence?',
        description: 'Something objectively true',
    },
    {
        type: 'guess' as const,
        question: 'Am I making an assumption without all the information?',
        description: 'A prediction or interpretation',
    },
    {
        type: 'fear' as const,
        question: 'Is this something I\'m scared could happen?',
        description: 'Worry about a possible future',
    },
];
