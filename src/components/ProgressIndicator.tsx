interface ProgressIndicatorProps {
    current: number;
    total: number;
    completedRules?: number[];
}

export function ProgressIndicator({ current, total, completedRules = [] }: ProgressIndicatorProps) {
    const progress = (completedRules.length / total) * 100;

    return (
        <div
            className="space-y-3 p-5 rounded-2xl bg-white/50 border border-[var(--color-clay-light)]"
            role="progressbar"
            aria-valuenow={completedRules.length}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label={`Progress: ${completedRules.length} of ${total} exercises completed`}
        >
            <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
                <span>{completedRules.length} of {total} completed</span>
                <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2.5 bg-[var(--color-clay-light)] rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-[var(--color-sage)] to-[var(--color-sage-dark)] transition-all duration-700 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="flex justify-between pt-1">
                {Array.from({ length: total }, (_, i) => (
                    <div
                        key={i}
                        className={`w-3.5 h-3.5 rounded-full transition-all ${completedRules.includes(i + 1)
                            ? 'bg-[var(--color-sage)] shadow-sm'
                            : i + 1 === current
                                ? 'bg-[var(--color-terracotta-light)] animate-pulse-soft'
                                : 'bg-[var(--color-clay)]'
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
                    className={`h-2 rounded-full transition-all duration-500 ${i === current
                        ? 'bg-[var(--color-sage)] w-6'
                        : 'bg-[var(--color-clay)] w-2'
                        }`}
                    aria-label={`Step ${i + 1} of ${total}${i === current ? ' (current)' : ''}`}
                />
            ))}
        </div>
    );
}
