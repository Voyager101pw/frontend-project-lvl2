/* eslint-disable no-nested-ternary */
/* eslint-disable no-prototype-builtins */

export default (obj1, obj2) => {
  const result = [];
  const commonObj = { ...obj1, ...obj2 };
  Object.entries(commonObj).forEach(([key, val]) => {
    switch (obj2.hasOwnProperty(key)) {
      case true:
        result.push(!obj1.hasOwnProperty(key) ? `+ ${key}: ${val}` : obj1[key] === obj2[key]
          ? `  ${key}: ${val}` : `- ${key}: ${obj1[key]}\n+ ${key}: ${obj2[key]}`);
        break;
      default: result.push(`- ${key}: ${val}`);
    }
  });
  return result.join('\n');
};
