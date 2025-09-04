import { useCallback } from 'react';

const useFinalPoints = (businessPlanGeneratorData, setBusinessPlanGeneratorData) => {
  const handleInfoClick = useCallback((info, title) => {
    // This is just a placeholder. In a real application, you'd implement
    // the logic to display the info modal here.
    console.log(`Displaying info: ${title}`);
    console.log(info);
  }, []);

  const handleChange = useCallback((value) => {
    setBusinessPlanGeneratorData(prevData => ({
      ...prevData,
      finalPoints: value
    }));
  }, [setBusinessPlanGeneratorData]);

  return {
    finalPoints: businessPlanGeneratorData.finalPoints || '',
    handleInfoClick,
    handleChange
  };
};

export default useFinalPoints;