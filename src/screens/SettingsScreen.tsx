import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Shield,
    Eye,
    Trash2,
    Download,
    ChevronRight,
    Moon,
    Volume2,
} from 'lucide-react';
import {
    getPreferences,
    savePreferences,
    clearAllData,
    exportAllData,
    getDefaultPreferences,
} from '../services/storage';
import type { UserPreferences, TonePreference, DepthPreference } from '../types';

export function SettingsScreen() {
    const [preferences, setPreferences] = useState<UserPreferences>(
        getPreferences() ?? getDefaultPreferences()
    );
    const [showExportSuccess, setShowExportSuccess] = useState(false);

    const updatePreference = <K extends keyof UserPreferences>(
        key: K,
        value: UserPreferences[K]
    ) => {
        const updated = { ...preferences, [key]: value };
        setPreferences(updated);
        savePreferences(updated);
    };

    const handleExport = () => {
        const data = exportAllData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `self-awareness-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        setShowExportSuccess(true);
        setTimeout(() => setShowExportSuccess(false), 3000);
    };

    const handleClearData = () => {
        if (window.confirm('Are you sure you want to delete all your data? This cannot be undone.')) {
            clearAllData();
            window.location.reload();
        }
    };

    return (
        <div className="min-h-screen p-6 pb-24">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <header className="pt-8 pb-6">
                    <h1 className="text-3xl font-heading text-[var(--color-sage-dark)] mb-2">
                        Settings
                    </h1>
                    <p className="text-[var(--color-text-secondary)]">
                        Customize your experience
                    </p>
                </header>

                {/* Preferences */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
                        Preferences
                    </h2>

                    <div className="glass-panel rounded-2xl divide-y divide-white/20">
                        {/* Tone */}
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <Volume2 size={18} className="text-[var(--color-text-muted)]" />
                                    <span className="font-medium">Tone</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {(['gentle', 'direct'] as TonePreference[]).map((tone) => (
                                    <button
                                        key={tone}
                                        onClick={() => updatePreference('tone', tone)}
                                        className={`
                                            flex-1 py-2 px-4 rounded-xl text-sm capitalize transition-all
                                            ${preferences.tone === tone
                                                ? 'bg-[var(--color-sage)] text-white'
                                                : 'bg-white/30 text-[var(--color-text-secondary)] hover:bg-white/50'
                                            }
                                        `}
                                    >
                                        {tone}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Depth */}
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <Eye size={18} className="text-[var(--color-text-muted)]" />
                                    <span className="font-medium">Depth</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {(['quick', 'deep'] as DepthPreference[]).map((depth) => (
                                    <button
                                        key={depth}
                                        onClick={() => updatePreference('depth', depth)}
                                        className={`
                                            flex-1 py-2 px-4 rounded-xl text-sm capitalize transition-all
                                            ${preferences.depth === depth
                                                ? 'bg-[var(--color-sage)] text-white'
                                                : 'bg-white/30 text-[var(--color-text-secondary)] hover:bg-white/50'
                                            }
                                        `}
                                    >
                                        {depth}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Reduced Motion */}
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Moon size={18} className="text-[var(--color-text-muted)]" />
                                    <div>
                                        <span className="font-medium block">Reduced Motion</span>
                                        <span className="text-xs text-[var(--color-text-muted)]">
                                            Less animation for calm
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => updatePreference('reducedMotion', !preferences.reducedMotion)}
                                    aria-label={`Reduced motion: ${preferences.reducedMotion ? 'enabled' : 'disabled'}`}
                                    className={`
                                        w-12 h-7 rounded-full transition-all relative
                                        ${preferences.reducedMotion
                                            ? 'bg-[var(--color-sage)]'
                                            : 'bg-[var(--color-text-muted)]/30'
                                        }
                                    `}
                                >
                                    <div
                                        className={`
                                            absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all
                                            ${preferences.reducedMotion ? 'left-6' : 'left-1'}
                                        `}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Privacy */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
                        Privacy
                    </h2>

                    <div className="glass-panel rounded-2xl p-4">
                        <div className="flex items-start gap-3">
                            <Shield size={18} className="text-[var(--color-sage)] mt-0.5" />
                            <div>
                                <span className="font-medium block mb-1">Local Only</span>
                                <p className="text-sm text-[var(--color-text-muted)]">
                                    All your data stays on this device. Nothing is sent to any server.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Data */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
                        Your Data
                    </h2>

                    <div className="glass-panel rounded-2xl divide-y divide-white/20">
                        <button
                            onClick={handleExport}
                            className="w-full p-4 text-left flex items-center justify-between hover:bg-white/30 transition-all rounded-t-2xl"
                        >
                            <div className="flex items-center gap-3">
                                <Download size={18} className="text-[var(--color-text-muted)]" />
                                <span className="font-medium">Export Data</span>
                            </div>
                            <ChevronRight size={18} className="text-[var(--color-text-muted)]" />
                        </button>

                        <button
                            onClick={handleClearData}
                            className="w-full p-4 text-left flex items-center justify-between hover:bg-white/30 transition-all rounded-b-2xl"
                        >
                            <div className="flex items-center gap-3">
                                <Trash2 size={18} className="text-red-400" />
                                <span className="font-medium text-red-400">Delete All Data</span>
                            </div>
                            <ChevronRight size={18} className="text-[var(--color-text-muted)]" />
                        </button>
                    </div>
                </motion.section>

                {/* Export success toast */}
                {showExportSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-24 left-4 right-4 max-w-lg mx-auto"
                    >
                        <div className="bg-[var(--color-sage)] text-white px-4 py-3 rounded-xl text-center text-sm font-medium shadow-lg">
                            ✓ Data exported successfully
                        </div>
                    </motion.div>
                )}

                {/* Version */}
                <p className="text-center text-xs text-[var(--color-text-muted)] mt-8">
                    Self-Awareness App v1.0
                </p>
            </div>
        </div>
    );
}
