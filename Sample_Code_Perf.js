import { Kafka, logLevel } from 'kafkajs';

// --- Configuration ---
const KAFKA_BROKERS = [
    "qgm011b06.albertsons.com:9093",
    "qgm011b07.albertsons.com:9093",
    "qgm011b08.albertsons.com:9093",
    "qgm011b09.albertsons.com:9093",
    "qgm011b0a.albertsons.com:9093",
    "qgm011b0b.albertsons.com:9093"
];
const CLIENT_ID = `acupick-producer-${Date.now()}`; // Descriptive client ID

// --- SASL/SCRAM Credentials ---
const SASL_USERNAME = "OS03LM";
const SASL_PASSWORD = "8dcTA8nih4SzkBRSsG1@M"; // Use process.env.KAFKA_PASSWORD in real apps!

// --- Producer for producer_final.js ---
const runProducerFinal = async () => {
    const kafka = new Kafka({
        clientId: CLIENT_ID,
        brokers: KAFKA_BROKERS,
        ssl: true,
        sasl: {
            mechanism: 'PLAIN',
            username: SASL_USERNAME,
            password: SASL_PASSWORD,
        },
        logLevel: logLevel.INFO,
    });

    const producer = kafka.producer({
        allowAutoTopicCreation: false,
        idempotent: true,
    });

    const randomOrderNumber = `${Math.floor(10000000 + Math.random() * 90000000)}`;
    const randomFulfillmentOrderNumber = `${randomOrderNumber}011`;

    const payloadObject = {
        orderNumber: randomOrderNumber,
        fulfillmentOrderNumber: randomFulfillmentOrderNumber,
        messageSource: "Acupick",
        activityId: "99995577",
        event: {
            id: "CREATE_SHIPMENT_LABELS",
            eventTs: "2025-05-02T19:10:33.207555245Z",
            source: "Acupick"
        },
        data: {
            shipments: [
                {
                    packageWeight: 2.0,
                    packageWeightUOM: "LBS",
                    referenceNumber: `${randomOrderNumber}-BOX-01-XS-128913`,
                    pckgDimensionsUOM: "IN",
                    packageHeight: 5.13,
                    packageWidth: 5.13,
                    packageLength: 14.63,
                    signatureRequired: "true"
                }
            ],
            serviceLevel: "REGULAR",
            storeId: "5799",
            shipToName: " Wine Automation Script",
            shipToAddress: {
                addressLine1: "5420 San Jose Dr",
                addressLine2: "address2",
                city: "Pleasanton",
                state: "CA",
                postalCode: "94566"
            },
            shipFromAddress: {
                addressLine1: "1930 N Placentia Ave",
                addressLine2: "address2",
                city: "Fullerton",
                state: "CA",
                postalCode: "94566"
            },
            fulfilledQtyForWholeOrder: 5
        }
    };

    const messageKey = payloadObject.orderNumber;
    const messageValue = JSON.stringify(payloadObject);
    const messageHeaders = { eventId: 'CREATE_SHIPMENT_LABELS' };

    try {
        await producer.connect();
        console.log('Producer (Final) connected successfully.');

        const results = await producer.send({
            topic: 'OSPK_OSLM_SHIPPING_LABEL_PERF',
            messages: [{ key: messageKey, value: messageValue, headers: messageHeaders }],
        });

        console.log('Message sent to producer_final topic:', results);
    } catch (error) {
        console.error('Error in producer_final:', error);
    } finally {
        await producer.disconnect();
    }

    const payloadOSDTObject = {
        orderNumber: randomOrderNumber,
        fulfillmentOrderNumber: randomFulfillmentOrderNumber,
        messageSource: "DTILL",
        publishedTs: "2025-05-02T05:56:34.249738583",
        storeNumber: "1502",
        fulfillmentStoreNumber: null,
        event: {
            type: "SYSTEM",
            uuid: "f39afcf8-5c95-4832-95e4-b9e1f9b08ddd",
            id: "PAYMENT_COMPLETED",
            eventTs: "2025-05-02T05:56:34.249738583",
            source: "DTILL"
        },
        data: {
            domsJson: {
                audit: {
                    createDate: "2025-05-02T21:48:24.116Z",
                    modifiedDate: "2025-05-02T05:56:34.246Z",
                    createdBy: "ECOMMERCE",
                    modifiedBy: "PAYMENT_COMPLETED",
                    auditLog: {
                        FFO_CREATED: "2024-11-18T05:56:30.267",
                        RECORD_PICK_DETAILS: "2025-05-02T05:56:32.192",
                        UPDATE_FINAL_PRICE: "2025-05-02T05:56:33.206156002",
                        PAYMENT_REQUESTED: "2025-05-02T05:56:33.413023026",
                        TILLING_ORDER_RECEIVED: "2025-05-02T05:56:33.747Z",
                        PAYMENT_COMPLETED: "2025-05-02T05:56:34.246Z"
                    }
                },
                orderNumber: randomOrderNumber,
                versionNumber: 1,
                orderStatus: "PAYMENT_COMPLETED",
                companyId: "1",
                banner: "Albertsons",
                isActive: true,
                storeNumber: "1502",
                modifiedReasonCode: "PAYMENT_COMPLETED",
                orderEditCutoffDate: "2025-05-02T08:00:00.000Z",
                orderCancelCutoffDate: "2025-05-02T10:00:00.000Z",
                orderCreatedDate: "2025-05-02T05:56:27.256Z",
                fulfillmentSystem: "APS",
                sourceInfo: {
                    source: "ECOMMERCE",
                    enteredBy: "CUSTOMER",
                    deviceType: "WEB"
                },
                orderType: {
                    isAutoReplenishment: false,
                    isSnapV2: false,
                    editLevel: "NA"
                },
                orderTotal: {
                    amount: 22.67,
                    snapEligibleTotal: 6.38,
                    nonsnapEligibleTotal: 16.29,
                    currency: "USD",
                    itemTotalAmount: 6.38,
                    itemTotalAfterSavingsAmount: 6.38,
                    quotedOrderTotalAmount: 22.67,
                    totalCardSavings: 0.00,
                    totalAllocatedAmount: 22.67,
                    unallocatedAmount: 0.00,
                    totalSnapAmount: 0.00,
                    totalWriteOffAmount: 0.00,
                    totalRefundAmount: 0.00,
                    taxAndFees: {
                        total: 16.29,
                        totalTaxesAndFeesAmount: 16.29,
                        details: [
                            { key: "Sales Tax", value: 0.39 },
                            { key: "Delivery Fee", value: 11.95 },
                            { key: "Minimum Order Fee (under $30)", value: 3.95 }
                        ]
                    },
                    taxes: [
                        { type: "Sales Tax", amount: 0.39 }
                    ],
                    txnLevelSavings: [],
                    data: {
                        totalBannerCashAmount: "0.00",
                        totalTreviPayAmount: "0",
                        totalBannerCashDeltaAmount: "0.00",
                        totalBannerCashRefundAmount: "0.00",
                        totalAchAmount: "0"
                    },
                    totalSavings: 0.00
                }
            }
        }
    };

    const messageOsdtKey = payloadOSDTObject.orderNumber;
    const messageOsdtValue = JSON.stringify(payloadOSDTObject);
    const messageOsdtHeaders = {
        serviceType: 'Delivery',
        orderNumber: randomOrderNumber,
        storeNumber: '1502',
        eventId: 'PAYMENT_COMPLETED',
        orderType: 'Albertsons',
        eventSource: 'DTILL',
        pickerOption: 'ABS-GROCERY',
        __TypeId__: 'com.albertsons.ecom.osdt.order.tiller.domain.ordercompleted.PaymentCompletedEvent'
    };

    try {
        await producer.connect();
        console.log('Producer (Payment) connected successfully.');

        const results = await producer.send({
            topic: 'OSDT_ORDER_EVENTS_PERF',
            messages: [{ key: messageOsdtKey, value: messageOsdtValue, headers: messageOsdtHeaders }],
        });

        console.log('Message sent to producer_Payment topic:', results);
    } catch (error) {
        console.error('Error in producer_Payment:', error);
    } finally {
        await producer.disconnect();
    }
};

// --- Complete Flow ---
const runCompleteFlow = async () => {
    console.log('Starting complete flow...');

    for (let i = 0; i < 25; i++) {
        console.log(`Executing runProducerFinal - Iteration ${i + 1}`);
        await runProducerFinal();
    }

    console.log('Complete flow executed successfully.');
};

// Execute the complete flow
await runCompleteFlow();