import axios from 'axios';

const url = "https://onlinetools.ups.com/api/rating/v2409/rate";
const bearerToken = "eyJraWQiOiI5NzllNmVhYy1iZmExLTQzZmQtYTliZi05NTBhYzE0OGVkNjMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzM4NCJ9.eyJzdWIiOiJqd29vQHVwcy5jb20iLCJjbGllbnRpZCI6InRVSFBjQW4za1JlODk5QkdTNXQyYThqQUxUUlpGQlB6bVo3QWxJSzZkMXllNFg2QyIsIm1lcl9pZCI6IjQyOTMyMCIsImlzcyI6Imh0dHBzOi8vYXBpcy51cHMuY29tIiwidXVpZCI6IjczQkRERDIyLUE5RjgtMUI3QS04MkRCLTgxNThDNzM3MDJCMSIsInNpZCI6Ijk3OWU2ZWFjLWJmYTEtNDNmZC1hOWJmLTk1MGFjMTQ4ZWQ2MyIsImF1ZCI6IkVDb21tIiwiYXQiOiJOaWhHRW9DRjB2djZBNnl4UUF3VmFBd2JTUEY2IiwibmJmIjoxNzQ2MTczNzAwLCJzY29wZSI6IkxvY2F0b3JXaWRnZXQiLCJEaXNwbGF5TmFtZSI6IkVDb21tIiwiZXhwIjoxNzQ2MTg4MTAwLCJpYXQiOjE3NDYxNzM3MDAsImp0aSI6ImMwNjczZmZjLWZlODUtNDVjMS05NWMzLWEzMDZiYjNkMzMyZCJ9.CT7CZRcgMc7yfvJR7DP_Ng93wUSTqmB1glJ5vxrXVuYTDspYioVxjuCdNvH7NeMzMKLWSjyZ6q3rTJyMWJ2Nx9su8DC3DH4XTKLCcNqvrpmJ-z-yitKSyIpg3XGFBqzqQvvF3WEHYrlkWT9FkbhqXiPmal9NxphD4tVWwQ5K6uL3FGZbsVyB4LUndeiV8rUPt4HP-Io4SD2KZEiv2ecykDC1ORFM_xk0vT3000XKTeGmEiSQnxWMFIr7isIQW_WsZo75QKmPdU5BMjSjYPDg5wu1uXcT_VONkoc76rSHlVD-Zj09laUanASC2NWavnSmTvydwrvYEdGpijIPVnOBKJz-5_7kv18on2dxPvF9SuF18GluEl9t9c2hRCx4Rxx83TDVh3pBaNVEfblPHJunql7uiMbWO_T6JjFrwUzLeKkDpQMGAd4ZJIWWfZUpYqQTs_8H4DVLeVjs4d5pFbpQ70-i60pjOvwMCl_zNdRo3oGj_stpg7ZHJvOJduBEmVInlRxtcxR9t3F2KQHhG_0DnVOJKAZ1cnxipdHqoz2wyOysgpYcO3ybTPepIxtQlPuvNN1KP0RFILoFnE1AL_M1NFw5ua_Z1Sm9cma9LYHUMlZrFqDXWnSEAeV_3ryhTfmlh4jhP39zKNb6o8V4r814YJkiM6gtbR87Ez6tI5e4JgE";

const requestBody = {
    "RateRequest": {
      "Shipment": {
         "Shipper": {
            "Name": "Vine & Cellar",
            "ShipperNumber": "429320",
            "Address": {
               "AddressLine": ["1930 N Placentia Ave"],
               "City": "Fullerton",
               "StateProvinceCode": "CA",
               "PostalCode": "92831",
               "CountryCode": "US"
            }
         },
         "ShipTo": {
            "Address": {
               "StateProvinceCode": "CA",
               "PostalCode": "94566",
               "CountryCode": "US",
               "ResidentialAddressIndicator": "1"
            }
         },
         "PaymentDetails": {
            "ShipmentCharge": {
               "Type": "01",
               "BillShipper": {
                  "AccountNumber": "429320"
               }
            }
         },
         "Service": {
            "Code": "03"
         },
		 
         "ShipmentRatingOptions": {
            "NegotiatedRatesIndicator": "Y"
         },
         "Package": {
            "PackagingType": {
               "Code": "02"
            },
         "Dimensions": {
            "UnitOfMeasurement": {
               "Code": "IN"
            },
            "Length": "19.75",
            "Height": "6.25",
            "Width": "12.375"
         },
         "PackageWeight": {
            "UnitOfMeasurement": {
               "Code": "LBS"
            },
            "Weight": "9.75"
         }
		 }
      }
   }
};

const makeApiCall = async () => {
    try {
        const response = await axios.post(url, requestBody, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
                'Content-Type': 'application/json',
                'transactionSrc': 'wineTransit',
                'transId': '1'
            }
        });
        console.log(response.data.RateResponse.RatedShipment[0].NegotiatedRateCharges.TotalCharge.MonetaryValue);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

const runApiCalls = async (times) => {
    for (let i = 0; i < times; i++) {
        console.log(`Running API call #${i + 1}`);
        await makeApiCall();
    }
};

runApiCalls(50);
//await makeApiCall();