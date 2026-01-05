import { ChevronLeft } from 'lucide-react';
import { Moon, Eye, Shuffle, Compass, Circle, type LucideIcon } from 'lucide-react';
import type { Rule } from '../types';

const iconMap: Record<string, LucideIcon> = {
    Moon,
    Eye,
    Shuffle,
    Compass,
    Circle
};

interface RuleHeaderProps {
    rule: Rule;
    onBack: () => void;
}

export function RuleHeader({ rule, onBack }: RuleHeaderProps) {
    const Icon = iconMap[rule.icon];

    return (
        <header className="mb-8 animate-fade-in">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-4 transition-colors min-h-[44px]"
                aria-label="Back to all exercises"
            >
                <ChevronLeft size={18} aria-hidden="true" />
                All Exercises
            </button>
            <div className="flex items-center gap-5 mb-6">
                <div
                    className={`p-4 organic-shape-2 bg-gradient-to-br ${rule.color} text-white shadow-lg`}
                    aria-hidden="true"
                >
                    {Icon && <Icon size={32} />}
                </div>
                <div>
                    <div className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Exercise {rule.id}</div>
                    <h1 className="text-2xl md:text-3xl font-heading text-[var(--color-text-primary)]">{rule.title}</h1>
                </div>
            </div>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {rule.description}
            </p>
        </header>
    );
}
