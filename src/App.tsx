import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { hasCompletedOnboarding, setOnboardingCompleted } from './services/storage';
import type { TabType, ViewType } from './types';

// Components
import { TabNavigation } from './components/TabNavigation';
import { BreathingExercise } from './components/BreathingExercise';

// Screens
import { OnboardingScreen } from './screens/OnboardingScreen';
import { CheckInScreen } from './screens/CheckInScreen';
import { JourneyScreen } from './screens/JourneyScreen';
import { InsightsScreen } from './screens/InsightsScreen';
import { ToolsScreen } from './screens/ToolsScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export default function App() {
  // Check onboarding status
  const [onboardingDone, setOnboardingDone] = useState(() => hasCompletedOnboarding());
  const [currentTab, setCurrentTab] = useState<TabType>('check-in');
  const [currentView, setCurrentView] = useState<ViewType>(() =>
    hasCompletedOnboarding() ? 'check-in' : 'onboarding'
  );

  // Handle onboarding completion
  const handleOnboardingComplete = useCallback(() => {
    setOnboardingCompleted(true);
    setOnboardingDone(true);
    setCurrentView('check-in');
    setCurrentTab('check-in');
  }, []);

  // Handle tab changes
  const handleTabChange = useCallback((tab: TabType) => {
    setCurrentTab(tab);
    setCurrentView(tab);
  }, []);

  // Handle breathing exercise
  const handleStartBreathing = useCallback(() => {
    setCurrentView('breathing');
  }, []);

  const handleBreathingComplete = useCallback(() => {
    setCurrentView(currentTab);
  }, [currentTab]);

  // Handle module selection from Journey
  const handleSelectModule = useCallback((moduleId: string) => {
    // For now, just console log - will implement module screens later
    console.log('Selected module:', moduleId);
  }, []);

  // Render content based on current view
  const renderContent = () => {
    if (currentView === 'onboarding') {
      return (
        <OnboardingScreen
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingComplete}
        />
      );
    }

    if (currentView === 'breathing') {
      return (
        <BreathingExercise
          onComplete={handleBreathingComplete}
          onSkip={handleBreathingComplete}
        />
      );
    }

    switch (currentTab) {
      case 'check-in':
        return <CheckInScreen />;
      case 'journey':
        return <JourneyScreen onSelectModule={handleSelectModule} />;
      case 'insights':
        return <InsightsScreen />;
      case 'tools':
        return <ToolsScreen onStartBreathing={handleStartBreathing} />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <CheckInScreen />;
    }
  };

  const showTabNav = onboardingDone && currentView !== 'breathing';

  return (
    <div className="w-full min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      {showTabNav && (
        <TabNavigation
          activeTab={currentTab}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
}
