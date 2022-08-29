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

const setSideItemStep = (state, ref) => {
  console.log('setSideItemStep', { state, ref });
  state.sideItemOptions.map((step) => {
    // console.log({step})
    if (step.status === 'current') {
      step.value = ref.current.firstChild.value;
      return { ...step };
    }
    return { ...step };
  });
};

export const useStepManager = {
  stepOneManager: (...info) => {
    const [formRadioRef, idElement, state] = info;
    const country = formRadioRef.current.firstChild.value.toLowerCase();
    const [_, isoRef] = idElement.split('_');

    formRadioRef.current.id = country;
    state.userFlow.stepOne.value = country;
    state.userFlow.stepOne.isoRef = isoRef;

    setSideItemStep(state, formRadioRef);

    clearClassesByCountrySelected('label', country);
  },
  stepTwoManager: (...info) => {
    console.log(info);
    const [formRadioRef, _, state] = info;
    state.userFlow.stepTwo.value = formRadioRef.current.firstChild.value;
    setSideItemStep(state, formRadioRef);
  },
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
  console.log('delegateManager', { info });

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
