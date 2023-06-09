import { useFormikContext } from 'formik';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../Provider/StateProvider';
import ButtonField from '../RadioButton/ButtonField';
import { FormStep } from './MultiStep';
import { fireModalAlert } from '../Hooks/useSwal';

function SelectCountryStep() {
  const { options, setOptions, userInfo, setUserInfo, appEnv, contractData } =
    useContext(AppContext);

  const { countryOptions } = options;
  const { stepOne } = userInfo;
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (appEnv != null && typeof appEnv?.country !== 'undefined') {
      //console.log('SelectCountry', { appEnv });
      setFieldValue('country', appEnv.country);
      const [countrySelected] = countryOptions.filter((option) => option.value === appEnv.country);

      const { sideItemOptions } = options;
      const { stepOne } = userInfo;

      sideItemOptions[0].value = countrySelected.value;
      stepOne.isoRef = countrySelected.idElement;
      stepOne.value = countrySelected.value;

      setOptions({
        ...options,
        sideItemOptions: [...sideItemOptions],
      });

      setUserInfo({
        ...userInfo,
      });
    }
  }, [appEnv]);

  return (
    <FormStep stepNumber={1} stepName='Selecciona un país'>
      <div id='pais-grid' className='grid-country'>
        {countryOptions.map(({ active, ...props }) => (
          <ButtonField
            {...props}
            className={`grid-country-item button ${props.value === stepOne.value && 'active'}`}
            showText={true}
            id={props.idElement}
            name='country'
            key={props.idElement}
            disabled={!active}
            onClick={() => {
              if (contractData?.sale?.Pais === props.value) {
                const { sideItemOptions } = options;
                const { stepOne } = userInfo;

                sideItemOptions[0].value = props.value;
                stepOne.isoRef = props.idElement;
                stepOne.value = props.value;

                setOptions({
                  ...options,
                  sideItemOptions: [...sideItemOptions],
                });

                setUserInfo({
                  ...userInfo,
                });
              } else {
                fireModalAlert(
                  'País Inválido',
                  `El país del Contrato es <b>${contractData?.sale?.Pais}</b>, si esto no debería ser así cambia el país desde el CRM y vuelva a cargar la página`,
                );
              }
            }}
          />
        ))}
      </div>
      {/* <pre>{JSON.stringify(contractData?.sale?.Pais, null, 2)}</pre> */}
    </FormStep>
  );
}

export default SelectCountryStep;
