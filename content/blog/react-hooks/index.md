---
title: React Hooks vs Classes
description: " "
---

Since React is so popular among modern developers today, this blog is intended to give you the pros and cons of react hooks vs classes through React 16.8's release of **`useState()`** and **`useEffect()`**'s hooks api.

![](react-hooks.png)

**THE PROBLEM**: React doesn’t provide a stateful primitive simpler than a class component - _Dan Abramov, React.js conf._

First we we will discuss state, then we will go over what **hooks** and **classes** are in React. Finally, we'll see how the release of hooks in **React 16.8** solved the following pain points:

**1**. **Managing State**: **Reusing logic between multiple components** can lead to _wrapper hell_ or deeply nested components.

![](./wrapper-hell.png)

**2**. **Side Effects**: **Unrelated mixed in logic** in lifecycle methods can get repetitive, and cause unnecessary _side effects_.

**3**. **Optimization**: Classes are simply **not optimal for compilers**.

## Managing Local State

<h4 align="center">What is state in React?</h4>
In simple terms, state is simply an object which contains all your key-value pairs which determines how your components render & behave.

State allows your component to be dynamic and interactive.

In order to access and manage state in a class you have to initialize `this.state` as an object within your `constructor()`, name your local state as a key, and set its initial value as the key's value.

Furthermore, it is recommended to call `setState()` every time you want to modify state correctly.

<h4 align="center">How classes manage local state in React</h4>

Class components come from ES6 classes and is the default method for managing local state. It also allows for side effects to occur through lifecycle methods.

_Here is a simple example of a counter with an increment button written in a class._

```
import React from 'react'

class Counter extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 0
    }
    this.handleIncrement = this.handleIncrement.bind(this)
  }

  handleIncrement() {
    this.setState({
      counter: this.state.counter += 1
    })
  }

  render() {
    return (
      <div>
        <div>{this.state.counter}</div>
        <hr />
        <button type="button" onClick={this.handleIncrement}>+</button>
     </div>
    )
  }
}
```

In order to set up a class component, you need a fair bit of boilerplate code which is not limited to your conventional `constructor()` within your class, and the `super()` for extending the component.

For instance, it is necessary to add the `this` context in class components.

We would need to bind the concept of `this` because of **implicit binding** in vanilla JavaScript.

_When we pass the event handler function reference as a callback like this:_

`<button type="button" onClick={this.handleIncrement}>+</button>`

We lose the context of `this` because `handleIncrement()` becomes just a regular function call without an owner object.

In this case, the value of `this` falls back to default binding and points to the global object or undefined if the function being invoked is using strict mode.

Finally, we need to wrap our return statement in the `render()` function.

<h4 align="center">How React hooks manage local state</h4>

![](hooks.png)

**Note:** Hooks are completely on an opt-in basis and 100% backwards-compatible. This means you don’t have to learn or use hooks right away and there will be no breaking changes when adding or refactoring your classes.

Hooks allow you to use local state and other React features without writing a class.

Hooks are special functions that lets you "hook onto" React state and lifecycle features inside function components.

**Important: React internally can't keep track of hooks that run out of order. Since hooks return an array, the order that they get called matters.**

There are **two rules** for hooks:

**1.** **_Only call hooks at the top level, do not nest your hooks in any logic._**

`// DO NOT DO THIS! if (bool) { const [counter, incrementCounter] = useState(0) }`

**2.** _Only call hooks from React functions or custom hooks._

Since React components are re-rendered each time data changes, this means the **exact same hooks** must be called in the **exact same order** on every single render. If we wrapped it in a conditional or function, the state would sometimes be created and sometimes wouldn't be.

For example, **`useState()`** is a hook that lets you add React state to function components.

_This is the same example but written without a class and instead with hooks:_

```
import React, {useState} from 'react'

function Counter() {
  const [counter, incrementCounter] = useState(0)

  function handleIncrement() {
    incrementCounter(counter + 1)
  }

  return (
    <div>
      <div>{counter}</div>
      <hr />
      <button type="button" onClick={handleIncrement}>+</button>
    </div>
  )
}
```

By importing and calling `useState()` it declares a "state variable" `counter` with a value of whatever argument is being passed into `useState()`. In this case, our state variable `counter` has a value of zero.

`useState()` only takes one argument, the initial state.

**Note**: **_`useState()`'s argument is not limited to an object, it can be a primitive e.g. numbers, strings, boolean, etc._**

`useState()` returns a pair of values, the current state and a function that updates it.

_By destructuring our array into two variables, we can use a more declarative approach, since we know the first value returned in the array is the current state, and the second value is the function that updates the state._

This is a concept called [coupling](<https://en.wikipedia.org/wiki/Coupling_(computer_programming)>) in programming and by closely grouping the two values we know they are closely dependent on one another.

Therefore our current state is the value of `count` and our `incrementCounter` is the function that updates `count`.

**Note**: `incrementCounter()` needs to be wrapped in a function and passed as a prop into our button.

Notice how each variable correlates with its respective value, and our functions stay **DRY** and **reusable**.

In addition, there is no need for the `this` context saving us some finger strength and time.

## What is a side effect?

![](side-effects.png)

A side effect is generally anything that affects something outside the scope of the function being executed, or in the context of React - anything that modifies some state outside of its local environment.

Common side effects include data fetching, setting up subscriptions, and manually changing the DOM in React components.

In the case of React, there are two common cases of side effects which include those that don’t and those that do require cleanup.

Examples of effects without cleanup are network requests, manual DOM mutations, and logging. This is because we run them and immediately forget about them.

**Side effects using classes im React**

**Class Example** w/ DOM mutation:

```
import React from 'react'

class Counter extends React.Component {
  constructor() {
    super()
    this.state = {
    	counter: 0
    }
    this.handleIncrement = this.handleIncrement.bind(this)
  }

  componentDidMount() {
    document.title = this.state.counter;
  }

  componentDidUpdate() {
    document.title = this.state.counter;
  }

  handleIncrement() {
    this.setState({
      counter: this.state.counter += 1
    })
  }

  render() {
    return (
      <div>
        <div>{this.state.counter}</div>
        <hr />
        <button type="button" onClick={this.handleIncrement}>+</button>
     </div>
    )
  }
}
```

This is an example of a side effect being introduced through React’s lifecycle methods found in
Classes. E.g. `componentDidMount()`, `componentDidUpdate()`, `componentWillUnMount()`

In this example, the `componentDidMount()` “mounts” or sets up the title of the document to be the current count of the local state.

The `componentDidUpdate()` is invoked as soon as the updating happens, the most common use case for `componentDidUpdate()` is updating the DOM in response to a prop or state change.

If we wanted to reset the count, we would also need a componentWillUnMount().

_Here is a better read on lifecycle methods - [React Lifecycle Methods - A Deep Dive by Mosh Hamedani](https://programmingwithmosh.com/javascript/react-lifecycle-methods/) if you are interested in learning more about lifecycle methods._

**Side effects using React hooks**

**Function Example** with the **`useEffect()`** hook:

```
import React, {useState} from 'react'

function Counter() {
  const [counter, incrementCounter] = useState(0)

  useEffect(() => {
    document.title = counter
  })

  function handleIncrement() {
    incrementCounter(counter + 1)
  }

  return (
    <div>
      <div>{counter}</div>
      <hr />
      <button type="button" onClick={handleIncrement}>+</button>
    </div>
  )
}
```

`useEffect()` tells your component to do something after every render.

React will remember the callback being passed in, and call it after the DOM updates.

`useEffect()` **_is placed inside our function component because we want to have access to our local state count._**

Additionally `useEffect()` runs after every render, therefore it is like a `componentDidMount()`, `componentDidUpdate()`, and `componentWillUnMount()` all in one.

_During our 3 week capstone at Fullstack Academy of Code we utilized functional components with hooks using `useEffect()` to fetch NYC OPEN DATA and remote custom databases in arcGIS._

_Here is our [Github: VisualNYC](https://github.com/1904cs-charlie-owl/VisualNYC) and our [features](https://rickylau.dev/visualnyc/)_, if you are interested.

## Optimizing Performance by Skipping Effects

**Class Example**:

Cleaning up and applying the effect after every render is task heavy and we might right run into issues or bugs.

In **class** components, we can combat this by adding an extra conditional into our `componentDidUpdate` function and passing in **`prevProps`** and **`prevState`** as parameters.

_If for instance, we wanted to limit our title to be a maximum count of 10:_

```
import React from 'react'

class Counter extends React.Component {
  constructor() {
    super()
    this.state = {
    	counter: 0
    }
    this.handleIncrement = this.handleIncrement.bind(this)
  }

  componentDidMount() {
    document.title = this.state.counter;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.counter <= 10) {
    document.title = this.state.counter;
    }
  }

  handleIncrement() {
    this.setState({
      counter: this.state.counter += 1
    })
  }

  render() {
    return (
      <div>
        <div>{this.state.counter}</div>
        <hr />
        <button type="button" onClick={this.handleIncrement}>+</button>
     </div>
    )
  }
}
```

**Hooks Example:**

With **hooks**, we can simply pass a second argument into `useEffect()` as an array with count in it and add the conditional inside our `useEffect()`.

**_Whatever is being passed into the array can be used to define all variables on which the hook depends. If one of the variables updates, the hook runs again._**

Keep in mind, if you pass an empty array, the hook doesn't run when updating the component at all because there is nothing to watch for. This is useful when you are fetching data in a loop, and you only want to fetch it on `componentDidMount()`, therefore stopping the loop.

```
import React, {useState} from 'react'

function Counter() {
  const [counter, incrementCounter] = useState(0)

  useEffect(() => {
    if (counter <= 10) {
      document.title = counter
    }
  }, [counter])

  function handleIncrement() {
    incrementCounter(counter + 1)
  }

  return (
    <div>
      <div>{counter}</div>
      <hr />
      <button type="button" onClick={handleIncrement}>+</button>
    </div>
  )
}
```

_We would pass [counter] into the second argunent of useEffect()._

If you are interested in learning more about hooks like accessing context api, etc. - [link to context api](https://reactjs.org/docs/hooks-reference.html#usecontext)

While, hooks solved many of the pain points that we experienced using classes in React, there are still other use cases for classes.

Again this guide was **not meant** to convince you to use hooks or completely refactor your classes to hooks.

If you are really interested in learning more about hooks, try to apply the concepts to new projects you initiate in the future instead.

Until next time. **Happy Coding!** - *RL*
