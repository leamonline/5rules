import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ChevronLeft,
    Sparkles,
    Target,
    MessageCircle,
    Compass,
    Brain,
    Heart,
    Leaf,
    Check,
    Shield,
} from 'lucide-react';
import { OnboardingDots } from '../components/ProgressIndicator';
import { savePreferences, saveBaselineSnapshot, getDefaultPreferences } from '../services/storage';
import type { UserGoal, TonePreference, DepthPreference, BaselineSnapshot, UserPreferences } from '../types';

interface OnboardingScreenProps {
    onComplete: () => void;
    onSkip: () => void;
}

// Goal options
const goals: Array<{ id: UserGoal; label: string; description: string; icon: typeof Target }> = [
    {
        id: 'understand-moods',
        label: 'Understand my moods',
        description: 'Learn why I feel what I feel',
        icon: Heart,
    },
    {
        id: 'stop-spiralling',
        label: 'Stop spiralling',
        description: 'Break unhelpful thought loops',
        icon: Brain,
    },
    {
        id: 'communicate-better',
        label: 'Communicate better',
        description: 'Express myself more clearly',
        icon: MessageCircle,
    },
    {
        id: 'decide-clearer',
        label: 'Make clearer decisions',
        description: 'Know what I really want',
        icon: Compass,
    },
];

// Baseline questions
const baselineQuestions = [
    {
        id: 'currentMood',
        question: 'How are you feeling right now?',
        options: ['Great', 'Good', 'Okay', 'Struggling', 'Overwhelmed'],
    },
    {
        id: 'stressResponse',
        question: 'When stressed, I usually...',
        options: ['Shut down', 'Get busy', 'Reach out', 'Avoid it', 'Overthink'],
    },
    {
        id: 'challenge',
        question: 'My biggest challenge is...',
        options: ['Managing emotions', 'Negative thoughts', 'Taking action', 'Knowing what I want', 'Being myself'],
    },
    {
        id: 'awareness',
        question: "I'd rate my self-awareness as...",
        options: ['1 - Just starting', '2 - Learning', '3 - Growing', '4 - Strong', '5 - Very strong'],
    },
];

type OnboardingStep = 'welcome' | 'goal' | 'preferences' | 'baseline' | 'ready';
const STEPS: OnboardingStep[] = ['welcome', 'goal', 'preferences', 'baseline', 'ready'];

export function OnboardingScreen({ onComplete, onSkip }: OnboardingScreenProps) {
    const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
    const currentIndex = STEPS.indexOf(currentStep);

    // Form state
    const [selectedGoal, setSelectedGoal] = useState<UserGoal | null>(null);
    const [tone, setTone] = useState<TonePreference>('gentle');
    const [depth, setDepth] = useState<DepthPreference>('quick');
    const [baselineAnswers, setBaselineAnswers] = useState<Record<string, string>>({});

    const canProceed = useCallback(() => {
        switch (currentStep) {
            case 'welcome':
                return true;
            case 'goal':
                return selectedGoal !== null;
            case 'preferences':
                return true; // Preferences have defaults
            case 'baseline':
                return Object.keys(baselineAnswers).length >= 3; // At least 3 of 4 answered
            case 'ready':
                return true;
            default:
                return false;
        }
    }, [currentStep, selectedGoal, baselineAnswers]);

    const handleNext = useCallback(() => {
        if (currentStep === 'ready') {
            // Save everything and complete
            const prefs: UserPreferences = {
                ...getDefaultPreferences(),
                goal: selectedGoal ?? 'understand-moods',
                tone,
                depth,
            };
            savePreferences(prefs);

            const snapshot: BaselineSnapshot = {
                currentMood: baselineAnswers.currentMood ?? '',
                typicalStressResponse: baselineAnswers.stressResponse ?? '',
                biggestChallenge: baselineAnswers.challenge ?? '',
                whatMatters: [],
                selfAwarenessLevel: parseInt(baselineAnswers.awareness?.charAt(0) ?? '3'),
                capturedAt: new Date().toISOString(),
            };
            saveBaselineSnapshot(snapshot);

            onComplete();
        } else {
            const nextIndex = currentIndex + 1;
            if (nextIndex < STEPS.length) {
                setCurrentStep(STEPS[nextIndex]);
            }
        }
    }, [currentStep, currentIndex, selectedGoal, tone, depth, baselineAnswers, onComplete]);

    const handleBack = useCallback(() => {
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            setCurrentStep(STEPS[prevIndex]);
        }
    }, [currentIndex]);

    const renderStep = () => {
        switch (currentStep) {
            case 'welcome':
                return (
                    <div className="text-center space-y-6">
                        <div className="w-24 h-24 organic-shape-1 bg-[var(--color-sage)]/20 flex items-center justify-center mx-auto">
                            <Leaf size={48} className="text-[var(--color-sage-dark)]" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-heading text-[var(--color-text-primary)] mb-3">
                                Welcome
                            </h1>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                This app helps you notice patterns in how you feel, think, and act—so you can respond to life more intentionally.
                            </p>
                        </div>
                        <div className="glass-panel p-4 rounded-2xl text-left">
                            <p className="text-sm text-[var(--color-text-muted)] flex items-center gap-2">
                                <Shield size={16} className="text-[var(--color-sage)]" />
                                Everything stays on your device. No accounts, no data sharing.
                            </p>
                        </div>
                    </div>
                );

            case 'goal':
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-heading text-[var(--color-text-primary)] mb-2">
                                What brings you here?
                            </h1>
                            <p className="text-sm text-[var(--color-text-muted)]">
                                Pick what resonates most right now
                            </p>
                        </div>
                        <div className="space-y-3">
                            {goals.map((goal) => {
                                const Icon = goal.icon;
                                const isSelected = selectedGoal === goal.id;
                                return (
                                    <button
                                        key={goal.id}
                                        onClick={() => setSelectedGoal(goal.id)}
                                        className={`
                                            w-full p-4 rounded-2xl text-left transition-all duration-300
                                            border-2 glass-panel flex items-center gap-4
                                            ${isSelected
                                                ? 'border-[var(--color-sage)] bg-[var(--color-sage)]/10'
                                                : 'border-transparent hover:border-white/40'
                                            }
                                        `}
                                    >
                                        <div className={`
                                            w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                                            ${isSelected ? 'bg-[var(--color-sage)] text-white' : 'bg-white/50 text-[var(--color-sage)]'}
                                        `}>
                                            <Icon size={22} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-[var(--color-text-primary)]">{goal.label}</p>
                                            <p className="text-sm text-[var(--color-text-muted)]">{goal.description}</p>
                                        </div>
                                        {isSelected && (
                                            <Check size={20} className="text-[var(--color-sage)]" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );

            case 'preferences':
                return (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h1 className="text-2xl font-heading text-[var(--color-text-primary)] mb-2">
                                How would you like this to feel?
                            </h1>
                            <p className="text-sm text-[var(--color-text-muted)]">
                                You can change these anytime in Settings
                            </p>
                        </div>

                        {/* Tone */}
                        <div>
                            <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">Tone</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setTone('gentle')}
                                    className={`
                                        p-4 rounded-2xl text-center transition-all border-2
                                        ${tone === 'gentle'
                                            ? 'border-[var(--color-sage)] bg-[var(--color-sage)]/10'
                                            : 'border-transparent glass-panel hover:border-white/40'
                                        }
                                    `}
                                >
                                    <span className="text-2xl mb-2 block">🌿</span>
                                    <p className="font-medium">Gentle</p>
                                    <p className="text-xs text-[var(--color-text-muted)]">Soft, supportive</p>
                                </button>
                                <button
                                    onClick={() => setTone('direct')}
                                    className={`
                                        p-4 rounded-2xl text-center transition-all border-2
                                        ${tone === 'direct'
                                            ? 'border-[var(--color-sage)] bg-[var(--color-sage)]/10'
                                            : 'border-transparent glass-panel hover:border-white/40'
                                        }
                                    `}
                                >
                                    <span className="text-2xl mb-2 block">⚡</span>
                                    <p className="font-medium">Direct</p>
                                    <p className="text-xs text-[var(--color-text-muted)]">Clear, to the point</p>
                                </button>
                            </div>
                        </div>

                        {/* Depth */}
                        <div>
                            <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">Depth</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setDepth('quick')}
                                    className={`
                                        p-4 rounded-2xl text-center transition-all border-2
                                        ${depth === 'quick'
                                            ? 'border-[var(--color-sage)] bg-[var(--color-sage)]/10'
                                            : 'border-transparent glass-panel hover:border-white/40'
                                        }
                                    `}
                                >
                                    <span className="text-2xl mb-2 block">🚀</span>
                                    <p className="font-medium">Quick</p>
                                    <p className="text-xs text-[var(--color-text-muted)]">2-min check-ins</p>
                                </button>
                                <button
                                    onClick={() => setDepth('deep')}
                                    className={`
                                        p-4 rounded-2xl text-center transition-all border-2
                                        ${depth === 'deep'
                                            ? 'border-[var(--color-sage)] bg-[var(--color-sage)]/10'
                                            : 'border-transparent glass-panel hover:border-white/40'
                                        }
                                    `}
                                >
                                    <span className="text-2xl mb-2 block">🔍</span>
                                    <p className="font-medium">Deep</p>
                                    <p className="text-xs text-[var(--color-text-muted)]">More reflection</p>
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'baseline':
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-heading text-[var(--color-text-primary)] mb-2">
                                Quick Snapshot
                            </h1>
                            <p className="text-sm text-[var(--color-text-muted)]">
                                A starting point to measure your growth
                            </p>
                        </div>
                        <div className="space-y-6">
                            {baselineQuestions.map((q) => (
                                <div key={q.id}>
                                    <p className="text-sm font-medium text-[var(--color-text-primary)] mb-3">
                                        {q.question}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {q.options.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setBaselineAnswers((prev) => ({ ...prev, [q.id]: option }))}
                                                className={`
                                                    px-4 py-2 rounded-full text-sm transition-all
                                                    ${baselineAnswers[q.id] === option
                                                        ? 'bg-[var(--color-sage)] text-white'
                                                        : 'glass-panel text-[var(--color-text-secondary)] hover:bg-white/50'
                                                    }
                                                `}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'ready':
                return (
                    <div className="text-center space-y-6">
                        <div className="w-24 h-24 organic-shape-1 bg-[var(--color-clay)]/20 flex items-center justify-center mx-auto animate-breathe">
                            <Sparkles size={40} className="text-[var(--color-clay)]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-heading text-[var(--color-text-primary)] mb-3">
                                You're all set!
                            </h1>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                Start with a quick daily check-in. It takes about 2 minutes and helps you notice what's happening inside.
                            </p>
                        </div>
                        <div className="glass-panel p-5 rounded-2xl text-left space-y-3">
                            <p className="text-sm text-[var(--color-text-secondary)]">
                                <span className="font-medium text-[var(--color-text-primary)]">Your goal:</span>{' '}
                                {goals.find((g) => g.id === selectedGoal)?.label ?? 'Understand yourself better'}
                            </p>
                            <p className="text-sm text-[var(--color-text-secondary)]">
                                <span className="font-medium text-[var(--color-text-primary)]">Style:</span>{' '}
                                {tone === 'gentle' ? '🌿 Gentle' : '⚡ Direct'}, {depth === 'quick' ? '🚀 Quick' : '🔍 Deep'}
                            </p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen p-6 flex flex-col">
            {/* Skip button */}
            <div className="flex justify-end">
                <button
                    onClick={onSkip}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors py-2 px-4"
                    aria-label="Skip onboarding"
                >
                    Skip
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="mb-10"
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="space-y-6">
                    <OnboardingDots current={currentIndex} total={STEPS.length} />

                    <div className="flex gap-4">
                        {currentIndex > 0 && (
                            <button
                                onClick={handleBack}
                                className="flex-1 py-4 organic-pill bg-white/50 border border-[var(--color-clay)]/30 text-[var(--color-text-primary)] hover:bg-white transition-all font-medium flex items-center justify-center gap-2"
                            >
                                <ChevronLeft size={18} />
                                Back
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className={`
                                flex-1 py-4 organic-pill transition-all font-medium flex items-center justify-center gap-2
                                ${canProceed()
                                    ? currentStep === 'ready'
                                        ? 'bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-dark)] shadow-lg'
                                        : 'glass-panel text-[var(--color-text-primary)] hover:bg-white'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }
                            `}
                        >
                            {currentStep === 'ready' ? 'Start Check-In' : 'Continue'}
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
