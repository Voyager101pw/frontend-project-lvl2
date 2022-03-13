import path, { basename, resolve } from 'path';
import genDiff from './genDiff.js';
import getParsedData from './parsers.js';

const getAbsPaths = (paths) =>
  paths.map((path) => resolve(process.cwd(), path));

export default (...paths) => {
  try {
    const absPaths = getAbsPaths(paths);
    const parsedData = getParsedData(absPaths);
    const diffData = genDiff(...parsedData);
    return diffData;
  } catch (err) {
    switch (err.code) {
      case 'ENOENT':
        return `Файл ${basename(err.path)} не существует!\nПуть: ${err.path}`;
      default:
        return `Файл не соотвествует расширению!`;
    }
  }
};
