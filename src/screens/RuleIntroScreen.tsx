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
                    <div className={`w-24 h-24 organic-shape-4 bg-gradient-to-br ${rule.color} flex items-center justify-center mx-auto mb-8 text-white shadow-xl shadow-[var(--color-sage)]/10`}>
                        {Icon && <Icon size={48} />}
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
                                    className="flex items-start gap-4 p-5 organic-shape-1 glass-panel border-[var(--color-bg-stone)]/50 text-[var(--color-text-primary)] animate-fade-in"
                                >
                                    <span className={`w-8 h-8 organic-pill bg-gradient-to-br ${rule.color} flex items-center justify-center flex-shrink-0 text-sm text-white font-medium shadow-sm`}>
                                        {i + 1}
                                    </span>
                                    <span className="leading-relaxed text-base opacity-90">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Explanation tip */}
                    {rule.explanation && (
                        <div className="flex items-start gap-4 p-5 organic-shape-3 bg-[var(--color-sage)]/10 border border-[var(--color-sage)]/20 mb-10 animate-fade-in">
                            <Lightbulb size={24} className="text-[var(--color-sage)] flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-[var(--color-sage-dark)] leading-relaxed font-medium">
                                {rule.explanation}
                            </p>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 animate-fade-in">
                    <button
                        onClick={onBack}
                        className="flex-1 py-4 organic-pill bg-white/50 border border-[var(--color-clay)]/30 text-[var(--color-text-primary)] hover:bg-white transition-all font-medium shadow-sm"
                    >
                        Back
                    </button>
                    <button
                        onClick={onBegin}
                        className={`flex-1 py-4 organic-pill bg-gradient-to-r ${rule.color} text-white hover:opacity-95 hover:shadow-xl transition-all font-medium flex items-center justify-center gap-2 shadow-lg`}
                    >
                        Begin
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
