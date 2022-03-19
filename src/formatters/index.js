import stylish from './stylishRender.js';
import plain from './plainRender.js';
import json from './jsonRender.js';

export default (format, ast) => {
  switch (format) {
    case 'stylish': return stylish(ast);
    case 'plain': return plain(ast);
    case 'json': return json(ast);
    default:
      throw new Error(`Unknow formatter name: ${format}`);
  }
};
