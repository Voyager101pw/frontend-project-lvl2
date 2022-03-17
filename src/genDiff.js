import _ from 'lodash';
import render from './formatters/index.js';

const getSortedKeys = (val1, val2) => _.uniq([..._.keys(val1), ..._.keys(val2)]).sort();
const hasNoKey = (obj, key) => !_.has(obj, key);
const hasChildren = (val1, val2) => _.isObject(val1) && _.isObject(val2);

const getAST = ([obj1, obj2]) => getSortedKeys(obj1, obj2).map((key) => {
  if (hasNoKey(obj1, key)) return { name: key, status: 'added', value: obj2[key] };
  if (hasNoKey(obj2, key)) return { name: key, status: 'deleted', value: obj1[key] };
  if (hasChildren(obj1[key], obj2[key])) {
    return { name: key, status: 'hasChildren', children: getAST([obj1[key], obj2[key]]) };
  }
  return obj1[key] === obj2[key]
    ? { name: key, status: 'saved', value: obj2[key] }
    : {
      name: key,
      status: 'update',
      oldValue: obj1[key],
      newValue: obj2[key],
    };
});

const genDiff = (objs, format) => {
  const ast = getAST(objs);
  return render[format](ast);
};

export default genDiff;
