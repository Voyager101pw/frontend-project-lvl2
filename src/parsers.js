import YAML from 'js-yaml';
import { extname } from 'path';
import { readFileSync } from 'fs';

const getExtension = (path) => extname(path).substring(1);
const getData = (path) => readFileSync(path, 'utf-8');

export default (paths) => paths.map((path) => {
  const ext = getExtension(path);
  const data = getData(path, 'utf-8');
  switch (ext) {
    case 'json': return JSON.parse(data);
    case 'yml': return YAML.load(data);
    case 'yaml': return YAML.load(data);
    default:
      throw Error(`Extension file is not correct: ${ext}`);
  }
});
