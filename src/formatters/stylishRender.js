const isObject = (value) => typeof value === 'object' && !Array.isArray(value) && value !== null;

const stringify = (ast, rep = '    ', spacesCount = 1, depth = 0) => {
  if (!isObject(ast) && !Array.isArray(ast)) return `${ast}`;
  const indentSize = spacesCount * depth;
  const currentIndent = rep.repeat(indentSize);

  const renderString = (node) => {
    const newDepth = depth + 1;
    const newIndent = rep.repeat(spacesCount * newDepth).slice(0, -2);
    const nextIter = (newNode) => stringify(newNode, rep, spacesCount, newDepth);

    const status = {
      saved: () => `  ${node.name}: ${nextIter(node.value)}`,
      added: () => `+ ${node.name}: ${nextIter(node.value)}`,
      update: () => `- ${node.name}: ${nextIter(node.oldValue)}\n`
        + `${newIndent}+ ${node.name}: ${nextIter(node.newValue)}`,
      deleted: () => `- ${node.name}: ${nextIter(node.value)}`,
      hasChildren: () => `  ${node.name}: ${nextIter(node.children)}`,
    };
    const string = status[node.status]();
    return newIndent + string;
  };

  const lines = isObject(ast)
    ? Object.keys(ast).sort().map((key) => (`${currentIndent + rep}${key}: ${stringify(ast[key], rep, spacesCount, depth + 1)}`))
    : ast.map((node) => `${renderString(node)}`);
  return ['{', ...lines, `${currentIndent}}`].join('\n');
};

export default stringify;
