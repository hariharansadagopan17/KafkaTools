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
const KAFKA_TOPIC = 'OSDT_ORDER_EVENTS_ACCP'; // Your specific topic
const CLIENT_ID = 'acupick-producer-' + Date.now(); // Descriptive client ID

// --- SASL/SCRAM Credentials ---
// !!! WARNING: Avoid hardcoding credentials in production. Use environment variables or secrets management. !!!
const SASL_USERNAME = "OS03LM";
const SASL_PASSWORD = "8dcTA8nih4SzkBRSsG1@M"; // Use process.env.KAFKA_PASSWORD in real apps!

// --- Message Details ---

// Generate random orderNumber and fulfillmentOrderNumber
//const randomOrderNumber = Math.floor(10000000 + Math.random() * 90000000).toString(); // 8-digit random number
//const randomFulfillmentOrderNumber = randomOrderNumber + "011"; // Append "011" to the orderNumber

// Define the payload as a JavaScript object first
const payloadObject = {
    "orderNumber": "72153493",
    "fulfillmentOrderNumber": "72153493011",
    "messageSource": "DTILL",
    "publishedTs": "2025-05-02T05:56:34.249738583",
    "storeNumber": "1502",
    "fulfillmentStoreNumber": null,
    "event": {
        "type": "SYSTEM",
        "uuid": "f39afcf8-5c95-4832-95e4-b9e1f9b08ddd",
        "id": "PAYMENT_COMPLETED",
        "eventTs": "2025-05-02T05:56:34.249738583",
        "source": "DTILL"
    },
    "data": {
        "domsJson": {
            "audit": {
                "createDate": "2025-05-02T21:48:24.116Z",
                "modifiedDate": "2025-05-02T05:56:34.246Z",
                "createdBy": "ECOMMERCE",
                "modifiedBy": "PAYMENT_COMPLETED",
                "auditLog": {
                    "FFO_CREATED": "2024-11-18T05:56:30.267",
                    "RECORD_PICK_DETAILS": "2025-05-02T05:56:32.192",
                    "UPDATE_FINAL_PRICE": "2025-05-02T05:56:33.206156002",
                    "PAYMENT_REQUESTED": "2025-05-02T05:56:33.413023026",
                    "TILLING_ORDER_RECEIVED": "2025-05-02T05:56:33.747Z",
                    "PAYMENT_COMPLETED": "2025-05-02T05:56:34.246Z"
                }
            },
            "orderNumber": "72153493",
            "versionNumber": 1,
            "orderStatus": "PAYMENT_COMPLETED",
            "companyId": "1",
            "banner": "Albertsons",
            "isActive": true,
            "storeNumber": "1502",
            "modifiedReasonCode": "PAYMENT_COMPLETED",
            "orderEditCutoffDate": "2025-05-02T08:00:00.000Z",
            "orderCancelCutoffDate": "2025-05-02T10:00:00.000Z",
            "orderCreatedDate": "2025-05-02T05:56:27.256Z",
            "fulfillmentSystem": "APS",
            "sourceInfo": {
                "source": "ECOMMERCE",
                "enteredBy": "CUSTOMER",
                "deviceType": "WEB"
            },
            "orderType": {
                "isAutoReplenishment": false,
                "isSnapV2": false,
                "editLevel": "NA"
            },
            "orderTotal": {
                "amount": 22.67,
                "snapEligibleTotal": 6.38,
                "nonsnapEligibleTotal": 16.29,
                "currency": "USD",
                "itemTotalAmount": 6.38,
                "itemTotalAfterSavingsAmount": 6.38,
                "quotedOrderTotalAmount": 22.67,
                "totalCardSavings": 0.00,
                "totalAllocatedAmount": 22.67,
                "unallocatedAmount": 0.00,
                "totalSnapAmount": 0.00,
                "totalWriteOffAmount": 0.00,
                "totalRefundAmount": 0.00,
                "taxAndFees": {
                    "total": 16.29,
                    "totalTaxesAndFeesAmount": 16.29,
                    "details": [
                        {
                            "key": "Sales Tax",
                            "value": 0.39
                        },
                        {
                            "key": "Delivery Fee",
                            "value": 11.95
                        },
                        {
                            "key": "Minimum Order Fee (under $30)",
                            "value": 3.95
                        }
                    ]
                },
                "taxes": [
                    {
                        "type": "Sales Tax",
                        "amount": 0.39
                    }
                ],
                "txnLevelSavings": [],
                "data": {
                    "totalBannerCashAmount": "0.00",
                    "totalTreviPayAmount": "0",
                    "totalBannerCashDeltaAmount": "0.00",
                    "totalBannerCashRefundAmount": "0.00",
                    "totalAchAmount": "0"
                },
                "totalSavings": 0.00
            }
        }
    }
};

// Use a relevant field from the payload as the key (optional, but good practice)
const messageKey = payloadObject.orderNumber; // e.g., "934497161"

// Convert the JavaScript payload object to a JSON string for sending
const messageValue = JSON.stringify(payloadObject);

// Your specified header
const messageHeaders = {
    'serviceType': 'Delivery',
    'orderNumber': "72153493",
    'storeNumber': '1502',
    'eventId': 'PAYMENT_COMPLETED',
    'orderType': 'Albertsons',
    'eventSource': 'DTILL',
    'pickerOption': 'ABS-GROCERY',
    '__TypeId__': 'com.albertsons.ecom.osdt.order.tiller.domain.ordercompleted.PaymentCompletedEvent'
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
        } else if (error.message.includes('UNKNOWN_TOPIC_OR_PARTITION')) {
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