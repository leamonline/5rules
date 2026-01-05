import type { JourneyResponses } from '../types';

export interface RuleInsight {
    insight: string;
    advice: string;
    affirmation: string;
    reflectionQuestion: string;
}

export interface JourneyInsights {
    rule1?: RuleInsight;
    rule2?: RuleInsight;
    rule3?: RuleInsight;
    rule4?: RuleInsight;
    rule5?: RuleInsight;
    overallTheme?: string;
}

// Insight templates keyed by response patterns
const rule1Insights: Record<string, Partial<RuleInsight>> = {
    "I do this sometimes too": {
        insight: "You've recognized that the trait bothering you exists within yourself too. This is powerful self-awareness. What we dislike in others is often a reflection of something unintegrated in ourselves.",
        advice: "When you notice this trait in yourself, pause and offer yourself the same understanding you'd give a good friend. Ask: 'What need is this behavior trying to meet?'",
        affirmation: "Recognizing your own patterns takes courage. You're building genuine self-awareness."
    },
    "I wish I could be more like this": {
        insight: "What triggers you may actually be something you secretly admire or wish you could express more freely. You might have learned to suppress this quality.",
        advice: "Give yourself permission to explore this quality in small, safe ways. What's one tiny step toward embodying this trait authentically?",
        affirmation: "You're allowed to reclaim parts of yourself you've hidden away."
    },
    "I used to be like this": {
        insight: "You may have worked hard to move away from this trait, and seeing it in others reminds you of who you used to be. This can feel threatening to your current identity.",
        advice: "Acknowledge how far you've come, AND hold compassion for the version of you that once needed to be this way. They were doing their best.",
        affirmation: "Your growth is real. You can honor your past self while continuing to evolve."
    },
    "I suppress this in myself": {
        insight: "You've identified a quality you actively push down in yourself. When others express it freely, it can feel unfair or triggering because you've told yourself it's not okay.",
        advice: "Explore what would happen if you allowed this quality to have a small, healthy expression. What's the fear behind keeping it suppressed?",
        affirmation: "Every part of you deserves acknowledgment. Integration doesn't mean acting out—it means making peace."
    },
    "I'm scared I'm like this": {
        insight: "There's fear here—a worry that this trait might define you. This fear often comes from having learned that certain qualities are unacceptable or shameful.",
        advice: "Remind yourself: having a trait sometimes doesn't make it your whole identity. You are complex and contain multitudes. This is normal and human.",
        affirmation: "You are more than any single quality. Your self-awareness is already proof of your depth."
    },
    "I judge myself for wanting this": {
        insight: "Part of you desires what this person represents, but another part judges that desire harshly. This inner conflict creates the strong reaction.",
        advice: "Practice saying: 'It's okay to want this. Wanting something doesn't mean I have to act on it or that I'm a bad person for feeling it.'",
        affirmation: "Your desires are valid. Judgment can soften into curiosity."
    }
};

const rule2Insights: Record<string, Partial<RuleInsight>> = {
    "This is about needing safety": {
        insight: "Your strong reaction points to a deep need for safety and security. When this need feels threatened, your nervous system responds as if real danger is present—even when it isn't.",
        advice: "When you feel unsafe, try placing a hand on your chest and taking three slow breaths. Remind yourself: 'I am safe in this moment. This feeling will pass.'",
        affirmation: "Your need for safety is valid. Learning to create safety within yourself is one of the most healing things you can do."
    },
    "This is about needing control": {
        insight: "A need for control often develops when life felt unpredictable or chaotic. Your mind learned that controlling outcomes was the way to stay safe.",
        advice: "Practice 'controlled surrender' with small things: take a different route, let someone else choose the restaurant. Notice that you survive and may even enjoy it.",
        affirmation: "You've developed strength through managing things. Now you're learning that loosening your grip can also be a form of strength."
    },
    "This is about needing belonging": {
        insight: "Your reaction connects to a core human need: to belong, to be included, to matter. When this feels threatened, it can touch very old wounds.",
        advice: "Make a list of people and places where you genuinely belong. Read it when you feel excluded. One rejection doesn't erase all your belonging.",
        affirmation: "You belong. Not because of what you do, but because of who you are."
    },
    "This is about proving my worth": {
        insight: "You've learned to tie your value to achievement, productivity, or being useful. When something threatens this, it can feel like your entire worth is on the line.",
        advice: "Practice being 'useless' for 10 minutes a day—just existing, not producing. Your worth doesn't depend on output.",
        affirmation: "You are worthy because you exist, not because of what you accomplish."
    },
    "This is about fear of abandonment": {
        insight: "Early experiences may have taught you that people leave, that love is conditional, or that you need to earn staying. This fear runs deep and can color many reactions.",
        advice: "When abandonment fear arises, name it: 'This is my fear speaking.' Then ask: 'What does the present moment actually show me about this relationship?'",
        affirmation: "Some people stay. You are learning to trust, and that's brave work."
    },
    "This is about old survival patterns": {
        insight: "Your nervous system developed patterns to help you survive childhood. These patterns were smart then—but they may be overactive in your safer present.",
        advice: "Thank your survival patterns for protecting you. Then gently remind them: 'We're safe now. I've got this.' Repeat as needed.",
        affirmation: "You survived. Now you get to learn how to thrive. Your adaptability got you here."
    },
    "This is about needing validation": {
        insight: "You learned to look outside yourself for confirmation that you're okay, that you're doing it right, that you matter. External validation became essential.",
        advice: "Start building an internal validation practice. At day's end, tell yourself three things you're proud of—things no one else saw.",
        affirmation: "Your opinion of yourself matters most. You're learning to become your own source of approval."
    }
};

const rule3Insights: Record<string, Partial<RuleInsight>> = {
    default: {
        advice: "Start small. Choose one low-stakes situation where you can practice the 'AND' side of your statement. Notice what happens.",
        affirmation: "You are complex, multidimensional, and whole. That's not a flaw—it's being fully human."
    }
};

const rule4Insights = {
    keep: {
        insight: "You've consciously claimed this value as your own. It aligns with who you want to be.",
        advice: "Celebrate this clarity! Write down why this value matters to you in your own words.",
    },
    adopt: {
        insight: "You're choosing to take on this value intentionally, transforming an inherited rule into a conscious choice.",
        advice: "Reframe this value in your own language. How would YOU say this rule if you were teaching it to someone you love?",
    },
    release: {
        insight: "You're letting go of a value that no longer serves you. This takes courage and self-trust.",
        advice: "Write a brief 'thank you and goodbye' to this value. Acknowledge what it gave you, then release it with gratitude.",
    }
};

const rule5Insights: Record<string, Partial<RuleInsight>> = {
    default: {
        insight: "You've practiced the powerful skill of separating what happened from the story your mind added. This creates space between you and your automatic reactions.",
        advice: "When you catch yourself spinning a story, pause and ask: 'What are the neutral facts here?' Write them down if it helps.",
        affirmation: "You're learning to respond to life as it is, not to the stories in your head. This is freedom."
    }
};

export function generateInsights(responses: JourneyResponses): JourneyInsights {
    const insights: JourneyInsights = {};

    // Rule 1 Insights
    if (responses.rule1.trigger && responses.rule1.mirror) {
        const mirrorInsight = rule1Insights[responses.rule1.mirror] || {};
        insights.rule1 = {
            insight: mirrorInsight.insight || `By exploring what ${responses.rule1.trigger.toLowerCase()} triggers in you, you've opened a door to self-understanding. The trait "${responses.rule1.trait.toLowerCase()}" that bothers you carries a message worth hearing.`,
            advice: mirrorInsight.advice || "This week, when you notice yourself reacting strongly to someone, pause and ask: 'What does this person remind me of in myself?'",
            affirmation: mirrorInsight.affirmation || "Your willingness to look within is the foundation of all growth.",
            reflectionQuestion: `When you exhibit "${responses.rule1.trait.toLowerCase()}" yourself, what are you usually needing in that moment?`
        };
    }

    // Rule 2 Insights
    if (responses.rule2.conclusion) {
        const conclusionInsight = rule2Insights[responses.rule2.conclusion] || {};
        insights.rule2 = {
            insight: conclusionInsight.insight || `You've traced your reaction to "${responses.rule2.event.toLowerCase()}" all the way back to its roots. Understanding this chain—from present reaction to past origin—is deeply healing work.`,
            advice: conclusionInsight.advice || "When a similar trigger arises, pause and name it: 'This is my [core need] speaking.' Naming creates distance.",
            affirmation: conclusionInsight.affirmation || "Your feelings make sense when you understand their origins. You're not overreacting—you're responding to something real.",
            reflectionQuestion: `How might your life look different if you could meet your need for ${responses.rule2.conclusion.replace("This is about ", "").toLowerCase()} in healthy ways?`
        };
    }

    // Rule 3 Insights
    if (responses.rule3.integration) {
        const defaultInsight = rule3Insights.default;
        insights.rule3 = {
            insight: `You've created your own both/and statement: "${responses.rule3.integration}". This is a profound act of self-acceptance—giving yourself permission to be more than one thing.`,
            advice: defaultInsight.advice || "",
            affirmation: defaultInsight.affirmation || "",
            reflectionQuestion: `What would it feel like to fully embrace "${responses.rule3.integration}" without any guilt?`
        };
    }

    // Rule 4 Insights
    if (responses.rule4.values.some(v => v)) {
        const keptValues = responses.rule4.values.filter((v, i) => v && responses.rule4.decisions[i]?.includes("Keep"));
        const adoptedValues = responses.rule4.values.filter((v, i) => v && responses.rule4.decisions[i]?.includes("Adopt"));
        const releasedValues = responses.rule4.values.filter((v, i) => v && responses.rule4.decisions[i]?.includes("Let it go"));

        const insightParts: string[] = [];
        if (keptValues.length > 0) {
            insightParts.push(`You've claimed ${keptValues.length} value${keptValues.length > 1 ? 's' : ''} as authentically yours.`);
        }
        if (adoptedValues.length > 0) {
            insightParts.push(`You've consciously adopted ${adoptedValues.length} inherited value${adoptedValues.length > 1 ? 's' : ''}.`);
        }
        if (releasedValues.length > 0) {
            insightParts.push(`You've chosen to release ${releasedValues.length} value${releasedValues.length > 1 ? 's' : ''} that no longer serve you.`);
        }

        insights.rule4 = {
            insight: insightParts.join(' ') + " This sorting process is how you move from living by default to living by design.",
            advice: releasedValues.length > 0
                ? rule4Insights.release.advice
                : adoptedValues.length > 0
                    ? rule4Insights.adopt.advice
                    : rule4Insights.keep.advice,
            affirmation: "You get to choose what you believe. Not everything you were taught has to stay true for you.",
            reflectionQuestion: "Which of these values do you want to pass on to others, and which stop with you?"
        };
    }

    // Rule 5 Insights
    if (responses.rule5.neutral) {
        const defaultInsight = rule5Insights.default;
        insights.rule5 = {
            insight: defaultInsight.insight || "",
            advice: defaultInsight.advice || "",
            affirmation: defaultInsight.affirmation || "",
            reflectionQuestion: `When "${responses.rule5.event.toLowerCase()}" happens again, how might you respond differently now?`
        };
    }

    // Overall theme
    const completedRules = [
        responses.rule1.trigger,
        responses.rule2.conclusion,
        responses.rule3.integration,
        responses.rule4.values.some(v => v),
        responses.rule5.neutral
    ].filter(Boolean).length;

    if (completedRules >= 3) {
        insights.overallTheme = "You've done meaningful inner work today. Each reflection builds on the last, creating a fuller picture of who you are and how you relate to yourself. Return to these insights whenever you need a reminder of your growth.";
    }

    return insights;
}
