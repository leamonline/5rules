import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Target, AlertTriangle, ChevronRight, BarChart3 } from 'lucide-react';
import {
    getCheckInsForLastDays,
    getEmotionFrequency,
    getThoughtTagFrequency,
    getBehaviourFrequency,
    getValueAlignmentScore,
    getUserValues,
    detectPatterns,
} from '../services/storage';
import { emotionWheel, getEmotionColor } from '../data/emotions';
import { thoughtPatterns } from '../data/thoughtPatterns';
import { behaviours } from '../data/behaviours';

type TimeRange = 7 | 14 | 30;

export function InsightsScreen() {
    const [timeRange, setTimeRange] = useState<TimeRange>(7);

    const checkIns = useMemo(() => getCheckInsForLastDays(timeRange), [timeRange]);
    const userValues = getUserValues();

    const emotionFrequency = useMemo(() => getEmotionFrequency(checkIns), [checkIns]);
    const thoughtTagFrequency = useMemo(() => getThoughtTagFrequency(checkIns), [checkIns]);
    const behaviourFrequency = useMemo(() => getBehaviourFrequency(checkIns), [checkIns]);
    const alignmentScore = useMemo(() => getValueAlignmentScore(checkIns, userValues), [checkIns, userValues]);
    const patterns = useMemo(() => detectPatterns(checkIns), [checkIns]);

    const getEmotionLabel = (emotion: string): string => {
        for (const cat of emotionWheel) {
            if (cat.name === emotion) return emotion;
            if (cat.detailedEmotions.includes(emotion)) return emotion;
        }
        return emotion;
    };

    const getThoughtPatternLabel = (tagId: string): string => {
        return thoughtPatterns.find((p) => p.id === tagId)?.shortName ?? tagId;
    };

    const getBehaviourLabel = (behaviourId: string): string => {
        return behaviours.find((b) => b.id === behaviourId)?.name ?? behaviourId;
    };

    if (checkIns.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 pb-24">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--color-sage)]/10 flex items-center justify-center mx-auto mb-6">
                        <BarChart3 size={28} className="text-[var(--color-sage)]" />
                    </div>
                    <h2 className="text-xl font-heading text-[var(--color-text-primary)] mb-3">
                        No insights yet
                    </h2>
                    <p className="text-[var(--color-text-secondary)] text-sm">
                        Complete a few daily check-ins and patterns will start to emerge.
                        Insights work best with at least 3 entries.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 pb-24">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <header className="pt-8 pb-6">
                    <h1 className="text-3xl font-heading text-[var(--color-sage-dark)] mb-2">
                        Insights
                    </h1>
                    <p className="text-[var(--color-text-secondary)]">
                        What showed up the most
                    </p>
                </header>

                {/* Time range toggle */}
                <div className="flex gap-2 mb-8">
                    {([7, 14, 30] as TimeRange[]).map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`
                                flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all
                                ${timeRange === range
                                    ? 'bg-[var(--color-sage)] text-white'
                                    : 'glass-panel text-[var(--color-text-secondary)] hover:bg-white/50'
                                }
                            `}
                        >
                            {range} days
                        </button>
                    ))}
                </div>

                {/* Stats summary */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="glass-panel p-4 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar size={16} className="text-[var(--color-text-muted)]" />
                            <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Check-ins</span>
                        </div>
                        <p className="text-2xl font-heading text-[var(--color-text-primary)]">{checkIns.length}</p>
                    </div>
                    <div className="glass-panel p-4 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2">
                            <Target size={16} className="text-[var(--color-text-muted)]" />
                            <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Alignment</span>
                        </div>
                        <p className="text-2xl font-heading text-[var(--color-text-primary)]">{alignmentScore}%</p>
                    </div>
                </div>

                {/* Top emotions */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h2 className="text-lg font-heading text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                        <TrendingUp size={18} className="text-[var(--color-sage)]" />
                        Top Emotions
                    </h2>
                    <div className="glass-panel rounded-2xl p-4 space-y-3">
                        {emotionFrequency.slice(0, 5).map((item, index) => (
                            <div key={item.item} className="flex items-center gap-3">
                                <span className="text-xs text-[var(--color-text-muted)] w-4">{index + 1}</span>
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: getEmotionColor(item.item) }}
                                />
                                <span className="flex-1 capitalize text-sm">{getEmotionLabel(item.item)}</span>
                                <span className="text-sm text-[var(--color-text-muted)]">{item.count}x</span>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Top thought patterns */}
                {thoughtTagFrequency.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8"
                    >
                        <h2 className="text-lg font-heading text-[var(--color-text-primary)] mb-4">
                            Top Thought Patterns
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {thoughtTagFrequency.slice(0, 5).map((item) => (
                                <span
                                    key={item.item}
                                    className="px-3 py-1.5 rounded-full glass-panel text-sm"
                                >
                                    {getThoughtPatternLabel(item.item)} <span className="text-[var(--color-text-muted)]">({item.count})</span>
                                </span>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Top behaviours */}
                {behaviourFrequency.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <h2 className="text-lg font-heading text-[var(--color-text-primary)] mb-4">
                            Top Behaviours
                        </h2>
                        <div className="glass-panel rounded-2xl p-4 space-y-3">
                            {behaviourFrequency.slice(0, 3).map((item, index) => (
                                <div key={item.item} className="flex items-center gap-3">
                                    <span className="text-xs text-[var(--color-text-muted)] w-4">{index + 1}</span>
                                    <span className="flex-1 text-sm">{getBehaviourLabel(item.item)}</span>
                                    <span className="text-sm text-[var(--color-text-muted)]">{item.count}x</span>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Detected patterns */}
                {patterns.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <h2 className="text-lg font-heading text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                            <AlertTriangle size={18} className="text-[var(--color-clay)]" />
                            Possible Blind Spots
                        </h2>
                        <div className="space-y-3">
                            {patterns.slice(0, 3).map((pattern) => (
                                <div
                                    key={pattern.id}
                                    className="glass-panel rounded-2xl p-4 border-l-4 border-[var(--color-clay)]"
                                >
                                    <p className="text-sm text-[var(--color-text-primary)] mb-2">
                                        {pattern.hypothesis ?? pattern.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-[var(--color-text-muted)]">
                                            Seen {pattern.frequency}x
                                        </span>
                                        <button className="text-xs text-[var(--color-sage)] flex items-center gap-1 hover:underline">
                                            Test this <ChevronRight size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </div>
        </div>
    );
}
