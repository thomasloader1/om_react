import { useEffect, useState } from "react";

export const useCurrentStep = (sideItemOptions) => {
    const currentInfoStep = getCurrentStep(sideItemOptions)
      
      const [actualStep, setCurrentStep] = useState(currentInfoStep);
      
      useEffect(() => {
        setCurrentStep(currentInfoStep);
      }, [actualStep]);

      return { actualStep, setCurrentStep }
}

export const getCurrentStep = (sideItemOptions) => {
  const [currentInfoStep] = sideItemOptions.filter(
    (sideOption) => sideOption.status === 'current'
  );

  return currentInfoStep
}