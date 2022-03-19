import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fixtureDir = '__fixtures__';

test.each([
  ['stylish', 'json'],
  ['plain', 'json'],
  ['stylish', 'yml'],
  ['plain', 'yml'],
])('%s output for code format %s', (format, ext) => {
  const path1 = join(__dirname, '..', fixtureDir, ext, `file1.${ext}`);
  const path2 = join(__dirname, '..', fixtureDir, ext, `file2.${ext}`);
  const pathRes = join(__dirname, '..', fixtureDir, ext, `${format}.txt`);

  const actual = genDiff(path1, path2, format);
  const expected = readFileSync(pathRes, 'utf-8');

  expect(actual).toBe(expected);
});
