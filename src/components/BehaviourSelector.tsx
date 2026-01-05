import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { behaviours, behaviourCategoryColors, behaviourCategoryDescriptions } from '../data/behaviours';
import type { Behaviour } from '../data/behaviours';

interface BehaviourSelectorProps {
    urgeValue: string;
    actionValue: string;
    onUrgeChange: (value: string) => void;
    onActionChange: (value: string) => void;
}

type BehaviourCategory = 'fight' | 'flight' | 'freeze' | 'fawn';

export function BehaviourSelector({
    urgeValue,
    actionValue,
    onUrgeChange,
    onActionChange,
}: BehaviourSelectorProps) {
    const [expandedCategory, setExpandedCategory] = useState<BehaviourCategory | null>(null);
    const [mode, setMode] = useState<'urge' | 'action'>('urge');

    const categories: BehaviourCategory[] = ['fight', 'flight', 'freeze', 'fawn'];

    function handleSelect(behaviourId: string) {
        if (mode === 'urge') {
            onUrgeChange(behaviourId);
            if (!actionValue) {
                setMode('action');
            }
        } else {
            onActionChange(behaviourId);
        }
    }

    const currentValue = mode === 'urge' ? urgeValue : actionValue;

    return (
        <div className="space-y-4">
            {/* Mode toggle */}
            <div className="flex gap-2">
                <button
                    onClick={() => setMode('urge')}
                    className={`
                        flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all
                        ${mode === 'urge'
                            ? 'bg-[var(--color-sage)] text-white'
                            : 'glass-panel text-[var(--color-text-secondary)] hover:bg-white/50'
                        }
                    `}
                >
                    What I wanted to do
                    {urgeValue && <Check size={14} className="inline ml-2" />}
                </button>
                <button
                    onClick={() => setMode('action')}
                    className={`
                        flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all
                        ${mode === 'action'
                            ? 'bg-[var(--color-sage)] text-white'
                            : 'glass-panel text-[var(--color-text-secondary)] hover:bg-white/50'
                        }
                    `}
                >
                    What I actually did
                    {actionValue && <Check size={14} className="inline ml-2" />}
                </button>
            </div>

            {/* Hint */}
            <p className="text-xs text-[var(--color-text-muted)] text-center">
                {mode === 'urge'
                    ? "The first impulse that came up (even if you didn't act on it)"
                    : "What you ended up doing (even if it was the same)"
                }
            </p>

            {/* Category accordions */}
            <div className="space-y-2">
                {categories.map((category) => {
                    const categoryBehaviours = behaviours.filter((b) => b.category === category);
                    const isExpanded = expandedCategory === category;
                    const hasSelection = categoryBehaviours.some((b) => b.id === currentValue);

                    return (
                        <div key={category} className="glass-panel rounded-2xl overflow-hidden">
                            <button
                                onClick={() => setExpandedCategory(isExpanded ? null : category)}
                                className="w-full p-4 flex items-center justify-between text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: behaviourCategoryColors[category] }}
                                    />
                                    <div>
                                        <span className="font-medium capitalize text-[var(--color-text-primary)]">
                                            {category}
                                        </span>
                                        <p className="text-xs text-[var(--color-text-muted)]">
                                            {behaviourCategoryDescriptions[category]}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {hasSelection && (
                                        <Check size={16} className="text-[var(--color-sage)]" />
                                    )}
                                    {isExpanded ? (
                                        <ChevronUp size={18} className="text-[var(--color-text-muted)]" />
                                    ) : (
                                        <ChevronDown size={18} className="text-[var(--color-text-muted)]" />
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                                            {categoryBehaviours.map((behaviour) => (
                                                <button
                                                    key={behaviour.id}
                                                    onClick={() => handleSelect(behaviour.id)}
                                                    className={`
                                                        p-3 rounded-xl text-left text-sm transition-all
                                                        border-2
                                                        ${currentValue === behaviour.id
                                                            ? 'border-[var(--color-sage)] bg-[var(--color-sage)]/10'
                                                            : 'border-transparent bg-white/30 hover:bg-white/50'
                                                        }
                                                    `}
                                                >
                                                    <span className="font-medium block text-[var(--color-text-primary)]">
                                                        {behaviour.name}
                                                    </span>
                                                    <span className="text-xs text-[var(--color-text-muted)] line-clamp-2">
                                                        {behaviour.examples[0]}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Summary */}
            {urgeValue && actionValue && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-[var(--color-sage)]/10 text-center"
                >
                    <p className="text-sm text-[var(--color-text-secondary)]">
                        <span className="text-[var(--color-text-primary)] font-medium">
                            {behaviours.find((b) => b.id === urgeValue)?.name}
                        </span>
                        {' → '}
                        <span className="text-[var(--color-text-primary)] font-medium">
                            {behaviours.find((b) => b.id === actionValue)?.name}
                        </span>
                    </p>
                </motion.div>
            )}
        </div>
    );
}
