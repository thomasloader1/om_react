import { useContext, useState } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';

export const useToggle = () => {
  const [expand, setExpand] = useState(false);

  const toggleState = () => {
    setExpand((prevState) => !prevState);
  };
  return { expand, toggleState };
};
