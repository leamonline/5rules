import type { ReactNode } from 'react';

interface QuestionBlockProps {
    number: string;
    label: string;
    hint?: string;
    children: ReactNode;
}

export function QuestionBlock({ number, label, hint, children }: QuestionBlockProps) {
    const id = `question-${number}`;

    return (
        <div className="p-6 organic-shape-4 glass-panel border border-[var(--color-clay)]/30 animate-fade-in space-y-3" role="group" aria-labelledby={id}>
            <label id={id} className="block font-heading text-lg text-[var(--color-text-primary)]">
                {number}. {label}
            </label>
            {hint && (
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed" id={`${id}-hint`}>
                    {hint}
                </p>
            )}
            <div aria-describedby={hint ? `${id}-hint` : undefined} className="pt-2">
                {children}
            </div>
        </div>
    );
}
