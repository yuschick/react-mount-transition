import React, { PropsWithChildren, useEffect } from 'react';
import { MountTransitionProps } from './types';
import { useMountTransition } from './useMountTransition.hook';

export function MountTransition({
    children,
    duration,
    isShown,
    transitionClassName,
}: PropsWithChildren<
    MountTransitionProps & { transitionClassName: string }
>): JSX.Element {
    const {
        showTransitionElement,
        withTransitionStyles,
        transitionElementAttrs,
    } = useMountTransition({ duration, isShown });

    return (
        <>
            {showTransitionElement
                ? React.Children.map(children, (child) => {
                      if (React.isValidElement(child)) {
                          const updatedClassNames = `${
                              child?.props?.className
                          }${
                              withTransitionStyles
                                  ? ' ' + transitionClassName
                                  : ''
                          }`;

                          return React.cloneElement(
                              child as React.ReactElement,
                              {
                                  ...transitionElementAttrs,
                                  className: updatedClassNames,
                              }
                          );
                      }
                  })
                : null}
        </>
    );
}
