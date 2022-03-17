#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --formatter <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((path1, path2, { formatter }) => {
    console.log(genDiff(path1, path2, formatter));
  });

program.parse();
