import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../Provider/StateProvider';
import FormNavigation from '../StepControl/FormNavigation';

const MultiStep = ({ children, initialValues, className, onSubmit, stepStateNumber }) => {
    const { options, setOptions, stepNumberGlobal, setStepNumberGlobal } = useContext(AppContext)
    const {stepNumber, setStepNumber} = stepStateNumber;
    const [spanshot, setSpanshot] = useState(initialValues);
    const steps = React.Children.toArray(children);

    const step = steps[stepNumber];
    const totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;

    const next = (values) => {
        setSpanshot(values)
        const indexOfNextStep = stepNumber + 1;
        options.sideItemOptions[stepNumber].status = 'completed';
        options.sideItemOptions[indexOfNextStep].status = 'current';
        setOptions({ ...options })
        setStepNumber(stepNumber + 1)
        setStepNumberGlobal(stepNumberGlobal + 1)
        console.log('next',{stepNumber, stepNumberGlobal})
    }
    const previous = (values) => {
        setSpanshot(values)
        const indexOfPrevStep = stepNumber - 1;
        options.sideItemOptions[stepNumber].status = '';
        options.sideItemOptions[indexOfPrevStep].status = 'current';
        setOptions({ ...options })
        setStepNumber(stepNumber - 1)
    }

    const handleSubmit = async (values, actions) => {

        if (step.props.onSubmit) {
            await step.props.onSubmit(values)
        }

        if (isLastStep) {
            return onSubmit(values, actions)
        } else {
            actions.setTouched({})
            next(values)
        }
    }

    useEffect(() =>{
        setStepNumber(stepNumberGlobal)
    },[stepNumberGlobal])
    // console.log({stepValidationSchema: step.props.validationSchema, step})
    return (
        <Formik initialValues={spanshot} onSubmit={handleSubmit} validationSchema={step.props.validationSchema}>
            {(formik) => (
                <Form className={className}>
                    {step}
                    <FormNavigation isLastStep={isLastStep} hasPrevious={stepNumber > 0} onBackClick={() => previous(formik.values)} />
                </Form>
            )}
        </Formik>
    )
}

export default MultiStep
export const FormStep = ({ stepNumber = 0, stepName = '', children }) => {
    return (
        <>
            {stepNumber !== 0 && (
                <h2 className="title is-4">
                    <span className="has-text-white has-background-black is-circle">
                        {stepNumber}
                    </span>
                    {stepName}
                </h2>
            )}
            {children}
        </>
    )
}