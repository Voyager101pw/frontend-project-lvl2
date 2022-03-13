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

const files = ['.json', '.yml'].map((ext) => [`file1${ext}`, `file2${ext}`]);

test.each(files)(
  'Checking utility diff for each format',
  (fileName1, fileName2, result = 'result.txt') => {
    const pathToFile1 = getAbsPath(fileName1);
    const pathToFile2 = getAbsPath(fileName2);

    const actual = genDiff(pathToFile1, pathToFile2);
    const expected = readFileSync(getAbsPath(result), 'utf-8');

    expect(actual).toEqual(expected);
  },
);

test('Passing undefined file to a function', () => {
  const existFile = getAbsPath('file1.json');
  const undefinedFile = 'undefined.ext';
  expect(genDiff(existFile, undefinedFile)).toMatch(/не существует!/);
});

test('Passing a corrupted file to a function', () => {
  const notJSON = getAbsPath('notJSON.json');
  expect(genDiff(notJSON, notJSON)).toMatch(/не соотвествует/);
});
