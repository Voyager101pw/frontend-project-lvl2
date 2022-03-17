import YAML from 'js-yaml';
import { extname } from 'path';
import { readFileSync } from 'fs';

const getExtension = (path) => extname(path).substring(1);
const getData = (path) => readFileSync(path, 'utf-8');

const parsers = {
  json: JSON.parse,
  yml: YAML.load,
  yaml: YAML.load,
};

export default (paths) => paths.map((path) => {
  const fomrat = getExtension(path);
  const data = getData(path, 'utf-8');
  const parsedData = parsers[fomrat](data);
  return parsedData;
});
