import { useState, useCallback, type KeyboardEvent } from 'react';
import { Check, Plus, X } from 'lucide-react';

interface ButtonSelectProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    columns?: 1 | 2;
}

export function ButtonSelect({
    options,
    value,
    onChange,
    placeholder = "Type your answer...",
    columns = 2
}: ButtonSelectProps) {
    const [showOther, setShowOther] = useState(false);
    const [customValue, setCustomValue] = useState('');
    const isCustom = value && !options.includes(value);

    const handleSelect = useCallback((option: string) => {
        onChange(option);
        setShowOther(false);
    }, [onChange]);

    const handleOther = useCallback(() => {
        setShowOther(true);
        setCustomValue(isCustom ? value : '');
    }, [isCustom, value]);

    const handleCustomSubmit = useCallback(() => {
        if (customValue.trim()) {
            onChange(customValue.trim());
            setShowOther(false);
        }
    }, [customValue, onChange]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCustomSubmit();
        } else if (e.key === 'Escape') {
            setShowOther(false);
        }
    }, [handleCustomSubmit]);

    if (showOther) {
        return (
            <div className="space-y-2 animate-fade-in">
                <div className="flex gap-2">
                    <input
                        autoFocus
                        value={customValue}
                        onChange={(e) => setCustomValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="flex-1 p-4 organic-pill bg-white/50 border border-[var(--color-clay)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)] transition-all shadow-sm"
                        aria-label="Custom answer input"
                    />
                    <button
                        onClick={handleCustomSubmit}
                        className="w-14 h-14 organic-pill bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-dark)] transition-colors flex items-center justify-center shadow-md hover:shadow-lg"
                        aria-label="Submit custom answer"
                    >
                        <Check size={20} />
                    </button>
                    <button
                        onClick={() => setShowOther(false)}
                        className="w-14 h-14 organic-pill bg-white/80 text-[var(--color-text-secondary)] hover:bg-white transition-colors flex items-center justify-center border border-[var(--color-clay)]"
                        aria-label="Cancel custom answer"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`grid gap-3 ${columns === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}
            role="group"
            aria-label="Select an option"
        >
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    aria-pressed={value === option}
                    className={`p-4 organic-pill text-left text-sm transition-all min-h-[56px] flex items-center ${value === option
                        ? 'bg-[var(--color-sage)] text-white shadow-md'
                        : 'bg-white/60 border border-[var(--color-bg-stone)] text-[var(--color-text-secondary)] hover:bg-white hover:border-[var(--color-clay)] hover:shadow-sm'
                        }`}
                >
                    {option}
                </button>
            ))}
            <button
                onClick={handleOther}
                className={`p-4 organic-pill text-sm transition-all flex items-center justify-center gap-2 min-h-[56px] ${isCustom
                    ? 'bg-[var(--color-sage)] text-white shadow-md col-span-full'
                    : 'bg-white/40 border border-dashed border-[var(--color-text-muted)] text-[var(--color-text-muted)] hover:bg-white/80 hover:border-[var(--color-sage)] hover:text-[var(--color-sage)]'
                    }`}
                aria-label={isCustom ? `Custom answer: ${value}` : "Enter custom answer"}
            >
                {isCustom ? (
                    <span>"{value}"</span>
                ) : (
                    <>
                        <Plus size={16} /> Other
                    </>
                )}
            </button>
        </div>
    );
}

