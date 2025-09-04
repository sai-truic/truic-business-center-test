import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OnboardingStepTwo from './OnboardingStepTwo';
import OnboardingStepThree from './OnboardingStepThree';
import OnboardingStepSix from './OnboardingStepSix';
import OnboardingStepEight from './OnboardingStepEight';
import OnboardingModal from './OnboardingModal'
import ProgressIndicator from './ProgressIndicator';
import useInputState from '../useInputState';
import { useDataStore } from '../../hooks/useDataStore';
import { useSafeUser } from '../useSafeUser';

const TOTAL_STEPS = 4;

const Onboarding = ({ handleButtonClick, handleSelectChange, isTriggeredFromDashboard, onboardingData: initialOnboardingData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOnboardingActive, setIsOnboardingActive] = useState(false);
  const [onboardingData, setOnboardingData] = useState(initialOnboardingData || {});
  const { updateState, getState } = useInputState();
  const cosmosStore = useDataStore('cosmosdb');
  const { user } = useSafeUser();

  useEffect(() => {
    if (initialOnboardingData) {
      updateState('onboarding', 'data', initialOnboardingData);
      if (isTriggeredFromDashboard) {
        setCurrentStep(getNextIncompleteStep(initialOnboardingData));
        setIsOnboardingActive(true);
      } else if (!initialOnboardingData.completed) {
        setIsOnboardingActive(true);
      }
    } else {
      setIsOnboardingActive(true);
    }
  }, [initialOnboardingData, isTriggeredFromDashboard, updateState]);

  const goNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skip = () => {
    setCurrentStep(TOTAL_STEPS);
    updateOnboardingData({ skipped: true });
  };

  const close = () => {
    setIsOnboardingActive(false);
  };

  const finish = async () => {
    await cosmosStore.save('Onboarding', { ...onboardingData, userId: user.id, completed: true });
    close();
  };

  const updateOnboardingData = (data) => {
    setOnboardingData(prevData => ({
      ...prevData,
      ...data
    }));
    updateState('onboarding', 'data', (prevData) => ({
      ...prevData,
      ...data
    }));
  };

  const getNextIncompleteStep = (data) => {
    if (!data.businessState) return 1;
    if (!data.businessStage) return 2;
    if (!data.businessName) return 3;
    return 4;
  };

  const renderStep = () => {
    const stepContent = (() => {
      switch (currentStep) {
        case 1:
          return <OnboardingStepTwo onNext={goNext} onClose={close} onSkip={skip} handleButtonClick={handleButtonClick} handleSelectChange={handleSelectChange} updateOnboardingData={updateOnboardingData} onboardingData={onboardingData} />;
        case 2:
          return <OnboardingStepThree onNext={goNext} onPrevious={goPrevious} onClose={close} onSkip={skip} handleButtonClick={handleButtonClick} updateOnboardingData={updateOnboardingData} onboardingData={onboardingData} />;
        case 3:
          return <OnboardingStepSix onNext={goNext} onPrevious={goPrevious} onClose={close} onSkip={skip} handleButtonClick={handleButtonClick} updateOnboardingData={updateOnboardingData} onboardingData={onboardingData} />;
        case 4:
          return <OnboardingStepEight onPrevious={goPrevious} onClose={finish} handleButtonClick={handleButtonClick} updateOnboardingData={updateOnboardingData} onboardingData={onboardingData} />;
        default:
          return null;
      }
    })();

    if (onboardingData.skipped) {
      return <OnboardingStepEight onPrevious={goPrevious} onClose={finish} handleButtonClick={handleButtonClick} updateOnboardingData={updateOnboardingData} onboardingData={onboardingData} />;
    }

    return (
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        {stepContent}
      </motion.div>
    );
  };

  return (
    <OnboardingModal open={isOnboardingActive} onClose={close}>
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </OnboardingModal>
  );
};

export default Onboarding;
