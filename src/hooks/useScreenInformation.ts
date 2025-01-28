import { useMediaQuery } from 'react-responsive';

/**
 * Provides screen orientation details.
 *
 * @returns An object containing screen orientation information.
 */
export function useSreenInformation(): {
  isPortrait: boolean;
} {
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

  return { isPortrait };
}
