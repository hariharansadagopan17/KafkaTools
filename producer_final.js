const { Kafka, logLevel } = require('kafkajs');
 
// --- Configuration ---
const KAFKA_BROKERS = [
    "qgm010ccf.albertsons.com:9095",
    "qgm010cd0.albertsons.com:9095",
    "qgm010cd1.albertsons.com:9095",
    "qgm010cd2.albertsons.com:9095",
    "qgm010cd3.albertsons.com:9095",
    "qgm010ccd.albertsons.com:9095",
    "qgm010cce.albertsons.com:9095",
    "qgm010ce3.albertsons.com:9095"
];
const KAFKA_TOPIC = 'OSPK_OSLM_SHIPPING_LABEL_ACCP'; // Your specific topic
const CLIENT_ID = 'acupick-producer-' + Date.now(); // Descriptive client ID
 
// --- SASL/SCRAM Credentials ---
// !!! WARNING: Avoid hardcoding credentials in production. Use environment variables or secrets management. !!!
const SASL_USERNAME = "OS03LM";
const SASL_PASSWORD = "8dcTA8nih4SzkBRSsG1@M"; // Use process.env.KAFKA_PASSWORD in real apps!
 
// --- Message Details ---
// Define the payload as a JavaScript object first

const randomOrderNumber = Math.floor(10000000 + Math.random() * 90000000).toString(); // 8-digit random number
  const randomFulfillmentOrderNumber = randomOrderNumber + "011"; // Append "011" to the orderNumber

/*  const payloadObject = {
    "orderNumber": "27244745",
    "fulfillmentOrderNumber": "27244745011",
    "messageSource": "Acupick",
    "activityId": "99995577",
    "event": {
      "id": "CREATE_SHIPMENT_LABELS",
      "eventTs": "2025-04-21T19:10:33.207555245Z",
      "source": "Acupick"
    },
    "data": {
      "shipments": [
        {
          "packageWeight": 2.0,
          "packageWeightUOM": "LBS",
          "referenceNumber": "27244745-BOX-01-XS-128913",
          "pckgDimensionsUOM": "IN",
          "packageHeight": 5.13,
          "packageWidth": 5.13,
          "packageLength": 14.63,
          "signatureRequired": "true"
        }
      ],
      "serviceLevel": "REGULAR",
      "storeId": "5799",
      "shipToName": "test safeway",
      "shipToAddress": {
        "addressLine1": "5420 San Jose Dr",
        "addressLine2": "address2",
        "city": "Pleasanton",
        "state": "CA",
        "postalCode": "94566"
      },
      "shipFromAddress": {
        "addressLine1": "1930 N Placentia Ave",
        "addressLine2": "address2",
        "city": "Fullerton",
        "state": "CA",
        "postalCode": "94566"
      },
      "fulfilledQtyForWholeOrder": 5
    }
  };
 
  //const randomOrderNumber = Math.floor(10000000 + Math.random() * 90000000).toString(); // 8-digit random number
  //const randomFulfillmentOrderNumber = randomOrderNumber + "011"; // Append "011" to the orderNumber

  */
  const payloadObject = {
    "orderNumber": randomOrderNumber,
    "fulfillmentOrderNumber": randomFulfillmentOrderNumber,
    "messageSource": "Acupick",
    "activityId": "99995577",
    "event": {
      "id": "CREATE_SHIPMENT_LABELS",
      "eventTs": "2025-05-19T19:10:33.207555245Z",
      "source": "Acupick"
    },
    "data": {
      "shipments": [
        {
          "packageWeight": 2.0,
          "packageWeightUOM": "LBS",
          "referenceNumber": `${randomOrderNumber}-BOX-01-XS-128913`,
          "pckgDimensionsUOM": "IN",
          "packageHeight": 5.13,
          "packageWidth": 5.13,
          "packageLength": 14.63,
          "signatureRequired": "true"
        }
      ],
      "serviceLevel": "REGULAR",
      "storeId": "5799",
      "shipToName": "Wine Automation Script",
      "shipToAddress": {
        "addressLine1": "5420 San Jose Dr",
        "addressLine2": "address2",
        "city": "Pleasanton",
        "state": "CA",
        "postalCode": "94566"
      },
      "shipFromAddress": {
        "addressLine1": "1930 N Placentia Ave",
        "addressLine2": "address2",
        "city": "Fullerton",
        "state": "CA",
        "postalCode": "94566"
      },
      "fulfilledQtyForWholeOrder": 5
    }
  };

  


/*const payloadObject = {
  "orderNumber": randomOrderNumber,
  "fulfillmentOrderNumber": randomFulfillmentOrderNumber,
  "activityId": "12345",
  "messageSource": "Acupick",
  "event": {
    "id": "CREATE_SHIPMENT_LABELS",
    "eventTs": "2025-04-24T19:10:33.207555245Z",
    "source": "Acupick"
  },
  "data": {
    "serviceLevel": "REGULAR",
    "storeId": "5799",
    "shipFromAddress": {
      "addressLine1": "Streetaddressline2",
      "city": "Fullerton",
      "state": "CA",
      "postalCode": "94566"
    },
    "shipToName": "WineAutomation",
    "shipToAddress": {
      "addressLine1": "Streetaddressline1",
      "addressLine2": "Streetaddressline2",
      "city": "Milpitas",
      "state": "CA",
      "postalCode": "94566"
    },
    "shipments": [
      {
        "packageWeight": 59.99,
        "packageWeightUOM": "LB",
        "referenceNumber": `${randomOrderNumber}-BOX-01-XS-128913`,
        "pckgDimensionsUOM": "IN",
        "packageHeight": 3.6,
        "packageWidth": 5.5,
        "packageLength": 6.5,
        "shipmentMonetaryValue": 12.99,
        "signatureRequired": "true"
      }
    ],
    "fulfilledQtyForWholeOrder": 10
  }
};

*/
// Use a relevant field from the payload as the key (optional, but good practice)
const messageKey = payloadObject.orderNumber; // e.g., "934497161"
 
// Convert the JavaScript payload object to a JSON string for sending
const messageValue = JSON.stringify(payloadObject);
 
// Your specified header
const messageHeaders = {
    'eventId': 'CREATE_SHIPMENT_LABELS'
};
 
 
// --- Initialize KafkaJS Client with SASL/SSL ---
console.log("Initializing Kafka client...");
const kafka = new Kafka({
    clientId: CLIENT_ID,
    brokers: KAFKA_BROKERS,
    ssl: true, // Enable SSL
    sasl: {
        mechanism: 'scram-sha-512', // Your required mechanism
        username: SASL_USERNAME,
        password: SASL_PASSWORD,
    },
    logLevel: logLevel.INFO, // Set to WARN or ERROR for less noise in production
    connectionTimeout: 5000, // milliseconds
});
 
// --- Create Producer ---
console.log("Creating Kafka producer...");
const producer = kafka.producer({
    allowAutoTopicCreation: false,
    idempotent: true,
    maxInFlightRequests: 5,
    transactionTimeout: 60000,
});
 
// --- Main Function to Run Producer ---
const runProducer = async () => {
    try {
        // 1. Connect the producer
        console.log(`Connecting producer to brokers: ${KAFKA_BROKERS.join(', ')} using SASL/SCRAM-SHA-512...`);
        await producer.connect();
        console.log('Producer connected successfully.');
 
        // 2. Prepare the final message object
        const message = {
            key: messageKey,
            value: messageValue,
            headers: messageHeaders,
        };
 
        console.log(`\nPreparing to send message to topic "${KAFKA_TOPIC}":`);
        console.log('  Key:', message.key);
        console.log('  Headers:', message.headers);
        // Log only a snippet of the value if it's very long
        const valueSnippet = message.value.length > 150 ? message.value.substring(0, 150) + '...' : message.value;
        console.log('  Value (JSON string):', valueSnippet);
 
 
        // 3. Send the message
        console.log(`\nSending message...`);
        const results = await producer.send({
            topic: KAFKA_TOPIC,
            messages: [message],
            acks: -1, // Wait for all in-sync replicas
            timeout: 30000, // Timeout for the send operation
        });
 
        console.log('\nMessage sent successfully!');
        results.forEach(result => {
            console.log(`  -> Topic: ${result.topicName}, Partition: ${result.partition}, Offset: ${result.baseOffset}`);
        });
 
    } catch (error) {
        console.error('\n[ERROR] An error occurred:', error);
        if (error.name === 'KafkaJSNonRetriableError' && error.message.includes('SASL')) {
             console.error("[ERROR] SASL Authentication failed. Verify username/password and SASL mechanism ('scram-sha-512'). Check broker logs for details.");
        } else if (error.name === 'KafkaJSConnectionError' || error.message.includes('connect ETIMEDOUT')) {
             console.error("[ERROR] Connection failed. Verify broker addresses/ports are correct and reachable. Check network connectivity, firewalls, and SSL configuration.");
        } else if (error.message.includes('UNKNOWN_TOPIC_OR_PARTITION')){
             console.error(`[ERROR] Topic "${KAFKA_TOPIC}" may not exist or producer lacks permissions. Ensure topic exists or set allowAutoTopicCreation=true (if permitted).`);
        }
    } finally {
        // 4. Disconnect the producer (essential to release resources)
        console.log('\nDisconnecting producer...');
        try {
            await producer.disconnect();
            console.log('Producer disconnected successfully.');
        } catch (disconnectError) {
            console.error('[ERROR] Failed to disconnect producer:', disconnectError);
        }
    }
};
 
// --- Execute the producer ---
runProducer();