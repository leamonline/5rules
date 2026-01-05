// Emotion wheel data for hierarchical emotion selection

export interface EmotionCategory {
    name: string;
    color: string;
    detailedEmotions: string[];
}

export const emotionWheel: EmotionCategory[] = [
    {
        name: 'happy',
        color: '#F7DC6F', // Warm yellow
        detailedEmotions: ['joyful', 'content', 'proud', 'optimistic', 'peaceful', 'excited', 'grateful', 'hopeful'],
    },
    {
        name: 'sad',
        color: '#85C1E9', // Soft blue
        detailedEmotions: ['grief', 'disappointment', 'loneliness', 'hopelessness', 'melancholy', 'hurt', 'rejected', 'empty'],
    },
    {
        name: 'angry',
        color: '#E74C3C', // Warm red
        detailedEmotions: ['frustrated', 'irritated', 'resentful', 'bitter', 'outraged', 'hostile', 'jealous', 'betrayed'],
    },
    {
        name: 'fearful',
        color: '#9B59B6', // Purple
        detailedEmotions: ['anxious', 'insecure', 'overwhelmed', 'panicked', 'worried', 'scared', 'vulnerable', 'helpless'],
    },
    {
        name: 'surprised',
        color: '#F39C12', // Orange
        detailedEmotions: ['shocked', 'amazed', 'confused', 'stunned', 'curious', 'startled', 'dismayed', 'moved'],
    },
    {
        name: 'disgusted',
        color: '#27AE60', // Green (traditional for disgust)
        detailedEmotions: ['contempt', 'revulsion', 'disapproval', 'shame', 'self-loathing', 'embarrassed', 'repelled', 'judgemental'],
    },
];

// Plain language explanations for emotion states
export const emotionDescriptions: Record<string, string> = {
    // Core emotions
    happy: "A general sense of positivity or wellbeing",
    sad: "A heaviness or low feeling",
    angry: "A fire or tension inside",
    fearful: "A sense of threat or unease",
    surprised: "Something unexpected happened",
    disgusted: "A strong rejection or aversion",

    // Detailed emotions
    joyful: "Pure happiness that bubbles up",
    content: "Satisfied, at peace with things",
    proud: "A sense of accomplishment",
    optimistic: "Hopeful about what's coming",
    peaceful: "Calm and settled",
    excited: "Energised and looking forward",
    grateful: "Appreciating what you have",
    hopeful: "Believing things can improve",

    grief: "Deep sadness from loss",
    disappointment: "Things didn't go as hoped",
    loneliness: "Feeling disconnected from others",
    hopelessness: "Like nothing will get better",
    melancholy: "A gentle, lingering sadness",
    hurt: "Emotional pain from something that happened",
    rejected: "Feeling pushed away or unwanted",
    empty: "Like something is missing inside",

    frustrated: "Blocked from what you want",
    irritated: "Small things getting under your skin",
    resentful: "Holding onto past unfairness",
    bitter: "Long-term hurt that hasn't healed",
    outraged: "Intense anger at injustice",
    hostile: "Wanting to push back or attack",
    jealous: "Wanting what someone else has",
    betrayed: "Trust was broken",

    anxious: "A general sense of worry or unease",
    insecure: "Doubting yourself",
    overwhelmed: "Too much to handle",
    panicked: "Intense fear, need to escape",
    worried: "Thinking about what could go wrong",
    scared: "Afraid of something specific",
    vulnerable: "Feeling exposed or unprotected",
    helpless: "Like you can't do anything about it",

    shocked: "Completely caught off guard",
    amazed: "Stunned in a good way",
    confused: "Can't make sense of what happened",
    stunned: "Frozen by something unexpected",
    curious: "Wanting to understand more",
    startled: "A sudden jolt of surprise",
    dismayed: "Surprised and disappointed",
    moved: "Touched emotionally by something",

    contempt: "Looking down on something",
    revulsion: "Strong physical disgust",
    disapproval: "Thinking something is wrong",
    shame: "Feeling like you are bad",
    'self-loathing': "Intense dislike of yourself",
    embarrassed: "Wanting to hide from others",
    repelled: "Pushed away by something",
    judgemental: "Evaluating harshly",
};

// Get color for emotion (either core or detailed)
export function getEmotionColor(emotion: string): string {
    const category = emotionWheel.find(
        (cat) => cat.name === emotion || cat.detailedEmotions.includes(emotion)
    );
    return category?.color ?? '#8E9999'; // Default muted gray
}

// Get the core emotion for a detailed emotion
export function getCoreEmotion(detailedEmotion: string): string | null {
    const category = emotionWheel.find((cat) => cat.detailedEmotions.includes(detailedEmotion));
    return category?.name ?? null;
}
