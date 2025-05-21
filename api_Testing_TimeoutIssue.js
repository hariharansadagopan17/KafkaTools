import axios from 'axios';

// API details
const API_URL = 'https://onlinetools.ups.com/api/track/v1/details'; // Base URL for the API
const AUTH_TOKEN = 'Bearer eyJraWQiOiI5NzllNmVhYy1iZmExLTQzZmQtYTliZi05NTBhYzE0OGVkNjMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzM4NCJ9.eyJzdWIiOiJqd29vQHVwcy5jb20iLCJjbGllbnRpZCI6InRVSFBjQW4za1JlODk5QkdTNXQyYThqQUxUUlpGQlB6bVo3QWxJSzZkMXllNFg2QyIsIm1lcl9pZCI6IjQyOTMyMCIsImlzcyI6Imh0dHBzOi8vYXBpcy51cHMuY29tIiwidXVpZCI6IjczQkRERDIyLUE5RjgtMUI3QS04MkRCLTgxNThDNzM3MDJCMSIsInNpZCI6Ijk3OWU2ZWFjLWJmYTEtNDNmZC1hOWJmLTk1MGFjMTQ4ZWQ2MyIsImF1ZCI6IkVDb21tIiwiYXQiOiJ1VWdCOXJ3aWR3VTNNQWlnMEdrMXpjdE5VMTBVIiwibmJmIjoxNzQ2MTcxMDAxLCJzY29wZSI6IkxvY2F0b3JXaWRnZXQiLCJEaXNwbGF5TmFtZSI6IkVDb21tIiwiZXhwIjoxNzQ2MTg1NDAxLCJpYXQiOjE3NDYxNzEwMDEsImp0aSI6ImFjZTdiZGJlLTZhOTYtNDYwZC05ZWJmLWIxMzYzOGMzMDZmYSJ9.tam8yszhAHEU_He8ACNpO6HR3OMtEBSt1bv8vfTykmurvzGMEPppY9d0E18djMr17dmitLFb21-cqcAnbf02LRdXnRHsxGNTDYzWisp_B2901o2zIRDHJGH2oDQk0bD7tJsbnwIbuXsX-lIV7p0s5GktJU-YYRoWlQGISXSTORLWsWpGxztX_KCBNf0gkoKZ2O4i8ObhrnL8RY_R-hZtJThu_29-Zh0zQJZOkuZG1QwWV-d3kLOtRxRr1zQUN_9jmi9hBeFiI5sbY_N6a3sqHos371h8ryJC9jWGaY745NufQt-2SawexX9AmQWQ_tMtXsg5T5mjAHAvkLS_08i3w4pZScYLQZi0NhqoPusYK8kOid3ySqCCRwf6vMwl3IlM4c7ueELeh5TTOaWDjO1TCcUewwSUVBpGh-FvnIab1D4Rsy0M-rvTPNhLnp1tZWDgq7JdMhC7236AjF81BRTvIVorErtfNigbEVoKI6iRL0H-ZGW_ao9CggfXIMmzUHzYWR57xDIY2nBzqWE7ltEfiopF21Ef-KD_o981FzROWfnFwnyxkOyFiK1BABfSVAoiwYrPRljYs9QmYMKF6ppB-97pz4C8PZsT1S9D9Jbc13ovmYcNrKVvXxfnshqBkOshOrUVwQ4L4bAQ5Puilww-_IYQCvg6jyvZctspbpP-X04'; // Replace with your actual bearer token

// List of 50 tracking numbers
const trackingNumbers = [
    '1Z429320A833640415',
    '1Z429320A809993189',
    '1Z429320A828204236',
    '1Z429320A815753202',
    '1Z429320A804423231',
    '1Z429320A813721240',
    '1Z429320A823006049',
    '1Z429320A802223255',
    '1Z429320A811529266',
    '1Z429320A803239273',
    '1Z429320A827002456',
    '1Z429320A818953286',
    '1Z429320A819047825',
    '1Z429320A818596912',
    '1Z429320A825406407',
    '1Z429320A838222993',
    '1Z429320A838454180',
    '1Z429320A826623975',
    '1Z429320A802319170',
    '1Z429320A827816363',
    '1Z429320A826804949',
    '1Z429320A838075358',
    '1Z429320A802649162',
    '1Z429320A835169137',
    '1Z429320A812009129',
    '1Z429320A830491921',
    '1Z429320A836657312',
    '1Z429320A833849085',
    '1Z429320A803113103',
    '1Z429320A808359116',
    '1Z429320A814169060',
    '1Z429320A816943059',
    '1Z429320A808521047',
    '1Z429320A807303034',
    '1Z429320A811689021',
    '1Z429320A801433084',
    '1Z429320A814671098',
    '1Z429320A833424873',
    '1Z429320A800079013',
    '1Z429320A801678972',
    '1Z429320A838208259',
    '1Z429320A810873001',
    '1Z429320A802470998',
    '1Z429320A813272986',
    '1Z429320A839994032',
    '1Z429320A830922821',
    '1Z429320A830334216',
    '1Z429320A806088967',
    '1Z429320A836063847',
    '1Z429320A804902955',
    '1Z429320A816520943'

    // Add the remaining tracking numbers here
];

// Function to test the API with a single tracking number
const testApiWithTrackingNumber = async (trackingNumber) => {
    try {
        const response = await axios.get(`${API_URL}/${trackingNumber}`, {
            headers: {
                'Authorization': AUTH_TOKEN,
                'Content-Type': 'application/json',
                'transId':'20250422144900-58eea12a-449a',
                'transactionSrc': 'Albertsons'
            },
        });
        console.log(`Success for tracking number ${trackingNumber}:`, response.status);
    } catch (error) {
        if (error.response) {
            console.error(`Error for tracking number ${trackingNumber}:`, error.response.status, error.response.data);
        } else if (error.request) {
            console.error(`No response for tracking number ${trackingNumber}:`, error.request);
        } else {
            console.error(`Error setting up request for tracking number ${trackingNumber}:`, error.message);
        }
    }
};

// Function to test the API 50 times
const testApiMultipleTimes = async () => {
    console.log('Starting API testing for 50 tracking numbers...');
    for (const trackingNumber of trackingNumbers) {
        await testApiWithTrackingNumber(trackingNumber);
    }
    console.log('API testing completed.');
};

// Execute the test
testApiMultipleTimes();