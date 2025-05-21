import axios from 'axios';
 
async function testPrematureCloseGetWithHeaders(url, headers = {}, retryCount = 25) {
  let successfulAttempts = 0;
  let prematureCloseCount = 0;
  let otherErrorCount = 0;
 
  console.log(`Testing premature connection closure for GET request to ${url} with headers:`, headers);
  //console.log(`Expecting premature closure after ${delayMs}ms, testing ${retryCount} times...`);
 
  for (let i = 1; i <= retryCount; i++) {
    console.log(`Attempt ${i}:`);
    try {
      const startTime = Date.now();
      const response = await axios.get(url, {
        headers
        // Set a timeout longer than the expected delay
      });
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
    console.log('\nPotential issue: Premature connection closures detected for the GET endpoint with the specified headers. Investigate the server-side configuration, network conditions, or header handling.');
  } else {
    console.log('\nNo premature connection closures detected for the GET endpoint with the specified headers during the test.');
  }
}
 
// --- Configuration ---

const targetUrl1 = 'https://onlinetools.ups.com/api/track/v1/details/1Z429320A819278013'; // Replace with the actual URL of your endpoint
//const targetUrl2 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A828586324';
//const targetUrl3 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A810472006';
//const targetUrl4 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A802469991';
//const targetUrl5 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A834687712';
//const targetUrl6 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A826315709';
//const targetUrl7 = 'https://wwwcie.ups.com/track/v1/details/1Z429320A825599272';

 // Replace with the actual URL of your GET endpoint
const requestHeaders = {
  'Content-Type': 'application/json',
  'Authorization': ' Bearer eyJraWQiOiI5NzllNmVhYy1iZmExLTQzZmQtYTliZi05NTBhYzE0OGVkNjMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzM4NCJ9.eyJzdWIiOiJqd29vQHVwcy5jb20iLCJjbGllbnRpZCI6InRVSFBjQW4za1JlODk5QkdTNXQyYThqQUxUUlpGQlB6bVo3QWxJSzZkMXllNFg2QyIsIm1lcl9pZCI6IjQyOTMyMCIsImlzcyI6Imh0dHBzOi8vYXBpcy51cHMuY29tIiwidXVpZCI6IjczQkRERDIyLUE5RjgtMUI3QS04MkRCLTgxNThDNzM3MDJCMSIsInNpZCI6Ijk3OWU2ZWFjLWJmYTEtNDNmZC1hOWJmLTk1MGFjMTQ4ZWQ2MyIsImF1ZCI6IkVDb21tIiwiYXQiOiJ0OVJxaDJZUDNSa3pHTktNa3FMc2dwUmpkdGlGIiwibmJmIjoxNzQ1MzM1ODg3LCJzY29wZSI6IkxvY2F0b3JXaWRnZXQiLCJEaXNwbGF5TmFtZSI6IkVDb21tIiwiZXhwIjoxNzQ1MzUwMjg3LCJpYXQiOjE3NDUzMzU4ODcsImp0aSI6IjJkNDI4NjU2LTE0NTgtNGViOS1hYjM0LTIzYWI4NDMyZGFiMyJ9.KZWzCElGOoZw81RexZxy2cd0NjNnaVRN2iaqqBCtHjorgpy3ZvIrQEwyADAixrxQzOMHTmtwlm41BYuPNdxlqZbb6zVSlc7dTaFFg7ISzYpS5vXpOS45RxdI4AGxEPMsdUfqcxYLUjQ7cXfZqzlAUF5FMSZZabWKOWeQNeZuiboe9hmleFNFAMYYryYv5YCikDF9_QYr4KmTq3dyViFOJXkggJ06QA5o5Qe6gGt31r5HTkD89EmJz4iBytaVgixIY9BeApf3udPUE11xC6LVEbujqoSl8ayFA15GKbm6KVG7a059362LxG7ZA94lwnsILcRjOlgIHVhZCLtLI-YGl4o-SsMhgiK5xXQ07AFquGHtpc_vbiyAbhgopQjafGfHFaBwULEfkNgLcZc_ZyVl-l2YX97MocNSdKbL6HrodNXWbSIoGczjodS4ZM-mj9Qfs73xzAI-31DvsFzzfrC9d2BqK1aAwi0_CdwM9_Q6MPqK5xw_IpQZL3JP74UCdop2wp4Bq5FmndDBzbTenRkKPbG84F7-6hOyINP1-tziQGlU6WFnyMJv4-31sAgZjLAhgGviL2Qpr4njircDbhSFMHiggiUhUX0DOXZWnG-MEUYXIlrgjMswN8hBEM4v4oUfv37_v2MqG2ElTsZtl2dQKwJgD2K-5ZF8jgTsSaOHdM0',
  'transId': '20250422144900-58eea12a-449a',
  'transactionSrc': 'Albertsons'
  
  // Add more headers as needed
};
//const inducedDelayMs = 900000; // The delay you expect to trigger a premature close (in milliseconds)
const numberOfRetries = 2000;
 
// --- Run the test ---
testPrematureCloseGetWithHeaders(targetUrl1, requestHeaders, numberOfRetries);
//testPrematureCloseGetWithHeaders(targetUrl2, requestHeaders, inducedDelayMs, numberOfRetries);
//testPrematureCloseGetWithHeaders(targetUrl3, requestHeaders, inducedDelayMs, numberOfRetries);
//testPrematureCloseGetWithHeaders(targetUrl4, requestHeaders, inducedDelayMs, numberOfRetries);
//testPrematureCloseGetWithHeaders(targetUrl5, requestHeaders, inducedDelayMs, numberOfRetries);
//testPrematureCloseGetWithHeaders(targetUrl6, requestHeaders, inducedDelayMs, numberOfRetries);
//testPrematureCloseGetWithHeaders(targetUrl7, requestHeaders, inducedDelayMs, numberOfRetries);