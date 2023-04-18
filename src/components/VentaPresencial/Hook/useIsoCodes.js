/* eslint-disable default-case */
import { getAllISOCodes } from 'iso-country-currency';
import { useState, useEffect, useContext, useMemo } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';

export const useIsoCodes = (country) => {
  const { formikValues, appEnv, options } = useContext(AppContext);
  const [countryName, setCountryName] = useState(country);

  useEffect(() => {
    //console.log(formikValues, appEnv, country);
    if (formikValues?.country) {
      setCountryName(formikValues.country);
    } else if (appEnv?.country) {
      setCountryName(appEnv.country);
    }
  }, [formikValues?.country, appEnv?.country]);

  const allIsoCodes = useMemo(() => getAllISOCodes(), []);

  const getIsoCode = () => {
    try {
      const filterIso = allIsoCodes.filter(
        (iso) => iso.countryName === countryName
      );
      if (filterIso.length > 0) {
        const [countryObject] = filterIso;
        const { iso } = countryObject;

        return { iso: iso.toLowerCase() };
      }
    } catch (error) {
      console.log(error);
    }
    return { iso: null };
  };

  const getIsoCodeFromSide = () => {
    const [country] = options.sideItemOptionsVP;
    const clearedString = country.value.replace(/[áéíóú]/gi, function (match) {
      switch (match) {
        case 'á':
          return 'a';
        case 'é':
          return 'e';
        case 'í':
          return 'i';
        case 'ó':
          return 'o';
        case 'ú':
          return 'u';
      }
    });

    const filterIso = allIsoCodes.filter(
      (iso) => iso.countryName === clearedString
    );

    if (filterIso.length > 0) {
      const [countryObject] = filterIso;
      const { iso } = countryObject;

      return { iso: iso.toLowerCase() };
    }
    return { iso: null };
  };

  return { getIsoCode, getIsoCodeFromSide };
};
