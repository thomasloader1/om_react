import { clearByCountrySelected, clearByNameSelected } from "./clearClasses";
import { updateSideItemStep } from "./updateSideItemStep";

export const StepOneManager = (...info) => {
    console.group("StepOneManager", { info })
    const [formRadioRef, idElement, state, formik, userInfo, setUserInfo] = info;

    const country = formRadioRef.current.value.toLowerCase();
    const [_, isoRef] = idElement.split('_');
    formRadioRef.current.id = country;

    /* state.userFlow.stepOne.value = country;
    state.userFlow.stepOne.isoRef = isoRef; */
    console.log({ country, isoRef }, { formRadioRef, idElement, state, formik, userInfo, setUserInfo })


    clearByCountrySelected('button.grid-country-item', country);
    updateSideItemStep(state, formRadioRef);
    setUserInfo({
        ...userInfo,
        stepOne: {
            ...userInfo.stepOne,
            value: country,
            isoRef
        }
    })

    console.groupEnd()
}

export const stepTwoManager = (...info) => {
    console.group("stepTwoManager", { info })
    const [formRadioRef, _, state, formik, userInfo, setUserInfo] = info;
    userInfo.stepTwo.value = formRadioRef.current.value;
    updateSideItemStep(state, formRadioRef);
    console.groupEnd()
}

export const stepThreeManager = (...info) => {
    console.group("stepThreeManager", { info })

    const [formRadioRef, valueSelectedFromRadio, state, formik, userInfo, setUserInfo] = info;
    const { value: stateStepTwo } = userInfo.stepTwo;

    if (stateStepTwo === 'Mercado Pago') {
        userInfo.stepThree.value = valueSelectedFromRadio
    }

    if (stateStepTwo !== 'Mercado Pago' && valueSelectedFromRadio === 'med_tarjeta' || valueSelectedFromRadio === 'med_link') {
        userInfo.stepThree.value = valueSelectedFromRadio;
    } else if (stateStepTwo !== 'Mercado Pago' && valueSelectedFromRadio.startsWith('mod')) {
        userInfo.stepThree.value += ` / ${valueSelectedFromRadio}`;
    }

    updateSideItemStep(state, formRadioRef);

    const { name, id } = formRadioRef.current
    clearByNameSelected('button.grid-country-item', name, id);
    console.groupEnd("stepThreeManager", { info })

}

export const stepFourManager = (...info) => {
    const [formRadioRef, _, state, formik, userInfo, setUserInfo] = info
    console.log({ formRadioRef })
    userInfo.stepFour.value = 'Completo';

    updateSideItemStep(state, formRadioRef);
    console.log('step4', { info })
}

export const stepFiveManager = (...info) => {
    const [formikValues, state] = info
    console.log({ formikValues })
    state.userFlow.stepFour.value = 'Confirmado';

    updateSideItemStep(state, null);
    console.log('step5', { info })
}