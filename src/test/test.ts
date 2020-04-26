import SetFP from '../index';
const test = new SetFP([0, 1, 2, 3]);

const filterSetToSet = test.filter((key) => key);
const filterSetToArray = test.filterToArray((key) => key);
const mapSetToSet = test.map((key) => 2 * key);
const mapSetToArray = test.mapToArray((key) => 2 * key);
const reduce = test.reduce((acc, curr) => acc + Number(curr), 0);
const every = test.every((key) => key < 3);
const some = test.some((key) => key < 3);

console.log(filterSetToSet);
console.log(filterSetToArray);
console.log(mapSetToSet);
console.log(mapSetToArray);
console.log(reduce);
console.log(every);
console.log(some);

const loops = [10, 100, 1000, 10000, 100000, 1000000];

const sleep = (time = 1000): Promise<unknown> =>
  new Promise((resolve) => setTimeout(resolve, time));

const run = (): void => {
  for (const loop of loops) {
    const obj: { [key: string]: boolean } = {};
    const setfp = new SetFP<boolean>();
    sleep(100);
    for (let i = 0; i < loop; i++) {
      const val = !!i;
      setfp.add(val);
      obj[i] = val;
    }
    sleep(1000);
    console.time(`${loop} obj entries`);
    Object.entries(obj).filter((entry) => entry[1]);
    // Object.keys(obj).filter(val => obj[val]);
    console.timeEnd(`${loop} obj entries`);
    sleep(1000);
    console.time(`${loop} setfp entries`);
    setfp.filter((val) => val);
    console.timeEnd(`${loop} setfp entries`);
    sleep(1000);
  }
};

run();
