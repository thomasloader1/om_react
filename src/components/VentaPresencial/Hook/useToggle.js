import { useState } from 'react';

export const useToggle = (value) => {
  const [expand, setExpand] = useState(value);

  const toggleState = () => {
    setExpand((prevState) => !prevState);
    console.log('se ejecuto');
  };
  return { expand, toggleState };
};
