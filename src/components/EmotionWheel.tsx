import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check } from 'lucide-react';
import { emotionWheel, getEmotionColor, emotionDescriptions } from '../data/emotions';
import type { Emotion } from '../types';

interface EmotionWheelProps {
    value: Emotion | null;
    onChange: (emotion: Emotion) => void;
    showIntensity?: boolean;
}

export function EmotionWheel({ value, onChange, showIntensity = true }: EmotionWheelProps) {
    const [mode, setMode] = useState<'core' | 'detailed'>('core');
    const [selectedCore, setSelectedCore] = useState<string | null>(value?.primary ? getCoreFromDetailed(value.primary) : null);

    function getCoreFromDetailed(emotion: string): string | null {
        for (const cat of emotionWheel) {
            if (cat.name === emotion) return emotion;
            if (cat.detailedEmotions.includes(emotion)) return cat.name;
        }
        return null;
    }

    function handleCoreSelect(coreName: string) {
        setSelectedCore(coreName);
        setMode('detailed');
    }

    function handleDetailedSelect(detailedEmotion: string) {
        onChange({
            primary: detailedEmotion,
            secondary: undefined,
            intensity: value?.intensity ?? 5,
        });
    }

    function handleIntensityChange(intensity: number) {
        if (value) {
            onChange({ ...value, intensity });
        }
    }

    const selectedCategory = emotionWheel.find((c) => c.name === selectedCore);

    return (
        <div className="space-y-6">
            <AnimatePresence mode="wait">
                {mode === 'core' ? (
                    <motion.div
                        key="core"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <p className="text-sm text-[var(--color-text-secondary)] mb-4 text-center">
                            What's the main feeling right now?
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {emotionWheel.map((category) => (
                                <button
                                    key={category.name}
                                    onClick={() => handleCoreSelect(category.name)}
                                    className={`
                                        p-4 rounded-2xl text-left transition-all duration-300
                                        border-2 glass-panel
                                        ${value?.primary && getCoreFromDetailed(value.primary) === category.name
                                            ? 'border-[var(--color-sage)] bg-[var(--color-sage)]/10'
                                            : 'border-transparent hover:border-white/40'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-4 h-4 rounded-full opacity-70"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <span className="capitalize font-medium text-[var(--color-text-primary)]">
                                            {category.name}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[var(--color-text-muted)] mt-1 ml-7">
                                        {emotionDescriptions[category.name]}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="detailed"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button
                            onClick={() => setMode('core')}
                            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-4 hover:text-[var(--color-sage)] transition-colors"
                        >
                            <ChevronLeft size={16} />
                            <span>Back to main feelings</span>
                        </button>

                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                            style={{ backgroundColor: `${selectedCategory?.color}20` }}
                        >
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: selectedCategory?.color }}
                            />
                            <span className="text-sm font-medium capitalize">{selectedCore}</span>
                        </div>

                        <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                            Can you be more specific?
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                            {selectedCategory?.detailedEmotions.map((emotion) => (
                                <button
                                    key={emotion}
                                    onClick={() => handleDetailedSelect(emotion)}
                                    className={`
                                        p-3 rounded-xl text-left transition-all duration-300
                                        border-2 glass-panel flex items-center gap-2
                                        ${value?.primary === emotion
                                            ? 'border-[var(--color-sage)] bg-[var(--color-sage)]/10'
                                            : 'border-transparent hover:border-white/40'
                                        }
                                    `}
                                >
                                    {value?.primary === emotion && (
                                        <Check size={14} className="text-[var(--color-sage)] shrink-0" />
                                    )}
                                    <div className="min-w-0">
                                        <span className="capitalize text-sm font-medium text-[var(--color-text-primary)] block">
                                            {emotion}
                                        </span>
                                        <span className="text-xs text-[var(--color-text-muted)] line-clamp-1">
                                            {emotionDescriptions[emotion]}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Intensity slider */}
            {showIntensity && value?.primary && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-4 border-t border-white/20"
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-[var(--color-text-secondary)]">Intensity</span>
                        <span
                            className="text-lg font-heading"
                            style={{ color: getEmotionColor(value.primary) }}
                        >
                            {value.intensity}/10
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={value.intensity}
                        onChange={(e) => handleIntensityChange(Number(e.target.value))}
                        aria-label={`Emotion intensity: ${value.intensity} out of 10`}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                        style={{
                            background: `linear-gradient(to right, ${getEmotionColor(value.primary)}40, ${getEmotionColor(value.primary)})`,
                        }}
                    />
                    <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] mt-1 uppercase tracking-wider">
                        <span>Mild</span>
                        <span>Intense</span>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
