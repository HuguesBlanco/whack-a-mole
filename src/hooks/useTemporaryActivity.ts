import { useEffect, useState } from 'react';

/**
 * Provides a mechanism to manage a temporary active state for a specified duration.
 * @param duration Time in milliseconds for which the state remains active after being triggered.
 * @returns A tuple containing:
 * - `isActive`: A boolean indicating whether the state is currently active.
 * - `triggerActivity`: A function to trigger the active state.
 */
export function useTemporaryActivity(duration: number): [boolean, () => void] {
  const [isActive, setIsActive] = useState(false);

  const triggerActivity = (): void => {
    setIsActive(true);
  };

  useEffect(() => {
    if (isActive) {
      const timeout = setTimeout(() => {
        setIsActive(false);
      }, duration);

      return (): void => {
        clearTimeout(timeout);
      };
    }

    return undefined;
  }, [isActive, duration]);

  return [isActive, triggerActivity];
}
