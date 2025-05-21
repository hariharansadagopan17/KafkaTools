const startTime = Date.now();
// Code to be measured
for (let i = 0; i < 1000000; i++) {
  // Some operation
}
const endTime = Date.now();
const duration = endTime - startTime;
console.log(`Code execution time: ${duration} milliseconds`);