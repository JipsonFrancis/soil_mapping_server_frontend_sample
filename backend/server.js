import { createServer } from "http";
import { parse } from "url";
import { WebSocketServer } from "ws";
import fs from "fs"

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


// Create the https server
const server = createServer();
// Create two instance of the websocket server
const wss1 = new WebSocketServer({ noServer: true });
const wss2 = new WebSocketServer({ noServer: true });

try
{
   // Connect the client to the server	(optional starting in v4.7)
 await client.connect();
 // Send a ping to confirm a successful connection
 await client.db("admin").command({ ping: 1 });
 console.log("Pinged your deployment. You successfully connected to MongoDB!");

}catch(e)
{
  console.error(e)
}

// Take note of client or users connected
const users = new Set();

/*For the first connection "/request" path
 We take note of the clients that initiated connection and saved it in our list
 */
wss1.on("connection", function connection(socket) {
  console.log("wss1:: User connected");
  const userRef = {
    socket: socket,
    connectionDate: Date.now(),
  };
  console.log("Adding to set");
  users.add(userRef);
});

/*
 For the second connection "/sendSensorData" path
 This is where we received the sensor reads from the ESP32 Dev module.
 Upon receiving the sensor read, we broadcast it to all the client listener
*/
wss2.on("connection", function connection(ws) {
  console.log("wss2:: socket connection ");
  ws.on('message', async function message(data) {
      const now = Date.now();

      const parseData = JSON.parse(data);

      console.log(parseData)

      let NPK = { date: now, Nitrogen: parseData.Nitrogen, Potassium: parseData.Potassium, Phrosphrous: parseData.Phrosphrous };

      const jsonNPK = JSON.stringify(NPK);

      console.log(jsonNPK);

      fs.appendFile('NPK.txt', jsonNPK, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

      const result = await client.db("Sample_soil_mapping").collection("soil_mapes").insertOne({
        place: "watatus farm",
        Area: 5,
        siUnit: "hector",
        location: {
            type: "Point",
            coordinates: [-8.61308,41.1413],
            is_location_exact: false
        },
        npk:jsonNPK,
        date: Date.now()
      });

      console.log(`New map created with the following id: ${result.insertedId}`);

      sendMessage(jsonNPK);

      // if (parseData.Nitrogen)
      // {
      //   let Nitrogen = { date: now, Nitrogen: parseData.Nitrogen };
      //   // let Potassium = { date: now, Nitrogen: parseData.Nitrogen };
      //   // let Phrosphrous = { date: now, Nitrogen: parseData.Nitrogen };
  
      //   const jsonNitrogen = JSON.stringify(Nitrogen);
      //   // const jsonPotassium = JSON.stringify(Potassium);
      //   // const jsonPhrosphrous = JSON.stringify(Phrosphrous);
  
      //   sendMessage(jsonNitrogen);
      // }

      // if (parseData.Potassium)
      // {
      //   // let Nitrogen = { date: now, Nitrogen: parseData.Nitrogen };
      //   let Potassium = { date: now, Potassium: parseData.Potassium };
      //   // let Phrosphrous = { date: now, Nitrogen: parseData.Nitrogen };
  
      //   // const jsonNitrogen = JSON.stringify(Nitrogen);
      //   const jsonPotassium = JSON.stringify(Potassium);
      //   // const jsonPhrosphrous = JSON.stringify(Phrosphrous);
  
      //   sendMessage(jsonPotassium);
      // }

      // if (parseData.Phrosphrous)
      // {
      //   // let Nitrogen = { date: now, Nitrogen: parseData.Nitrogen };
      //   // let Potassium = { date: now, Nitrogen: parseData.Nitrogen };
      //   let Phrosphrous = { date: now, Phrosphrous: parseData.Phrosphrous };
  
      //   //const jsonNitrogen = JSON.stringify(Nitrogen);
      //   // const jsonPotassium = JSON.stringify(Potassium);
      //   const jsonPhrosphrous = JSON.stringify(Phrosphrous);
  
      //   sendMessage(jsonPhrosphrous);
      // }

  });
});


/*
This is the part where we create the two paths.  
Initial connection is on HTTP but is upgraded to websockets
The two path "/request" and "/sendSensorData" is defined here
*/
server.on("upgrade", function upgrade(request, socket, head) {
  const { pathname } = parse(request.url);
  console.log(`Path name ${pathname}`);

  if (pathname === "/request") {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit("connection", ws, request);
    });
  } else if (pathname === "/sendSensorData") {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

//Open the server port in 8080
server.listen(8080);

//function to send websocket messages to user
const sendMessage = (message) => {
  console.log("Sending messages to users!");
  for (const user of users) {
    user.socket.send(message);
  }
};