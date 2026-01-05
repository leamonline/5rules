import { ChevronLeft, TrendingUp, History, Calendar, ArrowRight } from 'lucide-react';
import { useMemo } from 'react';
import type { Journey } from '../types';
import { identifyThemes } from '../services/storage';

interface GrowthDashboardProps {
    history: Journey[];
    onBack: () => void;
    onViewJourney: (journey: Journey) => void;
}

export function GrowthDashboard({ history, onBack, onViewJourney }: GrowthDashboardProps) {
    // Calculate stats
    const stats = useMemo(() => {
        const total = history.length;
        const allThemes = history.flatMap(identifyThemes);
        const themeCounts = allThemes.reduce((acc, theme) => {
            acc[theme] = (acc[theme] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const topThemes = Object.entries(themeCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        return { total, topThemes };
    }, [history]);

    if (history.length === 0) {
        return (
            <div className="min-h-screen p-6 md:p-8">
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-6 py-3 organic-pill bg-white/50 border border-[var(--color-clay)]/30 text-[var(--color-text-primary)] hover:bg-white transition-all min-h-[48px] focus:ring-2 focus:ring-[var(--color-sage)] shadow-sm"
                    >
                        <ChevronLeft size={20} />
                        Back to Home
                    </button>

                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-24 h-24 organic-shape-1 bg-[var(--color-sage)]/10 flex items-center justify-center mb-8 animate-float">
                            <TrendingUp size={40} className="text-[var(--color-sage)]" />
                        </div>
                        <h2 className="text-2xl font-heading text-[var(--color-sage-dark)] mb-3">No History Yet</h2>
                        <p className="text-[var(--color-text-secondary)] max-w-sm leading-relaxed mx-auto">
                            Your growth dashboard will appear here once you've completed at least one journey and started a new one.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 md:p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors pl-1"
                    >
                        <ChevronLeft size={20} />
                        Back to Home
                    </button>
                </div>

                <div className="mb-12 animate-fade-in">
                    <h1 className="text-3xl md:text-4xl font-heading text-[var(--color-sage-dark)] mb-2">My Evolution</h1>
                    <p className="text-[var(--color-text-secondary)] text-base">Tracking your growth over time</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-5 mb-12 animate-fade-in">
                    <div className="p-6 organic-shape-2 glass-panel border-[var(--color-clay)]/30">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2.5 organic-pill bg-[var(--color-sage)]/10 text-[var(--color-sage)]">
                                <History size={20} />
                            </div>
                            <span className="text-sm font-medium text-[var(--color-text-secondary)]">Total Journeys</span>
                        </div>
                        <p className="text-4xl font-heading text-[var(--color-text-primary)]">{stats.total}</p>
                    </div>

                    <div className="p-6 organic-shape-4 glass-panel border-[var(--color-clay)]/30 relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2.5 organic-pill bg-[var(--color-clay)]/20 text-[var(--color-clay)]">
                                <TrendingUp size={20} />
                            </div>
                            <span className="text-sm font-medium text-[var(--color-text-secondary)]">Top Theme</span>
                        </div>
                        <p className="text-lg font-medium text-[var(--color-sage-dark)] mt-1 line-clamp-2 leading-tight">
                            {stats.topThemes[0]?.[0] || 'None yet'}
                        </p>
                        {/* This div was added but `circleScale` is not defined. Removing it to avoid TS error. */}
                        {/* <div
                            className={`absolute inset-0 w-48 h-48 mx-auto organic-shape-1 bg-[var(--color-sage)]/20 blur-xl transition-all duration-[4000ms] ease-in-out ${circleScale}`}
                        /> */}
                    </div>
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                    <h2 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest ml-1 mb-6">Past Reflections</h2>

                    {history.map((journey, index) => {
                        const date = new Date(journey.completedAt || journey.lastUpdatedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        });

                        const themes = identifyThemes(journey);

                        return (
                            <button
                                key={journey.id}
                                onClick={() => onViewJourney(journey)}
                                className={`w-full text-left p-6 organic-shape-${(index % 4) + 1} glass-panel hover:bg-white/80 transition-all group animate-fade-in border-[var(--color-clay)]/20 shadow-sm hover:shadow-md`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                                        <Calendar size={16} />
                                        <span className="text-sm font-medium">{date}</span>
                                    </div>
                                    <div className="w-8 h-8 organic-pill bg-white/50 flex items-center justify-center group-hover:bg-[var(--color-sage)]/10 transition-colors">
                                        <ArrowRight size={18} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-sage)] transition-colors" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {journey.responses.rule2.conclusion && (
                                        <p className="text-base text-[var(--color-text-primary)] line-clamp-2 leading-relaxed italic">
                                            "{journey.responses.rule2.conclusion}"
                                        </p>
                                    )}

                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {themes.map(theme => (
                                            <span key={theme} className="px-3 py-1 organic-pill bg-[var(--color-sage)]/5 text-[11px] font-medium text-[var(--color-sage-dark)] border border-[var(--color-sage)]/10 uppercase tracking-wide">
                                                {theme}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
