import { useState, useEffect, useCallback } from 'react';

interface BreathingExerciseProps {
    onComplete: () => void;
    onSkip: () => void;
}

export function BreathingExercise({ onComplete, onSkip }: BreathingExerciseProps) {
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
    const [cycle, setCycle] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(4);
    const totalCycles = 2;

    const getPhaseText = () => {
        switch (phase) {
            case 'inhale': return 'Breathe in...';
            case 'hold': return 'Hold...';
            case 'exhale': return 'Breathe out...';
        }
    };

    const getNextPhaseInfo = useCallback(() => {
        if (phase === 'inhale') {
            return { phase: 'hold' as const, duration: 4, cycle };
        }

        if (phase === 'hold') {
            return { phase: 'exhale' as const, duration: 6, cycle };
        }

        const newCycle = cycle + 1;

        if (newCycle >= totalCycles) {
            return { complete: true as const };
        }

        return { phase: 'inhale' as const, duration: 4, cycle: newCycle };
    }, [phase, cycle]);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev > 1) {
                    return prev - 1;
                }

                const nextPhaseInfo = getNextPhaseInfo();

                if ('complete' in nextPhaseInfo) {
                    clearInterval(timer);
                    onComplete();
                    return 0;
                }

                if (nextPhaseInfo.cycle !== cycle) {
                    setCycle(nextPhaseInfo.cycle);
                }

                setPhase(nextPhaseInfo.phase);
                return nextPhaseInfo.duration;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [getNextPhaseInfo, onComplete, cycle]);

    const circleScale = phase === 'inhale' ? 'scale-110' : phase === 'exhale' ? 'scale-90' : 'scale-100';

    return (
        <div className="min-h-screen p-6 flex flex-col items-center justify-center">
            <div className="max-w-md mx-auto text-center">
                {/* Header */}
                <div className="mb-12 animate-fade-in">
                    <h1 className="text-xl font-heading text-[var(--color-text-primary)] mb-2">
                        Before we begin...
                    </h1>
                    <p className="text-sm text-[var(--color-text-muted)]">
                        Take a moment to settle your mind
                    </p>
                </div>

                {/* Breathing Circle */}
                <div className="relative mb-12">
                    {/* Outer glow */}
                    <div
                        className={`absolute inset-0 w-48 h-48 mx-auto rounded-full bg-[var(--color-sage)]/20 blur-xl transition-all duration-[4000ms] ease-in-out ${circleScale}`}
                    />

                    {/* Main circle */}
                    <div
                        className={`relative w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-[var(--color-sage)] to-[var(--color-sage-dark)] flex items-center justify-center transition-all duration-[4000ms] ease-in-out shadow-lg ${circleScale}`}
                    >
                        <div className="text-center text-white">
                            <p className="text-lg font-medium mb-1">{getPhaseText()}</p>
                            <p className="text-3xl font-light">{secondsLeft}</p>
                        </div>
                    </div>
                </div>

                {/* Progress */}
                <div className="flex justify-center gap-2 mb-8">
                    {Array.from({ length: totalCycles }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all ${i < cycle ? 'bg-[var(--color-sage)]' : i === cycle ? 'bg-[var(--color-sage)]/50' : 'bg-[var(--color-clay)]'}`}
                        />
                    ))}
                </div>

                {/* Skip button */}
                <button
                    onClick={onSkip}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors py-2 px-6"
                >
                    Skip & continue
                </button>
            </div>
        </div>
    );
}
