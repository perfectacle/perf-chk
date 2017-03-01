#!/usr/bin/env node

// get module name
const moduleName = process.argv.slice(2)[0];
if(!moduleName) { // if module name was omitted
  console.error('Error: Please type module!');
  console.error('perf-chk {module_name} [iteration_counts]');
  return;
}

// get iteration count, default is 100,000,000.
const iterations = process.argv.slice(3)[0] === undefined ? 100000000 : +process.argv.slice(3)[0];
if(!Number.isSafeInteger(iterations) || iterations < 1) {
  console.error('Error: Please type correct number!');
  console.error('perf-chk {module_name} [iteration_counts]');
  console.error('[iteration_counts] is safe integer for natural number');
  console.error('range is 1 ~ 9,007,199,254,740,991');
  return;
}

if(!process.argv.slice(3)[0]) { // if iteration count was omitted
  console.warn('Warning: Default iteration count is 100,000,000.')
}

// inject module
const Module = require(`${process.cwd()}/${moduleName}`);

for(const func in Module) { // object(include testing function) in Module, loop
  if(!Module.hasOwnProperty(func)) continue;
  let i=0;
  console.time(func);
  while(i++ < iterations) Module[func]();
  console.timeEnd(func);
}