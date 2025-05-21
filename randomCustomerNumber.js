// Can you help in creating a random customer phone number with format below : 6615568334

//         "state": "CA",
//         "postalCode": "94566"
//       },
//       "fulfilledQtyForWholeOrder": 5
//     }
//   };
//   */
//   const randomOrderNumber = Math.floor(10000000 + Math.random() * 90000000).toString(); // 8-digit random number
//   const randomFulfillmentOrderNumber = randomOrderNumber + "011"; // Append "011" to the orderNumber
//

//   const randomCustomerPhoneNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString(); // 10-digit random number

//can you help in creating a random customer phone number with format below : 6615568334
const generateRandomPhoneNumber = () => {
    const areaCode = "661"; // Fixed area code
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000).toString(); // 9-digit random number
    return areaCode + randomNumber;
};

const randomCustomerPhoneNumber = generateRandomPhoneNumber();
console.log(randomCustomerPhoneNumber); // Example output: 66155688334

