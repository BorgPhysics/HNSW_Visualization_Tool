import { Feder, FederCore } from '../esm/index.js';
import { csv } from 'd3-fetch';

import * as fs from 'fs';

let feder = new Feder();

console.assert(feder instanceof Feder, {
  errorMsg: 'should be instanceof Feder',
});

console.assert(typeof feder.update === 'function', {
  errorMsg: 'feder should have an update method',
});

console.assert(typeof feder.update === 'function', {
  errorMsg: 'feder should have an update method',
});

console.assert(typeof feder.search === 'function', {
  errorMsg: 'feder should have an search method',
});

console.assert(typeof feder.reset === 'function', {
  errorMsg: 'feder should have an reset method',
});

const filePath = 'test/data/index';
const file = fs.readFileSync(filePath);
const fileArrayBuffer = file.buffer;
const core = new FederCore({
  data: fileArrayBuffer,
  source: 'faiss',
  projectParams: {},
});

// console.log(core.index);
console.log(core.indexMeta);

const { testId, testVec } = core.getTestIdAndVec();
console.log(testId);

const res = core.search(testVec);
console.log('search res', res);

console.log(core.PROJECT_PARAMETERS);
core.setProjectParams('tsne');
console.log(core.indexMeta);
console.log(core.PROJECT_PARAMETERS);