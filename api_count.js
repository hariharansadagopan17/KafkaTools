import axios from 'axios';
 
async function executeGetRequestNTimesWithHeaders(url, headers = {}, retryCount = 25) {
  console.log(`Executing GET request to ${url} ${retryCount} times with headers:`, headers);
 
  let successfulAttempts = 0;
  let errorCount = 0;
 
  for (let i = 1; i <= retryCount; i++) {
    console.log(`Attempt ${i}:`);
    try {
      const startTime = Date.now();
      const response = await axios.get(url, { headers });
      const endTime = Date.now();
      console.log(`  Success: Received response with status ${response.status} in ${endTime - startTime}ms`);
      successfulAttempts++;
      // You can also log response data if needed:
      // console.log("  Response data:", response.data);
    } catch (error) {
      const endTime = Date.now();
   
      var startTime = Date.now();
      const duration = endTime - startTime;
      console.log(`  Error after ${duration}ms:`, error.message);
   
      errorCount++;
    }
  }
 
  console.log('\n--- Summary ---');
  console.log(`Total Attempts: ${retryCount}`);
  console.log(`Successful Attempts: ${successfulAttempts}`);
  console.log(`Errors: ${errorCount}`);
}
 
// --- Configuration ---
const targetUrl1 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A819278013'; // Replace with the actual URL of your endpoint
const targetUrl2 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A828586324';
const targetUrl3 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A810472006';
const targetUrl4 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A802469991';
const targetUrl5 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A834687712';
const targetUrl6 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A826315709';
const targetUrl7 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A825599272';

const requestHeaders = {
  'Content-Type': 'application/json',
  'AccessLicenseNumber': 'BDB48C017D903B45',
  // Add more headers as needed
};
const numberOfRetries = 25;
 
// --- Run the function ---
executeGetRequestNTimesWithHeaders(targetUrl1, requestHeaders, numberOfRetries);
executeGetRequestNTimesWithHeaders(targetUrl2, requestHeaders, numberOfRetries);
executeGetRequestNTimesWithHeaders(targetUrl3, requestHeaders, numberOfRetries);
executeGetRequestNTimesWithHeaders(targetUrl4, requestHeaders, numberOfRetries);
executeGetRequestNTimesWithHeaders(targetUrl5, requestHeaders, numberOfRetries);
executeGetRequestNTimesWithHeaders(targetUrl6, requestHeaders, numberOfRetries);
executeGetRequestNTimesWithHeaders(targetUrl7, requestHeaders, numberOfRetries);