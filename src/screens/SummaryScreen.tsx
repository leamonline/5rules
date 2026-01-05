import { ChevronLeft, ChevronDown, ChevronUp, Printer, Copy, Check, Lightbulb, Sparkles, Sprout, HelpCircle, Heart, Clock } from 'lucide-react';
import { useState, useCallback, useMemo } from 'react';
import type { Journey } from '../types';
import { exportJourneyAsText } from '../services/storage';
import { generateInsights, type RuleInsight } from '../services/insights';
import { AnimatePresence, motion } from 'framer-motion';

interface SummaryScreenProps {
    journey: Journey;
    onBack: () => void;
}

// ... (RuleSummaryCard component)

// ... (RuleDetail component)

// ... (QuickOverview component)

// ... (ruleConfig)


// Compact summary card shown in the overview
interface RuleSummaryCardProps {
    ruleNumber: number;
    title: string;
    keyInsight: string;
    affirmation: string;
    isExpanded: boolean;
    onToggle: () => void;
    hasContent: boolean;
}

function RuleSummaryCard({
    ruleNumber,
    title,
    keyInsight,
    affirmation,
    isExpanded,
    onToggle,
    hasContent
}: RuleSummaryCardProps) {
    if (!hasContent) return null;

    return (
        <button
            onClick={onToggle}
            className={`w-full text-left p-6 organic-shape-${(ruleNumber % 4) + 1} transition-all duration-500 group ${isExpanded
                ? `glass-panel shadow-lg ring-1 ring-[var(--color-sage)]/20`
                : 'bg-white/40 hover:bg-white/70 hover:shadow-md border border-transparent'
                }`}
        >
            <div className="flex items-start gap-5">
                {/* Rule number badge - Organic Shape */}
                <div className={`w-12 h-12 organic-shape-1 flex items-center justify-center shrink-0 transition-colors duration-500 ${isExpanded ? 'bg-[var(--color-sage)] text-white shadow-sm' : 'bg-white/60 text-[var(--color-text-secondary)]'
                    }`}>
                    <span className="font-heading text-lg">{ruleNumber}</span>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className={`font-heading text-lg ${isExpanded ? 'text-[var(--color-sage-dark)]' : 'text-[var(--color-text-primary)]'}`}>
                            {title}
                        </h3>
                        <div className={`p-2 organic-pill transition-colors ${isExpanded ? 'bg-[var(--color-sage)]/10' : 'bg-transparent group-hover:bg-white/50'}`}>
                            {isExpanded ? (
                                <ChevronUp size={20} className="text-[var(--color-sage)] shrink-0" />
                            ) : (
                                <ChevronDown size={20} className="text-[var(--color-text-muted)] shrink-0" />
                            )}
                        </div>
                    </div>

                    {/* Condensed insight preview */}
                    <p className={`text-sm line-clamp-2 mb-3 leading-relaxed ${isExpanded ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-secondary)]'}`}>
                        {keyInsight}
                    </p>

                    {/* Mini affirmation */}
                    <div className="flex items-center gap-2 opacity-80">
                        <Sparkles size={14} className="text-[var(--color-clay)]" />
                        <p className="text-xs text-[var(--color-text-muted)] italic line-clamp-1 font-medium">{affirmation}</p>
                    </div>
                </div>
            </div>
        </button>
    );
}

// Expanded detail view for a single rule
interface RuleDetailProps {
    ruleNumber: number;
    title: string;
    responses: React.ReactNode;
    insight: RuleInsight;
    colorClass: string;
    onCollapse: () => void;
}

function RuleDetail({ ruleNumber, title, responses, insight, colorClass, onCollapse }: RuleDetailProps) {
    return (
        <article className="animate-fade-in">
            {/* Header with collapse button */}
            <div className={`p-6 organic-shape-4 ${colorClass} border-b border-white/10 mb-[-2rem] pb-[3rem] relative z-10`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 organic-shape-2 bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <span className="text-white font-medium text-lg">{ruleNumber}</span>
                        </div>
                        <h2 className="text-xl font-heading text-white">{title}</h2>
                    </div>
                    <button
                        onClick={onCollapse}
                        className="p-3 organic-pill bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                        aria-label="Collapse section"
                    >
                        <ChevronUp size={20} className="text-white/80" />
                    </button>
                </div>
            </div>

            {/* Content area */}
            <div className="p-6 pt-12 organic-shape-1 glass-panel-dark border-0 space-y-8 relative z-0">
                {/* Your Responses - Compact */}
                <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-widest text-white/50 font-medium ml-1">Your Responses</h4>
                    <div className="p-5 organic-shape-4 bg-white/5 border border-white/5 backdrop-blur-sm">
                        {responses}
                    </div>
                </div>

                {/* Insights Grid - Visually Distinct */}
                <div className="grid gap-5">
                    {/* What This Reveals - Primary */}
                    <div className={`p-6 organic-shape-1 ${colorClass} border border-white/10 shadow-lg`}>
                        <div className="flex gap-5">
                            <div className="p-3 organic-pill bg-white/20 h-fit backdrop-blur-sm">
                                <Lightbulb size={24} className="text-white" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-heading text-lg text-white">What This Reveals</h4>
                                <p className="text-white/90 leading-relaxed text-base">{insight.insight}</p>
                            </div>
                        </div>
                    </div>

                    {/* Practice & Reflection - Side by side on larger screens */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* A Gentle Practice */}
                        <div className="p-4 organic-shape-2 bg-emerald-500/10 border border-emerald-500/20">
                            <div className="flex gap-3">
                                <div className="p-2 organic-pill bg-emerald-500/20 h-fit">
                                    <Sprout size={16} className="text-emerald-400" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-medium text-emerald-300">A Gentle Practice</h4>
                                    <p className="text-sm text-white/70 leading-relaxed">{insight.advice}</p>
                                </div>
                            </div>
                        </div>

                        {/* For Deeper Reflection */}
                        {insight.reflectionQuestion && (
                            <div className="p-4 organic-shape-3 bg-violet-500/10 border border-violet-500/20">
                                <div className="flex gap-3">
                                    <div className="p-2 organic-pill bg-violet-500/20 h-fit">
                                        <HelpCircle size={16} className="text-violet-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-medium text-violet-300">For Deeper Reflection</h4>
                                        <p className="text-sm text-white/70 leading-relaxed italic">{insight.reflectionQuestion}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Affirmation - Highlighted */}
                <div className="p-5 organic-shape-4 bg-gradient-to-r from-amber-500/20 via-rose-500/15 to-amber-500/20 border border-amber-500/20 shadow-sm backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <Heart size={20} className="text-rose-400 shrink-0" />
                        <p className="text-amber-100 italic font-heading text-lg">{insight.affirmation}</p>
                    </div>
                </div>
            </div>
        </article>
    );
}

// Quick Overview section at the top
interface QuickOverviewProps {
    completedCount: number;
    insights: ReturnType<typeof generateInsights>;
    overallTheme?: string;
}

function QuickOverview({ completedCount, overallTheme }: QuickOverviewProps) {
    if (completedCount === 0) return null;

    return (
        <div className="mb-10 p-8 organic-shape-2 glass-panel border-[var(--color-sage)]/20 animate-fade-in relative overflow-hidden shadow-lg">
            {/* Decorative background blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-indigo-muted)]/20 organic-shape-1 blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-2.5 organic-pill bg-[var(--color-sage)]/10">
                    <Sparkles size={20} className="text-[var(--color-sage)]" />
                </div>
                <h2 className="font-heading text-xl text-[var(--color-sage-dark)]">Your Journey So Far</h2>
            </div>

            <div className="space-y-6 relative z-10">
                {/* Progress indicator - Organic Bar */}
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-3 organic-pill bg-[var(--color-bg-stone)] overflow-hidden shadow-inner">
                        <div
                            className="h-full organic-pill bg-gradient-to-r from-[var(--color-sage)] to-[var(--color-sage-light)] transition-all duration-1000 ease-out"
                            style={{ width: `${(completedCount / 5) * 100}%` }}
                        />
                    </div>
                    <span className="text-sm font-medium text-[var(--color-text-secondary)]">{completedCount}/5 completed</span>
                </div>

                {overallTheme && (
                    <p className="text-[var(--color-text-primary)] text-base leading-relaxed italic border-l-2 border-[var(--color-sage)]/30 pl-4 py-1">
                        "{overallTheme}"
                    </p>
                )}

                <p className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] opacity-80 pt-2">
                    Tap below to explore insights
                </p>
            </div>
        </div>
    );
}

// Rule configuration
const ruleConfig = [
    { id: 1, title: "Understanding What Triggers You", colorClass: "bg-gradient-to-br from-slate-600/60 to-slate-700/60", accentColor: "text-slate-200" },
    { id: 2, title: "Tracing Your Reactions", colorClass: "bg-gradient-to-br from-indigo-600/40 to-indigo-700/40", accentColor: "text-indigo-200" },
    { id: 3, title: "Embracing All of You", colorClass: "bg-gradient-to-br from-violet-600/40 to-violet-700/40", accentColor: "text-violet-200" },
    { id: 4, title: "Choosing Your Own Values", colorClass: "bg-gradient-to-br from-emerald-600/40 to-emerald-700/40", accentColor: "text-emerald-200" },
    { id: 5, title: "Separating Facts from Stories", colorClass: "bg-gradient-to-br from-amber-600/40 to-amber-700/40", accentColor: "text-amber-200" },
];

export function SummaryScreen({ journey, onBack }: SummaryScreenProps) {
    const [copied, setCopied] = useState(false);
    const [expandedRule, setExpandedRule] = useState<number | null>(null);
    const { responses } = journey;

    const insights = useMemo(() => generateInsights(responses), [responses]);

    const startDate = new Date(journey.startedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const handlePrint = useCallback(() => {
        window.print();
    }, []);

    const handleCopy = useCallback(async () => {
        const text = exportJourneyAsText(journey);
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }, [journey]);

    // Count completed rules
    const completedRules = [
        responses.rule1.trigger,
        responses.rule2.event,
        responses.rule3.label,
        responses.rule4.values.some(v => v),
        responses.rule5.event
    ].filter(Boolean).length;

    const hasAnyContent = completedRules > 0;

    // Response renderers for each rule
    const renderRule1Responses = () => (
        <div className="space-y-2 text-sm text-white/70">
            <div className="flex gap-2"><span className="text-white/40 w-20 shrink-0">Trigger:</span> <span>{responses.rule1.trigger}</span></div>
            <div className="flex gap-2"><span className="text-white/40 w-20 shrink-0">Trait:</span> <span>{responses.rule1.trait}</span></div>
            <div className="flex gap-2"><span className="text-white/40 w-20 shrink-0">Mirror:</span> <span>{responses.rule1.mirror}</span></div>
            <div className="flex gap-2"><span className="text-white/40 w-20 shrink-0">Instance:</span> <span>{responses.rule1.instance}</span></div>
        </div>
    );

    const renderRule2Responses = () => (
        <div className="space-y-2 text-sm text-white/70">
            <div className="flex gap-2"><span className="text-white/40 w-20 shrink-0">Event:</span> <span>{responses.rule2.event}</span></div>
            <div className="pl-3 border-l border-indigo-500/30 space-y-1 ml-[88px]">
                <div>{responses.rule2.why1}</div>
                <div>→ {responses.rule2.why2}</div>
                <div>→ {responses.rule2.why3}</div>
            </div>
            <div className="pt-2 text-indigo-200 flex gap-2"><strong className="w-20 shrink-0">Insight:</strong> <span>{responses.rule2.conclusion}</span></div>
        </div>
    );

    const renderRule3Responses = () => (
        <div className="space-y-3 text-sm text-white/70">
            <div className="flex gap-2"><span className="text-white/40 w-20 shrink-0">Label:</span> <span>{responses.rule3.label}</span></div>
            <div className="flex gap-2"><span className="text-white/40 w-20 shrink-0">Fear:</span> <span>{responses.rule3.fear}</span></div>
            <div className="p-3 organic-shape-3 bg-violet-500/10 border border-violet-500/20 text-violet-100 italic">
                "{responses.rule3.integration}"
            </div>
        </div>
    );

    const renderRule4Responses = () => (
        <div className="space-y-2">
            {responses.rule4.values.map((v: string, i: number) => v && (
                <div key={i} className="flex items-center gap-2 text-sm">
                    <span className={`px-2 py-0.5 organic-shape-1 text-xs font-medium ${responses.rule4.decisions[i]?.includes("Keep")
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : responses.rule4.decisions[i]?.includes("Adopt")
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}>
                        {responses.rule4.decisions[i]?.includes("Keep") ? '✓'
                            : responses.rule4.decisions[i]?.includes("Adopt") ? '○'
                                : '✗'}
                    </span>
                    <span className="text-white/70">{v}</span>
                    <span className="text-white/30 text-xs">({responses.rule4.sources[i]})</span>
                </div>
            ))}
        </div>
    );


    const renderRule5Responses = () => (
        <div className="space-y-3 text-sm">
            <div className="text-white/70"><span className="text-white/40">Event:</span> {responses.rule5.event}</div>
            <div className="flex gap-2">
                <div className="flex-1 p-2 organic-shape-2 bg-rose-500/10 border border-rose-500/20">
                    <p className="text-xs text-rose-400 mb-1">Story</p>
                    <p className="line-through text-white/40 text-xs">{responses.rule5.judgment}</p>
                </div>
                <div className="flex-1 p-2 organic-shape-4 bg-emerald-500/10 border border-emerald-500/20">
                    <p className="text-xs text-emerald-400 mb-1">Fact</p>
                    <p className="text-emerald-100 text-xs">{responses.rule5.neutral}</p>
                </div>
            </div>
            <div className="text-amber-200/80 italic text-xs">"{responses.rule5.acceptance}"</div>
        </div>
    );

    const responseRenderers = [renderRule1Responses, renderRule2Responses, renderRule3Responses, renderRule4Responses, renderRule5Responses];
    const ruleHasContent = [
        !!responses.rule1.trigger,
        !!responses.rule2.event,
        !!responses.rule3.label,
        responses.rule4.values.some(v => v),
        !!responses.rule5.event
    ];
    const ruleInsights = [insights.rule1, insights.rule2, insights.rule3, insights.rule4, insights.rule5];

    return (
        <div className="min-h-screen p-6 md:p-8 print:bg-white print:text-black">
            <div className="max-w-2xl mx-auto py-8">
                {/* Header */}
                <div className="no-print">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-sage-dark)] mb-8 transition-colors group pl-1"
                        aria-label="Back to rules"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Rules
                    </button>
                </div>

                {/* Title */}
                <header className="mb-10 animate-fade-in">
                    <h1 className="text-3xl md:text-4xl font-heading text-[var(--color-sage-dark)] mb-2 print:text-black">Your Reflections</h1>
                    <p className="text-[var(--color-text-secondary)] text-sm print:text-gray-600 flex items-center gap-2">
                        <Clock size={14} className="opacity-50" />
                        Journey started: {startDate}
                    </p>
                </header>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-10 no-print animate-fade-in relative z-10">
                    <button
                        onClick={handlePrint}
                        className="flex-1 py-4 px-6 organic-pill bg-white/50 hover:bg-white/80 border border-white/40 text-[var(--color-text-primary)] transition-all flex items-center justify-center gap-2 text-sm font-medium shadow-sm backdrop-blur-sm group"
                        aria-label="Print reflections"
                    >
                        <Printer size={18} className="text-[var(--color-sage)] group-hover:scale-110 transition-transform" />
                        Print
                    </button>
                    <button
                        onClick={handleCopy}
                        className={`flex-1 py-4 px-6 organic-pill transition-all flex items-center justify-center gap-2 text-sm font-medium shadow-sm backdrop-blur-sm ${copied
                            ? 'bg-[var(--color-sage)]/20 text-[var(--color-sage-dark)] border border-[var(--color-sage)]/30'
                            : 'bg-white/50 hover:bg-white/80 border border-white/40 text-[var(--color-text-primary)]'
                            }`}
                        aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} className="text-[var(--color-sage)]" />}
                        {copied ? 'Copied!' : 'Copy Text'}
                    </button>
                </div>

                {/* Quick Overview */}
                <QuickOverview
                    completedCount={completedRules}
                    insights={insights}
                    overallTheme={insights.overallTheme}
                />


                {/* Rules - Accordion Style */}
                <div className="space-y-4">
                    {ruleConfig.map((rule, index) => {
                        const hasContent = ruleHasContent[index];
                        const insight = ruleInsights[index];
                        const isExpanded = expandedRule === rule.id;

                        if (!hasContent) return null;

                        return (
                            <div key={rule.id} className="overflow-hidden organic-shape-1">
                                <AnimatePresence mode="wait" initial={false}>
                                    {isExpanded && insight ? (
                                        <motion.div
                                            key="expanded"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <RuleDetail
                                                ruleNumber={rule.id}
                                                title={rule.title}
                                                responses={responseRenderers[index]()}
                                                insight={insight}
                                                colorClass={rule.colorClass}
                                                onCollapse={() => setExpandedRule(null)}
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="collapsed"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <RuleSummaryCard
                                                ruleNumber={rule.id}
                                                title={rule.title}
                                                keyInsight={insight?.insight || "Complete this rule to see insights"}
                                                affirmation={insight?.affirmation || ""}
                                                isExpanded={false}
                                                onToggle={() => setExpandedRule(rule.id)}
                                                hasContent={hasContent}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {!hasAnyContent && (
                    <div className="text-center py-12">
                        <p className="text-white/40 mb-4">Complete the exercises to see your reflections here.</p>
                        <button
                            onClick={onBack}
                            className="px-6 py-3 organic-pill bg-violet-500/20 hover:bg-violet-500/30 text-violet-200 transition-colors"
                        >
                            Start Your Journey
                        </button>
                    </div>
                )}

                {/* Print Footer */}
                <footer className="print-only mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-xs">
                    Generated by The 5 Rules Workbook • {new Date().toLocaleDateString()}
                </footer>
            </div>
        </div>
    );
}
