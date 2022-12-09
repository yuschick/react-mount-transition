import { HTMLAttributes, useEffect, useState } from 'react';

interface MountTransitionProps {
    duration: number;
    isShown: boolean;
}

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

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        if (isShown && !hasTransitionedIn) {
            setHasTransitionedIn(true);
        } else if (!isShown && hasTransitionedIn) {
            timeoutId = setTimeout(() => setHasTransitionedIn(false), duration);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [duration, isShown, hasTransitionedIn]);

    return {
        showTransitionElement: hasTransitionedIn || isShown,
        withTransitionStyles: hasTransitionedIn && isShown,
        transitionElementAttrs: {
            inert: !isShown ? 'true' : undefined,
        },
    };
};
