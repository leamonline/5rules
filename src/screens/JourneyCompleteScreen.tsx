import { Sparkles, RefreshCw, Clock, BookOpen } from 'lucide-react';
import type { Journey } from '../types';
import { identifyThemes } from '../services/storage';

interface JourneyCompleteScreenProps {
    journey: Journey;
    onViewSummary: () => void;
    onStartNew: () => void;
    onGoHome: () => void;
}

export function JourneyCompleteScreen({ journey, onViewSummary, onStartNew, onGoHome }: JourneyCompleteScreenProps) {
    const themes = identifyThemes(journey);
    const completedDate = journey.completedAt
        ? new Date(journey.completedAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        : new Date().toLocaleDateString();

    // Calculate journey duration
    const startDate = new Date(journey.startedAt);
    const endDate = journey.completedAt ? new Date(journey.completedAt) : new Date();
    const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000);
    const durationText = durationDays === 0
        ? 'Same day'
        : durationDays === 1
            ? '1 day'
            : `${durationDays} days`;

    return (
        <div className="min-h-screen p-6 md:p-8">
            <div className="max-w-md mx-auto flex flex-col min-h-[calc(100vh-6rem)] justify-center">
                {/* Celebration */}
                <div className="text-center mb-10 animate-fade-in">
                    <div className="text-6xl mb-6 animate-float">🎉</div>
                    <h1 className="text-3xl font-heading text-[var(--color-sage-dark)] mb-3">Journey Complete!</h1>
                    <p className="text-[var(--color-text-secondary)] text-base mb-6">
                        You've completed all 5 rules
                    </p>
                    <div className="flex items-center justify-center gap-4 text-xs text-[var(--color-text-muted)] uppercase tracking-widest">
                        <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {completedDate}
                        </span>
                        <span>•</span>
                        <span>{durationText}</span>
                    </div>
                </div>

                {/* Synthesis Section */}
                <div className="space-y-6 mb-10">
                    {/* Themes Identified */}
                    <div className="p-6 organic-shape-4 glass-panel animate-fade-in" style={{ animationDelay: '100ms' }}>
                        <h2 className="text-sm font-medium text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                            <Sparkles size={18} className="text-[var(--color-clay)]" />
                            Themes in Your Journey
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {themes.map((theme, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-1.5 organic-pill text-sm bg-[var(--color-sage)]/10 text-[var(--color-sage-dark)] border border-[var(--color-sage)]/20"
                                >
                                    {theme}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Integration Statement */}
                    {journey.responses.rule3.integration && (
                        <div className="p-6 organic-shape-1 bg-gradient-to-br from-indigo-50/50 to-violet-50/50 border border-indigo-100 animate-fade-in shadow-sm" style={{ animationDelay: '200ms' }}>
                            <h2 className="text-sm font-medium text-[var(--color-text-muted)] mb-3 uppercase tracking-wider">Your Integration Statement</h2>
                            <p className="text-[var(--color-sage-dark)] font-heading text-lg italic leading-relaxed">"{journey.responses.rule3.integration}"</p>
                        </div>
                    )}

                    {/* What's Next */}
                    <div className="p-6 organic-shape-3 glass-panel animate-fade-in" style={{ animationDelay: '300ms' }}>
                        <h2 className="text-sm font-medium text-[var(--color-text-primary)] mb-4">What's Next?</h2>
                        <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
                            <li className="flex items-start gap-3">
                                <span className="text-[var(--color-sage)] mt-1">•</span>
                                <span className="leading-relaxed">Revisit these reflections in a week to see how your perspective has shifted</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[var(--color-sage)] mt-1">•</span>
                                <span className="leading-relaxed">Practice noticing when shadow triggers arise in daily life</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[var(--color-sage)] mt-1">•</span>
                                <span className="leading-relaxed">Start a new journey when you're ready to explore different aspects</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
                    <button
                        onClick={onViewSummary}
                        className="w-full py-4 organic-pill bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-dark)] transition-all font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                        <BookOpen size={20} />
                        View Full Summary
                    </button>
                    <button
                        onClick={onStartNew}
                        className="w-full py-4 organic-pill bg-white/50 border border-[var(--color-clay)]/30 hover:bg-white text-[var(--color-text-primary)] transition-all font-medium flex items-center justify-center gap-2 shadow-sm"
                    >
                        <RefreshCw size={20} />
                        Start New Journey
                    </button>
                    <button
                        onClick={onGoHome}
                        className="w-full py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                        Return to Overview
                    </button>
                </div>
            </div>
        </div>
    );
}
