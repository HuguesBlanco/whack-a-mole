import { useMediaQuery } from 'react-responsive';

/**
 * Provides screen size and orientation details.
 *
 * @returns An object containing screen size and orientation information.
 */
export function useSreenInformation(): {
  isSmallwidth: boolean;
  isPortrait: boolean;
} {
  const isSmallwidth = useMediaQuery({ maxWidth: 991 });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

  return { isSmallwidth, isPortrait };
}
