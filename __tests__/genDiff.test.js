import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const pathToModule = fileURLToPath(import.meta.url);
const currentPath = dirname(pathToModule);
const fixtureDir = '__fixtures__';

test('formatter for JSON extenstions.', () => {
  const path1 = join(currentPath, '..', fixtureDir, 'json', 'file1.json');
  const path2 = join(currentPath, '..', fixtureDir, 'json', 'file2.json');
  const format = 'stylish';
  const actual = genDiff(path1, path2, format);

  const pathRes = join(currentPath, '..', fixtureDir, 'json', 'result.txt');
  const expected = readFileSync(pathRes, 'utf-8');
  expect(actual).toBe(expected);
});

test('formatter for YAML extenstions.', () => {
  const path1 = join(currentPath, '..', fixtureDir, 'yml', 'file1.yml');
  const path2 = join(currentPath, '..', fixtureDir, 'yml', 'file2.yml');
  const format = 'stylish';
  const actual = genDiff(path1, path2, format);

  const pathRes = join(currentPath, '..', fixtureDir, 'yml', 'result.txt');
  const expected = readFileSync(pathRes, 'utf-8');
  expect(actual).toBe(expected);
});
