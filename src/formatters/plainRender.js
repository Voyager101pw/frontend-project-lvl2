import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : value;
};

const genMessage = (tree, path = []) => {
  if (tree.status) {
    const pathToProp = [...path, tree.name].join('.');
    const operations = {
      added: () => `Property '${pathToProp}' was added with value: ${getValue(tree.value)}`,
      deleted: () => `Property '${pathToProp}' was removed`,
      update: () => `Property '${pathToProp}' was updated. From ${getValue(tree.oldValue)} to ${getValue(tree.newValue)}`,
      saved: () => [],
      hasChildren: () => genMessage(tree.children, [...path, tree.name]),
    };
    return operations[tree.status]();
  }
  return tree.flatMap((node) => genMessage(node, path)).join('\n');
};

export default genMessage;
