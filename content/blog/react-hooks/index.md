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

## Managing Local State:

<h4 align="center">What is state in React?</h4>
In simple terms, state is simply an object which contains all your key-value pairs which determines how your components render & behave.

State allows your component to be dynamic and interactive.

In order to access and manage state in a class you have to initialize `this.state` as an object within your `constructor()` and name your local state as a key and set its initial value as the key's value.

Furthermore, it is recommended to call `setState()` every time you want to modify state correctly.

<h4 align="center">What is a class in React?</h4>

Class components come from ES6 classes and were the default method for managing local state, it also allowed for side effects to occur through lifecycle methods.

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

The return needs to be wrapped in a `render()` lifecycle function and it is necessary to add the context of this in object oriented programming.

Not to mention, you have to bind the context of this in the `constructor()`.

<h4 align="center">What is a React Hook?</h4>

![](hooks.png)

<p align="center">Hooks allow you to use local state and other React features without writing a class.

A Hook is a special function that lets you "hook onto" React features.

For example, `useState()` is a hook that lets you add React state to function components.</p>

There are **two rules** of hooks:

**1.** _Only call hooks at the top level, do not nest your hooks in any logic._

**2.** _Only call Hooks from React functions or custom hooks._

**Note:** Hooks are completely on an opt-in basis and 100% backwards-compatible. This means you don’t have to learn or use hooks right away and there will be no breaking changes when adding or refactoring your classes.

This is the same example but written without a class and instead with hooks.

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

By importing and calling useState() it declares a "state variable" counter with a value of whatever argument is being passed into useState() . In this case, our state variable counter has a value of zero.

`useState()` only takes one argument and that is the initial state, the state does not have to be an object.

**Note**: **_`useState()`'s argument is not limited to an object, it can be a primitive e.g. numbers, strings, boolean, etc._**

`useState()` returns a pair of values, the current state and a function that updates it.

By destructuring our array into two variables, we can use a more declarative approach by closely grouping the two values whom which uses the state and affects the state.

This is a concept called coupling in programming and by closely grouping the two values we know they are closely dependent on one another.

Therefore our current state is the value of `count` and our `incrementCounter` is the function that updates `count`.

Notice how each variable correlates with its respective value, and functions stay **DRY** and **reusable**.

There is no need for the context of `this` anymore and I saved some finger strength and time.

## Introducing Side Effects:

![](side-effects.png)

<h4 align="center">What is a side effect?</h4>

A side effect is generally anything that affects something outside the scope of the function being executed, or in the context of React - anything that modifies some state outside of its local environment.

Common side effects include data fetching, setting up subscriptions, and manually changing the DOM in React components.

In the case of React, there are two common cases of side effects which include those that don’t and those that do require cleanup.

Examples of effects without cleanup are network requests, manual DOM mutations, and logging. This is because we run them and immediately forget about them.

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

Here is a better read on lifecycle methods - [React Lifecycle Methods - A Deep Dive by Mosh Hamedani](https://programmingwithmosh.com/javascript/react-lifecycle-methods/) if you are interested in learning more about lifecycle methods.

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

**Optimizing Performance by Skipping Effects**

**Class Example**:

Cleaning up and applying the effect after every render is task heavy and we might right run into issues or bugs.

In **class** components, we can combat this by adding an extra conditional into our componentDidUpdate function and passing in **`prevProps`** and **`prevState`** as parameters.

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

In **hooks**, we can simply pass a second argument into `useEffect()` as an array with count in it and add the conditional inside our `useEffect()`.

**_Whatever is being passed into the array can be used to define all variables on which the hook depends. If one of the variables updates, the hook runs again._**

**Important**: If you pass an empty array, the hook doesn’t run when updating the component at all because there is nothing to watch for. This is useful when you are fetching data in a loop, and you only want to fetch it on `componentDidMount()`, therefore stopping the loop.

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

If you are interested in learning more about hooks like accessing context api, etc. - [link to context api](https://reactjs.org/docs/hooks-reference.html#usecontext)

**In conclusion**, hooks solved many of the pain points that classes had:

**1**. **difficulty** in **reusing logic** between **multiple components**

**2**. **giant components** - too many lifecycle methods, and unrelated & repetitive code

**3**. **Not human** and **machine friendly** in some cases

![](functional.png)

_[So You Want to be a Functional Programmer - Charles Scalfani](https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-1-1f15e387e536)_ _is a great read about what is functional programming, and how to get into the mindset of functional programming._

But in the end, there are still many use cases for classes and they are still loved and adored by many in React for a-lot of reasons.

_For example, if you wanted to break down your side effects into specific lifecycle methods_

Again this blog guide was **not meant** to sway you into using hooks or completely refactoring your classes to hooks.

In fact, I would stay away from big application refactoring, and if hooks really do interest you, try to apply the concepts to new projects you will be working on instead.

This has been my personal preference & experience with hooks and classes in React, and I hope you left a little bit wittier about React after reading this blog.

Until next time. **Happy Coding!** - _RL_
