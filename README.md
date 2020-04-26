# SetFP
`Set` object with native `filter`, `map`,`reduce`, `every`, and `some` methods. Zero Dependencies.

https://www.npmjs.com/package/setfp

### Motivation
Sets don’t have these methods natively.  One would first need to copy an iterator into an array `[...iterator]` before using `.map`, `.filter`, `.reduce`, `every` and `some`.  SetFP allows you to use those methods natively.

## Installation
```bash
npm install setfp
```
### OR
```bash
yarn add setfp
```

# Initialize
### Javascript
```javascript
const SetFP = require("setfp").default;
const test = new SetFP([0, 1, 2, 3]);
```
### TypeScript
```typescript
import SetFP from "setfp";

// Diamond notation needed if no arguments are provided
const test = new SetFP<number>();

// OR with arguments, types are inferred.
const test = new SetFP([0, 1, 2, 3]);
```

# Usage
```javascript
const filterSetToSet = test.filter((key) => key);
SetFP [Set] { 1, 2, 3 }

const filterSetToArray = test.filterToArray((key) => key);
[ 1, 2, 3 ]

const mapSetToSet = test.map((key) => 2 * key);
SetFP [Set] { 0, 2, 4, 6 }

const mapSetToArray = test.mapToArray((key) => 2 * key);
[ 0, 2, 4, 6 ]

const reduce = test.reduce((acc, curr) => acc + Number(curr), 0);
6

const every = test.every((key) => key < 3);
false

const some = test.some((key) => key < 3);
true
```
