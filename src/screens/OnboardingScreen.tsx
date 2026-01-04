import { useState } from 'react';
import { ChevronRight, Moon, Eye, Shuffle, Compass, Circle, Sparkles, Heart, Leaf } from 'lucide-react';
import { OnboardingDots } from '../components/ProgressIndicator';
import { rules } from '../data/rules';

interface OnboardingScreenProps {
    onComplete: () => void;
    onSkip: () => void;
}

const slides = [
    {
        id: 'welcome',
        title: 'Welcome',
        subtitle: 'A space for gentle self-discovery',
        content: (
            <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-[var(--color-sage)]/20 flex items-center justify-center mx-auto mb-6">
                    <Leaf size={40} className="text-[var(--color-sage-dark)]" />
                </div>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    These five exercises will guide you on a journey of understanding yourself
                    more deeply—your patterns, reactions, and what makes you uniquely you.
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">
                    There are no right or wrong answers here. Just honest reflection.
                </p>
            </div>
        )
    },
    {
        id: 'howItWorks',
        title: 'How It Works',
        subtitle: 'Simple, at your own pace',
        content: (
            <div className="space-y-4 text-left">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-[var(--color-clay-light)]">
                    <div className="p-2 rounded-xl bg-[var(--color-sage)]/20 text-[var(--color-sage-dark)]">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <p className="font-medium text-[var(--color-text-primary)]">Choose or Write</p>
                        <p className="text-sm text-[var(--color-text-secondary)]">Pick from prompts or express yourself freely</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-[var(--color-clay-light)]">
                    <div className="p-2 rounded-xl bg-[var(--color-terracotta)]/20 text-[var(--color-terracotta)]">
                        <Heart size={20} />
                    </div>
                    <div>
                        <p className="font-medium text-[var(--color-text-primary)]">Take Your Time</p>
                        <p className="text-sm text-[var(--color-text-secondary)]">Everything saves automatically</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-[var(--color-clay-light)]">
                    <div className="p-2 rounded-xl bg-[var(--color-sage)]/20 text-[var(--color-sage-dark)]">
                        <Eye size={20} />
                    </div>
                    <div>
                        <p className="font-medium text-[var(--color-text-primary)]">Reflect & Revisit</p>
                        <p className="text-sm text-[var(--color-text-secondary)]">Come back to your insights anytime</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'rules',
        title: 'The 5 Exercises',
        subtitle: 'Each one explores a different aspect of you',
        content: (
            <div className="space-y-3">
                {rules.map((rule, i) => {
                    const icons = [Moon, Eye, Shuffle, Compass, Circle];
                    const Icon = icons[i];
                    return (
                        <div
                            key={rule.id}
                            className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r ${rule.color} text-white`}
                        >
                            <Icon size={20} />
                            <div>
                                <p className="text-xs text-white/70">Exercise {rule.id}</p>
                                <p className="text-sm font-medium">{rule.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    },
    {
        id: 'ready',
        title: 'Ready?',
        subtitle: 'Your journey of self-understanding begins here',
        content: (
            <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-[var(--color-terracotta)]/20 flex items-center justify-center mx-auto animate-breathe">
                    <Heart size={36} className="text-[var(--color-terracotta)]" />
                </div>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    Take your time with each exercise. There's no rush—this is about
                    understanding yourself with curiosity and kindness.
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">
                    Everything stays private on your device.
                </p>
            </div>
        )
    }
];

export function OnboardingScreen({ onComplete, onSkip }: OnboardingScreenProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const isLastSlide = currentSlide === slides.length - 1;

    const nextSlide = () => {
        if (isLastSlide) {
            onComplete();
        } else {
            setCurrentSlide(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    };

    const slide = slides[currentSlide];

    return (
        <div className="min-h-screen p-6 flex flex-col">
            <div className="flex justify-end">
                <button
                    onClick={onSkip}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors py-2 px-4"
                    aria-label="Skip onboarding"
                >
                    Skip
                </button>
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                <div key={slide.id} className="animate-fade-in mb-10">
                    <h1 className="text-2xl md:text-3xl font-heading text-[var(--color-text-primary)] text-center mb-2">
                        {slide.title}
                    </h1>
                    <p className="text-[var(--color-text-muted)] text-sm text-center mb-8">
                        {slide.subtitle}
                    </p>
                    {slide.content}
                </div>

                <div className="space-y-6">
                    <OnboardingDots current={currentSlide} total={slides.length} />

                    <div className="flex gap-3">
                        {currentSlide > 0 && (
                            <button
                                onClick={prevSlide}
                                className="flex-1 py-4 rounded-2xl bg-white/70 border border-[var(--color-clay-light)] text-[var(--color-text-primary)] hover:bg-white transition-all font-medium"
                            >
                                Back
                            </button>
                        )}
                        <button
                            onClick={nextSlide}
                            className={`flex-1 py-4 rounded-2xl transition-all font-medium flex items-center justify-center gap-2 ${isLastSlide
                                ? 'bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-dark)]'
                                : 'bg-white/70 border border-[var(--color-clay-light)] text-[var(--color-text-primary)] hover:bg-white'
                                }`}
                        >
                            {isLastSlide ? 'Begin' : 'Next'}
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
