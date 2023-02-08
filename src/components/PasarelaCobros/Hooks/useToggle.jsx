import { useState } from 'react';

export const useToggle = () => {
  const [expanded, setExpand] = useState(false);

  const toggleState = () => {
    setExpand((prevState) => !prevState);
  };
  return { expanded, toggleState };
};
