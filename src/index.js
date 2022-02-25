import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import genDiff from './genDiff.js';

const parseFile = (pathToFile) => {
  const absoultePath = path.resolve(process.cwd(), pathToFile);
  const data = fs.readFileSync(absoultePath);
  const json = JSON.parse(data);
  const sortedObj = _.keys(json).sort().reduce((acc, key) => ({ ...acc, [key]: json[key] }), {});
  return sortedObj;
};

export default (pathToFile1, pathToFile2) => {
  const [obj1, obj2] = [parseFile(pathToFile1), parseFile(pathToFile2)];
  const stringDiff = genDiff(obj1, obj2);
  return stringDiff;
};
