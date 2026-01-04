import { ChevronRight, Moon, Eye, Shuffle, Compass, Circle, type LucideIcon, Lightbulb } from 'lucide-react';
import type { Rule } from '../types';

const iconMap: Record<string, LucideIcon> = {
    Moon, Eye, Shuffle, Compass, Circle
};

interface RuleIntroScreenProps {
    rule: Rule;
    onBegin: () => void;
    onBack: () => void;
}

export function RuleIntroScreen({ rule, onBegin, onBack }: RuleIntroScreenProps) {
    const Icon = iconMap[rule.icon];

    return (
        <div className="min-h-screen p-6 md:p-8 flex flex-col">
            <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
                <div className="animate-fade-in">
                    {/* Icon */}
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${rule.color} flex items-center justify-center mx-auto mb-8 text-white shadow-lg`}>
                        {Icon && <Icon size={40} />}
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <p className="text-[var(--color-text-muted)] text-sm mb-2">
                            Exercise {rule.id}
                        </p>
                        <h1 className="text-2xl md:text-3xl font-heading text-[var(--color-text-primary)] mb-4">
                            {rule.title}
                        </h1>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed">
                            {rule.description}
                        </p>
                    </div>

                    {/* Introduction Points */}
                    <div className="space-y-4 mb-8">
                        <h2 className="text-sm font-medium text-[var(--color-text-muted)]">
                            What you'll explore:
                        </h2>
                        <ul className="space-y-3">
                            {rule.introduction.map((point, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 border border-[var(--color-clay-light)] text-[var(--color-text-secondary)] animate-fade-in"
                                >
                                    <span className={`w-7 h-7 rounded-full bg-gradient-to-br ${rule.color} flex items-center justify-center flex-shrink-0 text-xs text-white font-medium`}>
                                        {i + 1}
                                    </span>
                                    <span className="leading-relaxed text-sm">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Explanation tip */}
                    {rule.explanation && (
                        <div className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--color-sage)]/10 border border-[var(--color-sage)]/20 mb-8 animate-fade-in">
                            <Lightbulb size={20} className="text-[var(--color-sage-dark)] flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-[var(--color-sage-dark)] leading-relaxed">
                                {rule.explanation}
                            </p>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 animate-fade-in">
                    <button
                        onClick={onBack}
                        className="flex-1 py-4 rounded-2xl bg-white/70 border border-[var(--color-clay-light)] text-[var(--color-text-primary)] hover:bg-white transition-all font-medium"
                    >
                        Back
                    </button>
                    <button
                        onClick={onBegin}
                        className={`flex-1 py-4 rounded-2xl bg-gradient-to-r ${rule.color} text-white hover:opacity-95 hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2`}
                    >
                        Begin
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
