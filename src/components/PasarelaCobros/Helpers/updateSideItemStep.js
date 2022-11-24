export const updateSideItemStep = (state, ref = null) => {
    console.group('updateSideItemStep', { state, ref });
    state.sideItemOptions.map((step) => {
        if (step.status === 'current') {
            console.log("Current step in updateSideItemStep()", { step })

            if (step.step === 3) {

                if (ref.current.name.includes('med')) {
                    step.value = ref.current.value
                }

                if (ref.current.name.includes('mod')) {
                    const hasPrev = step.value.includes('/') ? step.value.split('/').shift() : step.value

                    if (step.step === 3) {
                        step.value = `${ref.current.value}`
                    } else {
                        step.value = `${hasPrev} / ${ref.current.value}`
                    }
                }

            } else {
                step.value = ref.current.nodeName === 'BUTTON' ? ref.current.value : ref.current.firstChild.value;
            }

            return { ...step };
        }
        return { ...step };
    });
    console.groupEnd();
};
