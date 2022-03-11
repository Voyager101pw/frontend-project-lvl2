import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const getAbsPath = (fileName) => {
  // Получить абсолютный путь до файла включая название и расширение этого файла
  const pathToFile = fileURLToPath(import.meta.url);

  // Извлечь часть путь содержащая только рабочую директорию
  const pathToWorkDir = dirname(pathToFile);

  const absPath = join(pathToWorkDir, '..', '__fixtures__', fileName);
  return absPath;
};

test.each([['file1.json', 'file2.json', 'resultJSON.txt']])(
  'check diff two files',
  (fileName1, fileName2, result) => {
    const pathToFile1 = getAbsPath(fileName1);
    const pathToFile2 = getAbsPath(fileName2);

    const actual = genDiff(pathToFile1, pathToFile2);
    const expected = readFileSync(getAbsPath(result), 'utf-8');

    expect(actual).toEqual(expected);
  },
);
