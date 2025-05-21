import { MongoClient } from 'mongodb';
 
// Replace with your MongoDB connection string
const uri = "mongodb://mongodb-oslmqa:wCvpPHQoMwIQrdpYt32xCA1ixjKgMAM4z8s4uGFgfo3nc8sn0dCRNgCpAUv39TDZNIH7P3yRWtxDlzg1S80R4g==@mongodb-oslmqa.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mongodb-oslmqa@";
 
async function connectToMongoDB() {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
 
    await client.connect();
    console.log("Connected to MongoDB!");
 
    // Access your database and collection
    const database = client.db("admin"); // Replace with your database name
    const collection = database.collection("shipment_details"); // Replace with your collection name
 
    // Now you can perform operations on the collection
    // For example, to find all documents:
    const documents = await collection.find({"orderNumber":"36422437"}).toArray();
    console.log("Documents in the collection:", documents);
 
    // Remember to close the connection when done
    await client.close();
    console.log("MongoDB connection closed.");
 
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
 
connectToMongoDB();