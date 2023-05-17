/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Provider/StateProvider';
import { useFormik } from 'formik';
import InputField from '../InputField';
import { FormStep } from './MultiStep';
import { motion } from 'framer-motion';
import * as Yup from 'yup';
import useRebill from '../Hooks/useRebill';
import { parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Campo requerido'),
  phone: Yup.string().required('Campo requerido'),
  address: Yup.string().required('Campo requerido'),
  dni: Yup.number().required('Campo requerido'),
  email: Yup.string().email('Correo electrónico no válido').required('Campo requerido'),
});

const RebillCheckoutForm = () => {
  const { contractData, formikValues } = useContext(AppContext);
  const { contact } = contractData;
  const [selectedCountry, setSelectedCountry] = useState('MX');
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [completedForm, setCompletedForm] = useState(false);
  const handlePhoneInputChange = (value) => {
    /* console.log(value, typeof value)
        if (typeof value !== 'undefined') {
            const parsedPhoneNumber = parsePhoneNumber(value);
            if (parsedPhoneNumber?.country) {
                setSelectedCountry(parsedPhoneNumber.country);
            }
        } */
    try {
      const phoneNumber = parsePhoneNumber(value);
      if (phoneNumber) {
        setPhoneNumber(phoneNumber);
        const { country } = phoneNumber;
        const findCountry = country;
        formik.setFieldValue('phone', value);

        if (findCountry) {
          setSelectedCountry(findCountry);
        }
      }
    } catch (error) {
      console.log('Número de teléfono no válido');
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: contact.Full_Name || '',
      phone: '',
      address: '',
      dni: contact.DNI || '',
      email: contact.Email || '',
      zip: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      return false;
    },
  });

  const { initRebill } = useRebill();

  useEffect(() => {
    const completedInputs = Object.values(formik.values).every(
      (v) => typeof v !== 'undefined' && v != null && v !== '',
    );

    if (completedInputs) {
      const formAttributes = { ...formik.values, phoneNumber, formikValues };
      initRebill(formAttributes);
    }
  }, [formik.values]);

  return (
    <>
      <FormStep stepNumber={5} stepName='Finaliza la compra'>
        <div id='grid-grid-payment_stripe'>
          <InputField
            type='text'
            id='fullName'
            name='fullName'
            label='Nombre del titular'
            placeholder='Ingresar nombre del titular'
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && formik.errors.fullName}
          />
          <InputField
            type='phone'
            id='phone'
            name='phone'
            label='Teléfono'
            placeholder='Ingresar número de teléfono'
            value={formik.values.phone}
            onChange={handlePhoneInputChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && formik.errors.phone}
            country={selectedCountry}
            defaultCountry='MX'
          />

          <InputField
            type='address'
            id='address'
            name='address'
            label='Dirección de facturación'
            placeholder='Dirección completa'
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && formik.errors.address}
          />

          <InputField
            type='text'
            id='zip'
            name='zip'
            label='Codigo postal'
            placeholder='Codigo postal'
            value={formik.values.zip}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.zip && formik.errors.zip}
          />

          <InputField
            type='number'
            id='dni'
            name='dni'
            label='Número de identificación'
            placeholder='Número de identificación'
            value={formik.values.dni}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dni && formik.errors.dni}
          />
          <InputField
            type='email'
            id='email'
            name='email'
            label='E-mail'
            placeholder='Ingresar e-mail'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />

          <motion.div className='checkout_stripe field mt-2'>
            <div id='rebill_elements'></div>
          </motion.div>
        </div>
      </FormStep>
      <pre>{JSON.stringify(completedForm, null, 2)}</pre>
    </>
  );
};

export default RebillCheckoutForm;
