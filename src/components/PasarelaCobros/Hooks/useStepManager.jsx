/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
const clearClassesByCountrySelected = (element, country) => {
  document.querySelectorAll(`${element}[id]`).forEach((val) => {
    // console.log({val},val.id.includes(country) , country, val.id)
    if (val.id.includes(country)) {
      val.classList.add('is-link', 'is-light', 'is-outlined');
    } else {
      val.classList.remove('is-link', 'is-light', 'is-outlined');
    }
  });
};

export const useStepManager = {
  stepOneManager: (...info) => {
    const [formRadioRef, idElement, state] = info;
    const country = formRadioRef.current.firstChild.value.toLowerCase();
    const [_, isoRef] = idElement.split('_');

    formRadioRef.current.id = country;
    state.userFlow.stepOne.value = country;

    state.sideItemOptions.map((step) => {
      // console.log({step})
      if (step.status === 'current' && step.step === 1) {
        step.value = formRadioRef.current.firstChild.value;
        state.userFlow.stepOne.isoRef = isoRef;
        return { ...step };
      }
      return { ...step };
    });

    clearClassesByCountrySelected('label', country);
  },
  stepTwoManager: () => {},
  stepThreeManager: () => {},
  stepFourManager: () => {},
  stepFiveManager: () => {}
};

export const delegateManager = (...info) => {
  const {
    stepOneManager,
    stepTwoManager,
    stepThreeManager,
    stepFourManager,
    stepFiveManager
  } = useStepManager;

  const manager = { updateState: {} };
  const [currentStep, ...rest] = info;
  
  switch (currentStep.step) {
    case 1:
      manager.updateState = stepOneManager(...rest);
      break;
    case 2:
      manager.updateState = stepTwoManager(...rest);
      break;
    case 3:
      manager.updateState = stepThreeManager(...rest);
      break;
    case 4:
      manager.updateState = stepFourManager(...rest);
      break;
    case 5:
      manager.updateState = stepFiveManager(...rest);
      break;
    default:
      manager.updateState = {};
      break;
  }
  return manager;
};
