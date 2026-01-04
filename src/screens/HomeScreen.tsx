import { ChevronRight, Check, Download, RotateCcw, Clock, Moon, Eye, Shuffle, Compass, Circle, type LucideIcon } from 'lucide-react';
import { ProgressIndicator } from '../components/ProgressIndicator';
import type { Journey } from '../types';
import { rules } from '../data/rules';

const iconMap: Record<string, LucideIcon> = {
    Moon, Eye, Shuffle, Compass, Circle
};

interface HomeScreenProps {
    journey: Journey;
    onSelectRule: (ruleId: number) => void;
    onViewSummary: () => void;
    onReset: () => void;
}

function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function HomeScreen({ journey, onSelectRule, onViewSummary, onReset }: HomeScreenProps) {
    const startDate = new Date(journey.startedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="min-h-screen p-6 md:p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <header className="text-center mb-10 animate-fade-in">
                    <h1 className="text-3xl md:text-4xl font-heading text-[var(--color-text-primary)] mb-3">
                        The 5 Rules
                    </h1>
                    <p className="text-[var(--color-text-secondary)] text-sm md:text-base">
                        A gentle guide to understanding yourself
                    </p>
                    <p className="text-[var(--color-text-muted)] text-xs mt-3 flex items-center justify-center gap-1">
                        <Clock size={12} />
                        Started {startDate}
                    </p>
                </header>

                {/* Progress */}
                <div className="mb-10 animate-fade-in">
                    <ProgressIndicator
                        current={0}
                        total={5}
                        completedRules={journey.completedRules}
                    />
                </div>

                {/* Rules List */}
                <div className="space-y-4">
                    {rules.map((rule) => {
                        const Icon = iconMap[rule.icon];
                        const isComplete = journey.completedRules.includes(rule.id);
                        const hasStarted = Object.values(journey.responses[`rule${rule.id}` as keyof typeof journey.responses])
                            .flat()
                            .some(v => v);

                        return (
                            <button
                                key={rule.id}
                                onClick={() => onSelectRule(rule.id)}
                                className={`w-full p-5 rounded-2xl bg-gradient-to-r ${rule.color} text-white flex items-center gap-4 hover:opacity-95 hover:shadow-lg hover:-translate-y-0.5 transition-all group animate-fade-in focus:ring-2 focus:ring-[var(--color-sage)]`}
                                aria-label={`Rule ${rule.id}: ${rule.title}${isComplete ? ' (completed)' : ''}`}
                            >
                                <div className="p-3 rounded-xl bg-white/15" aria-hidden="true">
                                    {Icon && <Icon size={24} />}
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="text-xs text-white/70 mb-1 font-medium">
                                        Exercise {rule.id}
                                    </div>
                                    <div className="font-medium text-lg">{rule.title}</div>
                                    {hasStarted && !isComplete && (
                                        <div className="text-xs text-white/60 mt-1">In progress</div>
                                    )}
                                </div>
                                {isComplete && (
                                    <div className="p-1.5 rounded-full bg-white/20" aria-hidden="true">
                                        <Check size={16} className="text-white" />
                                    </div>
                                )}
                                <ChevronRight size={20} className="text-white/50 group-hover:text-white/80 transition-colors" aria-hidden="true" />
                            </button>
                        );
                    })}
                </div>

                {/* Last Updated */}
                {journey.lastUpdatedAt && (
                    <p className="text-center text-xs text-[var(--color-text-muted)] mt-8">
                        Last saved: {formatRelativeTime(journey.lastUpdatedAt)}
                    </p>
                )}

                {/* Action Buttons */}
                <div className="mt-10 flex gap-3 animate-fade-in">
                    <button
                        onClick={onViewSummary}
                        className="flex-1 p-4 rounded-xl bg-white/70 hover:bg-white/90 border border-[var(--color-clay-light)] text-[var(--color-text-primary)] transition-all text-sm font-medium flex items-center justify-center gap-2 min-h-[48px] shadow-sm hover:shadow-md"
                        aria-label="View summary of reflections"
                    >
                        <Download size={18} aria-hidden="true" />
                        View Summary
                    </button>
                    <button
                        onClick={onReset}
                        className="p-4 rounded-xl bg-white/50 hover:bg-white/70 border border-[var(--color-clay-light)] text-[var(--color-text-secondary)] transition-all min-h-[48px] min-w-[48px] flex items-center justify-center shadow-sm"
                        title="Reset all progress"
                        aria-label="Reset all progress"
                    >
                        <RotateCcw size={18} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
}
