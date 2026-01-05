import { useState, useEffect, useCallback } from 'react';
import { useJourney } from './hooks/useJourney';
import { hasCompletedOnboarding, setOnboardingCompleted } from './services/storage';
import { rules } from './data/rules';
import type { ViewType, JourneyResponses } from './types';
import { AnimatePresence, motion } from 'framer-motion';

// Screens
import { OnboardingScreen } from './screens/OnboardingScreen';
import { HomeScreen } from './screens/HomeScreen';
import { RuleIntroScreen } from './screens/RuleIntroScreen';
import { RuleScreen } from './screens/RuleScreen';
import { SummaryScreen } from './screens/SummaryScreen';
import { JourneyCompleteScreen } from './screens/JourneyCompleteScreen';
import { GrowthDashboard } from './screens/GrowthDashboard';
import { BreathingExercise } from './components/BreathingExercise';

type ExtendedViewType = ViewType | 'breathing' | 'growth' | 'history-detail';

export default function App() {
  const {
    journey,
    isLoading,
    startNewJourney,
    updateResponses,
    markRuleComplete,
    resetJourney,
    archiveAndStartNew,
    getJourneyHistory
  } = useJourney();

  // Use lazy initialization to check onboarding status synchronously
  const [onboardingDone, setOnboardingDone] = useState(() => hasCompletedOnboarding());
  const [currentView, setCurrentView] = useState<ExtendedViewType>(() =>
    hasCompletedOnboarding() ? 'home' : 'onboarding'
  );
  const [currentRuleId, setCurrentRuleId] = useState<number>(1);
  const [hasBreathedThisSession, setHasBreathedThisSession] = useState(false);
  const [selectedHistoryJourney, setSelectedHistoryJourney] = useState<typeof journey | null>(null);

  // Start new journey if none exists and onboarding is complete
  useEffect(() => {
    if (onboardingDone && !journey && !isLoading) {
      startNewJourney();
    }
  }, [onboardingDone, journey, isLoading, startNewJourney]);

  // Note: Journey completion navigation is handled in handleRuleComplete callback

  // Handle onboarding completion
  const handleOnboardingComplete = useCallback(() => {
    setOnboardingCompleted(true);
    setOnboardingDone(true);
    setCurrentView('home');
    if (!journey) {
      startNewJourney();
    }
  }, [journey, startNewJourney]);

  // Navigate to a rule (with optional breathing)
  const handleSelectRule = useCallback((ruleId: number) => {
    setCurrentRuleId(ruleId);
    if (!hasBreathedThisSession) {
      setCurrentView('breathing');
    } else {
      setCurrentView('rule-intro');
    }
  }, [hasBreathedThisSession]);

  // Handle breathing complete
  const handleBreathingComplete = useCallback(() => {
    setHasBreathedThisSession(true);
    setCurrentView('rule-intro');
  }, []);

  // Begin a rule exercise
  const handleBeginRule = useCallback(() => {
    setCurrentView('rule');
  }, []);

  // Handle rule completion
  const handleRuleComplete = useCallback(() => {
    markRuleComplete(currentRuleId);
  }, [currentRuleId, markRuleComplete]);

  // Navigate after completing a rule
  const handleRuleNext = useCallback(() => {
    // Check if all rules are now complete
    if (journey && journey.completedRules.length === 4 && !journey.completedRules.includes(currentRuleId)) {
      // This was the 5th rule, journey complete!
      setCurrentView('journey-complete');
    } else if (currentRuleId < 5) {
      // Move to next rule
      setCurrentRuleId(currentRuleId + 1);
      setCurrentView('rule-intro');
    } else {
      // All done, go home
      setCurrentView('home');
    }
  }, [journey, currentRuleId]);

  // Handle response updates
  const handleUpdateResponse = useCallback((
    rule: keyof JourneyResponses,
    field: string,
    value: string,
    index: number | null = null
  ) => {
    updateResponses(rule, field, value, index);
  }, [updateResponses]);

  // Handle reset
  const handleReset = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
      resetJourney();
    }
  }, [resetJourney]);

  // Handle starting a new journey
  const handleStartNewJourney = useCallback(() => {
    archiveAndStartNew();
    setCurrentView('home');
  }, [archiveAndStartNew]);

  // Handle viewing specific history journey
  const handleViewHistoryJourney = useCallback((historicalJourney: typeof journey) => {
    setSelectedHistoryJourney(historicalJourney);
    setCurrentView('history-detail');
  }, []);

  // Main render function
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full border-2 border-[var(--color-sage)]/30 border-t-[var(--color-sage)] animate-spin mx-auto mb-4" />
            <p className="text-[var(--color-text-muted)] text-sm">Loading your journey...</p>
          </div>
        </div>
      );
    }

    if (currentView === 'onboarding') {
      return (
        <OnboardingScreen
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingComplete}
        />
      );
    }

    if (!journey) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <button
            onClick={startNewJourney}
            className="px-8 py-4 organic-pill bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-dark)] transition-all font-medium shadow-lg"
          >
            Start Your Journey
          </button>
        </div>
      );
    }

    switch (currentView) {
      case 'breathing':
        return (
          <BreathingExercise
            onComplete={handleBreathingComplete}
            onSkip={handleBreathingComplete}
          />
        );
      case 'summary':
        return (
          <SummaryScreen
            journey={journey}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'growth':
        return (
          <GrowthDashboard
            history={getJourneyHistory()}
            onBack={() => setCurrentView('home')}
            onViewJourney={handleViewHistoryJourney}
          />
        );
      case 'history-detail':
        return selectedHistoryJourney ? (
          <SummaryScreen
            journey={selectedHistoryJourney}
            onBack={() => setCurrentView('growth')}
          />
        ) : null;
      case 'journey-complete':
        return (
          <JourneyCompleteScreen
            journey={journey}
            onViewSummary={() => setCurrentView('summary')}
            onStartNew={handleStartNewJourney}
            onGoHome={() => setCurrentView('home')}
          />
        );
      case 'rule-intro': {
        const rule = rules.find(r => r.id === currentRuleId)!;
        return (
          <RuleIntroScreen
            rule={rule}
            onBegin={handleBeginRule}
            onBack={() => setCurrentView('home')}
          />
        );
      }
      case 'rule':
        return (
          <RuleScreen
            ruleId={currentRuleId}
            journey={journey}
            onUpdateResponse={handleUpdateResponse}
            onComplete={handleRuleComplete}
            onBack={() => setCurrentView('home')}
            onNext={handleRuleNext}
          />
        );
      case 'home':
      default:
        return (
          <HomeScreen
            journey={journey}
            onSelectRule={handleSelectRule}
            onViewSummary={() => setCurrentView('summary')}
            onViewGrowth={() => setCurrentView('growth')}
            onReset={handleReset}
          />
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentView}
        initial={{ opacity: 0, y: 10, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.99 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full h-full"
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  );
}
