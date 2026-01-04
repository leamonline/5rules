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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
            <div className="max-w-md mx-auto flex flex-col min-h-[calc(100vh-3rem)] justify-center">
                {/* Celebration */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="text-6xl mb-4">🎉</div>
                    <h1 className="text-2xl font-light mb-2">Journey Complete!</h1>
                    <p className="text-white/60 text-sm mb-4">
                        You've completed all 5 rules
                    </p>
                    <div className="flex items-center justify-center gap-4 text-xs text-white/40">
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {completedDate}
                        </span>
                        <span>•</span>
                        <span>{durationText}</span>
                    </div>
                </div>

                {/* Synthesis Section */}
                <div className="space-y-4 mb-8">
                    {/* Themes Identified */}
                    <div className="p-4 rounded-xl bg-white/5 animate-fade-in" style={{ animationDelay: '100ms' }}>
                        <h2 className="text-sm font-medium text-white/70 mb-3 flex items-center gap-2">
                            <Sparkles size={16} className="text-amber-400" />
                            Themes in Your Journey
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {themes.map((theme, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded-full text-sm bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-400/30"
                                >
                                    {theme}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Integration Statement */}
                    {journey.responses.rule3.integration && (
                        <div className="p-4 rounded-xl bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-400/20 animate-fade-in" style={{ animationDelay: '200ms' }}>
                            <h2 className="text-sm font-medium text-white/70 mb-2">Your Integration Statement</h2>
                            <p className="text-violet-200 italic">"{journey.responses.rule3.integration}"</p>
                        </div>
                    )}

                    {/* What's Next */}
                    <div className="p-4 rounded-xl bg-white/5 animate-fade-in" style={{ animationDelay: '300ms' }}>
                        <h2 className="text-sm font-medium text-white/70 mb-3">What's Next?</h2>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-400">•</span>
                                <span>Revisit these reflections in a week to see how your perspective has shifted</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-400">•</span>
                                <span>Practice noticing when shadow triggers arise in daily life</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-400">•</span>
                                <span>Start a new journey when you're ready to explore different aspects</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 animate-fade-in" style={{ animationDelay: '400ms' }}>
                    <button
                        onClick={onViewSummary}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all font-medium flex items-center justify-center gap-2"
                    >
                        <BookOpen size={18} />
                        View Full Summary
                    </button>
                    <button
                        onClick={onStartNew}
                        className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={18} />
                        Start New Journey
                    </button>
                    <button
                        onClick={onGoHome}
                        className="w-full py-2 text-sm text-white/50 hover:text-white/70 transition-colors"
                    >
                        Return to Overview
                    </button>
                </div>
            </div>
        </div>
    );
}
