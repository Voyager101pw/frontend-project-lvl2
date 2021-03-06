#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((path1, path2) => {
    const { format } = program.opts();
    const diff = genDiff(path1, path2, format);
    console.log(diff);
  });

program.parse();
