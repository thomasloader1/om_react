import { fireToast } from "../Hooks/useSwal";

export const validateStep = ({actualStep, direction, options, sideItemOptions, setCurrentStep}) => {
    const validateResponse = { hasError: true };
    const indexOfActualStep = actualStep - 1;
    const indexOfNextStep = indexOfActualStep + 1;
    const indexOfPrevStep = indexOfActualStep > 0 ? indexOfActualStep - 1 : 0;
  
    // console.log("validateStep",{actualStep, direction, sideItemOptions, setCurrentStep})
  
    const setCompletedSideItem = (direction) => {
      if(direction === 'next'){
  
        options.sideItemOptions.forEach(({ status, value }) => {
          // // console.log({status, value})
           if (status === 'current' && value !== '') {
             
             options.sideItemOptions[indexOfActualStep].status = 'completed';
     
             // Set next step
             options.sideItemOptions[indexOfNextStep].status = 'current';
             
             validateResponse.hasError = false;
             setCurrentStep(s => s + 1)
           }
           
         });
      }
    }

    const setCurrentSideItem = (direction) => {
      if(direction === 'back'){
        options.sideItemOptions.forEach(({ status, value }) => {
            options.sideItemOptions[indexOfActualStep].status = '';
            options.sideItemOptions[indexOfPrevStep].status = 'current';
           
            validateResponse.hasError = false;
            setCurrentStep(s => s - 1)
         });
      }
    }
    
    
    if(direction === 'next'){
      setCompletedSideItem(direction)
    }else{
      setCurrentSideItem(direction)     
    }
  
  
    if (validateResponse.hasError) {
      fireToast('Debe seleccionar una opcion para avanzar');
    }
  }