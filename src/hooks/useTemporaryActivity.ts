import { useEffect, useState } from 'react';

/**
 * Manage temporary event
 * @param duration the time in milliseconds of the even.
 * @returns A tuple: [isActive, trigger]
 * - `visible`: Is the even triggered still active.
 * - `triggerAction`: A function to trigger the event.
 */
export function useTemporaryActivity(duration: number): [boolean, () => void] {
  const [isActive, setIsActive] = useState(false);

  const triggerAction = (): void => {
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

  return [isActive, triggerAction];
}
