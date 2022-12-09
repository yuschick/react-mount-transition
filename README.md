# React Mount Transition

React Mount Transition is a minimal hook that allows an element to be transitioned in and out on mount without needing to already be rendered in the DOM. It is perfect for overlay components like tooltips, popovers and modals.

## How To Use?

```bash
npm i react-mount-transform
```

```bash
yarn add react-mount-transform
```

The goal of React Mount Transition is to be a minimal hook, both in setup and features.

To get started, import the hook into a project file.

```jsx
import { useMountTransition } from 'react-mount-transition';
```

Then instantiate the hook within a component with the two required arguments, `duration` and `isShown`.

```jsx
const { showTransitionElement, withTransitionStyles } = useMountTransition({
    duration: 150, // transition duration in milliseconds (ms)
    isShown: itemIsShown, // boolean toggle for when to render the element
});
```

The `useMountTransition` hook returns two properties to handle the mounting and transitioning of an element. In practice, these properties all work together to handle when to render and transition an element.

```tsx
export function Sample(itemIsShown: boolean) {
    const { showTransitionElement, withTransitionStyles } = useMountTransition({
      duration: 150,
      isShown: itemIsShown,
    });

    return (
      showTransitionElement ? (
        <div className={withTransitionStyles ? styles.slideIn : ''}>
          ...
        </div>
      ) : null;
    )
  }
```

## useMountTransition Hook

### Arguments

| Prop     | Type    | Description                                                     |
| -------- | ------- | --------------------------------------------------------------- |
| duration | number  | The duration of the transition / animation in milliseconds (ms) |
| isShown  | boolean | The primary on/off value to toggle rendering the element        |

### Return

| Prop                  | Type    | Description                                                                                       |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------- |
| showTransitionElement | boolean | This is the core prop to handle when and when not to render the transitioning element in the DOM. |
| withTransitionStyles  | boolean | This prop determines when the transition styles are to be applied and removed.                    |
