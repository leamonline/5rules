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
        <div className="p-5 rounded-2xl bg-white/60 border border-[var(--color-clay-light)] animate-fade-in" role="group" aria-labelledby={id}>
            <label id={id} className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
                {number}. {label}
            </label>
            {hint && (
                <p className="text-xs text-[var(--color-text-muted)] mb-4" id={`${id}-hint`}>
                    {hint}
                </p>
            )}
            <div aria-describedby={hint ? `${id}-hint` : undefined}>
                {children}
            </div>
        </div>
    );
}
