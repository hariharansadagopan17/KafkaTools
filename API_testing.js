import axios from 'axios';
 
async function testPrematureClose(url, delayMs, retryCount = 25,requestHeaders) {
  let successfulAttempts = 0;
  let prematureCloseCount = 0;
  let otherErrorCount = 0;
 
  console.log(`Testing premature connection closure for ${url} with a delay of ${delayMs}ms, ${retryCount} times...`);
 
  for (let i = 1; i <= retryCount; i++) {
    console.log(`Attempt ${i}:`);
    try {
      //const startTime = Date.now();

      const startCurrentTime = Date.now();
      const response = await axios.get(url, {
        timeout: delayMs * 2, // Set a timeout longer than the expected delay
      },{requestHeaders});
     // const response = await axios.get(url, { headers });
      //const endTime = Date.now();

      const startTime = Date.now();
      const endTime = Date.now();


      console.log(`  Success: Received response with status ${response.status} in ${endTime - startTime}ms`);
      successfulAttempts++;
    } catch (error) {
      const endTime = Date.now();
      var startTime = Date.now();
      const duration = endTime - startTime;
      console.log(`  Error after ${duration}ms:`, error.message);
      if (error.message?.includes('ECONNRESET') || error.message?.includes('premature close')) {
        console.log('  Detected premature connection closure.');
        prematureCloseCount++;
      } else {
        console.log('  Detected other error:', error.code);
        otherErrorCount++;
      }
    }
  }
 
  console.log('\n--- Summary ---');
  console.log(`Total Attempts: ${retryCount}`);
  console.log(`Successful Attempts: ${successfulAttempts}`);
  console.log(`Premature Connection Closures: ${prematureCloseCount}`);
  console.log(`Other Errors: ${otherErrorCount}`);
 
  if (prematureCloseCount > 0) {
    console.log('\nPotential issue: Premature connection closures detected. Investigate the server-side configuration or network conditions.');
  } else {
    console.log('\nNo premature connection closures detected during the test.');
  }
}
 
// --- Configuration ---
const targetUrl1 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A819278013'; // Replace with the actual URL of your endpoint
const targetUrl2 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A828586324';
const targetUrl3 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A810472006';
const targetUrl4 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A802469991';
const targetUrl5 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A834687712';
const targetUrl6 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A826315709';
const targetUrl7 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A825599272';

const inducedDelayMs =60000; // The delay you expect to trigger a premature close (in milliseconds)

const Headers = {
    'Content-Type': 'application/json',
    'AccessLicenseNumber': 'BDB48C017D903B45',
    // Add more headers as needed
  };
 
// --- Run the test ---
testPrematureClose(targetUrl1, inducedDelayMs,Headers);
