/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
console.time('APP');
const testSet = new Set();

console.log('Setting up');

for (let i = 0; i < 1000000; i++) {
  testSet.add(i);
}
console.log('Testing..\n');

console.time('forEach');
// eslint-disable-next-line prettier/prettier
testSet.forEach(function (_value, _key) { });
console.timeEnd('forEach');

console.time('entry');
for (const _entry of testSet) {
}
console.timeEnd('entry');

console.timeEnd('APP');
