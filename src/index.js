import { resolve } from 'path';
import genDiff from './genDiff.js';
import parse from './parsers.js';

export default (path1, path2, format = 'stylish') => {
  const paths = [path1, path2].map((path) => resolve(process.cwd(), path));
  const parsedData = parse(paths);
  const diffData = genDiff(parsedData, format);
  return diffData;
};
