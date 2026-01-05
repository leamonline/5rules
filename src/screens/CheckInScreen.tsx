import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react';
import { EmotionWheel } from '../components/EmotionWheel';
import { BehaviourSelector } from '../components/BehaviourSelector';
import { thoughtPatterns } from '../data/thoughtPatterns';
import { quickValues } from '../data/values';
import { saveCheckIn, generateId, getTodaysCheckIn } from '../services/storage';
import type { CheckIn, Emotion } from '../types';

// Check-in steps
const STEPS = ['emotion', 'thought', 'behaviour', 'value'] as const;
type Step = typeof STEPS[number];

export function CheckInScreen() {
    const existingCheckIn = getTodaysCheckIn();

    const [currentStep, setCurrentStep] = useState<Step>(existingCheckIn ? 'emotion' : 'emotion');
    const [isComplete, setIsComplete] = useState(!!existingCheckIn);

    // Form state
    const [emotion, setEmotion] = useState<Emotion | null>(
        existingCheckIn?.emotion ?? null
    );
    const [thought, setThought] = useState(existingCheckIn?.thought ?? '');
    const [thoughtTags, setThoughtTags] = useState<string[]>(existingCheckIn?.thoughtTags ?? []);
    const [behaviourUrge, setBehaviourUrge] = useState(existingCheckIn?.behaviourUrge ?? '');
    const [behaviourAction, setBehaviourAction] = useState(existingCheckIn?.behaviourAction ?? '');
    const [value, setValue] = useState(existingCheckIn?.value ?? '');

    const currentStepIndex = STEPS.indexOf(currentStep);

    const canProceed = useCallback(() => {
        switch (currentStep) {
            case 'emotion':
                return emotion?.primary;
            case 'thought':
                return thought.trim().length > 0;
            case 'behaviour':
                return behaviourUrge && behaviourAction;
            case 'value':
                return value;
            default:
                return false;
        }
    }, [currentStep, emotion, thought, behaviourUrge, behaviourAction, value]);

    const handleNext = useCallback(() => {
        if (currentStep === 'value') {
            // Save the check-in
            const checkIn: CheckIn = {
                id: existingCheckIn?.id ?? generateId('checkin'),
                timestamp: new Date().toISOString(),
                emotion: emotion!,
                thought,
                thoughtTags,
                behaviourUrge,
                behaviourAction,
                value,
            };
            saveCheckIn(checkIn);
            setIsComplete(true);
        } else {
            const nextIndex = currentStepIndex + 1;
            if (nextIndex < STEPS.length) {
                setCurrentStep(STEPS[nextIndex]);
            }
        }
    }, [currentStep, currentStepIndex, emotion, thought, thoughtTags, behaviourUrge, behaviourAction, value, existingCheckIn]);

    const handleBack = useCallback(() => {
        const prevIndex = currentStepIndex - 1;
        if (prevIndex >= 0) {
            setCurrentStep(STEPS[prevIndex]);
        }
    }, [currentStepIndex]);

    const toggleThoughtTag = (tagId: string) => {
        setThoughtTags((prev) =>
            prev.includes(tagId)
                ? prev.filter((id) => id !== tagId)
                : [...prev, tagId]
        );
    };

    const stepLabels: Record<Step, string> = {
        emotion: 'What emotion is strongest?',
        thought: "What's the story in your head?",
        behaviour: 'What did you do / want to do?',
        value: 'What mattered here?',
    };

    // Completion screen
    if (isComplete) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 pb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md"
                >
                    <div className="w-20 h-20 rounded-full bg-[var(--color-sage)]/20 flex items-center justify-center mx-auto mb-6">
                        <Sparkles size={32} className="text-[var(--color-sage)]" />
                    </div>
                    <h2 className="text-2xl font-heading text-[var(--color-text-primary)] mb-3">
                        Check-in complete
                    </h2>
                    <p className="text-[var(--color-text-secondary)] mb-8">
                        You've logged your awareness for today. These small moments of noticing add up.
                    </p>

                    <div className="glass-panel p-6 rounded-2xl text-left space-y-3 mb-6">
                        <div className="flex justify-between">
                            <span className="text-sm text-[var(--color-text-muted)]">Feeling</span>
                            <span className="text-sm font-medium capitalize">{emotion?.primary}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-[var(--color-text-muted)]">Value</span>
                            <span className="text-sm font-medium capitalize">{value}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setIsComplete(false);
                            setEmotion(null);
                            setThought('');
                            setThoughtTags([]);
                            setBehaviourUrge('');
                            setBehaviourAction('');
                            setValue('');
                            setCurrentStep('emotion');
                        }}
                        className="text-sm text-[var(--color-sage)] hover:underline"
                    >
                        Edit today's check-in
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 pb-24">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <header className="pt-8 pb-6 text-center">
                    <h1 className="text-2xl font-heading text-[var(--color-sage-dark)] mb-2">
                        Daily Check-In
                    </h1>
                    <p className="text-sm text-[var(--color-text-muted)]">
                        2 minutes to notice what's happening
                    </p>
                </header>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 mb-8">
                    {STEPS.map((step, index) => (
                        <div
                            key={step}
                            className={`
                                w-2 h-2 rounded-full transition-all duration-300
                                ${index < currentStepIndex
                                    ? 'bg-[var(--color-sage)]'
                                    : index === currentStepIndex
                                        ? 'bg-[var(--color-sage)] w-8'
                                        : 'bg-[var(--color-sage)]/20'
                                }
                            `}
                        />
                    ))}
                </div>

                {/* Step label */}
                <motion.h2
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg font-heading text-[var(--color-text-primary)] mb-6 text-center"
                >
                    {stepLabels[currentStep]}
                </motion.h2>

                {/* Step content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="min-h-[300px]"
                    >
                        {currentStep === 'emotion' && (
                            <EmotionWheel value={emotion} onChange={setEmotion} />
                        )}

                        {currentStep === 'thought' && (
                            <div className="space-y-6">
                                <textarea
                                    value={thought}
                                    onChange={(e) => setThought(e.target.value)}
                                    placeholder="One sentence about what's on your mind..."
                                    className="w-full p-4 rounded-2xl glass-panel border-2 border-transparent focus:border-[var(--color-sage)]/30 outline-none resize-none h-24 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
                                    maxLength={200}
                                />
                                <div className="text-right text-xs text-[var(--color-text-muted)]">
                                    {thought.length}/200
                                </div>

                                <div>
                                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                                        Tap any patterns you notice:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {thoughtPatterns.slice(0, 6).map((pattern) => (
                                            <button
                                                key={pattern.id}
                                                onClick={() => toggleThoughtTag(pattern.id)}
                                                className={`
                                                    px-3 py-1.5 rounded-full text-xs font-medium transition-all
                                                    ${thoughtTags.includes(pattern.id)
                                                        ? 'bg-[var(--color-sage)] text-white'
                                                        : 'glass-panel text-[var(--color-text-secondary)] hover:bg-white/50'
                                                    }
                                                `}
                                            >
                                                {pattern.shortName}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 'behaviour' && (
                            <BehaviourSelector
                                urgeValue={behaviourUrge}
                                actionValue={behaviourAction}
                                onUrgeChange={setBehaviourUrge}
                                onActionChange={setBehaviourAction}
                            />
                        )}

                        {currentStep === 'value' && (
                            <div className="space-y-4">
                                <p className="text-sm text-[var(--color-text-secondary)] text-center">
                                    What value was at play in this moment?
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {quickValues.map((v) => (
                                        <button
                                            key={v}
                                            onClick={() => setValue(v)}
                                            className={`
                                                p-4 rounded-2xl text-left transition-all duration-300
                                                border-2 glass-panel capitalize
                                                ${value === v
                                                    ? 'border-[var(--color-sage)] bg-[var(--color-sage)]/10'
                                                    : 'border-transparent hover:border-white/40'
                                                }
                                            `}
                                        >
                                            <div className="flex items-center gap-2">
                                                {value === v && (
                                                    <Check size={16} className="text-[var(--color-sage)]" />
                                                )}
                                                <span className="font-medium text-[var(--color-text-primary)]">
                                                    {v}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                    <button
                        onClick={handleBack}
                        disabled={currentStepIndex === 0}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-xl transition-all
                            ${currentStepIndex === 0
                                ? 'opacity-0 pointer-events-none'
                                : 'text-[var(--color-text-secondary)] hover:bg-white/30'
                            }
                        `}
                    >
                        <ChevronLeft size={18} />
                        <span>Back</span>
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className={`
                            flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                            ${canProceed()
                                ? 'bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-dark)]'
                                : 'bg-[var(--color-sage)]/20 text-[var(--color-text-muted)] cursor-not-allowed'
                            }
                        `}
                    >
                        <span>{currentStep === 'value' ? 'Complete' : 'Next'}</span>
                        {currentStep === 'value' ? (
                            <Check size={18} />
                        ) : (
                            <ChevronRight size={18} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
