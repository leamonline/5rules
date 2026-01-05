import { Heart, Map, LineChart, Wrench, Settings } from 'lucide-react';
import type { TabType } from '../types';

interface TabNavigationProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

interface TabConfig {
    id: TabType;
    label: string;
    icon: typeof Heart;
}

const tabs: TabConfig[] = [
    { id: 'check-in', label: 'Check-In', icon: Heart },
    { id: 'journey', label: 'Journey', icon: Map },
    { id: 'insights', label: 'Insights', icon: LineChart },
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'settings', label: 'Settings', icon: Settings },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/20"
            role="tablist"
            aria-label="Main navigation"
        >
            <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            role="tab"
                            aria-selected={isActive}
                            aria-label={tab.label}
                            onClick={() => onTabChange(tab.id)}
                            className={`
                                flex flex-col items-center justify-center gap-1 px-3 py-2 
                                transition-all duration-300 ease-out min-w-[60px]
                                ${isActive
                                    ? 'text-[var(--color-sage)]'
                                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
                                }
                            `}
                        >
                            <div
                                className={`
                                    p-2 rounded-xl transition-all duration-300
                                    ${isActive
                                        ? 'bg-[var(--color-sage)]/10 scale-110'
                                        : 'hover:bg-white/30'
                                    }
                                `}
                            >
                                <Icon
                                    size={20}
                                    strokeWidth={isActive ? 2 : 1.5}
                                    className="transition-all duration-300"
                                />
                            </div>
                            <span
                                className={`
                                    text-[10px] font-medium tracking-wide uppercase
                                    transition-all duration-300
                                    ${isActive ? 'opacity-100' : 'opacity-70'}
                                `}
                            >
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Safe area padding for iOS */}
            <div className="h-[env(safe-area-inset-bottom)]" />
        </nav>
    );
}
