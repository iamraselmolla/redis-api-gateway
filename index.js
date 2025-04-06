const express = require("express");
const redis = require("redis");

const app = express();

const client = redis.createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// Connect Redis before starting server
(async () => {
  try {
    await client.connect(); // This is required!
    console.log("Redis client connected");

    app.get("/", async (req, res) => {
      try {
        let value = await client.get("counter");
        let counter = parseInt(value) || 0;
        counter++;
        await client.set("counter", counter.toString());
        res.send(`Counter: ${counter}`);
      } catch (err) {
        console.error(err);
        res.status(500).send("Redis error");
      }
    });
    app.get("/publish", async (req, res) => {
      try {
        const message = JSON.stringify({
          event: "visit",
          timestamp: Date.now(),
        });
        await client.publish("updates", message);
        res.send("Message published to 'updates' channel");
      } catch (err) {
        console.error("Publish error:", err);
        res.status(500).send("Failed to publish message");
      }
    });

    app.listen(3005, () => {
      console.log("Server started on port 3005");
    });
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
})();
