import { stepFiveManager, stepFourManager, StepOneManager, stepThreeManager, stepTwoManager } from "./stepManagers";

export const delegateManager = (...info) => {
    console.group('delegateManager', { info });
    
    const [currentStep, ...rest] = info;

    if(typeof(currentStep) !== 'object' && typeof(currentStep?.step) !== 'number'){
        throw new Error("El primer parametro debe ser un objeto que tenga la informacion del paso actual")
    }

    switch (currentStep.step) {
        case 1:
            StepOneManager(...rest);
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