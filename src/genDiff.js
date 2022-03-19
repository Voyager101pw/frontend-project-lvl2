import _ from 'lodash';
import render from './formatters/index.js';

const getSortedKeys = (val1, val2) => _.uniq([..._.keys(val1), ..._.keys(val2)]);
const hasNoKey = (obj, key) => !_.has(obj, key);
const hasChildren = (val1, val2) => _.isObject(val1) && _.isObject(val2);

const node = (name, status, value) => {
  const data = { name, status };
  if (status === 'hasChildren') return { ...data, children: value };
  if (status === 'update') return { ...data, oldValue: value[0], newValue: value[1] };
  return { ...data, value };
};

const getAST = ([obj1, obj2]) => _.sortBy(getSortedKeys(obj1, obj2)).map((key) => {
  if (hasNoKey(obj1, key)) return node(key, 'added', obj2[key]);
  if (hasNoKey(obj2, key)) return node(key, 'deleted', obj1[key]);
  if (hasChildren(obj1[key], obj2[key])) return node(key, 'hasChildren', getAST([obj1[key], obj2[key]]));
  return obj1[key] === obj2[key]
    ? node(key, 'saved', obj2[key])
    : node(key, 'update', [obj1[key], obj2[key]]);
});

const genDiff = (objs, format) => {
  const ast = getAST(objs);
  return render(format, ast);
};

export default genDiff;
