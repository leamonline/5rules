import { ChevronRight, Check, Download, RotateCcw, Clock, Moon, Eye, Shuffle, Compass, Circle, TrendingUp, type LucideIcon } from 'lucide-react';
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
    onViewGrowth?: () => void;
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

export function HomeScreen({ journey, onSelectRule, onViewSummary, onViewGrowth, onReset }: HomeScreenProps) {
    const startDate = new Date(journey.startedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="min-h-screen p-6 md:p-8">
            <div className="max-w-2xl mx-auto py-8">
                {/* Header */}
                <header className="text-center mb-12 animate-fade-in relative z-10">
                    <h1 className="text-4xl md:text-5xl font-heading text-[var(--color-sage-dark)] mb-3 tracking-wide">
                        The 5 Rules
                    </h1>
                    <p className="text-[var(--color-text-secondary)] text-base md:text-lg font-light tracking-wide italic">
                        A gentle guide to understanding yourself
                    </p>
                    <p className="text-[var(--color-text-muted)] text-xs mt-4 flex items-center justify-center gap-2 uppercase tracking-widest opacity-60">
                        <Clock size={10} />
                        Started {startDate}
                    </p>
                </header>

                {/* Progress */}
                <div className="mb-12 animate-fade-in">
                    <ProgressIndicator
                        current={0}
                        total={5}
                        completedRules={journey.completedRules}
                    />
                </div>

                {/* Rules List */}
                <div className="space-y-4 relative z-10">
                    {rules.map((rule) => {
                        const Icon = iconMap[rule.icon];
                        const isComplete = journey.completedRules.includes(rule.id);
                        const hasStarted = Object.values(journey.responses[`rule${rule.id}` as keyof typeof journey.responses])
                            .flat()
                            .some(v => v);

                        // Dynamic glass style based on status
                        const cardStyle = isComplete
                            ? "bg-[var(--color-sage)]/10 border-[var(--color-sage)]/20"
                            : "glass-panel bg-white/40 hover:bg-white/60";

                        return (
                            <button
                                key={rule.id}
                                onClick={() => onSelectRule(rule.id)}
                                className={`w-full p-6 pr-8 organic-shape-${(rule.id % 4) + 1} ${cardStyle} text-left flex items-center gap-6 group animate-fade-in transition-all duration-300 border border-transparent hover:border-[var(--color-sage)]/20 relative overflow-hidden`}
                                aria-label={`Rule ${rule.id}: ${rule.title}${isComplete ? ' (completed)' : ''}`}
                            >
                                {/* Decorative Number background */}
                                <span className="absolute -right-4 -bottom-6 text-[80px] font-heading leading-none text-[var(--color-sage)]/5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                                    {rule.id}
                                </span>

                                <div className={`w-12 h-12 organic-pill flex items-center justify-center shrink-0 transition-colors ${isComplete ? 'bg-[var(--color-sage)] text-white' : 'bg-white/60 text-[var(--color-sage)]'
                                    }`}>
                                    {isComplete ? <Check size={20} /> : (Icon && <Icon size={20} strokeWidth={1.5} />)}
                                </div>

                                <div className="flex-1 min-w-0 z-10">
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-1 font-semibold">
                                        Exercise {rule.id}
                                    </div>
                                    <h3 className="font-heading text-xl text-[var(--color-text-primary)]">
                                        {rule.title}
                                    </h3>
                                    {hasStarted && !isComplete && (
                                        <div className="text-xs text-[var(--color-clay)] mt-1 font-medium flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 organic-shape-1 bg-[var(--color-clay)] animate-pulse" />
                                            In progress
                                        </div>
                                    )}
                                </div>

                                <ChevronRight size={20} className="text-[var(--color-sage)]/40 group-hover:text-[var(--color-sage)] group-hover:translate-x-1 transition-all" aria-hidden="true" />
                            </button>
                        );
                    })}
                </div>

                {/* Last Updated */}
                {journey.lastUpdatedAt && (
                    <p className="text-center text-xs text-[var(--color-text-muted)] mt-10 mb-6 opacity-60">
                        Last saved: {formatRelativeTime(journey.lastUpdatedAt)}
                    </p>
                )}

                {/* Action Buttons - Pill Shaped */}
                <div className="mt-4 grid grid-cols-4 gap-4 animate-fade-in relative z-10">
                    <button
                        onClick={onViewSummary}
                        className="col-span-2 p-4 organic-pill bg-white/50 hover:bg-white/80 border border-white/40 text-[var(--color-text-primary)] transition-all text-sm font-medium flex items-center justify-center gap-2 min-h-[56px] shadow-sm backdrop-blur-sm group"
                        aria-label="View summary of reflections"
                    >
                        <Download size={18} className="text-[var(--color-sage)] group-hover:scale-110 transition-transform" aria-hidden="true" />
                        <span className="tracking-wide">Reflections</span>
                    </button>
                    <button
                        onClick={onViewGrowth}
                        className="col-span-1 p-4 organic-pill bg-white/50 hover:bg-white/80 border border-white/40 text-[var(--color-text-primary)] transition-all flex items-center justify-center min-h-[56px] shadow-sm backdrop-blur-sm group"
                        aria-label="View growth dashboard"
                    >
                        <TrendingUp size={18} className="text-[var(--color-clay)] group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={onReset}
                        className="col-span-1 p-4 organic-pill bg-transparent hover:bg-white/30 border border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-all min-h-[56px] flex items-center justify-center"
                        title="Reset all progress"
                        aria-label="Reset all progress"
                    >
                        <RotateCcw size={16} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
}
