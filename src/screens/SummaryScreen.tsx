import { ChevronLeft, Printer, Copy, Check } from 'lucide-react';
import { useState, useCallback } from 'react';
import type { Journey } from '../types';
import { exportJourneyAsText } from '../services/storage';

interface SummaryScreenProps {
    journey: Journey;
    onBack: () => void;
}

export function SummaryScreen({ journey, onBack }: SummaryScreenProps) {
    const [copied, setCopied] = useState(false);
    const { responses } = journey;

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

    const hasAnyContent = Object.values(responses).some(r =>
        Object.values(r).flat().some(v => v)
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 print:bg-white print:text-black">
            <div className="max-w-2xl mx-auto">
                {/* Header - hidden on print */}
                <div className="no-print">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
                        aria-label="Back to rules"
                    >
                        <ChevronLeft size={18} />
                        Back to Rules
                    </button>
                </div>

                {/* Title */}
                <header className="mb-8 animate-fade-in">
                    <h1 className="text-2xl font-light mb-2 print:text-black">Your Reflections</h1>
                    <p className="text-white/50 text-sm print:text-gray-600">Journey started: {startDate}</p>
                </header>

                {/* Action Buttons - hidden on print */}
                <div className="flex gap-3 mb-6 no-print">
                    <button
                        onClick={handlePrint}
                        className="flex-1 py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center gap-2 text-sm"
                        aria-label="Print reflections"
                    >
                        <Printer size={16} />
                        Print
                    </button>
                    <button
                        onClick={handleCopy}
                        className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm ${copied ? 'bg-green-500/20 text-green-300' : 'bg-white/10 hover:bg-white/20'
                            }`}
                        aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied!' : 'Copy Text'}
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-6 text-sm">
                    {responses.rule1.trigger && (
                        <article className="p-4 rounded-xl bg-white/5 print:bg-gray-50 print:border print:border-gray-200 animate-fade-in">
                            <h2 className="font-medium mb-3 text-slate-300 print:text-slate-700">Rule 1: Shadow Work</h2>
                            <dl className="space-y-1">
                                <div><dt className="inline text-white/50 print:text-gray-500">Trigger:</dt> <dd className="inline">{responses.rule1.trigger}</dd></div>
                                <div><dt className="inline text-white/50 print:text-gray-500">Trait:</dt> <dd className="inline">{responses.rule1.trait}</dd></div>
                                <div><dt className="inline text-white/50 print:text-gray-500">Mirror:</dt> <dd className="inline">{responses.rule1.mirror}</dd></div>
                                <div><dt className="inline text-white/50 print:text-gray-500">Instance:</dt> <dd className="inline">{responses.rule1.instance}</dd></div>
                            </dl>
                        </article>
                    )}

                    {responses.rule2.event && (
                        <article className="p-4 rounded-xl bg-white/5 print:bg-gray-50 print:border print:border-gray-200 animate-fade-in" style={{ animationDelay: '100ms' }}>
                            <h2 className="font-medium mb-3 text-indigo-300 print:text-indigo-700">Rule 2: The Why Chain</h2>
                            <dl className="space-y-1">
                                <div><dt className="inline text-white/50 print:text-gray-500">Event:</dt> <dd className="inline">{responses.rule2.event}</dd></div>
                                <div><dt className="inline text-white/50 print:text-gray-500">→</dt> <dd className="inline">{responses.rule2.why1}</dd></div>
                                <div><dt className="inline text-white/50 print:text-gray-500">→</dt> <dd className="inline">{responses.rule2.why2}</dd></div>
                                <div><dt className="inline text-white/50 print:text-gray-500">→</dt> <dd className="inline">{responses.rule2.why3}</dd></div>
                                <div className="mt-2 text-indigo-200 print:text-indigo-700">
                                    <dt className="inline text-white/50 print:text-gray-500">Insight:</dt> <dd className="inline">{responses.rule2.conclusion}</dd>
                                </div>
                            </dl>
                        </article>
                    )}

                    {responses.rule3.label && (
                        <article className="p-4 rounded-xl bg-white/5 print:bg-gray-50 print:border print:border-gray-200 animate-fade-in" style={{ animationDelay: '200ms' }}>
                            <h2 className="font-medium mb-3 text-violet-300 print:text-violet-700">Rule 3: Integration</h2>
                            <dl className="space-y-1">
                                <div><dt className="inline text-white/50 print:text-gray-500">Label:</dt> <dd className="inline">{responses.rule3.label}</dd></div>
                                <div><dt className="inline text-white/50 print:text-gray-500">Fear:</dt> <dd className="inline">{responses.rule3.fear}</dd></div>
                                <div className="mt-2 text-violet-200 print:text-violet-700 font-medium">{responses.rule3.integration}</div>
                            </dl>
                        </article>
                    )}

                    {responses.rule4.values.some(v => v) && (
                        <article className="p-4 rounded-xl bg-white/5 print:bg-gray-50 print:border print:border-gray-200 animate-fade-in" style={{ animationDelay: '300ms' }}>
                            <h2 className="font-medium mb-3 text-emerald-300 print:text-emerald-700">Rule 4: Values Sort</h2>
                            <ul className="space-y-2">
                                {responses.rule4.values.map((v, i) => v && (
                                    <li key={i} className="flex gap-2 flex-wrap">
                                        <span className="font-medium">{v}:</span>
                                        <span className="text-emerald-200/70 print:text-emerald-600">{responses.rule4.sources[i] || 'Unknown'}</span>
                                        <span className="text-white/40 print:text-gray-400">→</span>
                                        <span>{responses.rule4.decisions[i] || 'Undecided'}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    )}

                    {responses.rule5.event && (
                        <article className="p-4 rounded-xl bg-white/5 print:bg-gray-50 print:border print:border-gray-200 animate-fade-in" style={{ animationDelay: '400ms' }}>
                            <h2 className="font-medium mb-3 text-amber-300 print:text-amber-700">Rule 5: Neutral Fact</h2>
                            <dl className="space-y-1">
                                <div><dt className="inline text-white/50 print:text-gray-500">Event:</dt> <dd className="inline">{responses.rule5.event}</dd></div>
                                <div><dt className="inline text-white/50 print:text-gray-500">Story:</dt> <dd className="inline line-through text-white/40 print:text-gray-400">{responses.rule5.judgment}</dd></div>
                                <div><dt className="inline text-white/50 print:text-gray-500">Neutral:</dt> <dd className="inline">{responses.rule5.neutral}</dd></div>
                                <div className="mt-2 text-amber-200 print:text-amber-700 font-medium">{responses.rule5.acceptance}</div>
                            </dl>
                        </article>
                    )}

                    {!hasAnyContent && (
                        <p className="text-white/40 text-center py-8 print:text-gray-500">
                            Complete the exercises to see your reflections here.
                        </p>
                    )}
                </div>

                {/* Print Footer */}
                <footer className="print-only mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-xs">
                    Generated by The 5 Rules Workbook • {new Date().toLocaleDateString()}
                </footer>
            </div>
        </div>
    );
}
