import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fixtureDir = '__fixtures__';

const getPathToResult = (format) => join(__dirname, '..', fixtureDir, `result_${format}.txt`);
const getPathToFile = (name, ext) => join(__dirname, '..', fixtureDir, ext, `${name}.${ext}`);

test.each([
  ['stylish', 'json'],
  ['stylish', 'yml'],
  ['plain', 'json'],
  ['plain', 'yml'],
  ['json', 'json'],
  ['json', 'yml'],
])('%s output for code format %s', (format, ext) => {
  const path1 = getPathToFile('file1', ext);
  const path2 = getPathToFile('file2', ext);
  const pathRes = getPathToResult(format);

  const actual = genDiff(path1, path2, format);
  const expected = readFileSync(pathRes, 'utf-8').trim();

  expect(actual).toBe(expected);
});

test('Unknow extension file', () => {
  const path1 = getPathToFile('file1', 'fake');
  const path2 = getPathToFile('file2', 'json');
  expect(() => genDiff(path1, path2)).toThrow(/File is not found/);
});

test('Unknow formatter name', () => {
  const path1 = getPathToFile('file1', 'yml');
  const path2 = getPathToFile('file1', 'yml');
  expect(() => genDiff(path1, path2, 'null')).toThrow(/Unknow formatter name/);
});
