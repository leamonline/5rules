import { motion } from 'framer-motion';
import { ArrowRight, Lock, Sparkles, Target, TrendingUp, Eye } from 'lucide-react';
import { getModuleProgress } from '../services/storage';

interface JourneyNode {
    id: string;
    name: string;
    shortName: string;
    icon: typeof Target;
    description: string;
    color: string;
}

const journeyNodes: JourneyNode[] = [
    {
        id: 'emotion',
        name: 'Name It',
        shortName: 'Emotion',
        icon: Target,
        description: 'Label feelings accurately',
        color: 'var(--color-rule-1)',
    },
    {
        id: 'thought',
        name: 'Frame It',
        shortName: 'Thought',
        icon: Eye,
        description: 'Notice thought patterns',
        color: 'var(--color-rule-2)',
    },
    {
        id: 'behaviour',
        name: 'Track It',
        shortName: 'Behaviour',
        icon: TrendingUp,
        description: 'Spot your autopilot',
        color: 'var(--color-rule-3)',
    },
    {
        id: 'values',
        name: 'Choose It',
        shortName: 'Values',
        icon: Sparkles,
        description: 'Clarify what matters',
        color: 'var(--color-rule-4)',
    },
    {
        id: 'blindSpots',
        name: 'Test It',
        shortName: 'Blind Spots',
        icon: Lock,
        description: 'Surface hidden patterns',
        color: 'var(--color-rule-5)',
    },
];

interface JourneyScreenProps {
    onSelectModule?: (moduleId: string) => void;
}

export function JourneyScreen({ onSelectModule }: JourneyScreenProps) {
    const progress = getModuleProgress();

    return (
        <div className="min-h-screen p-6 pb-24">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <header className="pt-8 pb-8 text-center">
                    <h1 className="text-3xl font-heading text-[var(--color-sage-dark)] mb-2">
                        Your Journey
                    </h1>
                    <p className="text-[var(--color-text-secondary)]">
                        The 5 components of self-awareness
                    </p>
                </header>

                {/* Journey Path */}
                <div className="relative">
                    {/* Connecting line */}
                    <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-[var(--color-sage)]/30 via-[var(--color-sage)]/20 to-[var(--color-sage)]/10" />

                    {/* Nodes */}
                    <div className="space-y-4">
                        {journeyNodes.map((node, index) => {
                            const moduleProgress = progress[node.id as keyof typeof progress];
                            const level = moduleProgress?.level ?? 1;
                            const isUnlocked = index === 0 || level > 1 || (progress[journeyNodes[index - 1].id as keyof typeof progress]?.level ?? 1) > 1;
                            const Icon = node.icon;

                            return (
                                <motion.div
                                    key={node.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <button
                                        onClick={() => onSelectModule?.(node.id)}
                                        disabled={!isUnlocked}
                                        className={`
                                            w-full p-5 rounded-2xl text-left transition-all duration-300
                                            glass-panel border-2 relative
                                            ${isUnlocked
                                                ? 'hover:bg-white/60 border-transparent hover:border-white/40'
                                                : 'opacity-50 cursor-not-allowed border-transparent'
                                            }
                                        `}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Icon circle */}
                                            <div
                                                className={`
                                                    w-16 h-16 rounded-2xl flex items-center justify-center shrink-0
                                                    relative z-10
                                                `}
                                                style={{
                                                    backgroundColor: isUnlocked ? `${node.color}20` : 'rgba(0,0,0,0.05)',
                                                }}
                                            >
                                                {isUnlocked ? (
                                                    <Icon
                                                        size={24}
                                                        style={{ color: node.color }}
                                                        strokeWidth={1.5}
                                                    />
                                                ) : (
                                                    <Lock size={20} className="text-[var(--color-text-muted)]" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span
                                                        className="text-xs font-semibold uppercase tracking-wider"
                                                        style={{ color: isUnlocked ? node.color : 'var(--color-text-muted)' }}
                                                    >
                                                        {node.shortName}
                                                    </span>
                                                    {level > 1 && (
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-sage)]/10 text-[var(--color-sage)]">
                                                            Level {level}
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-lg font-heading text-[var(--color-text-primary)] mb-1">
                                                    {node.name}
                                                </h3>
                                                <p className="text-sm text-[var(--color-text-muted)]">
                                                    {node.description}
                                                </p>
                                            </div>

                                            {/* Arrow */}
                                            {isUnlocked && (
                                                <ArrowRight
                                                    size={18}
                                                    className="text-[var(--color-text-muted)] shrink-0 mt-6"
                                                />
                                            )}
                                        </div>

                                        {/* Progress bar */}
                                        {isUnlocked && (
                                            <div className="mt-4 ml-20">
                                                <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">
                                                    <span>{moduleProgress?.lessonsCompleted ?? 0} lessons</span>
                                                    <span>{moduleProgress?.practicesCompleted ?? 0} practices</span>
                                                </div>
                                                <div className="h-1 rounded-full bg-white/50 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all duration-500"
                                                        style={{
                                                            backgroundColor: node.color,
                                                            width: `${Math.min(100, ((moduleProgress?.lessonsCompleted ?? 0) / 5) * 100)}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Info card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 p-5 rounded-2xl bg-[var(--color-sage)]/5 border border-[var(--color-sage)]/10"
                >
                    <p className="text-sm text-[var(--color-text-secondary)] text-center">
                        <span className="font-medium text-[var(--color-sage-dark)]">Emotion → Thought → Behaviour → Values → Blind Spots</span>
                        <br />
                        <span className="text-xs text-[var(--color-text-muted)]">
                            Each component builds on the last. Complete daily check-ins to level up.
                        </span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
