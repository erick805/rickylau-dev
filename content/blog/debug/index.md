---
title: Beginner Friendly Guide on how to debug in test driven development
description: " "
---

![](2019-09-12-16-03-49.png)

This guide is written to give you a beginner friendly blueprint to follow, so you know exactly where, and what to `console.log()`.

So you can save steps and headaches when debugging in a JavaScript environment.

_We will go over two examples:_

**1**. **Jasmine & vanilla JavaScript**

**2**. **Mocha Enzyme & React JSX.**

_I am also going to refer to the acronym -_

**C** - **Clean your code environment** & make sure you are in the right test suite

**A** - **Approach** your **where** and **what** to `console.log()`

**R** - **Read** the **developer tools** & **testing environment error** messages

**D** - **Double check** if you have any **infinite logic** and in the **right scope**

So next time when you approach a unit test, you will know. did I CARD it? or CRAD it?

##C - Clean your code environment & make sure you are in the right test suite.

**Isolate your unit test**:

Before anything make sure you have only **ONE** set of testing suite open each time.

Make sure you are looking at the right suite of test specs and click on the spec if you can, change into directory — if there is a deeper directory & run test script, pending other test specs manually works as well.

By doing so you are isolating your unit test spec environment and all function calls will focus only on that block of code.

![](2019-09-20-23-28-51.png)

**Zero Linting Errors**:

**Make sure there are no major linter errors and have a linter installed on your code editor! Otherwise, you will not be able to see your outputs in the console.**

**Always write with tidy code and see if you have any syntax or reference errors.**

_Here we have an example of an unclean code environment._

```js
25 class Stack {
26  constructor() {
27    this.store = []
28  }
29
30  getStack() {
31    return this.stoer
32  }
33
34  add(item) {
35    this.store.push(item);
36
37    return this
38  }
39
40  remove: () {
41    return this.store.pop()
42  }
43
```

If you look closely, you will notice the signals your developer tools and code editor are giving to you if you have a linter installed.

Otherwise, the unit test is giving us a hint - apparently our stack class is not even defined.

![](2019-09-07-20-59-53.png)

This brings my attention to the beginning and end of my function - lines _40-43_ and _25-28_.

After examining my code, I noticed that I was missing a closing bracket because when I clicked on the last bracket on my class.

It indicated to me that the closing bracket was on my remove method.

_Notice the transparent rectangles around my curly brackets. When they are both highlighted this indicates the opening and closing bracket of the current bracket you clicked on, whether its opening or closing._

![](2019-09-07-21-01-01.png)

Hint: _Click on the last bracket of your nested functions or objects, to see where the opening or closing brackets end for each bracket declaration. For nested brackets, I use Rainbow Brackets from VS code extensions for easy bracket distinctions through colors._

Double check to make sure you have zero linter errors one more time.

##A - Approach your where & what to `console.log()`

**Where** - in what line of code and where in the line

A lot of unit tests will give you hints if you read its final expected definition.

In this case, our unit test was more clear to find my where.

**However it is always on a case by case basis, so it is better to always read the test specs with developer tools opened at the same time to approach your where and what to `console.log()`.**

![](2019-09-07-21-04-08.png)

It says expected “undefined” to equal “[ ]”. Clearly our `getStack()` method is returning `undefined` instead of an empty array.

This indicates lines _30–32_ of my `getStack()` method. I realized I misspelled `this.store` in my `constructor()`. I quickly make adjustments, without any needed `console.log()` and get all my test specs to run.

```js
30 getStack() {
31  return this.store
32 }
```

##R - Read the developer tools & testing environment error messages.

```js
09 // C - clean your code environment & make sure you are in the right test suite.
10 // A - approach your where and what to console.log
11 // R - read the developer tools & testing environment error messages.
12 // D - double check if you have any infinite logic and/or within the right scope

13
14 return (
15  <div>
16    <button type="button onClick={adoptPet}> Adopt Me! </button>
17    <select onChange={petPreview}>{pets.map(pet => (<option key={pet}>{pet.name}
18    </option>
19    ))}
20   </select>
21  </div>
22 )

```

![](2019-09-07-21-19-26.png)
Picture A.

![](2019-09-07-21-20-21.png)
Picture B.

Sometimes your test spec messages and developer settings are useful in finding the error and you still need to detective your way to where & what to `console.log()`.

_For example in this mocha test spec for JSX._

From picture A. I notice my adoptionForm component is broken and specifically my option JSX key property is not rendering the key property with the pet’s name.

![](2019-09-07-21-21-43.png)

I go to my adoptionForm component, and go to line _18_ where my option tag is being rendered by React.

**What** - what variables are we using in our `console.log()`

Based on early suggestion the render key prop is not rendering the right value, so why don’t we `console.log(pet)`.

```js
16 <button type="button onClick={adoptPet}> Adopt Me! </button>
17  <select onChange={petPreview}>{pets.map(pet => (
18  <option console.log(pet) key={pet}>{pet.name}</option>
```

_Do you see something wrong? I hit save and I get this scary error message in Node.js_

![](2019-09-07-21-32-07.png)

My terminal is telling me there is something wrong with line _18_ and particularly the `console.log(pet)` as indicated by two red arrows.

This brings us to our final acronym D.

##D - Double check if you have any infinite logic and/or within the right scope

This is often forgotten and so detrimental because sometimes we don’t see our ourputs or even worse our laptop overloads.

**This can simply be because of a poorly scoped and misplaced console.log() that is causing a parsing error or an infinite loop in our code.**

In our case, this is a poorly scoped `console.log()`, because my linter is yelling at me. Which bounces us back to point C - _clean your code environment first_.

I realized in JSX, you have to `console.log()` inside curly brackets and I move my `console.log()` inside my key property and replace the logic inside with `console.log()` and I attach a primitive string before it to easily label my `console.log()`.

```js
16 <button type="button onClick={adoptPet}> Adopt Me! </button>
17  <select onChange={petPreview}>{pets.map(pet => (
18  <option  key={console.log("pet: ", pet)}>{pet.name}</option>
```

I open up my developer tools and notice I am getting back an object instead of a name string.

I refactor my code to console.log pet's name.

```js
16 <button type="button onClick={adoptPet}> Adopt Me! </button>
17  <select onChange={petPreview}>{pets.map(pet => (
18  <option  key={console.log("pet's name: ", pet.name)}>{pet.name}</option>
```

Long behold, I got what I wanted and I realized I was not dotting my pet object to extract the name, instead I was just rendering the entire pet object as a value for the key, which is not unique.

I change the value of my key prop to pet.name instead of pet and I pass the test!

In conclusion, there are a countless ways to debug in test driven development but wihout a proper foundation you can be running in circles only to find out you were missing a closing bracket.

Having the proper environment and knowing your do's and don'ts in tdd can really make or break a novice from a seasoned engineer.

Until next time. I hope you will **CARD** it when the comes. Happy Coding! - _RL_
