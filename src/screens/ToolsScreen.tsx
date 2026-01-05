import { motion } from 'framer-motion';
import { Wind, Clock, Eye, Brain, Heart } from 'lucide-react';
import { pausePlans } from '../data/behaviours';
import { thoughtPatterns } from '../data/thoughtPatterns';

interface ToolCategory {
    id: string;
    name: string;
    icon: typeof Wind;
    color: string;
    tools: ToolItem[];
}

interface ToolItem {
    id: string;
    name: string;
    duration: string;
    description: string;
}

const toolCategories: ToolCategory[] = [
    {
        id: 'body',
        name: 'Body Tools',
        icon: Heart,
        color: 'var(--color-clay)',
        tools: pausePlans.filter((p) => p.category === 'body').map((p) => ({
            id: p.id,
            name: p.name,
            duration: p.duration,
            description: p.description,
        })),
    },
    {
        id: 'mind',
        name: 'Mind Tools',
        icon: Brain,
        color: 'var(--color-indigo-muted)',
        tools: pausePlans.filter((p) => p.category === 'mind').map((p) => ({
            id: p.id,
            name: p.name,
            duration: p.duration,
            description: p.description,
        })),
    },
    {
        id: 'patterns',
        name: 'Pattern Checks',
        icon: Eye,
        color: 'var(--color-sage)',
        tools: thoughtPatterns.slice(0, 4).map((p) => ({
            id: p.id,
            name: p.question,
            duration: '30 sec',
            description: p.shortName,
        })),
    },
];

interface ToolsScreenProps {
    onStartBreathing?: () => void;
}

export function ToolsScreen({ onStartBreathing }: ToolsScreenProps) {
    return (
        <div className="min-h-screen p-6 pb-24">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <header className="pt-8 pb-6">
                    <h1 className="text-3xl font-heading text-[var(--color-sage-dark)] mb-2">
                        Tools
                    </h1>
                    <p className="text-[var(--color-text-secondary)]">
                        Quick exercises for any moment
                    </p>
                </header>

                {/* Featured: Breathing */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={onStartBreathing}
                    className="w-full mb-8 p-6 rounded-2xl bg-gradient-to-br from-[var(--color-sage)] to-[var(--color-sage-dark)] text-white text-left relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                            <Wind size={24} strokeWidth={1.5} />
                        </div>
                        <h2 className="text-xl font-heading mb-1">Guided Breathing</h2>
                        <p className="text-white/80 text-sm mb-3">
                            2-minute reset for when you're overwhelmed
                        </p>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-xs">
                            <Clock size={12} />
                            2 min
                        </span>
                    </div>
                </motion.button>

                {/* Tool categories */}
                {toolCategories.map((category, categoryIndex) => {
                    const Icon = category.icon;
                    return (
                        <motion.section
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIndex * 0.1 }}
                            className="mb-8"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Icon size={18} style={{ color: category.color }} />
                                <h2 className="text-lg font-heading text-[var(--color-text-primary)]">
                                    {category.name}
                                </h2>
                            </div>

                            <div className="space-y-3">
                                {category.tools.map((tool) => (
                                    <button
                                        key={tool.id}
                                        className="w-full glass-panel p-4 rounded-2xl text-left hover:bg-white/60 transition-all"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-[var(--color-text-primary)] mb-1">
                                                    {tool.name}
                                                </h3>
                                                <p className="text-sm text-[var(--color-text-muted)]">
                                                    {tool.description}
                                                </p>
                                            </div>
                                            <span className="text-xs text-[var(--color-text-muted)] shrink-0 ml-4">
                                                {tool.duration}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.section>
                    );
                })}

                {/* "I'm overwhelmed" quick button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="fixed bottom-24 left-4 right-4 max-w-lg mx-auto"
                >
                    <button
                        onClick={onStartBreathing}
                        className="w-full py-4 px-6 rounded-2xl glass-panel border-2 border-[var(--color-clay)]/30 text-center hover:bg-[var(--color-clay)]/10 transition-all"
                    >
                        <span className="text-[var(--color-text-secondary)]">In a tough moment? </span>
                        <span className="text-[var(--color-clay)] font-medium">Quick reset →</span>
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
