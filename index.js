#!/usr/bin/env node

// get iteration count, default is 100,000,000.
const iterations = +process.argv.slice(3)[0] || 100000000;

// get module name
const Module = process.argv.slice(2)[0];
if(!Module) { // if module name was omitted
  console.error('Error: Please type module!');
  return;
}

// inject module
const test = require(`${process.cwd()}/${Module}`);

if(!process.argv.slice(3)[0]) { // if iteration count was omitted
  console.warn('Warn: Default iteration count is 100,000,000.')
}

for(const func in test) { // object(include testing function) in module, loop
  if(!test.hasOwnProperty(func)) continue;
  let i=0;
  console.time(func);
  while(i++ < iterations) test[func]();
  console.timeEnd(func);
}