---
title: React Hooks vs Classes
description: " "
---

##How does React work?

Since React is so popular among modern developers today, this blog is intended to give you the pros and cons of react hooks vs classes.

React is a JavaScript framework used to build user interfaces. One of the main benefits of React is its ability to maintain productivity and reusability in scale with its JSX syntax extension allowing for easier writing and processing of **components**.

In React, **components** are simply html elements written in JSX with added logic, conditions, functionality, and side effects returned in either a function or a class.

With React, you can build single page applications also known as SPA with neat features like React Router.

_Need to go mobile_? No problem - there’s React Native, without having to sacrifice the brain power of learning a completely new language or framework, you can jump straight into mobile development with a foundational knowledge of React.js.w

*H*aving performance issues or slow render times\*? React introduces the virtual DOM, where it compares new data with the original DOM and automatically updates the view.

These are just some of the benefits that come with React along with it’s growing community and influx of libraries for issues such as global state management, styled components, testing, AR/VR and the list goes on.

We will first go over what hooks and classes are in React, and how the release of hooks in React 16.8 solved the three pain points classes had

- reusing logic between multiple components can lead to wrapper hell or deeply nested components.
  -unrelated mixed in logic in life cycle methods can get repetitive, and cause unnecessary side effects.
  -lastly classes are simply not optimal for compilers as noted in reactjs.org - Introducing Hooks section.

Facebook uses a component folding library called Prepack, and they found that class components can encourage unintentional patterns that make optimizations fall back to a slower path.

**The Problem**: React doesn’t provide a stateful primitive simpler than a class component - as stated by Dan Abramov from React.js conf.

What is a class in React?

Class components come from ES6 classes and were the default method to managing local state, it also allowed for side effects to occur through lifecycle methods.

Accessing Local State:

Here is a simple example of a counter with an increment button written in a class.

CounterClass.gist

As you can see, this requires you having to set up the constructor and a super, as well as additional wrappers such as the render() function. Not to mention, you have to bind the context of this in the constructor.

What is a React Hook?

Hooks allow you to use local state and other React features without writing a class.

There are two rules of hooks:

Only call hooks at the top level, do not nest your hooks in any logic.

Only call Hooks from React functions or custom hooks.

Note: Hooks are completely on an opt-in basis and 100% backwards-compatible. This means you don’t have to learn or use hooks right away and there will be no breaking changes when adding or refactoring your classes.

This is the same example but written without a class and with hooks.

CounterHook.gist

By importing and calling useState it declares a “state variable”. In this case, our variable is called count. useState only takes one argument and that is the initial state, the state does not have to be an object. useState returns a pair of values, the current state and a function that updates it. By destructuring our array into two variables, we can closely group the two values that uses the state and affects the state. Therefore our current state is the value of count and our incrementCounter is the function that updates count.

Notice how each variable correlates with its respective value, and functions stay DRY and reusable. There is no need for the context of this anymore and I saved some finger strength and time.

Introducing Side Effects:

What is a side effect?

A side effect is generally anything that affects something outside the scope of the function being executed, or in the context of React - anything that modifies some state outside of its local environment. Common side effects include data fetching, setting up subscriptions, and manually changing the DOM in React components.

In the case of React, there are two common cases of side effects which include that those that don’t and those that do require cleanup. Examples of effects without cleanup are network requests, manual DOM mutations, and logging. This is because we run them and immediately forget about them.

Class Example:

CounterClass2.gist

This is an example of a side effect being introduced through React’s lifecycle methods found in
Classes. E.g. componentDidMount, componentDidUpdate, componentWillUnMount.

In this example, the componentDidMount “mounts” or sets up the title of the document to be the current count of the local state, the componentDidUpdate is invoked as soon as the updating happens, the most common use case for componentDidUpdate is updating the DOM in response to a prop or state change, if we wanted to reset the count, we would also need a componentWillUnMount().

Hook Example:

For our 3 week capstone at Fullstack Academy of Code we utilized functional components with hooks using useEffect() to fetch NYC OPEN DATA and remote custom databases in arcGIS. Here is our github: VisualNYC and our features - link to features.

Here is an example with useEffect():

CounterHook2.gist

useEffect tells your component to do something after every render. React will remember the callback being passed in, and call it after the DOM updates. useEffect is placed inside our function component because we want to have access to our local state count. Additionally useEffect runs after every render, therefore it is like a componentDidMount, componentDidUpdate, and componentWillUnMount all in one.

Optimizing Performance by Skipping Effects

Cleaning up and applying the effect after every render is task heavy and we might right run into issues or bugs.
In class components, we can combat this by adding an extra conditional into our componentDidUpdate function and passing in prevProps and prevState as parameters.

If we wanted to limit our title to be a maximum count of 10.

CounterClass3.gist

In hooks, we can simply pass a second argument into useEffect() as an array with count in it and add the conditional inside our useEffect. Whatever is being passed into the array can be used to define all variables on which the hook depends. If one of the variables updates, the hook runs again.

Important: If you pass an empty array, the hook doesn’t run when updating the component at all because their is nothing to watch for. This is useful when you are fetching data in a loop, and only want to fetch it on componentDidMount(), therefore stopping the loop.

CounterHook3.gist

If you are interested in learning more about hooks like accessing context api …. - link to context api.

In conclusion hooks solved many of the pain points that classes had which were
difficulty in reusing logic between multiple components
giant components - too many lifecycle methods, and unrelated & repetitive code.
Not human and machine friendly in some cases

Hooks solved all these problems and brings the benefits of functional reusability to React.

There are many use cases for classes and they are still loved and adored by many in React for a reason, for example, if you wanted to break down your side effects into specific life cycle methods or if you needed a small piece component level state.

This blog guide was not meant to sway you into using hooks or completely refactoring your classes to hooks. I would stay away from big application refactoring, and if hooks really do interest you, try to apply the concept to new projects you will be working on instead. This is my personal preference and experience with hooks and classes in React.

Until next time. Happy Coding! - RL
