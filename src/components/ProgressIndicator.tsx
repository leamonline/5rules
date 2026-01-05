interface ProgressIndicatorProps {
    current: number;
    total: number;
    completedRules?: number[];
}

export function ProgressIndicator({ current, total, completedRules = [] }: ProgressIndicatorProps) {
    const progress = (completedRules.length / total) * 100;

    return (
        <div
            className="space-y-4 p-6 organic-shape-3 glass-panel"
            role="progressbar"
            aria-valuenow={completedRules.length}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label={`Progress: ${completedRules.length} of ${total} exercises completed`}
        >
            <div className="flex justify-between items-center text-sm font-medium text-[var(--color-text-secondary)]">
                <span>Your Journey</span>
                <span>{Math.round(progress)}%</span>
            </div>

            <div className="h-3 bg-[var(--color-bg-stone)]/50 organic-pill overflow-hidden shadow-inner">
                <div
                    className="h-full bg-gradient-to-r from-[var(--color-sage)] to-[var(--color-sage-light)] transition-all duration-1000 ease-out organic-pill"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex justify-between pt-2 px-1">
                {Array.from({ length: total }, (_, i) => (
                    <div
                        key={i}
                        className={`w-4 h-4 transition-all duration-500 ${completedRules.includes(i + 1)
                            ? 'bg-[var(--color-sage)] shadow-sm scale-100 organic-shape-1'
                            : i + 1 === current
                                ? 'bg-[var(--color-clay)] animate-pulse-soft scale-110 shadow-md ring-2 ring-[var(--color-clay)]/30 organic-shape-2'
                                : 'bg-[var(--color-bg-stone)] scale-90 organic-shape-4'
                            }`}
                        aria-label={`Exercise ${i + 1} ${completedRules.includes(i + 1) ? 'completed' : 'incomplete'}`}
                    />
                ))}
            </div>
        </div>
    );
}

interface OnboardingDotsProps {
    current: number;
    total: number;
}

export function OnboardingDots({ current, total }: OnboardingDotsProps) {
    return (
        <div className="flex justify-center gap-2" role="group" aria-label="Onboarding progress">
            {Array.from({ length: total }, (_, i) => (
                <div
                    key={i}
                    className={`h-2 transition-all duration-500 ${i === current
                        ? 'bg-[var(--color-sage)] w-8 shadow-sm organic-pill'
                        : 'bg-[var(--color-sage)]/20 w-3 hover:bg-[var(--color-sage)]/40 organic-shape-4'
                        }`}
                    aria-label={`Step ${i + 1} of ${total}${i === current ? ' (current)' : ''}`}
                />
            ))}
        </div>
    );
}
