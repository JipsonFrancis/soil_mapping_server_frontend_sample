import { MongoClient, ServerApiVersion } from 'mongodb';
const password = "pYr2YBleU8WWUhPy";
const name = "kingKLong"
const uri = `mongodb+srv://${name}:${password}@soilmapping.npqtkq4.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    await databases(client);

    // Create a single new listing
    await createMapping(client,
        {
            place: "watatus farm",
            Area: 5,
            siUnit: "hector",
            location: {
                type: "Point",
                coordinates: [-8.61308,41.1413],
                is_location_exact: false
            },
            npk: [
                {"date":1693381163087,"Nitrogen":51,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381165136,"Nitrogen":50,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381167182,"Nitrogen":49,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381173338,"Nitrogen":48,"Potassium":85.63999939,"Phrosphrous":29.79999924},
                {"date":1693381220332,"Nitrogen":47,"Potassium":85.63999939,"Phrosphrous":29.79999924},
                {"date":1693381228514,"Nitrogen":67,"Potassium":86,"Phrosphrous":30},
                {"date":1693381230563,"Nitrogen":64,"Potassium":86,"Phrosphrous":30}
            ],
            date: Date.now()
        }
    );


    await createMappings(client, [
        {
            place: "mpingu farm",
            Area: 15,
            siUnit: "hector",
            location: {
                type: "Point",
                coordinates: [-8.61308,41.1413],
                is_location_exact: false
            },
            npk: [
                {"date":1693381163087,"Nitrogen":51,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381165136,"Nitrogen":50,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381167182,"Nitrogen":49,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381173338,"Nitrogen":48,"Potassium":85.63999939,"Phrosphrous":29.79999924},
                {"date":1693381220332,"Nitrogen":47,"Potassium":85.63999939,"Phrosphrous":29.79999924},
                {"date":1693381228514,"Nitrogen":67,"Potassium":86,"Phrosphrous":30},
                {"date":1693381230563,"Nitrogen":64,"Potassium":86,"Phrosphrous":30}
            ],
            date: Date.now()
        },
        {
            place: "catholic farms",
            Area: 50,
            siUnit: "hector",
            location: {
                type: "Point",
                coordinates: [-8.61308,41.1413],
                is_location_exact: false
            },
            npk: [
                {"date":1693381163087,"Nitrogen":51,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381165136,"Nitrogen":50,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381167182,"Nitrogen":49,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381173338,"Nitrogen":48,"Potassium":85.63999939,"Phrosphrous":29.79999924},
                {"date":1693381220332,"Nitrogen":47,"Potassium":85.63999939,"Phrosphrous":29.79999924},
                {"date":1693381228514,"Nitrogen":67,"Potassium":86,"Phrosphrous":30},
                {"date":1693381230563,"Nitrogen":64,"Potassium":86,"Phrosphrous":30}
            ],
            date: Date.now()
        },
        {
            place: "musa farm",
            Area: 25,
            siUnit: "hector",
            location: {
                type: "Point",
                coordinates: [-8.61308,41.1413],
                is_location_exact: false
            },
            npk: [
                {"date":1693381163087,"Nitrogen":51,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381165136,"Nitrogen":50,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381167182,"Nitrogen":49,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381173338,"Nitrogen":48,"Potassium":85.63999939,"Phrosphrous":29.79999924},
                {"date":1693381220332,"Nitrogen":47,"Potassium":85.63999939,"Phrosphrous":29.79999924},
                {"date":1693381228514,"Nitrogen":67,"Potassium":86,"Phrosphrous":30},
                {"date":1693381230563,"Nitrogen":64,"Potassium":86,"Phrosphrous":30}
            ],
            date: Date.now()
        },
        {
            place: "desis farm",
            Area: 500,
            siUnit: "hector",
            location: {
                type: "Point",
                coordinates: [-8.61308,41.1413],
                is_location_exact: false
            },
            npk: [
                {"date":1693381163087,"Nitrogen":51,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381165136,"Nitrogen":50,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381167182,"Nitrogen":49,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381173338,"Nitrogen":48,"Potassium":85.63999939,"Phrosphrous":29.79999924},
                {"date":1693381220332,"Nitrogen":47,"Potassium":85.63999939,"Phrosphrous":29.79999924},
                {"date":1693381228514,"Nitrogen":67,"Potassium":86,"Phrosphrous":30},
                {"date":1693381230563,"Nitrogen":64,"Potassium":86,"Phrosphrous":30}
            ],
            date: Date.now()
        },
        {
            place: "x farm",
            Area: 5,
            siUnit: "hector",
            location: {
                type: "Point",
                coordinates: [-8.61308,41.1413],
                is_location_exact: false
            },
            npk: [
                {"date":1693381163087,"Nitrogen":51,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381165136,"Nitrogen":50,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381167182,"Nitrogen":49,"Potassium":85.45999908,"Phrosphrous":29.70000076},
                {"date":1693381173338,"Nitrogen":48,"Potassium":85.63999939,"Phrosphrous":29.79999924},
                {"date":1693381220332,"Nitrogen":47,"Potassium":85.63999939,"Phrosphrous":29.79999924},
                {"date":1693381228514,"Nitrogen":67,"Potassium":86,"Phrosphrous":30},
                {"date":1693381230563,"Nitrogen":64,"Potassium":86,"Phrosphrous":30}
            ],
            date: Date.now()
        }
    ])



  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function databases (client)
{
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases")

    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`)
    })
}

async function createMapping(client, newListing){

    const result = await client.db("Sample_soil_mapping").collection("soil_mapes").insertOne(newListing);
    console.log(`New map created with the following id: ${result.insertedId}`);
}

async function createMappings(client, newListings){

    const result = await client.db("Sample_soil_mapping").collection("soil_mapes").insertMany(newListings);

    console.log(`${result.insertedCount} new mappings(s) created with the following id(s):`);
    console.log(result.insertedIds);
}