import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL, // Set your Redis URL
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
})();

export default redisClient;
