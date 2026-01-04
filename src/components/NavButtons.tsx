import { ChevronRight, ChevronLeft } from 'lucide-react';

interface NavButtonsProps {
    onBack: () => void;
    onNext: () => void;
    canComplete: boolean;
    backLabel?: string;
    nextLabel?: string;
}

export function NavButtons({
    onBack,
    onNext,
    canComplete,
    backLabel = "Back",
    nextLabel
}: NavButtonsProps) {
    const buttonText = nextLabel || (canComplete ? 'Complete' : 'Next');

    return (
        <nav className="flex justify-between mt-10 pt-6 border-t border-[var(--color-clay-light)] no-print" aria-label="Navigation">
            <button
                onClick={onBack}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/70 border border-[var(--color-clay-light)] text-[var(--color-text-primary)] hover:bg-white transition-all min-h-[48px] focus:ring-2 focus:ring-[var(--color-sage)]"
                aria-label={backLabel}
            >
                <ChevronLeft size={18} aria-hidden="true" />
                {backLabel}
            </button>
            <button
                onClick={onNext}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-medium min-h-[48px] focus:ring-2 focus:ring-[var(--color-sage)] ${canComplete
                    ? 'bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-dark)] shadow-md'
                    : 'bg-white/70 border border-[var(--color-clay-light)] text-[var(--color-text-primary)] hover:bg-white'
                    }`}
                aria-label={buttonText}
            >
                {buttonText}
                <ChevronRight size={18} aria-hidden="true" />
            </button>
        </nav>
    );
}
