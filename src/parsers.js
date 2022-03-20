import YAML from 'js-yaml';
import { extname } from 'path';
import { readFileSync } from 'fs';

const getExtension = (path) => extname(path).substring(1);
const getData = (path) => {
  try {
    return readFileSync(path, 'utf-8');
  } catch (e) {
    throw Error(`File is not found: ${e.path}`);
  }
};

const formats = {
  json: JSON.parse,
  yml: YAML.load,
  yaml: YAML.load,
};

export default (paths) => paths.map((path) => {
  const ext = getExtension(path);
  const data = getData(path, 'utf-8');
  return formats[ext](data);
});
