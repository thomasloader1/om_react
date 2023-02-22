import { useContext, useState } from 'react';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';

export const useToggle = () => {
  const [expand, setExpand] = useState(false);

  const toggleState = () => {
    setExpand((prevState) => !prevState);
    console.log('se ejecuto');
  };
  return { expand, toggleState };
};
