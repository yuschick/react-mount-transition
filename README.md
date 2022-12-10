<p align="center">
<img src="assets/react-mount-transition-logo.svg" alt="React Mount Transition logo" />
<h1 align="center">React Mount Transition</h1>
</p>

React Mount Transition is a minimal library of React utilities that allow an element to be transitioned in and out on mount without needing to already be rendered in the DOM. It is perfect for overlay components such as tooltips, popovers and modals.

## How To Use?

```bash
npm i react-mount-transform
```

```bash
yarn add react-mount-transform
```

The `react-mount-transition` exposes two utilities:

[`useMountTransition` Hook](#usemounttransition-hook)

[`<MountTransition />` Component](#mounttransition--component)

---

## useMountTransition Hook

To get started, first import the hook into a React file.

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
    const { showTransitionElement, transitionElementAttrs, withTransitionStyles } = useMountTransition({
      duration: 150,
      isShown: itemIsShown,
    });

    return (
      showTransitionElement ? (
        <div className={withTransitionStyles ? styles.slideIn : ''} {...transitionElementAttrs}>
          ...
        </div>
      ) : null;
    )
  }
```

### Arguments

| Prop     | Type    | Description                                                     |
| -------- | ------- | --------------------------------------------------------------- |
| duration | number  | The duration of the transition / animation in milliseconds (ms) |
| isShown  | boolean | The primary on/off value to toggle rendering the element        |

### Return

| Prop                   | Type                          | Description                                                                                                                                                 |
| ---------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| showTransitionElement  | boolean                       | This is the core prop to handle when and when not to render the transitioning element in the DOM.                                                           |
| transitionElementAttrs | HTMLAttributes\<HTMLElement\> | An object of properties returned to the transitioning element. Currently, this handles `inert` values for improved accessibility during element transition. |
| withTransitionStyles   | boolean                       | This prop determines when the transition styles are to be applied and removed.                                                                              |

---

## `<MountTransition />` Component

In some situations the `useMountTransition` hook won't work, for example, if iterating over `children`, or conditionally rendering an element. In those instances, the `<MountTransition>` wrapper component can be used.

The `<MountTransition>` component uses the `useMountTransition` hook under the hood.

To get started, first import the component into a React file.

```jsx
import { MountTransition } from 'react-mount-transition';
```

Use the `<MountTransition />` component to wrap the transitioning element, providing the required props: `duration`, `isShown` and `transitionClassName`.

```tsx
return (
    <MountTransition
        duration={150}
        showPanel={itemIsShown}
        transitionClassName={styles.slideIn}
    >
        <div className="some-transitioning-element"> ... </div>
    </MountTransition>
);
```

### Arguments

| Prop                | Type    | Description                                                                                                                 |
| ------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| duration            | number  | The duration of the transition / animation in milliseconds (ms)                                                             |
| isShown             | boolean | The primary on/off value to toggle rendering the element                                                                    |
| transitionClassName | string  | The class name to toggle when the element is transitioned. This will be appended to any existing classnames of the element. |
