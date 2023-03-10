import { useEffect, useState } from 'react';

export function useMediaQuery(query) {
  const [state, setState] = useState({
    matches: window.matchMedia(query).matches,
    media: window.matchMedia(query),
  });

  useEffect(() => {
    const listener = () => {
      setState({
        matches: state.media.matches,
        media: state.media,
      });
    };
    state.media.addEventListener('change', listener);
    return () => state.media.removeEventListener('change', listener);
  }, [state.media, query]);

  return state;
}

export const useMediaQSmall = () => useMediaQuery('(max-width: 766px)').matches;
export const useMediaQMedium = () => useMediaQuery('(min-width: 767px)').matches;
