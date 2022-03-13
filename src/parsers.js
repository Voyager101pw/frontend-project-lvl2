import YAML from 'js-yaml';
import { readFileSync } from 'fs';
import { extname } from 'path';

const parsers = {
  json: JSON.parse,
  yml: YAML.load,
  yaml: YAML.load,
};

export default (paths) => {
  const parsedData = paths.map((path) => {
    const parserName = extname(path).substring(1);
    const rawData = readFileSync(path, 'utf-8');
    const parser = parsers[parserName];
    return parser(rawData);
  });
  return parsedData;
};
