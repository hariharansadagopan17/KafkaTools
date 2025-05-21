import { MongoClient } from 'mongodb';

// MongoDB connection details
const MONGO_URI = 'mongodb://mongodb-oslmqa.mongo.cosmos.azure.com:10255'; // Replace with your MongoDB URI
const DATABASE_NAME = 'admin'; // Replace with your database name
const COLLECTION_NAME = 'shipment_details'; // Collection name

const MONGO_USERNAME = 'mongodb-oslmqa'; // Replace with your MongoDB username
const MONGO_PASSWORD = 'wCvpPHQoMwIQrdpYt32xCA1ixjKgMAM4z8s4uGFgfo3nc8sn0dCRNgCpAUv39TDZNIH7P3yRWtxDlzg1S80R4g=='; // Replace with your MongoDB password

// Tracking number and order number to update
const trackingNumber = "1Z429320A809668594";
const orderNumber = "36422437"; // Replace with the specific orderNumber you want to update


const uri = "mongodb://mongodb-oslmqa:wCvpPHQoMwIQrdpYt32xCA1ixjKgMAM4z8s4uGFgfo3nc8sn0dCRNgCpAUv39TDZNIH7P3yRWtxDlzg1S80R4g==@mongodb-oslmqa.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mongodb-oslmqa@";
// Function to update the tracking number for a specific orderNumber
const updateTrackingNumber = async () => {
    //const client = new MongoClient(MONGO_URI, {
      //  auth: {
        //    username: MONGO_USERNAME,
          //  password: MONGO_PASSWORD,
       // },
        //useNewUrlParser: true,
      //useUnifiedTopology: true,
    //});

        const client = new MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
     
       

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB.');

        // Get the database and collection
        const db = client.db(DATABASE_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // Update the tracking number for the specific orderNumber
       // const filter = { orderNumber };
        //const update = { $set: { trackingNumber } };


        const filter = { orderNumber: orderNumber };
        const update = { $set: { trackingNumber: trackingNumber } };

        //const document = await collection.findOne(filter);
       // const document = await collection.find(filter);
       // const result = await collection.updateOne(filter,update);

       const documents = await collection.find({"orderNumber":"36422437"}).toArray();
       console.log("Documents in the collection:", documents);

        //dconsole.log('Document found:', document);
       // console.log('Result:', result);

     /*   if (document) {
            console.log('Document found:', document);
        } else {
            console.log(`No document found with orderNumber: ${orderNumber}`);
        }
    } catch (error) {
        console.error('Error querying orderNumber:', error);
    }
    finally {
        // Close the connection
        await client.close();
        console.log('MongoDB connection closed.');
    }
*/




//const result = await collection.updateOne(filter,update); // Use updateOne to update a single document
if (result.matchedCount > 0) {
    console.log(`Tracking number updated for orderNumber: ${orderNumber}`);
} else {
    console.log(`No document found with orderNumber: ${orderNumber}`);
}
} catch (error) {
console.error('Error updating tracking number:', error);
} finally {
// Close the connection
await client.close();
console.log('MongoDB connection closed.');
}

};

// Call the function
updateTrackingNumber();