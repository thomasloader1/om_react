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

const clearClassesByNameSelected = (element, name) => {
  document.querySelectorAll(`${element} > input[name]`).forEach((val) => {
    // console.error({valName:val.name.includes(name)},name)

    if(name.includes('med')){
      if (val.name.includes(name)) {
        val.parentElement.classList.add('is-link', 'is-light', 'is-outlined');
      } else {
        val.parentElement.classList.remove('is-link', 'is-light', 'is-outlined');
      } 
    }else if (name.includes('mod')) {
      if (val.name.includes(name)) {
        val.parentElement.classList.add('is-link', 'is-light', 'is-outlined');
      } else {
        val.parentElement.classList.remove('is-link', 'is-light', 'is-outlined');
      }
      }
    
    
  });
};

const setSideItemStep = (state, ref) => {
 console.group('setSideItemStep', { state, ref });
  state.sideItemOptions.map((step) => {
    if (step.status === 'current') {
      console.log({step})

      if(step.step === 3){
        if(ref.current.firstChild.name.includes('med')){
          step.value = ref.current.firstChild.value
        }

        if(ref.current.firstChild.name.includes('mod')){
          const hasPrev = step.value.includes('/') ? step.value.split('/').shift() : step.value
          step.value = `${hasPrev} / ${ref.current.firstChild.value}`
        }

      }else{
        step.value = ref.current.firstChild.value;
      }

      return { ...step };
    }
    return { ...step };
  });
 console.groupEnd();

};

console.group('useStepManager')

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
   // console.log(info);
    const [formRadioRef, _, state] = info;
    state.userFlow.stepTwo.value = formRadioRef.current.firstChild.value;
    setSideItemStep(state, formRadioRef);
  },
  stepThreeManager: (...info) => {
    const [formRadioRef, valueSelected, state] = info;

    if(valueSelected === 'med_tarjeta' || valueSelected === 'med_link'){
      state.userFlow.stepThree.value = valueSelected;
    }else{
      state.userFlow.stepThree.value += ` / ${valueSelected}`;

    }

    console.log({formRadioRef, valueSelected, state})
    setSideItemStep(state, formRadioRef);
    clearClassesByNameSelected('label', formRadioRef.current.firstChild.name);

  },
  stepFourManager: () => {},
  stepFiveManager: () => {}
};

console.groupEnd()


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
  console.group('delegateManager', { info });

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
  console.groupEnd();
  return manager;
};
