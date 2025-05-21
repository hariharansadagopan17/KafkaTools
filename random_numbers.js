function generateRandomOrderNumbers(sampleNumber, count = 50) {
    const orderNumbers = [];
    const sampleLength = sampleNumber.toString().length;
   
    for (let i = 0; i < count; i++) {
      let randomNumberString = '';
      for (let j = 0; j < sampleLength; j++) {
        randomNumberString += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
      }
      orderNumbers.push(parseInt(randomNumberString, 10)); // Convert string to number
    }
   
    return orderNumbers;
  }
   
  // Sample usage:
  const sampleOrder = 23481849;
  const numberOfOrders = 2;
  const randomOrders = generateRandomOrderNumbers(sampleOrder, numberOfOrders);
   
  console.log(`Generated ${numberOfOrders} random order numbers with the same format as ${sampleOrder}:`);
  console.log(randomOrders);
  console.log(`\nExample of a generated order number: ${randomOrders[0]}`);
  console.log(`Length of sample number: ${sampleOrder.toString().length}`);
  console.log(`Length of a generated number: ${randomOrders[0].toString().length}`);