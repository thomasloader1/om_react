/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import { fireToast } from './useSwal';

const clearClassesByCountrySelected = (element, country) => {
  document.querySelectorAll(`${element}[id]`).forEach((val) => {
    // console.log({val},val.id.includes(country) , country, val.id)
    if (val.id.includes(country)) {
      val.parentElement.classList.add('is-link', 'is-light', 'is-outlined');
    } else {
      val.parentElement.classList.remove('is-link', 'is-light', 'is-outlined');
    }
  });
};

const clearClassesByNameSelected = (element, name, id) => {
  document.querySelectorAll(`${element} > input[name='${name}']`).forEach((val) => {
    
      if (val.id === id) {
        val.parentElement.parentElement.classList.add('is-link', 'is-light', 'is-outlined');
      } else {
        val.parentElement.parentElement.classList.remove('is-link', 'is-light', 'is-outlined');
      } 
     
  });

  if(id === 'med_tarjeta' || id === 'med_link'){
    document.querySelectorAll(`${element} > input[name='mod']`).forEach((val) => {
        val.parentElement.parentElement.classList.remove('is-link', 'is-light', 'is-outlined');
  });
  }
};

const setSideItemStep = (state, ref = null) => {
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
    // console.log('Step 1',{info})
    const [formRadioRef, idElement, state] = info;
    const country = formRadioRef.current.firstChild.value.toLowerCase();
    const [_, isoRef] = idElement.split('_');

    formRadioRef.current.id = country;
    state.userFlow.stepOne.value = country;
    state.userFlow.stepOne.isoRef = isoRef;

    clearClassesByCountrySelected('div.ui.radio', country);
    setSideItemStep(state, formRadioRef);

  },
  stepTwoManager: (...info) => {
    const [formRadioRef, _, state] = info;
    state.userFlow.stepTwo.value = formRadioRef.current.firstChild.value;
    setSideItemStep(state, formRadioRef);
  },
  stepThreeManager: (...info) => {
    const [formRadioRef, valueSelected, state] = info;

    console.log('step3',{info, state})

    if(state.userFlow.stepTwo.value === 'Mercado Pago'){
      console.log(info[0].then(res => res))
    }

    if(valueSelected === 'med_tarjeta' || valueSelected === 'med_link'){
      state.userFlow.stepThree.value = valueSelected;
    }else{
      state.userFlow.stepThree.value += ` / ${valueSelected}`;
    }


    setSideItemStep(state, formRadioRef);
    const {name, id} = formRadioRef.current.firstChild
    clearClassesByNameSelected('div.ui.radio', name, id);
  },
  stepFourManager: (...info) => {
    const [formikValues, state] = info
    console.log({formikValues})
      state.userFlow.stepFour.value = 'Completo';
    

    setSideItemStep(state, null);
    console.log('step4',{info})
  },
  stepFiveManager: (...info) => {
    const [formikValues, state] = info
    console.log({formikValues})
      state.userFlow.stepFour.value = 'Completo';

    setSideItemStep(state, null);
    console.log('step5',{info})
  }
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

  const [currentStep, ...rest] = info;
  console.group('delegateManager', { info });

  switch (currentStep.step) {
    case 1:
      stepOneManager(...rest);
      break;
    case 2:
      stepTwoManager(...rest);
      break;
    case 3:
      stepThreeManager(...rest);
      break;
    case 4:
      stepFourManager(...rest);
      break;
    case 5:
      stepFiveManager(...rest);
      break;
    default:
      
      break;
  }
  console.groupEnd();
};



export const validateStep = (actualStep, direction, state, sideItemOptions, setCurrentStep) => {
  const validateResponse = { hasError: true };
  const indexOfActualStep = actualStep - 1;
  const indexOfNextStep = indexOfActualStep + 1;
  const indexOfPrevStep = indexOfActualStep > 0 ? indexOfActualStep - 1 : 0;

  console.error({actualStep, direction, state, sideItemOptions, setCurrentStep})
  
  if(direction === 'next'){

    state.sideItemOptions.forEach(({ status, value }) => {
     // console.log({status, value})
      if (status === 'current' && value !== '') {
        
        sideItemOptions[indexOfActualStep].status = 'completed';

        // Set next step
        sideItemOptions[indexOfNextStep].status = 'current';
        
        validateResponse.hasError = false;
        setCurrentStep(s => s + 1)
      }
      
    });

  }else{
    delegateManager(actualStep)

    sideItemOptions[indexOfActualStep].status = '';
    sideItemOptions[indexOfPrevStep].status = 'current';
   
    validateResponse.hasError = false;
    setCurrentStep(s => s - 1)
   
  }

  if (validateResponse.hasError) {
    fireToast('Debe seleccionar una opcion para avanzar');
  }
}









