import path from 'path';
import fs from 'fs';
import genDiff from './genDiff.js';

const getData = (filePath) => {
  const absPath = path.resolve(process.cwd(), filePath);
  const rawData = fs.readFileSync(absPath, 'utf-8');
  const data = JSON.parse(rawData);
  return data;
};

export default (path1, path2) => {
  const diffData = genDiff(getData(path1), getData(path2));
  return diffData;
};
