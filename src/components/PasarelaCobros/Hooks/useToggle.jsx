import { useState } from 'react';

export const useToggle = () => {
  const [expand, setExpand] = useState(false);

  const toggleState = () => {
    setExpand((prevState) => !prevState);
    console.log(expand);
  };
  return { expand, toggleState };
};
