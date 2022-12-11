import { HTMLAttributes, useEffect, useState } from 'react';
import { MountTransitionProps } from './types';

export type MountTransitionHook = {
    showTransitionElement: boolean;
    withTransitionStyles: boolean;
    transitionElementAttrs: HTMLAttributes<HTMLElement> & { inert?: string };
};

export const useMountTransition = ({
    isShown,
    duration,
}: MountTransitionProps): MountTransitionHook => {
    const [hasTransitionedIn, setHasTransitionedIn] = useState<boolean>(false);
    const durValue =
        typeof duration === 'number'
            ? duration
            : Number(
                  getComputedStyle(document.documentElement)
                      .getPropertyValue(duration)
                      .replace(/\D+/g, '')
              );

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        if (isShown && !hasTransitionedIn) {
            setHasTransitionedIn(true);
        } else if (!isShown && hasTransitionedIn) {
            timeoutId = setTimeout(() => setHasTransitionedIn(false), durValue);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [durValue, hasTransitionedIn, isShown]);

    return {
        showTransitionElement: hasTransitionedIn || isShown,
        withTransitionStyles: hasTransitionedIn && isShown,
        transitionElementAttrs: {
            inert: !isShown ? 'true' : undefined,
        },
    };
};
